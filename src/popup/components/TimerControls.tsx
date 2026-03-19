interface Props {
  isRunning: boolean
  onStart: () => void
  onPause: () => void
  onReset: () => void
  onSkip: () => void
  onGoBack: () => void
}

export default function TimerControls({ isRunning, onStart, onPause, onReset, onSkip, onGoBack }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div className="timer-controls">
        <button className="btn-ctrl" onClick={onGoBack} title="Go Back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="19 20 9 12 19 4 19 20" />
            <line x1="5" y1="19" x2="5" y2="5" />
          </svg>
        </button>

        <button
          className="btn-play"
          onClick={isRunning ? onPause : onStart}
          title={isRunning ? "Pause" : "Start"}
        >
          {isRunning ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          )}
        </button>

        <button className="btn-ctrl" onClick={onSkip} title="Skip">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 4 15 12 5 20 5 4" />
            <line x1="19" y1="5" x2="19" y2="19" />
          </svg>
        </button>
      </div>

      <button
        onClick={onReset}
        title="Reset"
        style={{
          background: "none",
          border: "none",
          color: "var(--textMuted)",
          fontSize: "0.65rem",
          fontFamily: "var(--bodyFont)",
          fontWeight: 500,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "2px 8px",
          borderRadius: 6,
          transition: "color 0.2s ease",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 4v6h6" />
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
        Reset
      </button>
    </div>
  )
}
