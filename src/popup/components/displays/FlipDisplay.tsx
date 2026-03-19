import { useEffect, useState } from "react"
import { formatTime } from "../../../utils/format-time"

interface Props {
  remaining: number
  total: number
  isRunning: boolean
  modeLabel: string
  sessionNumber?: number
  totalSessions?: number
}

const W = 52
const H = 68
const FONT = 42

const keyframes = `
@keyframes slideOut {
  from { transform: translateY(0); opacity: 1; }
  to   { transform: translateY(16px); opacity: 0; }
}
@keyframes slideIn {
  from { transform: translateY(-16px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}
`

function FlipCard({ digit }: { digit: string }) {
  const [display, setDisplay] = useState(digit)
  const [anim, setAnim] = useState("")

  useEffect(() => {
    if (digit !== display) {
      // Start exit animation
      setAnim("slideOut 0.15s ease-in forwards")
      const t = setTimeout(() => {
        setDisplay(digit)
        setAnim("slideIn 0.15s ease-out forwards")
        const t2 = setTimeout(() => setAnim(""), 150)
        return () => clearTimeout(t2)
      }, 140)
      return () => clearTimeout(t)
    }
  }, [digit, display])

  return (
    <div
      style={{
        width: W,
        height: H,
        background: "var(--surface, #1a1a2e)",
        borderRadius: 8,
        position: "relative",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: anim || "none",
        }}
      >
        <span
          style={{
            fontSize: FONT,
            fontWeight: 700,
            color: "var(--text)",
            fontFamily: "'SF Mono', 'Fira Code', 'Courier New', monospace",
            lineHeight: 1,
          }}
        >
          {display}
        </span>
      </div>
      {/* Center crease */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "100%",
          height: 1,
          background: "rgba(0,0,0,0.25)",
          transform: "translateY(-0.5px)",
          pointerEvents: "none",
        }}
      />
    </div>
  )
}

export default function FlipDisplay({
  remaining,
  total,
  sessionNumber,
  totalSessions,
}: Props) {
  const formatted = formatTime(remaining)
  const [min, sec] = formatted.split(":")
  const digits = [min[0], min[1], sec[0], sec[1]]
  const progress = total > 0 ? Math.max(0, Math.min(1, 1 - remaining / total)) : 0

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      <style>{keyframes}</style>

      {/* Flip cards row */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <FlipCard digit={digits[0]} />
        <FlipCard digit={digits[1]} />
        <span
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: "var(--text)",
            fontFamily: "'SF Mono', 'Fira Code', 'Courier New', monospace",
            lineHeight: 1,
            padding: "0 2px",
          }}
        >
          :
        </span>
        <FlipCard digit={digits[2]} />
        <FlipCard digit={digits[3]} />
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: "90%",
          height: 4,
          background: "var(--trackColor)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            background: "linear-gradient(90deg, var(--accent), var(--primary))",
            borderRadius: 2,
            transition: "width 0.3s ease",
          }}
        />
      </div>

      {/* Label + session info */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span
          style={{
            fontSize: "0.6rem",
            color: "var(--textMuted)",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          {Math.round(progress * 100)}%
        </span>
        {sessionNumber != null && totalSessions != null && (
          <span
            style={{
              fontSize: "0.55rem",
              color: "var(--textMuted)",
            }}
          >
            Session {sessionNumber}/{totalSessions}
          </span>
        )}
      </div>
    </div>
  )
}
