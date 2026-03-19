import { formatTime } from "../../../utils/format-time"

interface Props {
  remaining: number
  total: number
  isRunning: boolean
  modeLabel: string
  sessionNumber?: number
  totalSessions?: number
}

export default function BigNumberDisplay({
  remaining,
  total,
  isRunning,
  modeLabel,
  sessionNumber,
  totalSessions,
}: Props) {
  const progress = total > 0 ? Math.max(0, Math.min(1, 1 - remaining / total)) : 0

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      {/* Big time text */}
      <span
        style={{
          fontSize: 60,
          fontWeight: 800,
          color: "var(--text)",
          letterSpacing: -1,
          lineHeight: 1,
          textShadow: isRunning ? "0 0 20px var(--primaryGlow)" : "none",
          transition: "text-shadow 0.3s ease",
        }}
      >
        {formatTime(remaining)}
      </span>

      {/* Progress bar */}
      <div
        style={{
          width: "70%",
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

      {/* Mode label + progress */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span
          style={{
            fontSize: "0.65rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "2px",
            color: "var(--textMuted)",
          }}
        >
          {modeLabel}
        </span>
        <span
          style={{
            fontSize: "0.6rem",
            color: "var(--textMuted)",
            opacity: 0.7,
          }}
        >
          {Math.round(progress * 100)}%
        </span>
      </div>

      {sessionNumber != null && totalSessions != null && (
        <span
          style={{
            fontSize: "0.55rem",
            color: "var(--textMuted)",
          }}
        >
          Session {sessionNumber} of {totalSessions}
        </span>
      )}
    </div>
  )
}
