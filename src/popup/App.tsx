import { useEffect, useState } from "react"
import { useTimer } from "./hooks/useTimer"
import { useSettings } from "./hooks/useSettings"
import { applyTheme } from "./styles/theme"
import TimerDisplay from "./components/TimerDisplay"
import TimerControls from "./components/TimerControls"
import SessionIndicator from "./components/SessionIndicator"
import ModeLabel from "./components/ModeLabel"
import SettingsPanel from "./components/SettingsPanel"

export default function App() {
  const { state, remaining, start, pause, reset, skip } = useTimer()
  const { settings, updateSettings } = useSettings()
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    applyTheme(state.mode)
  }, [state.mode])

  return (
    <div className="app">
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
          <ModeLabel mode={state.mode} />
          <TimerDisplay remaining={remaining} total={state.duration} />
          <TimerControls
            isRunning={state.isRunning}
            onStart={start}
            onPause={pause}
            onReset={reset}
            onSkip={skip}
          />
          <SessionIndicator
            completed={state.completedSessions}
            total={state.settings.sessionsBeforeLongBreak}
          />
        </main>
      )}
    </div>
  )
}
