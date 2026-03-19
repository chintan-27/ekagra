import type { DailyStats, StatsData } from "../types/timer"

const STATS_STORAGE_KEY = "ekagra_stats"

function getTodayKey(): string {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  return `${yyyy}-${mm}-${dd}`
}

function emptyDay(date: string): DailyStats {
  return { date, focusMinutes: 0, sessionsCompleted: 0, longestStreak: 0 }
}

function defaultStats(): StatsData {
  return {
    today: emptyDay(getTodayKey()),
    history: [],
    allTimeFocusMinutes: 0,
    allTimeSessions: 0,
    currentStreak: 0,
  }
}

export async function getStatsData(): Promise<StatsData> {
  const result = await chrome.storage.local.get(STATS_STORAGE_KEY)
  const raw = result[STATS_STORAGE_KEY] as StatsData | undefined
  if (!raw) return defaultStats()

  // Roll date if today changed since last access
  const todayKey = getTodayKey()
  if (raw.today.date !== todayKey) {
    // Archive previous today into history
    raw.history.unshift(raw.today)
    raw.history = raw.history.slice(0, 7)
    raw.today = emptyDay(todayKey)

    // Check if streak continues (yesterday had sessions)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`
    const hadSessionYesterday = raw.history.some(
      (d) => d.date === yKey && d.sessionsCompleted > 0
    )
    if (!hadSessionYesterday) {
      raw.currentStreak = 0
    }

    await chrome.storage.local.set({ [STATS_STORAGE_KEY]: raw })
  }

  return raw
}

export async function recordFocusSession(durationMs: number): Promise<StatsData> {
  const stats = await getStatsData()
  const minutes = Math.round(durationMs / 60000)

  stats.today.focusMinutes += minutes
  stats.today.sessionsCompleted += 1
  stats.today.longestStreak += 1 // consecutive (reset on skip handled elsewhere if needed)

  stats.allTimeFocusMinutes += minutes
  stats.allTimeSessions += 1

  // If this is the first session today, bump the streak
  if (stats.today.sessionsCompleted === 1) {
    stats.currentStreak += 1
  }

  await chrome.storage.local.set({ [STATS_STORAGE_KEY]: stats })
  return stats
}
