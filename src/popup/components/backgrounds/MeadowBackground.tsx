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

export default function MeadowBackground({ mode }: Props) {
  return (
    <div style={container}>
      {/* Sky gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, var(--bgFrom), var(--bgTo))",
          ...transition,
        }}
      />

      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Sun */}
        <circle
          cx="340"
          cy="60"
          r="30"
          fill="var(--accent)"
          opacity="0.35"
          style={transition}
        />

        {/* Cloud 1 */}
        <g opacity="0.15">
          <ellipse cx="80" cy="70" rx="30" ry="12" fill="white" />
          <ellipse cx="100" cy="65" rx="22" ry="10" fill="white" />
          <ellipse cx="65" cy="67" rx="18" ry="9" fill="white" />
        </g>

        {/* Cloud 2 */}
        <g opacity="0.1">
          <ellipse cx="260" cy="100" rx="25" ry="10" fill="white" />
          <ellipse cx="280" cy="96" rx="20" ry="8" fill="white" />
          <ellipse cx="248" cy="97" rx="15" ry="7" fill="white" />
        </g>

        {/* Mountain range - back */}
        <polygon
          points="0,350 80,220 180,310 260,200 400,340 400,400 0,400"
          fill="var(--primary)"
          opacity="0.08"
          style={transition}
        />

        {/* Mountain range - front */}
        <polygon
          points="0,380 120,260 200,330 320,250 400,360 400,420 0,420"
          fill="var(--primary)"
          opacity="0.06"
          style={transition}
        />

        {/* Rolling hill 1 */}
        <ellipse cx="100" cy="480" rx="200" ry="60" fill="var(--accent)" opacity="0.12" style={transition} />

        {/* Rolling hill 2 */}
        <ellipse cx="300" cy="490" rx="180" ry="50" fill="var(--primary)" opacity="0.1" style={transition} />

        {/* Rolling hill 3 */}
        <ellipse cx="200" cy="500" rx="250" ry="55" fill="var(--accent)" opacity="0.08" style={transition} />

        {/* Tree 1 */}
        <g opacity="0.15" style={transition}>
          <rect x="135" y="400" width="6" height="20" rx="2" fill="var(--primary)" />
          <circle cx="138" cy="392" r="14" fill="var(--accent)" />
        </g>

        {/* Tree 2 */}
        <g opacity="0.12" style={transition}>
          <rect x="295" y="410" width="5" height="16" rx="2" fill="var(--primary)" />
          <circle cx="297" cy="404" r="11" fill="var(--accent)" />
        </g>
      </svg>
    </div>
  );
}
