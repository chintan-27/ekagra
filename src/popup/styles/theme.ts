import type { TimerMode } from "../../types/timer"

export interface ThemeColors {
  background: string
  surface: string
  primary: string
  text: string
  accent: string
  progressTrack: string
  progressFill: string
}

export const themes: Record<TimerMode, ThemeColors> = {
  focus: {
    background: "#1a1a2e",
    surface: "#16213e",
    primary: "#4a90d9",
    text: "#e8e8e8",
    accent: "#6cb4ee",
    progressTrack: "#2a2a4a",
    progressFill: "#4a90d9",
  },
  short_break: {
    background: "#1a2e1a",
    surface: "#1e3a1e",
    primary: "#5cb85c",
    text: "#e8e8e8",
    accent: "#7dd87d",
    progressTrack: "#2a4a2a",
    progressFill: "#5cb85c",
  },
  long_break: {
    background: "#2e1a2e",
    surface: "#3a1e3a",
    primary: "#9b59b6",
    text: "#e8e8e8",
    accent: "#bb77d4",
    progressTrack: "#4a2a4a",
    progressFill: "#9b59b6",
  },
}

export function applyTheme(mode: TimerMode): void {
  const theme = themes[mode]
  const root = document.documentElement
  for (const [key, value] of Object.entries(theme)) {
    root.style.setProperty(`--${key}`, value)
  }
}
