import { useEffect, useRef, useState } from "react"
import type { TimerMode, TimerState } from "../../types/timer"
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
  useEffect(() => {
    if (!state.isRunning) {
      setRemaining(computeRemaining(state))
      return
    }

    const tick = () => {
      const r = state.duration - (Date.now() - state.startTime)
      setRemaining(Math.max(0, r))
      rafRef.current = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(rafRef.current)
  }, [state.isRunning, state.startTime, state.duration, state.mode, state.pausedRemaining, state.settings])

  const send = (msg: object) => {
    chrome.runtime.sendMessage(msg, (response) => {
      if (response?.state) setState(response.state)
    })
  }

  return {
    state,
    remaining,
    start: () => send({ type: "START_TIMER" }),
    pause: () => send({ type: "PAUSE_TIMER" }),
    reset: () => send({ type: "RESET_TIMER" }),
    skip: () => send({ type: "SKIP_SESSION" }),
    setMode: (mode: TimerMode) => send({ type: "SET_MODE", mode }),
  }
}
