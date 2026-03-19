import { formatTime } from "../../../utils/format-time"

interface Props {
  remaining: number
  total: number
  isRunning: boolean
  modeLabel: string
}

function FlipCard({ digit }: { digit: string }) {
  return (
    <div
      style={{
        width: 56,
        height: 72,
        background: "var(--surface, #1a1a2e)",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        overflow: "hidden",
      }}
    >
      <span
        style={{
          fontSize: 44,
          fontWeight: 700,
          color: "var(--text)",
          fontFamily: "'SF Mono', 'Fira Code', 'Courier New', monospace",
          lineHeight: 1,
        }}
      >
        {digit}
      </span>
      {/* Center crease */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "100%",
          height: 1,
          background: "rgba(0,0,0,0.3)",
          transform: "translateY(-50%)",
        }}
      />
    </div>
  )
}

export default function FlipDisplay({
  remaining,
  total,
  isRunning: _isRunning,
  modeLabel: _modeLabel,
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

      {/* Label */}
      <span
        style={{
          fontSize: "0.6rem",
          color: "var(--textMuted)",
          textTransform: "uppercase",
          letterSpacing: "2px",
        }}
      >
        minutes &middot; seconds
      </span>
    </div>
  )
}
