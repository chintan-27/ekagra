import type { TimerMode } from "../../../types/timer";

interface Props {
  mode: TimerMode;
}

const container: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 0,
  pointerEvents: "none",
  overflow: "hidden",
};

const transition: React.CSSProperties = {
  transition: "all 0.6s ease",
};

export default function CoralBackground({ mode }: Props) {
  return (
    <div style={container}>
      {/* Coral/pink gradient bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, var(--bgFrom), var(--bgVia), var(--bgTo))",
          ...transition,
        }}
      />

      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Abstract floral circles — top area */}
        <circle
          cx="280"
          cy="60"
          r="50"
          fill="white"
          opacity="0.06"
          style={transition}
        />
        <circle
          cx="310"
          cy="90"
          r="35"
          fill="var(--accent)"
          opacity="0.1"
          style={transition}
        />
        <circle
          cx="250"
          cy="85"
          r="40"
          fill="white"
          opacity="0.05"
          style={transition}
        />
        <circle
          cx="295"
          cy="40"
          r="25"
          fill="var(--primary)"
          opacity="0.08"
          style={transition}
        />

        {/* Subtle wavy line */}
        <path
          d="M0,250 C80,230 160,270 240,245 C320,220 360,260 400,240"
          fill="none"
          stroke="white"
          strokeWidth="1"
          opacity="0.08"
        />
      </svg>
    </div>
  );
}
