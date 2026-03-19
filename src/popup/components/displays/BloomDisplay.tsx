import { formatTime } from "../../../utils/format-time"

interface Props {
  remaining: number
  total: number
  isRunning: boolean
  modeLabel: string
  sessionNumber?: number
  totalSessions?: number
}

const circles = [
  { size: 110, top: 12, left: 20 },
  { size: 90, top: 30, left: 42 },
  { size: 100, top: 8, left: 42 },
  { size: 85, top: 40, left: 15 },
  { size: 75, top: 25, left: 50 },
]

const opacities = [0.08, 0.12, 0.1, 0.15, 0.18]

// Each circle gets its own animation with different duration, direction, and scale
const animations = [
  "bloomFloat1 6s ease-in-out infinite",
  "bloomFloat2 5s ease-in-out infinite 0.5s",
  "bloomFloat3 7s ease-in-out infinite 1s",
  "bloomFloat4 5.5s ease-in-out infinite 0.3s",
  "bloomFloat5 6.5s ease-in-out infinite 0.8s",
]

const keyframes = `
  @keyframes bloomFloat1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(6px, -8px) scale(1.05); }
    66% { transform: translate(-4px, 4px) scale(0.97); }
  }
  @keyframes bloomFloat2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-8px, 6px) scale(1.08); }
  }
  @keyframes bloomFloat3 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(5px, 5px) scale(0.95); }
    75% { transform: translate(-6px, -4px) scale(1.06); }
  }
  @keyframes bloomFloat4 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    40% { transform: translate(-5px, -7px) scale(1.04); }
    80% { transform: translate(7px, 3px) scale(0.96); }
  }
  @keyframes bloomFloat5 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(4px, -6px) scale(1.07); }
  }
`

export default function BloomDisplay({
  remaining,
  isRunning,
  modeLabel,
  sessionNumber,
  totalSessions,
}: Props) {
  return (
    <div
      style={{
        position: "relative",
        width: 160,
        height: 160,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <style>{keyframes}</style>

      {/* Circles container */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {circles.map((circle, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: circle.size,
              height: circle.size,
              borderRadius: "50%",
              background: `var(--primary)`,
              opacity: opacities[i],
              top: circle.top,
              left: circle.left,
              animation: isRunning ? animations[i] : "none",
              transition: "opacity 0.6s ease",
            }}
          />
        ))}
      </div>

      {/* Text overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontSize: 36,
            fontWeight: 300,
            color: "var(--text)",
            lineHeight: 1,
          }}
        >
          {formatTime(remaining)}
        </span>
        <span
          style={{
            fontSize: "0.6rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "2px",
            color: "var(--primary)",
            marginTop: 6,
          }}
        >
          {modeLabel}
        </span>
        {sessionNumber != null && totalSessions != null && (
          <span
            style={{
              fontSize: "0.55rem",
              color: "var(--textMuted)",
              marginTop: 4,
            }}
          >
            Session {sessionNumber} of {totalSessions}
          </span>
        )}
      </div>
    </div>
  )
}
