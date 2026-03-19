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
const DUR = 600 // ms total flip duration
const GAP = 1 // pixel gap between halves (crease)

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

/* ── Shared card-half chrome ────────────────────────────────── */
const cardBase: React.CSSProperties = {
  position: "absolute",
  left: 0,
  width: W,
  height: HALF,
  overflow: "hidden",
  backfaceVisibility: "hidden",
}

const digitFont: React.CSSProperties = {
  fontSize: 44,
  fontWeight: 700,
  fontFamily: "'SF Mono', 'Fira Code', 'Courier New', monospace",
  color: "var(--text)",
  width: W,
  textAlign: "center",
  display: "block",
  position: "absolute",
  left: 0,
}

/* ── Individual card ────────────────────────────────────────── */

function FlipCard({ digit }: { digit: string }) {
  const [cur, setCur] = useState(digit)
  const [prev, setPrev] = useState(digit)
  const [phase, setPhase] = useState<"idle" | "top" | "bottom">("idle")
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    if (digit !== cur) {
      setPrev(cur)
      setCur(digit)
      // Start: top half falls
      setPhase("top")
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      // At halfway point, switch to bottom phase
      timeoutRef.current = setTimeout(() => {
        setPhase("bottom")
        timeoutRef.current = setTimeout(() => {
          setPhase("idle")
        }, DUR / 2)
      }, DUR / 2)
    }
  }, [digit, cur])

  const isFlipping = phase !== "idle"

  return (
    <div
      style={{
        width: W,
        height: H + GAP,
        position: "relative",
        perspective: 300,
      }}
    >
      {/* ─── STATIC BASE: always visible behind everything ─── */}

      {/* Static top: shows NEW digit (revealed as old top falls away) */}
      <div
        style={{
          ...cardBase,
          top: 0,
          background: "var(--surface, #1a1a2e)",
          borderRadius: "6px 6px 0 0",
          zIndex: 0,
        }}
      >
        <span style={{ ...digitFont, top: 0, lineHeight: `${H}px` }}>
          {cur}
        </span>
      </div>

      {/* Static bottom: shows OLD digit (covered by new bottom flipping in) */}
      <div
        style={{
          ...cardBase,
          top: HALF + GAP,
          background: "var(--surface, #1a1a2e)",
          borderRadius: "0 0 6px 6px",
          zIndex: 0,
        }}
      >
        <span style={{ ...digitFont, bottom: 0, lineHeight: `${H}px` }}>
          {isFlipping ? prev : cur}
        </span>
      </div>

      {/* ─── ANIMATED TOP HALF: old digit, falls forward ─── */}
      {(phase === "top") && (
        <div
          style={{
            ...cardBase,
            top: 0,
            background: "var(--surface, #1a1a2e)",
            borderRadius: "6px 6px 0 0",
            transformOrigin: "center bottom",
            animation: `flipTop ${DUR / 2}ms ease-in forwards`,
            zIndex: 2,
          }}
        >
          <span style={{ ...digitFont, top: 0, lineHeight: `${H}px` }}>
            {prev}
          </span>
        </div>
      )}

      {/* ─── ANIMATED BOTTOM HALF: new digit, swings up into place ─── */}
      {(phase === "bottom") && (
        <div
          style={{
            ...cardBase,
            top: HALF + GAP,
            background: "var(--surface, #1a1a2e)",
            borderRadius: "0 0 6px 6px",
            transformOrigin: "center top",
            animation: `flipBottom ${DUR / 2}ms ease-out forwards`,
            zIndex: 2,
          }}
        >
          <span style={{ ...digitFont, bottom: 0, lineHeight: `${H}px` }}>
            {cur}
          </span>
        </div>
      )}

      {/* Crease line */}
      <div
        style={{
          position: "absolute",
          top: HALF,
          left: 0,
          width: "100%",
          height: GAP,
          background: "rgba(0,0,0,0.25)",
          zIndex: 3,
        }}
      />
    </div>
  )
}

/* ── Main display ───────────────────────────────────────────── */

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
