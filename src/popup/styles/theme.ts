import type { ThemeName, TimerMode } from "../../types/timer"
import { getTheme } from "../themes"

export function applyTheme(themeName: ThemeName, mode: TimerMode): void {
  const theme = getTheme(themeName)
  const palette = theme.colors[mode]
  const root = document.documentElement

  for (const [key, value] of Object.entries(palette)) {
    root.style.setProperty(`--${key}`, value)
  }

  root.style.setProperty("--isDark", theme.isDark ? "1" : "0")
  root.setAttribute("data-theme-mode", theme.isDark ? "dark" : "light")
}
