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
      <h2 className="settings-title">Settings</h2>

      <label className="setting-row">
        <span>Focus (min)</span>
        <input
          type="number"
          min={1}
          max={120}
          value={msToMinutes(settings.focusDuration)}
          onChange={(e) => onUpdate({ focusDuration: minutesToMs(Number(e.target.value)) })}
        />
      </label>

      <label className="setting-row">
        <span>Short Break (min)</span>
        <input
          type="number"
          min={1}
          max={60}
          value={msToMinutes(settings.shortBreak)}
          onChange={(e) => onUpdate({ shortBreak: minutesToMs(Number(e.target.value)) })}
        />
      </label>

      <label className="setting-row">
        <span>Long Break (min)</span>
        <input
          type="number"
          min={1}
          max={60}
          value={msToMinutes(settings.longBreak)}
          onChange={(e) => onUpdate({ longBreak: minutesToMs(Number(e.target.value)) })}
        />
      </label>

      <label className="setting-row">
        <span>Sessions before long break</span>
        <input
          type="number"
          min={1}
          max={10}
          value={settings.sessionsBeforeLongBreak}
          onChange={(e) => onUpdate({ sessionsBeforeLongBreak: Number(e.target.value) })}
        />
      </label>

      <label className="setting-row toggle">
        <span>Auto-start next session</span>
        <input
          type="checkbox"
          checked={settings.autoStart}
          onChange={(e) => onUpdate({ autoStart: e.target.checked })}
        />
      </label>

      <label className="setting-row toggle">
        <span>Sound</span>
        <input
          type="checkbox"
          checked={settings.sound}
          onChange={(e) => onUpdate({ sound: e.target.checked })}
        />
      </label>
    </div>
  )
}
