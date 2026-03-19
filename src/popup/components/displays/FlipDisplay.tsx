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
const FONT = 42
const DURATION = 400

const digitFont: React.CSSProperties = {
  fontSize: FONT,
  fontWeight: 700,
  color: "var(--text)",
  fontFamily: "'SF Mono', 'Fira Code', 'Courier New', monospace",
  lineHeight: 1,
}

const halfBase: React.CSSProperties = {
  position: "absolute",
  width: W,
  height: HALF,
  overflow: "hidden",
  background: "var(--surface, #1a1a2e)",
}

const keyframes = `
@keyframes flipTop {
  0%   { transform: rotateX(0deg); }
  100% { transform: rotateX(-90deg); }
}
@keyframes flipBottom {
  0%   { transform: rotateX(90deg); }
  100% { transform: rotateX(0deg); }
}
`

function HalfDigit({
  digit,
  isTop,
  style,
}: {
  digit: string
  isTop: boolean
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        ...halfBase,
        top: isTop ? 0 : HALF + 1,
        borderRadius: isTop ? "6px 6px 0 0" : "0 0 6px 6px",
        boxShadow: isTop
          ? "0 1px 2px rgba(0,0,0,0.15)"
          : "0 3px 8px rgba(0,0,0,0.25)",
        ...style,
      }}
    >
      <span
        style={{
          ...digitFont,
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: isTop ? HALF - FONT * 0.38 : -(FONT * 0.38),
        }}
      >
        {digit}
      </span>
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
      timer.current = setTimeout(() => setFlipping(false), DURATION)
    }
  }, [digit, cur])

  return (
    <div
      style={{
        width: W,
        height: H + 1,
        position: "relative",
      }}
    >
      {/* Static top half — always shows NEW digit */}
      <HalfDigit digit={cur} isTop />

      {/* Static bottom half — shows NEW digit (revealed after flip) */}
      <HalfDigit digit={cur} isTop={false} />

      {flipping && (
        <>
          {/* Animated top half — OLD digit, flips down and away */}
          <HalfDigit
            digit={prev}
            isTop
            style={{
              zIndex: 2,
              transformOrigin: "bottom center",
              animation: `flipTop ${DURATION}ms ease-in forwards`,
              backfaceVisibility: "hidden",
            }}
          />
          {/* Animated bottom half — NEW digit, flips in from top */}
          <HalfDigit
            digit={cur}
            isTop={false}
            style={{
              zIndex: 2,
              transformOrigin: "top center",
              animation: `flipBottom ${DURATION}ms ease-out forwards`,
              backfaceVisibility: "hidden",
            }}
          />
        </>
      )}

      {/* Center line / crease */}
      <div
        style={{
          position: "absolute",
          top: HALF,
          left: 0,
          width: "100%",
          height: 1,
          background: "rgba(0,0,0,0.35)",
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

      {/* Flip cards row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          perspective: 300,
        }}
      >
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
