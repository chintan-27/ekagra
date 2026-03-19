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
const REST = 6 // rest angle in degrees for 3D depth
const DUR = 450 // ms

const keyframes = `
@keyframes flipTopDown {
  0%   { transform: rotateX(-${REST}deg); }
  100% { transform: rotateX(${180 - REST}deg); }
}
@keyframes flipBottomUp {
  0%   { transform: rotateX(${-(180 - REST)}deg); }
  100% { transform: rotateX(${REST}deg); }
}
`

// Shared half styles
const halfStyle: React.CSSProperties = {
  position: "absolute",
  left: 0,
  width: W,
  height: HALF,
  overflow: "hidden",
  textAlign: "center",
  backfaceVisibility: "hidden",
  transformStyle: "preserve-3d",
}

const fontStyle: React.CSSProperties = {
  fontSize: 44,
  fontWeight: 700,
  color: "var(--text)",
  fontFamily: "'SF Mono', 'Fira Code', 'Courier New', monospace",
  display: "block",
  width: W,
}

function TopHalf({ digit, style }: { digit: string; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        ...halfStyle,
        top: 0,
        background: "var(--surface, #1a1a2e)",
        borderRadius: "8px 8px 0 0",
        transformOrigin: "50% 100%",
        transform: `rotateX(-${REST}deg)`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.15) inset",
        ...style,
      }}
    >
      {/* line-height = full height so only top half of text is visible */}
      <span style={{ ...fontStyle, lineHeight: `${H + 2}px` }}>{digit}</span>
    </div>
  )
}

function BottomHalf({ digit, style }: { digit: string; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        ...halfStyle,
        top: HALF + 1,
        background: "var(--surface, #1a1a2e)",
        borderRadius: "0 0 8px 8px",
        transformOrigin: "50% 0%",
        transform: `rotateX(${REST}deg)`,
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        ...style,
      }}
    >
      {/* line-height ≈ 0 so only bottom half of text is visible */}
      <span style={{ ...fontStyle, lineHeight: "2px" }}>{digit}</span>
    </div>
  )
}

function FlipCard({ digit }: { digit: string }) {
  const [cur, setCur] = useState(digit)
  const [prev, setPrev] = useState(digit)
  const [flipping, setFlipping] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    if (digit !== cur) {
      setPrev(cur)
      setCur(digit)
      setFlipping(true)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setFlipping(false), DUR)
    }
  }, [digit, cur])

  return (
    <div
      style={{
        width: W,
        height: H + 1,
        position: "relative",
        perspective: H * 3,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Layer 1: Static new digit (both halves, sits behind animations) */}
      <TopHalf digit={cur} />
      <BottomHalf digit={cur} />

      {/* Layer 2: Static old bottom half (visible until new bottom flips over it) */}
      {flipping && (
        <BottomHalf digit={prev} style={{ zIndex: 1 }} />
      )}

      {/* Layer 3: Animated old top half — flips down and away */}
      {flipping && (
        <TopHalf
          digit={prev}
          style={{
            zIndex: 2,
            animation: `flipTopDown ${DUR}ms ease-in forwards`,
          }}
        />
      )}

      {/* Layer 4: Animated new bottom half — flips up into place */}
      {flipping && (
        <BottomHalf
          digit={cur}
          style={{
            zIndex: 2,
            animation: `flipBottomUp ${DUR}ms ease-out forwards`,
          }}
        />
      )}

      {/* Crease line */}
      <div
        style={{
          position: "absolute",
          top: HALF,
          left: 0,
          width: "100%",
          height: 1,
          background: "rgba(0,0,0,0.3)",
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
