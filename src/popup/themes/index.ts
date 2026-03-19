import type { ThemeName } from "../../types/timer"
import type { ThemeConfig } from "./types"
import { sunriseConfig } from "./sunrise"
import { meadowConfig } from "./meadow"
import { oceanConfig } from "./ocean"
import { auroraConfig } from "./aurora"
import { zenConfig } from "./zen"
import { neonConfig } from "./neon"
import { retroConfig } from "./retro"
import { brutalistConfig } from "./brutalist"
import { coralConfig } from "./coral"
import { analogLuxConfig } from "./analogLux"
import { glassConfig } from "./glass"

export type { ThemeConfig, ColorPalette } from "./types"

export const themes: Record<ThemeName, ThemeConfig> = {
  sunrise: sunriseConfig,
  meadow: meadowConfig,
  ocean: oceanConfig,
  aurora: auroraConfig,
  zen: zenConfig,
  neon: neonConfig,
  retro: retroConfig,
  brutalist: brutalistConfig,
  coral: coralConfig,
  analogLux: analogLuxConfig,
  glass: glassConfig,
}

export function getTheme(name: ThemeName): ThemeConfig {
  return themes[name] ?? themes.sunrise
}
