import { formatTime } from "../../utils/format-time"

interface Props {
  remaining: number
  total: number
}

const SIZE = 200
const STROKE = 8
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function TimerDisplay({ remaining, total }: Props) {
  const progress = total > 0 ? Math.max(0, Math.min(1, remaining / total)) : 1
  const offset = CIRCUMFERENCE * (1 - progress)

  return (
    <div className="timer-display">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="var(--progressTrack)"
          strokeWidth={STROKE}
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="var(--progressFill)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          style={{ transition: "stroke 0.6s ease" }}
        />
      </svg>
      <span className="timer-text">{formatTime(remaining)}</span>
    </div>
  )
}
