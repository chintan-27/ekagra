import type { TimerState } from "../types/timer"
import { DEFAULT_SETTINGS, STORAGE_KEY } from "../utils/constants"

export function getDefaultState(): TimerState {
  return {
    mode: "focus",
    startTime: 0,
    duration: DEFAULT_SETTINGS.focusDuration,
    isRunning: false,
    pausedRemaining: 0,
    completedSessions: 0,
    settings: { ...DEFAULT_SETTINGS },
  }
}

export async function getTimerState(): Promise<TimerState> {
  const result = await chrome.storage.local.get(STORAGE_KEY)
  return result[STORAGE_KEY] ?? getDefaultState()
}

export async function setTimerState(state: TimerState): Promise<void> {
  await chrome.storage.local.set({ [STORAGE_KEY]: state })
}

export async function updateTimerState(
  updater: (state: TimerState) => TimerState
): Promise<TimerState> {
  const current = await getTimerState()
  const next = updater(current)
  await setTimerState(next)
  return next
}
