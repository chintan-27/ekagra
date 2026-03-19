import type { TimerMode } from "../../types/timer"

export interface ThemeColors {
  bgFrom: string
  bgVia: string
  bgTo: string
  surface: string
  surfaceBorder: string
  surfaceHover: string
  primary: string
  primaryDark: string
  primaryGlow: string
  primaryGlowStrong: string
  text: string
  textMuted: string
  accent: string
  accentSoft: string
  trackColor: string
  gradientStart: string
  gradientEnd: string
  cardBg: string
  cardBorder: string
}

export const themes: Record<TimerMode, ThemeColors> = {
  focus: {
    bgFrom: "#050a1a",
    bgVia: "#0a1228",
    bgTo: "#0f1b3d",
    surface: "rgba(255, 255, 255, 0.035)",
    surfaceBorder: "rgba(255, 255, 255, 0.06)",
    surfaceHover: "rgba(255, 255, 255, 0.06)",
    primary: "#5b8def",
    primaryDark: "#4070d0",
    primaryGlow: "rgba(91, 141, 239, 0.25)",
    primaryGlowStrong: "rgba(91, 141, 239, 0.45)",
    text: "#eef1f8",
    textMuted: "rgba(238, 241, 248, 0.45)",
    accent: "#8bb4f8",
    accentSoft: "rgba(139, 180, 248, 0.15)",
    trackColor: "rgba(255, 255, 255, 0.06)",
    gradientStart: "#8bb4f8",
    gradientEnd: "#4a7be0",
    cardBg: "rgba(255, 255, 255, 0.025)",
    cardBorder: "rgba(255, 255, 255, 0.05)",
  },
  short_break: {
    bgFrom: "#041612",
    bgVia: "#082820",
    bgTo: "#0c3a2e",
    surface: "rgba(255, 255, 255, 0.035)",
    surfaceBorder: "rgba(255, 255, 255, 0.06)",
    surfaceHover: "rgba(255, 255, 255, 0.06)",
    primary: "#4ecdc4",
    primaryDark: "#3ab0a8",
    primaryGlow: "rgba(78, 205, 196, 0.25)",
    primaryGlowStrong: "rgba(78, 205, 196, 0.45)",
    text: "#eef8f6",
    textMuted: "rgba(238, 248, 246, 0.45)",
    accent: "#7ee8e1",
    accentSoft: "rgba(126, 232, 225, 0.15)",
    trackColor: "rgba(255, 255, 255, 0.06)",
    gradientStart: "#7ee8e1",
    gradientEnd: "#3ab0a8",
    cardBg: "rgba(255, 255, 255, 0.025)",
    cardBorder: "rgba(255, 255, 255, 0.05)",
  },
  long_break: {
    bgFrom: "#0c041a",
    bgVia: "#160a2e",
    bgTo: "#201042",
    surface: "rgba(255, 255, 255, 0.035)",
    surfaceBorder: "rgba(255, 255, 255, 0.06)",
    surfaceHover: "rgba(255, 255, 255, 0.06)",
    primary: "#a78bfa",
    primaryDark: "#8b6fe0",
    primaryGlow: "rgba(167, 139, 250, 0.25)",
    primaryGlowStrong: "rgba(167, 139, 250, 0.45)",
    text: "#f2eef8",
    textMuted: "rgba(242, 238, 248, 0.45)",
    accent: "#c4b0fc",
    accentSoft: "rgba(196, 176, 252, 0.15)",
    trackColor: "rgba(255, 255, 255, 0.06)",
    gradientStart: "#c4b0fc",
    gradientEnd: "#8b6fe0",
    cardBg: "rgba(255, 255, 255, 0.025)",
    cardBorder: "rgba(255, 255, 255, 0.05)",
  },
}

export function applyTheme(mode: TimerMode): void {
  const theme = themes[mode]
  const root = document.documentElement
  for (const [key, value] of Object.entries(theme)) {
    root.style.setProperty(`--${key}`, value)
  }
}
