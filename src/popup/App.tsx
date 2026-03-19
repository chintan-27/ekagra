import { useEffect, useState } from "react"
import { useTimer } from "./hooks/useTimer"
import { useSettings } from "./hooks/useSettings"
import { applyTheme } from "./styles/theme"
import { getTheme } from "./themes"
import type { ThemeName, TimerMode } from "../types/timer"
import TimerDisplaySwitch from "./components/displays/TimerDisplaySwitch"
import TimerControls from "./components/TimerControls"
import SessionIndicator from "./components/SessionIndicator"
import ModeTabs from "./components/ModeTabs"
import SettingsPanel from "./components/SettingsPanel"

// Background components
import SunriseBackground from "./components/backgrounds/SunriseBackground"
import MeadowBackground from "./components/backgrounds/MeadowBackground"
import OceanBackground from "./components/backgrounds/OceanBackground"
import AuroraBackground from "./components/backgrounds/AuroraBackground"
import ZenBackground from "./components/backgrounds/ZenBackground"
import NeonBackground from "./components/backgrounds/NeonBackground"
import RetroBackground from "./components/backgrounds/RetroBackground"
import BrutalistBackground from "./components/backgrounds/BrutalistBackground"
import CoralBackground from "./components/backgrounds/CoralBackground"
import AnalogBackground from "./components/backgrounds/AnalogBackground"
import GlassBackground from "./components/backgrounds/GlassBackground"

const backgrounds: Record<ThemeName, React.FC<{ mode: TimerMode }>> = {
  sunrise: SunriseBackground,
  meadow: MeadowBackground,
  ocean: OceanBackground,
  aurora: AuroraBackground,
  zen: ZenBackground,
  neon: NeonBackground,
  retro: RetroBackground,
  brutalist: BrutalistBackground,
  coral: CoralBackground,
  analogLux: AnalogBackground,
  glass: GlassBackground,
}

const modeLabels: Record<TimerMode, string> = {
  focus: "Focus",
  short_break: "Short Break",
  long_break: "Long Break",
}

export default function App() {
  const { state, remaining, start, pause, reset, skip, goBack, setMode } = useTimer()
  const { settings, updateSettings } = useSettings()
  const [showSettings, setShowSettings] = useState(false)

  const themeName = settings.theme
  const theme = getTheme(themeName)
  const Background = backgrounds[themeName] ?? backgrounds.sunrise

  useEffect(() => {
    applyTheme(themeName, state.mode)
  }, [themeName, state.mode])

  return (
    <div className="app">
      <Background mode={state.mode} />

      <header className="app-header">
        <h1 className="app-title">Ekagra</h1>
        <button
          className="btn-icon"
          onClick={() => setShowSettings(!showSettings)}
          title={showSettings ? "Back" : "Settings"}
        >
          {showSettings ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          )}
        </button>
      </header>

      {showSettings ? (
        <SettingsPanel settings={settings} onUpdate={updateSettings} />
      ) : (
        <main className="timer-main">
          <ModeTabs activeMode={state.mode} onSetMode={setMode} />
          <div className="glass-card">
            <TimerDisplaySwitch
              displayType={settings.timerDisplay}
              remaining={remaining}
              total={state.duration}
              isRunning={state.isRunning}
              modeLabel={modeLabels[state.mode]}
            />
            <TimerControls
              isRunning={state.isRunning}
              onStart={start}
              onPause={pause}
              onReset={reset}
              onSkip={skip}
              onGoBack={goBack}
            />
            <SessionIndicator
              completed={state.completedSessions}
              total={state.settings.sessionsBeforeLongBreak}
              isRunning={state.isRunning}
              emojis={theme.sessionEmojis}
            />
          </div>
          {theme.quote && (
            <p className="theme-quote">{theme.quote}</p>
          )}
        </main>
      )}
    </div>
  )
}
