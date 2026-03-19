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

const W = 52
const H = 68
const HALF = H / 2
const DUR = 350

const keyframes = `
@keyframes foldDown {
  0%   { transform: perspective(${H * 4}px) rotateX(0deg); }
  100% { transform: perspective(${H * 4}px) rotateX(-90deg); }
}
`

const cardHalf: React.CSSProperties = {
  position: "absolute",
  left: 0,
  width: W,
  height: HALF,
  overflow: "hidden",
  background: "var(--flipBg, #1a1a2e)",
}

const digitText: React.CSSProperties = {
  display: "block",
  width: W,
  height: H,
  fontSize: 44,
  fontWeight: 700,
  fontFamily: "'SF Mono', 'Fira Code', 'Courier New', monospace",
  color: "var(--text)",
  lineHeight: `${H}px`,
  textAlign: "center",
}

function FlipCard({ digit }: { digit: string }) {
  const [cur, setCur] = useState(digit)
  const [prev, setPrev] = useState(digit)
  const [flipping, setFlipping] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)
  const flipKey = useRef(0)

  useEffect(() => {
    if (digit !== cur) {
      setPrev(cur)
      setCur(digit)
      setFlipping(true)
      flipKey.current++
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setFlipping(false), DUR + 50)
    }
  }, [digit, cur])

  return (
    <div style={{ width: W, height: H + 1, position: "relative" }}>
      {/* Static top half — always shows NEW digit */}
      <div style={{ ...cardHalf, top: 0, borderRadius: "6px 6px 0 0" }}>
        <span style={digitText}>{cur}</span>
      </div>

      {/* Static bottom half — always shows NEW digit */}
      <div style={{ ...cardHalf, top: HALF + 1, borderRadius: "0 0 6px 6px" }}>
        <span style={{ ...digitText, marginTop: -HALF }}>{cur}</span>
      </div>

      {/* Animated flap: OLD digit top half folds down and away */}
      {flipping && (
        <div
          key={flipKey.current}
          style={{
            ...cardHalf,
            top: 0,
            borderRadius: "6px 6px 0 0",
            transformOrigin: "center bottom",
            animation: `foldDown ${DUR}ms ease-in forwards`,
            zIndex: 2,
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          <span style={digitText}>{prev}</span>
        </div>
      )}

      {/* Crease line */}
      <div
        style={{
          position: "absolute",
          top: HALF,
          left: 0,
          width: "100%",
          height: 1,
          background: "rgba(0,0,0,0.2)",
          zIndex: 3,
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
          <span style={{ fontSize: "0.55rem", color: "var(--textMuted)" }}>
            Session {sessionNumber}/{totalSessions}
          </span>
        )}
      </div>
    </div>
  )
}
