import { useEffect, useRef, useState } from "react"
import { formatTime } from "../../../utils/format-time"

interface Props {
  remaining: number
  total: number
  isRunning: boolean
  modeLabel: string
  sessionNumber?: number
  totalSessions?: number
}

const cardStyle: React.CSSProperties = {
  width: 56,
  height: 72,
  position: "relative",
  perspective: 200,
}

const faceStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "var(--surface, #1a1a2e)",
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
  overflow: "hidden",
  backfaceVisibility: "hidden",
}

const digitStyle: React.CSSProperties = {
  fontSize: 44,
  fontWeight: 700,
  color: "var(--text)",
  fontFamily: "'SF Mono', 'Fira Code', 'Courier New', monospace",
  lineHeight: 1,
}

const creaseStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: 0,
  width: "100%",
  height: 1,
  background: "rgba(0,0,0,0.3)",
  transform: "translateY(-50%)",
}

function FlipCard({ digit }: { digit: string }) {
  const [current, setCurrent] = useState(digit)
  const [previous, setPrevious] = useState(digit)
  const [flipping, setFlipping] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    if (digit !== current) {
      setPrevious(current)
      setCurrent(digit)
      setFlipping(true)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setFlipping(false), 350)
    }
  }, [digit, current])

  return (
    <div style={cardStyle}>
      {/* Static base: shows new digit */}
      <div style={faceStyle}>
        <span style={digitStyle}>{current}</span>
        <div style={creaseStyle} />
      </div>

      {/* Flipping panel: old digit flips away */}
      {flipping && (
        <div
          style={{
            ...faceStyle,
            animation: "flipDown 0.35s ease-in forwards",
            transformOrigin: "bottom center",
            zIndex: 2,
          }}
        >
          <span style={digitStyle}>{previous}</span>
          <div style={creaseStyle} />
        </div>
      )}
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
      {/* Keyframe injection */}
      <style>{`
        @keyframes flipDown {
          0% { transform: rotateX(0deg); opacity: 1; }
          100% { transform: rotateX(-90deg); opacity: 0; }
        }
      `}</style>

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
