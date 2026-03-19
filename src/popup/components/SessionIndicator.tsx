interface Props {
  completed: number
  total: number
}

export default function SessionIndicator({ completed, total }: Props) {
  return (
    <div className="session-indicator">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`session-dot ${i < completed % total ? "completed" : ""}`}
        />
      ))}
    </div>
  )
}
