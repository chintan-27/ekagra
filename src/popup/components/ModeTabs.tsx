import { useEffect, useRef, useState } from "react"
import type { TimerMode } from "../../types/timer"

const modes: { key: TimerMode; label: string }[] = [
  { key: "focus", label: "Focus" },
  { key: "short_break", label: "Short Break" },
  { key: "long_break", label: "Long Break" },
]

interface Props {
  activeMode: TimerMode
  isRunning: boolean
  onSetMode: (mode: TimerMode) => void
}

export default function ModeTabs({ activeMode, isRunning, onSetMode }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [slider, setSlider] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const idx = modes.findIndex((m) => m.key === activeMode)
    const btn = container.children[idx + 1] as HTMLElement // +1 to skip slider
    if (!btn) return
    setSlider({ left: btn.offsetLeft, width: btn.offsetWidth })
  }, [activeMode])

  return (
    <div className="mode-tabs" ref={containerRef}>
      <div
        className="mode-tabs-slider"
        style={{ left: slider.left, width: slider.width }}
      />
      {modes.map((m) => {
        const isActive = m.key === activeMode
        const disabled = isRunning && !isActive
        return (
          <button
            key={m.key}
            className={`mode-tab ${isActive ? "active" : ""}`}
            onClick={() => !disabled && onSetMode(m.key)}
            style={{
              opacity: disabled ? 0.4 : 1,
              cursor: disabled ? "default" : "pointer",
            }}
            title={disabled ? "Stop timer first to switch modes" : m.label}
          >
            {m.label}
          </button>
        )
      })}
    </div>
  )
}
