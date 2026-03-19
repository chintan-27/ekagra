import { useEffect, useRef, useState } from "react"
import type { TimerMode } from "../../types/timer"

const modes: { key: TimerMode; label: string }[] = [
  { key: "focus", label: "Focus" },
  { key: "short_break", label: "Short Break" },
  { key: "long_break", label: "Long Break" },
]

interface Props {
  activeMode: TimerMode
  onSetMode: (mode: TimerMode) => void
}

export default function ModeTabs({ activeMode, onSetMode }: Props) {
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
      {modes.map((m) => (
        <button
          key={m.key}
          className={`mode-tab ${m.key === activeMode ? "active" : ""}`}
          onClick={() => onSetMode(m.key)}
        >
          {m.label}
        </button>
      ))}
    </div>
  )
}
