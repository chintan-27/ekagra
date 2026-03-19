import { formatTime } from "../../../utils/format-time"

interface Props {
  remaining: number
  total: number
  isRunning: boolean
  modeLabel: string
  sessionNumber?: number
  totalSessions?: number
}

const SIZE = 160
const STROKE_WIDTH = 7
const RADIUS = (SIZE - STROKE_WIDTH) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function RingDisplay({
  remaining,
  total,
  isRunning,
  modeLabel,
  sessionNumber,
  totalSessions,
}: Props) {
  const progress = total > 0 ? Math.max(0, Math.min(1, remaining / total)) : 0
  const offset = CIRCUMFERENCE * (1 - progress)

  return (
    <div
      style={{
        position: "relative",
        width: SIZE,
        height: SIZE,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={SIZE}
        height={SIZE}
        className={isRunning ? "running" : ""}
        style={{ transform: "rotate(-90deg)" }}
      >
        <defs>
          <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--primary)" />
          </linearGradient>
          <filter id="ring-glow">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="4"
              floodColor="var(--primaryGlow)"
            />
          </filter>
        </defs>

        {/* Track */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="var(--trackColor)"
          strokeWidth={STROKE_WIDTH}
        />

        {/* Progress */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="url(#ring-gradient)"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          filter="url(#ring-glow)"
          style={{ transition: "stroke-dashoffset 0.3s ease" }}
        />
      </svg>

      {/* Centered text overlay */}
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
            fontSize: "2.2rem",
            fontWeight: 300,
            color: "var(--text)",
            lineHeight: 1,
          }}
        >
          {formatTime(remaining)}
        </span>
        <span
          style={{
            fontSize: "0.65rem",
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
