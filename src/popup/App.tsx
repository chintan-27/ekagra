import { useEffect, useState } from "react"
import { useTimer } from "./hooks/useTimer"
import { useStats } from "./hooks/useStats"
import { applyTheme } from "./styles/theme"
import { getTheme } from "./themes"
import type { ThemeName, TimerMode } from "../types/timer"
import TimerDisplaySwitch from "./components/displays/TimerDisplaySwitch"
import TimerControls from "./components/TimerControls"
import SessionIndicator from "./components/SessionIndicator"
import ModeTabs from "./components/ModeTabs"
import SettingsPanel from "./components/SettingsPanel"
import StatsPage from "./components/StatsPage"

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

type Tab = "timer" | "stats" | "settings"

const modeLabels: Record<TimerMode, string> = {
  focus: "Focus",
  short_break: "Short Break",
  long_break: "Long Break",
}

export default function App() {
  const { state, remaining, settings, start, pause, reset, skip, goBack, setMode, updateSettings } = useTimer()
  const { stats, refresh: refreshStats } = useStats()
  const [activeTab, setActiveTab] = useState<Tab>("timer")

  const themeName = settings.theme
  const theme = getTheme(themeName)
  const Background = backgrounds[themeName] ?? backgrounds.sunrise

  useEffect(() => {
    applyTheme(themeName, state.mode)
  }, [themeName, state.mode])

  return (
    <div className="app">
      <Background mode={state.mode} />

      <div className="app-content">
        {activeTab === "settings" ? (
          <>
            <div className="page-header">
              <h2 className="page-title">Settings</h2>
            </div>
            <SettingsPanel settings={settings} onUpdate={updateSettings} />
          </>
        ) : activeTab === "stats" ? (
          <>
            <div className="page-header">
              <h2 className="page-title">Stats</h2>
            </div>
            <StatsPage stats={stats} sessionEmojis={theme.sessionEmojis} />
          </>
        ) : (
          <>
            <header className="app-header">
              <h1 className="app-title">Ekagra</h1>
            </header>

            <ModeTabs activeMode={state.mode} isRunning={state.isRunning} onSetMode={setMode} />

            <div className="glass-card">
              <TimerDisplaySwitch
                displayType={settings.timerDisplay}
                remaining={remaining}
                total={state.duration}
                isRunning={state.isRunning}
                modeLabel={modeLabels[state.mode]}
                sessionNumber={state.completedSessions + 1}
                totalSessions={state.settings.sessionsBeforeLongBreak}
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
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button
          className={`nav-item${activeTab === "timer" ? " active" : ""}`}
          onClick={() => setActiveTab("timer")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>Timer</span>
        </button>
        <button
          className={`nav-item${activeTab === "stats" ? " active" : ""}`}
          onClick={() => { setActiveTab("stats"); refreshStats() }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
          <span>Stats</span>
        </button>
        <button
          className={`nav-item${activeTab === "settings" ? " active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          <span>Settings</span>
        </button>
      </nav>
    </div>
  )
}
