import type { TimerMode } from "../../types/timer"

export interface ThemeColors {
  bgFrom: string
  bgTo: string
  surface: string
  surfaceBorder: string
  primary: string
  primaryGlow: string
  text: string
  textMuted: string
  accent: string
  trackColor: string
}

export const themes: Record<TimerMode, ThemeColors> = {
  focus: {
    bgFrom: "#070b1e",
    bgTo: "#101833",
    surface: "rgba(255, 255, 255, 0.04)",
    surfaceBorder: "rgba(255, 255, 255, 0.06)",
    primary: "#5b8def",
    primaryGlow: "rgba(91, 141, 239, 0.35)",
    text: "#f0f2f8",
    textMuted: "rgba(240, 242, 248, 0.45)",
    accent: "#8bb0f4",
    trackColor: "rgba(255, 255, 255, 0.06)",
  },
  short_break: {
    bgFrom: "#061a17",
    bgTo: "#0c2e27",
    surface: "rgba(255, 255, 255, 0.04)",
    surfaceBorder: "rgba(255, 255, 255, 0.06)",
    primary: "#4ecdc4",
    primaryGlow: "rgba(78, 205, 196, 0.30)",
    text: "#f0f8f6",
    textMuted: "rgba(240, 248, 246, 0.45)",
    accent: "#7ee8e1",
    trackColor: "rgba(255, 255, 255, 0.06)",
  },
  long_break: {
    bgFrom: "#10061e",
    bgTo: "#1e0f33",
    surface: "rgba(255, 255, 255, 0.04)",
    surfaceBorder: "rgba(255, 255, 255, 0.06)",
    primary: "#a78bfa",
    primaryGlow: "rgba(167, 139, 250, 0.30)",
    text: "#f4f0f8",
    textMuted: "rgba(244, 240, 248, 0.45)",
    accent: "#c4b0fc",
    trackColor: "rgba(255, 255, 255, 0.06)",
  },
}

export function applyTheme(mode: TimerMode): void {
  const theme = themes[mode]
  const root = document.documentElement
  for (const [key, value] of Object.entries(theme)) {
    root.style.setProperty(`--${key}`, value)
  }
}
