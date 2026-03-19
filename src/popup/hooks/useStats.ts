import { useEffect, useState, useCallback } from "react"
import type { StatsData } from "../../types/timer"

export function useStats() {
  const [stats, setStats] = useState<StatsData | null>(null)

  const refresh = useCallback(() => {
    chrome.runtime.sendMessage({ type: "GET_STATS" }, (response) => {
      if (response?.stats) setStats(response.stats)
    })
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { stats, refresh }
}
