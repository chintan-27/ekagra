import type { TimerSettings } from "../../types/timer"

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

export default function SettingsPanel({ settings, onUpdate }: Props) {
  return (
    <div className="settings-panel">
      <div className="settings-header">
        <h2 className="settings-title">Settings</h2>
        <div className="settings-divider" />
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
