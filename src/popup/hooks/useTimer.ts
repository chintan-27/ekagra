import { useCallback, useEffect, useRef, useState } from "react"
import type { TimerMode, TimerSettings, TimerState } from "../../types/timer"
import { getDefaultState } from "../../background/storage"
import { computeRemaining } from "../../background/timer-engine"

export function useTimer() {
  const [state, setState] = useState<TimerState>(getDefaultState)
  const [remaining, setRemaining] = useState(0)
  const rafRef = useRef(0)

  // Fetch initial state from service worker
  useEffect(() => {
    chrome.runtime.sendMessage({ type: "GET_STATE" }, (response) => {
      if (response?.state) setState(response.state)
    })
  }, [])

  // Animate countdown display via requestAnimationFrame
  // When remaining hits 0, poll service worker for the transitioned state
  useEffect(() => {
    if (!state.isRunning) {
      setRemaining(computeRemaining(state))
      return
    }

    let pollTimer: ReturnType<typeof setTimeout>
    const tick = () => {
      const r = state.duration - (Date.now() - state.startTime)
      if (r <= 0) {
        setRemaining(0)
        // Session ended — service worker alarm will transition state.
        // Poll for the new state after a short delay to let the alarm fire.
        pollTimer = setTimeout(() => {
          chrome.runtime.sendMessage({ type: "GET_STATE" }, (response) => {
            if (response?.state) setState(response.state)
          })
        }, 500)
        return
      }
      setRemaining(r)
      rafRef.current = requestAnimationFrame(tick)
    }
    tick()
    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(pollTimer)
    }
  }, [state.isRunning, state.startTime, state.duration, state.mode, state.pausedRemaining, state.settings])

  const send = useCallback((msg: object) => {
    chrome.runtime.sendMessage(msg, (response) => {
      if (response?.state) setState(response.state)
    })
  }, [])

  const updateSettings = useCallback((partial: Partial<TimerSettings>) => {
    send({ type: "UPDATE_SETTINGS", settings: partial })
  }, [send])

  return {
    state,
    remaining,
    settings: state.settings,
    start: () => send({ type: "START_TIMER" }),
    pause: () => send({ type: "PAUSE_TIMER" }),
    reset: () => send({ type: "RESET_TIMER" }),
    skip: () => send({ type: "SKIP_SESSION" }),
    goBack: () => send({ type: "GO_BACK" }),
    setMode: (mode: TimerMode) => send({ type: "SET_MODE", mode }),
    updateSettings,
  }
}
