import { formatTime } from "../../../utils/format-time"

interface Props {
  remaining: number
  total: number
  isRunning: boolean
  modeLabel: string
}

const circles = [
  { size: 130, top: 15, left: 25 },
  { size: 110, top: 35, left: 50 },
  { size: 120, top: 10, left: 50 },
  { size: 100, top: 45, left: 20 },
  { size: 90, top: 30, left: 55 },
]

const opacities = [0.08, 0.12, 0.1, 0.15, 0.18]

export default function BloomDisplay({
  remaining,
  total: _total,
  isRunning,
  modeLabel,
}: Props) {
  return (
    <div
      style={{
        position: "relative",
        width: 190,
        height: 190,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Circles container */}
      <div
        className={isRunning ? "bloom-pulse" : ""}
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
      </div>
    </div>
  )
}
