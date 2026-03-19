import { formatTime } from "../../utils/format-time"

interface Props {
  remaining: number
  total: number
  isRunning: boolean
  modeLabel: string
}

const SIZE = 240
const STROKE = 10
const RADIUS = (SIZE - STROKE * 2) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function TimerDisplay({ remaining, total, isRunning, modeLabel }: Props) {
  const progress = total > 0 ? Math.max(0, Math.min(1, remaining / total)) : 1
  const offset = CIRCUMFERENCE * (1 - progress)

  return (
    <div className={`timer-display ${isRunning ? "running" : ""}`}>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--gradientStart)" />
            <stop offset="100%" stopColor="var(--gradientEnd)" />
          </linearGradient>
        </defs>

        {/* Track */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="var(--trackColor)"
          strokeWidth={STROKE}
        />

        {/* Progress */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          style={{ transition: "stroke-dashoffset 0.3s ease, stroke 0.6s ease" }}
        />
      </svg>
      <div className="timer-text">
        <span className="timer-time">{formatTime(remaining)}</span>
        <span className="timer-mode-label">{modeLabel}</span>
      </div>
    </div>
  )
}
