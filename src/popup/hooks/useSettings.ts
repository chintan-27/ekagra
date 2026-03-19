import { useEffect, useState } from "react"
import type { TimerSettings } from "../../types/timer"
import { DEFAULT_SETTINGS } from "../../utils/constants"

export function useSettings() {
  const [settings, setSettings] = useState<TimerSettings>(DEFAULT_SETTINGS)

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "GET_STATE" }, (response) => {
      if (response?.state?.settings) setSettings(response.state.settings)
    })
  }, [])

  const updateSettings = (partial: Partial<TimerSettings>) => {
    chrome.runtime.sendMessage(
      { type: "UPDATE_SETTINGS", settings: partial },
      (response) => {
        if (response?.state?.settings) setSettings(response.state.settings)
      }
    )
  }

  return { settings, updateSettings }
}
