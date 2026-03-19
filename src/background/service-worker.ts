import type { Message, MessageResponse } from "../types/timer"
import { ALARM_NAME, BADGE_ALARM_NAME } from "../utils/constants"
import { getDefaultState, getTimerState, setTimerState } from "./storage"
import { getStatsData, recordFocusSession } from "./stats-storage"
import {
  computeRemaining,
  isSessionComplete,
  startTimer,
  pauseTimer,
  resetTimer,
  setMode,
  goBack,
  transitionToNextSession,
} from "./timer-engine"

function getNotificationDetails(mode: string): { title: string; message: string } {
  switch (mode) {
    case "focus":
      return { title: "Break is over", message: "Ready to focus?" }
    case "short_break":
      return { title: "Focus complete!", message: "Time for a short break." }
    case "long_break":
      return { title: "Great work!", message: "Time for a longer break." }
    default:
      return { title: "Session complete", message: "Onward." }
  }
}

const badgeColors: Record<string, string> = {
  focus: "#4a90d9",
  short_break: "#5cb85c",
  long_break: "#9b59b6",
}

async function updateBadge(state: { isRunning: boolean; mode: string }): Promise<void> {
  if (state.isRunning) {
    const full = await getTimerState()
    const remaining = computeRemaining(full)
    const minutes = Math.ceil(remaining / 60000)
    await chrome.action.setBadgeText({ text: `${minutes}m` })
    await chrome.action.setBadgeBackgroundColor({ color: badgeColors[state.mode] ?? "#4a90d9" })
  } else {
    await chrome.action.setBadgeText({ text: "" })
  }
}

async function createAlarmForState(): Promise<void> {
  const state = await getTimerState()
  await chrome.alarms.clear(ALARM_NAME)
  if (state.isRunning) {
    const remaining = computeRemaining(state)
    if (remaining > 0) {
      chrome.alarms.create(ALARM_NAME, { delayInMinutes: remaining / 60000 })
      chrome.alarms.create(BADGE_ALARM_NAME, { periodInMinutes: 1 })
    }
  } else {
    await chrome.alarms.clear(BADGE_ALARM_NAME)
  }
  await updateBadge(state)
}

async function handleSessionComplete(): Promise<void> {
  const state = await getTimerState()
  if (!isSessionComplete(state)) return

  // Record focus sessions in stats
  if (state.mode === "focus") {
    await recordFocusSession(state.duration)
  }

  const nextState = transitionToNextSession(state)
  await setTimerState(nextState)

  const { title, message } = getNotificationDetails(nextState.mode)
  chrome.notifications.create("ekagra_session_complete", {
    type: "basic",
    iconUrl: chrome.runtime.getURL("public/icons/icon-128.png"),
    title,
    message,
    priority: 2,
    silent: !state.settings.sound,
  })

  if (nextState.isRunning) {
    await createAlarmForState()
  }
}

// --- Listeners ---

chrome.runtime.onInstalled.addListener(async () => {
  const state = await getTimerState()
  if (!state.startTime && !state.pausedRemaining) {
    await setTimerState(getDefaultState())
  }
})

chrome.runtime.onStartup.addListener(async () => {
  const state = await getTimerState()
  if (!state.isRunning) return

  const remaining = computeRemaining(state)
  if (remaining <= 0) {
    await handleSessionComplete()
  } else {
    await createAlarmForState()
  }
})

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === ALARM_NAME) {
    await handleSessionComplete()
  } else if (alarm.name === BADGE_ALARM_NAME) {
    const state = await getTimerState()
    await updateBadge(state)
  }
})

chrome.runtime.onMessage.addListener(
  (message: Message, _sender, sendResponse: (response: MessageResponse) => void) => {
    handleMessage(message).then(sendResponse)
    return true // keep message channel open for async response
  }
)

async function handleMessage(message: Message): Promise<MessageResponse> {
  let state = await getTimerState()

  switch (message.type) {
    case "GET_STATE":
      break

    case "START_TIMER":
      state = startTimer(state)
      await setTimerState(state)
      await createAlarmForState()
      break

    case "PAUSE_TIMER":
      state = pauseTimer(state)
      await setTimerState(state)
      await chrome.alarms.clear(ALARM_NAME)
      await chrome.alarms.clear(BADGE_ALARM_NAME)
      await updateBadge(state)
      break

    case "RESET_TIMER":
      state = resetTimer(state)
      await setTimerState(state)
      await chrome.alarms.clear(ALARM_NAME)
      await chrome.alarms.clear(BADGE_ALARM_NAME)
      await updateBadge(state)
      break

    case "SKIP_SESSION":
      state = transitionToNextSession(state)
      await setTimerState(state)
      if (state.isRunning) {
        await createAlarmForState()
      } else {
        await chrome.alarms.clear(ALARM_NAME)
      }
      break

    case "GO_BACK":
      state = goBack(state)
      await setTimerState(state)
      await chrome.alarms.clear(ALARM_NAME)
      await chrome.alarms.clear(BADGE_ALARM_NAME)
      await updateBadge(state)
      break

    case "SET_MODE":
      state = setMode(state, message.mode)
      await setTimerState(state)
      await chrome.alarms.clear(ALARM_NAME)
      await chrome.alarms.clear(BADGE_ALARM_NAME)
      await updateBadge(state)
      break

    case "UPDATE_SETTINGS":
      state = {
        ...state,
        settings: { ...state.settings, ...message.settings },
      }
      await setTimerState(state)
      if (state.isRunning) {
        await createAlarmForState()
      }
      break

    case "GET_STATS": {
      const stats = await getStatsData()
      return { state, stats }
    }

    case "RECORD_SESSION": {
      const stats = await recordFocusSession(message.focusMinutes * 60000)
      return { state, stats }
    }
  }

  return { state }
}
