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
          className="btn btn-icon"
          onClick={() => setShowSettings(!showSettings)}
          title="Settings"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
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
