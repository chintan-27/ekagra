export type TimerMode = "focus" | "short_break" | "long_break"

export type TimerDisplay = "ring" | "flip" | "bigNumber" | "bloom" | "analog"

export type ThemeName =
  | "sunrise" | "meadow" | "ocean"
  | "aurora" | "zen" | "neon"
  | "retro" | "brutalist" | "coral"
  | "analogLux" | "glass"

export interface TimerSettings {
  focusDuration: number      // milliseconds
  shortBreak: number         // milliseconds
  longBreak: number          // milliseconds
  sessionsBeforeLongBreak: number
  autoStart: boolean
  sound: boolean
  timerDisplay: TimerDisplay
  theme: ThemeName
}

export interface TimerState {
  mode: TimerMode
  startTime: number          // Date.now() when started/resumed
  duration: number           // total duration for current session in ms
  isRunning: boolean
  pausedRemaining: number    // ms remaining when paused (0 if not paused)
  completedSessions: number
  settings: TimerSettings
}

export type Message =
  | { type: "START_TIMER" }
  | { type: "PAUSE_TIMER" }
  | { type: "RESET_TIMER" }
  | { type: "SKIP_SESSION" }
  | { type: "GO_BACK" }
  | { type: "SET_MODE"; mode: TimerMode }
  | { type: "UPDATE_SETTINGS"; settings: Partial<TimerSettings> }
  | { type: "GET_STATE" }

export interface MessageResponse {
  state: TimerState
}
