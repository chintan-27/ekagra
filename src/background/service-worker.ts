import type { Message, MessageResponse } from "../types/timer"
import { ALARM_NAME } from "../utils/constants"
import { getDefaultState, getTimerState, setTimerState } from "./storage"
import {
  computeRemaining,
  isSessionComplete,
  startTimer,
  pauseTimer,
  resetTimer,
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

async function createAlarmForState(): Promise<void> {
  const state = await getTimerState()
  await chrome.alarms.clear(ALARM_NAME)
  if (state.isRunning) {
    const remaining = computeRemaining(state)
    if (remaining > 0) {
      chrome.alarms.create(ALARM_NAME, { delayInMinutes: remaining / 60000 })
    }
  }
}

async function handleSessionComplete(): Promise<void> {
  const state = await getTimerState()
  if (!isSessionComplete(state)) return

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
      break

    case "RESET_TIMER":
      state = resetTimer(state)
      await setTimerState(state)
      await chrome.alarms.clear(ALARM_NAME)
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
  }

  return { state }
}
