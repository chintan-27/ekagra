import type { TimerMode, TimerSettings, TimerState } from "../types/timer"

export function getDurationForMode(mode: TimerMode, settings: TimerSettings): number {
  switch (mode) {
    case "focus": return settings.focusDuration
    case "short_break": return settings.shortBreak
    case "long_break": return settings.longBreak
  }
}

export function computeRemaining(state: TimerState): number {
  if (!state.isRunning) {
    return state.pausedRemaining || getDurationForMode(state.mode, state.settings)
  }
  return Math.max(0, state.duration - (Date.now() - state.startTime))
}

export function isSessionComplete(state: TimerState): boolean {
  return state.isRunning && computeRemaining(state) <= 0
}

export function getNextMode(state: TimerState): TimerMode {
  if (state.mode === "focus") {
    const nextCount = state.completedSessions + 1
    return nextCount % state.settings.sessionsBeforeLongBreak === 0
      ? "long_break"
      : "short_break"
  }
  return "focus"
}

export function startTimer(state: TimerState): TimerState {
  if (state.isRunning) return state

  const duration = state.pausedRemaining > 0
    ? state.pausedRemaining
    : getDurationForMode(state.mode, state.settings)

  return {
    ...state,
    isRunning: true,
    startTime: Date.now(),
    duration,
    pausedRemaining: 0,
  }
}

export function pauseTimer(state: TimerState): TimerState {
  if (!state.isRunning) return state

  return {
    ...state,
    isRunning: false,
    pausedRemaining: Math.max(0, state.duration - (Date.now() - state.startTime)),
  }
}

export function resetTimer(state: TimerState): TimerState {
  return {
    ...state,
    isRunning: false,
    startTime: 0,
    duration: getDurationForMode(state.mode, state.settings),
    pausedRemaining: 0,
  }
}

export function setMode(state: TimerState, mode: TimerMode): TimerState {
  if (state.mode === mode) return state
  const duration = getDurationForMode(mode, state.settings)
  return {
    ...state,
    mode,
    isRunning: false,
    startTime: 0,
    duration,
    pausedRemaining: 0,
  }
}

export function transitionToNextSession(state: TimerState): TimerState {
  const nextMode = getNextMode(state)
  const completedSessions = state.mode === "focus"
    ? state.completedSessions + 1
    : state.completedSessions

  const nextDuration = getDurationForMode(nextMode, state.settings)
  const shouldAutoStart = state.settings.autoStart

  return {
    ...state,
    mode: nextMode,
    completedSessions,
    isRunning: shouldAutoStart,
    startTime: shouldAutoStart ? Date.now() : 0,
    duration: nextDuration,
    pausedRemaining: 0,
  }
}
