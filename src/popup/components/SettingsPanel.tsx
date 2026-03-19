import type { TimerSettings, TimerDisplay, ThemeName } from "../../types/timer"
import { themes } from "../themes"

interface Props {
  settings: TimerSettings
  onUpdate: (partial: Partial<TimerSettings>) => void
}

function msToMinutes(ms: number): number {
  return Math.round(ms / 60000)
}

function minutesToMs(min: number): number {
  return min * 60000
}

const themeList = Object.entries(themes) as [ThemeName, (typeof themes)[ThemeName]][]

const displayIcons: Record<TimerDisplay, React.ReactNode> = {
  ring: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  flip: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="7" height="16" rx="1" />
      <rect x="14" y="4" width="7" height="16" rx="1" />
      <line x1="3" y1="12" x2="10" y2="12" />
      <line x1="14" y1="12" x2="21" y2="12" />
    </svg>
  ),
  bigNumber: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <text x="4" y="18" fontSize="16" fontWeight="bold" fill="currentColor" stroke="none">25</text>
    </svg>
  ),
  bloom: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="5" opacity="0.6" />
      <circle cx="9" cy="9" r="5" opacity="0.4" />
      <circle cx="15" cy="10" r="4" opacity="0.3" />
    </svg>
  ),
  analog: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
}

const displayKeys: { key: TimerDisplay; label: string }[] = [
  { key: "ring", label: "Ring" },
  { key: "flip", label: "Flip" },
  { key: "bigNumber", label: "Big #" },
  { key: "bloom", label: "Bloom" },
  { key: "analog", label: "Analog" },
]

export default function SettingsPanel({ settings, onUpdate }: Props) {
  return (
    <div className="settings-panel">
      <div className="setting-group">
        <div className="setting-group-title">Theme</div>
        <div className="theme-picker-grid">
          {themeList.map(([key, config]) => {
            const palette = config.colors.focus
            const isActive = settings.theme === key
            return (
              <button
                key={key}
                className={`theme-card${isActive ? " active" : ""}`}
                onClick={() => onUpdate({ theme: key })}
                title={config.label}
              >
                <div
                  className="theme-swatch"
                  style={{
                    background: `linear-gradient(135deg, ${palette.bgFrom}, ${palette.bgVia}, ${palette.bgTo})`,
                  }}
                >
                  <div
                    className="theme-swatch-dot"
                    style={{ background: palette.primary }}
                  />
                </div>
                <span className="theme-card-label">{config.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="setting-group">
        <div className="setting-group-title">Timer Style</div>
        <div className="display-picker-row">
          {displayKeys.map((opt) => {
            const isActive = settings.timerDisplay === opt.key
            return (
              <button
                key={opt.key}
                className={`display-option${isActive ? " active" : ""}`}
                onClick={() => onUpdate({ timerDisplay: opt.key })}
                title={opt.label}
              >
                <span className="display-option-icon">{displayIcons[opt.key]}</span>
                <span className="display-option-label">{opt.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="setting-group">
        <div className="setting-group-title">Durations</div>

        <label className="setting-row">
          <span className="setting-label">Focus</span>
          <input
            className="setting-input"
            type="number"
            min={1}
            max={120}
            value={msToMinutes(settings.focusDuration)}
            onChange={(e) => onUpdate({ focusDuration: minutesToMs(Number(e.target.value)) })}
          />
        </label>

        <label className="setting-row">
          <span className="setting-label">Short break</span>
          <input
            className="setting-input"
            type="number"
            min={1}
            max={60}
            value={msToMinutes(settings.shortBreak)}
            onChange={(e) => onUpdate({ shortBreak: minutesToMs(Number(e.target.value)) })}
          />
        </label>

        <label className="setting-row">
          <span className="setting-label">Long break</span>
          <input
            className="setting-input"
            type="number"
            min={1}
            max={60}
            value={msToMinutes(settings.longBreak)}
            onChange={(e) => onUpdate({ longBreak: minutesToMs(Number(e.target.value)) })}
          />
        </label>

        <label className="setting-row">
          <span className="setting-label">Sessions before long break</span>
          <input
            className="setting-input"
            type="number"
            min={1}
            max={10}
            value={settings.sessionsBeforeLongBreak}
            onChange={(e) => onUpdate({ sessionsBeforeLongBreak: Number(e.target.value) })}
          />
        </label>
      </div>

      <div className="setting-group">
        <div className="setting-group-title">Behavior</div>

        <label className="setting-row">
          <span className="setting-label">Auto-start next</span>
          <div className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.autoStart}
              onChange={(e) => onUpdate({ autoStart: e.target.checked })}
            />
            <span className="toggle-track" />
          </div>
        </label>

        <label className="setting-row">
          <span className="setting-label">Sound</span>
          <div className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.sound}
              onChange={(e) => onUpdate({ sound: e.target.checked })}
            />
            <span className="toggle-track" />
          </div>
        </label>
      </div>
    </div>
  )
}
