import type { TimerDisplay } from "../../../types/timer"
import RingDisplay from "./RingDisplay"
import FlipDisplay from "./FlipDisplay"
import BigNumberDisplay from "./BigNumberDisplay"
import BloomDisplay from "./BloomDisplay"
import AnalogDisplay from "./AnalogDisplay"

interface Props {
  displayType: TimerDisplay
  remaining: number
  total: number
  isRunning: boolean
  modeLabel: string
}

interface DisplayProps {
  remaining: number
  total: number
  isRunning: boolean
  modeLabel: string
}

const displays: Record<TimerDisplay, React.FC<DisplayProps>> = {
  ring: RingDisplay,
  flip: FlipDisplay,
  bigNumber: BigNumberDisplay,
  bloom: BloomDisplay,
  analog: AnalogDisplay,
}

export default function TimerDisplaySwitch({ displayType, ...props }: Props) {
  const Display = displays[displayType] ?? RingDisplay
  return <Display {...props} />
}
