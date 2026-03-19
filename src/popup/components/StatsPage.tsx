import type { StatsData } from "../../types/timer"

interface Props {
  stats: StatsData | null
  sessionEmojis: string[]
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function getWeekData(stats: StatsData) {
  // Build 7-day array ending with today
  const days: { label: string; minutes: number }[] = []
  const today = new Date()

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
    const label = DAY_LABELS[d.getDay()]

    if (i === 0) {
      days.push({ label, minutes: stats.today.focusMinutes })
    } else {
      const hist = stats.history.find((h) => h.date === key)
      days.push({ label, minutes: hist?.focusMinutes ?? 0 })
    }
  }

  return days
}

export default function StatsPage({ stats, sessionEmojis }: Props) {
  if (!stats) {
    return (
      <div style={{ textAlign: "center", padding: 40, color: "var(--textMuted)" }}>
        Loading stats...
      </div>
    )
  }

  const weekData = getWeekData(stats)
  const maxMinutes = Math.max(...weekData.map((d) => d.minutes), 1)

  return (
    <div className="settings-panel">
      {/* Today card */}
      <div className="setting-group">
        <div className="setting-group-title">Today</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
          <span
            style={{
              fontSize: "2.4rem",
              fontWeight: 700,
              color: "var(--text)",
              lineHeight: 1,
            }}
          >
            {stats.today.focusMinutes}
          </span>
          <span style={{ fontSize: "0.8rem", color: "var(--textMuted)" }}>min focused</span>
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {Array.from({ length: stats.today.sessionsCompleted }, (_, i) => (
            <span key={i} style={{ fontSize: 16 }}>
              {sessionEmojis[i % sessionEmojis.length]}
            </span>
          ))}
          {stats.today.sessionsCompleted === 0 && (
            <span style={{ fontSize: "0.75rem", color: "var(--textMuted)" }}>
              No sessions yet
            </span>
          )}
        </div>
      </div>

      {/* Streak card */}
      <div className="setting-group">
        <div className="setting-group-title">Streak</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C10 6 6 8 6 13a6 6 0 0012 0c0-5-4-7-6-11z"
              fill="var(--primary)"
              opacity="0.8"
            />
            <path
              d="M12 9c-1 2-3 3-3 5.5a3 3 0 006 0c0-2.5-2-3.5-3-5.5z"
              fill="var(--accent)"
              opacity="0.9"
            />
          </svg>
          <span style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--text)" }}>
            {stats.currentStreak}
          </span>
          <span style={{ fontSize: "0.8rem", color: "var(--textMuted)" }}>
            {stats.currentStreak === 1 ? "day" : "days"}
          </span>
        </div>
      </div>

      {/* Weekly chart */}
      <div className="setting-group">
        <div className="setting-group-title">This Week</div>
        <svg width="100%" height="120" viewBox="0 0 280 120" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="bar-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="var(--primary)" />
            </linearGradient>
          </defs>
          {weekData.map((day, i) => {
            const barWidth = 28
            const gap = 12
            const x = i * (barWidth + gap) + 10
            const maxH = 80
            const h = maxMinutes > 0 ? (day.minutes / maxMinutes) * maxH : 0
            const y = 90 - h

            return (
              <g key={i}>
                {/* Bar background */}
                <rect
                  x={x}
                  y={10}
                  width={barWidth}
                  height={maxH}
                  rx={4}
                  fill="var(--trackColor)"
                  opacity="0.3"
                />
                {/* Bar fill */}
                {h > 0 && (
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={h}
                    rx={4}
                    fill="url(#bar-grad)"
                  />
                )}
                {/* Day label */}
                <text
                  x={x + barWidth / 2}
                  y={106}
                  textAnchor="middle"
                  fill="var(--textMuted)"
                  fontSize="9"
                  fontFamily="var(--bodyFont)"
                >
                  {day.label}
                </text>
                {/* Minutes label on top */}
                {day.minutes > 0 && (
                  <text
                    x={x + barWidth / 2}
                    y={y - 4}
                    textAnchor="middle"
                    fill="var(--textMuted)"
                    fontSize="8"
                    fontFamily="var(--bodyFont)"
                  >
                    {day.minutes}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {/* All-time row */}
      <div className="setting-group">
        <div className="setting-group-title">All Time</div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)" }}>
              {Math.round(stats.allTimeFocusMinutes / 60 * 10) / 10}
            </div>
            <div style={{ fontSize: "0.7rem", color: "var(--textMuted)" }}>hours</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)" }}>
              {stats.allTimeSessions}
            </div>
            <div style={{ fontSize: "0.7rem", color: "var(--textMuted)" }}>sessions</div>
          </div>
        </div>
      </div>
    </div>
  )
}
