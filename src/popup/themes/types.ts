import type { TimerMode } from "../../types/timer"

export interface ColorPalette {
  bgFrom: string
  bgVia: string
  bgTo: string
  primary: string
  primaryGlow: string
  accent: string
  text: string
  textMuted: string
  surface: string
  surfaceBorder: string
  cardBg: string
  cardBorder: string
}

export interface ThemeConfig {
  name: string
  label: string
  isDark: boolean
  colors: Record<TimerMode, ColorPalette>
  sessionEmojis: string[]
  quote: string
}
