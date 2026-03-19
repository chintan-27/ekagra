import type { ThemeName, TimerMode } from "../../types/timer"
import { getTheme } from "../themes"

const loadedFonts = new Set<string>()

function loadGoogleFont(fontFamily: string): void {
  // Extract just the font name (remove fallbacks like ", serif")
  const name = fontFamily.split(",")[0].replace(/'/g, "").trim()
  if (loadedFonts.has(name)) return
  loadedFonts.add(name)

  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(name)}:wght@300;400;500;600;700;800&display=swap`
  document.head.appendChild(link)
}

export function applyTheme(themeName: ThemeName, mode: TimerMode): void {
  const theme = getTheme(themeName)
  const palette = theme.colors[mode]
  const root = document.documentElement

  for (const [key, value] of Object.entries(palette)) {
    root.style.setProperty(`--${key}`, value)
  }

  root.style.setProperty("--isDark", theme.isDark ? "1" : "0")
  root.style.setProperty("--trackColor", theme.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)")
  root.style.setProperty("--headingFont", theme.headingFont)
  root.style.setProperty("--bodyFont", theme.bodyFont)
  root.setAttribute("data-theme-mode", theme.isDark ? "dark" : "light")

  loadGoogleFont(theme.headingFont)
  loadGoogleFont(theme.bodyFont)
}
