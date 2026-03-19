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
const DUR = 500

const keyframes = `
@keyframes foldTop {
  0%   { transform: perspective(${H * 4}px) rotateX(0deg); }
  100% { transform: perspective(${H * 4}px) rotateX(-90deg); }
}
@keyframes unfoldBottom {
  0%   { transform: perspective(${H * 4}px) rotateX(90deg); }
  100% { transform: perspective(${H * 4}px) rotateX(0deg); }
}
`

const cardHalf: React.CSSProperties = {
  position: "absolute",
  left: 0,
  width: W,
  height: HALF,
  overflow: "hidden",
  backfaceVisibility: "hidden",
  background: "var(--surface, #1a1a2e)",
}

const digitSpan: React.CSSProperties = {
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
  const [phase, setPhase] = useState<"idle" | "fold" | "unfold">("idle")
  const ref = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    if (digit !== cur) {
      setPrev(cur)
      setCur(digit)
      setPhase("fold")
      if (ref.current) clearTimeout(ref.current)
      ref.current = setTimeout(() => {
        setPhase("unfold")
        ref.current = setTimeout(() => setPhase("idle"), DUR / 2)
      }, DUR / 2)
    }
  }, [digit, cur])

  return (
    <div style={{ width: W, height: H + 1, position: "relative" }}>
      {/* ── STATIC TOP: new digit (revealed when old top folds away) ── */}
      <div
        style={{
          ...cardHalf,
          top: 0,
          borderRadius: "6px 6px 0 0",
          zIndex: 0,
        }}
      >
        <span style={digitSpan}>{cur}</span>
      </div>

      {/* ── STATIC BOTTOM: shows old during fold, new when done ── */}
      <div
        style={{
          ...cardHalf,
          top: HALF + 1,
          borderRadius: "0 0 6px 6px",
          zIndex: 0,
        }}
      >
        <span style={{ ...digitSpan, marginTop: -HALF }}>
          {phase === "fold" ? prev : cur}
        </span>
      </div>

      {/* ── ANIMATED TOP: old digit, folds down and away ── */}
      {phase === "fold" && (
        <div
          style={{
            ...cardHalf,
            top: 0,
            borderRadius: "6px 6px 0 0",
            transformOrigin: "center bottom",
            animation: `foldTop ${DUR / 2}ms ease-in forwards`,
            zIndex: 2,
          }}
        >
          <span style={digitSpan}>{prev}</span>
        </div>
      )}

      {/* ── ANIMATED BOTTOM: new digit, unfolds into place ── */}
      {phase === "unfold" && (
        <div
          style={{
            ...cardHalf,
            top: HALF + 1,
            borderRadius: "0 0 6px 6px",
            transformOrigin: "center top",
            animation: `unfoldBottom ${DUR / 2}ms ease-out forwards`,
            zIndex: 2,
          }}
        >
          <span style={{ ...digitSpan, marginTop: -HALF }}>
            {cur}
          </span>
        </div>
      )}

      {/* Crease */}
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
