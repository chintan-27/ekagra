interface Props {
  isRunning: boolean
  onStart: () => void
  onPause: () => void
  onReset: () => void
  onSkip: () => void
}

export default function TimerControls({ isRunning, onStart, onPause, onReset, onSkip }: Props) {
  return (
    <div className="timer-controls">
      <button className="btn btn-secondary" onClick={onReset} title="Reset">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 1 1 3 6.9" />
          <path d="M3 21V12H12" />
        </svg>
      </button>

      <button
        className="btn btn-primary"
        onClick={isRunning ? onPause : onStart}
      >
        {isRunning ? "Pause" : "Start"}
      </button>

      <button className="btn btn-secondary" onClick={onSkip} title="Skip">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="5 4 15 12 5 20 5 4" />
          <line x1="19" y1="5" x2="19" y2="19" />
        </svg>
      </button>
    </div>
  )
}
