import { formatTime } from "../../../utils/format-time"

interface Props {
  remaining: number
  total: number
  isRunning: boolean
  modeLabel: string
}

const SIZE = 240
const CENTER = SIZE / 2
const MARKER_RADIUS = 105
const ARC_RADIUS = 93
const ARC_CIRCUMFERENCE = 2 * Math.PI * ARC_RADIUS

export default function AnalogDisplay({
  remaining,
  total,
  isRunning: _isRunning,
  modeLabel,
}: Props) {
  const progress = total > 0 ? Math.max(0, Math.min(1, remaining / total)) : 0
  const arcOffset = ARC_CIRCUMFERENCE * (1 - progress)

  // Generate 12 major markers
  const majorMarkers = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180
    const x = CENTER + MARKER_RADIUS * Math.sin(angle)
    const y = CENTER - MARKER_RADIUS * Math.cos(angle)
    const isCardinal = i % 3 === 0
    return { x, y, r: isCardinal ? 3.5 : 2, key: `major-${i}` }
  })

  // Generate 48 minor markers (every 6 degrees, skipping positions occupied by major markers)
  const minorMarkers: { x: number; y: number; key: string }[] = []
  for (let i = 0; i < 60; i++) {
    if (i % 5 === 0) continue // skip major marker positions
    const angle = (i * 6 * Math.PI) / 180
    const x = CENTER + MARKER_RADIUS * Math.sin(angle)
    const y = CENTER - MARKER_RADIUS * Math.cos(angle)
    minorMarkers.push({ x, y, key: `minor-${i}` })
  }

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
      <svg width={SIZE} height={SIZE}>
        <defs>
          <filter id="analog-arc-glow">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="3"
              floodColor="var(--primaryGlow)"
            />
          </filter>
        </defs>

        {/* Minor dot markers */}
        {minorMarkers.map((m) => (
          <circle
            key={m.key}
            cx={m.x}
            cy={m.y}
            r={1}
            fill="var(--trackColor)"
          />
        ))}

        {/* Major dot markers */}
        {majorMarkers.map((m) => (
          <circle
            key={m.key}
            cx={m.x}
            cy={m.y}
            r={m.r}
            fill="var(--trackColor)"
          />
        ))}

        {/* Progress arc track */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={ARC_RADIUS}
          fill="none"
          stroke="var(--trackColor)"
          strokeWidth={3}
          opacity={0.3}
        />

        {/* Progress arc */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={ARC_RADIUS}
          fill="none"
          stroke="var(--primary)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={ARC_CIRCUMFERENCE}
          strokeDashoffset={arcOffset}
          filter="url(#analog-arc-glow)"
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "center",
            transition: "stroke-dashoffset 0.3s ease",
          }}
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
            color: "var(--textMuted)",
            marginTop: 6,
          }}
        >
          {modeLabel}
        </span>
      </div>
    </div>
  )
}
