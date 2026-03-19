import type { TimerSettings } from "../types/timer"

export const DEFAULT_SETTINGS: TimerSettings = {
  focusDuration: 25 * 60 * 1000,
  shortBreak: 5 * 60 * 1000,
  longBreak: 15 * 60 * 1000,
  sessionsBeforeLongBreak: 4,
  autoStart: false,
  sound: true,
}

export const STORAGE_KEY = "ekagra_timer_state"
export const ALARM_NAME = "ekagra_timer_alarm"
export const BADGE_ALARM_NAME = "ekagra_badge_update"
