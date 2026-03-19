import type { TimerMode } from "../../types/timer"

const labels: Record<TimerMode, string> = {
  focus: "Focus",
  short_break: "Short Break",
  long_break: "Long Break",
}

interface Props {
  mode: TimerMode
}

export default function ModeLabel({ mode }: Props) {
  return <div className="mode-label">{labels[mode]}</div>
}
