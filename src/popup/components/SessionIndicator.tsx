interface Props {
  completed: number
  total: number
  isRunning: boolean
}

export default function SessionIndicator({ completed, total, isRunning }: Props) {
  const current = completed % total
  return (
    <div className="session-indicator">
      {Array.from({ length: total }, (_, i) => {
        const isCompleted = i < current
        const isActive = i === current && isRunning
        return (
          <div key={i} className="session-pip">
            <span
              className={`session-dot${isCompleted ? " completed" : ""}${isActive ? " active" : ""}`}
            />
            <span className={`session-label${isActive ? " active" : ""}`}>
              {i + 1}
            </span>
          </div>
        )
      })}
    </div>
  )
}
