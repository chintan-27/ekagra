interface Props {
  completed: number
  total: number
  isRunning: boolean
  emojis?: string[]
}

export default function SessionIndicator({ completed, total, isRunning, emojis }: Props) {
  const current = completed % total
  return (
    <div className="session-indicator">
      {Array.from({ length: total }, (_, i) => {
        const isCompleted = i < current
        const isActive = i === current && isRunning
        return (
          <div key={i} className="session-pip">
            {emojis && emojis.length > 0 ? (
              <span style={{
                fontSize: "14px",
                opacity: isCompleted || isActive ? 1 : 0.3,
                filter: isActive ? `drop-shadow(0 0 6px var(--primaryGlow))` : undefined,
                transition: "all 0.4s ease",
              }}>
                {emojis[i % emojis.length]}
              </span>
            ) : (
              <span
                className={`session-dot${isCompleted ? " completed" : ""}${isActive ? " active" : ""}`}
              />
            )}
            <span className={`session-label${isActive ? " active" : ""}`}>
              {i + 1}
            </span>
          </div>
        )
      })}
    </div>
  )
}
