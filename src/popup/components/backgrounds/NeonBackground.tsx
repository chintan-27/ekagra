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

export default function NeonBackground({ mode }: Props) {
  return (
    <div style={container}>
      {/* Dark bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, var(--bgFrom), var(--bgTo))",
          ...transition,
        }}
      />

      {/* Grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.04,
          ...transition,
        }}
      />

      {/* Accent glow line at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "linear-gradient(90deg, transparent 0%, var(--primary) 50%, transparent 100%)",
          opacity: 0.6,
          boxShadow: "0 0 8px 2px var(--primaryGlow)",
          ...transition,
        }}
      />

      {/* SVG overlay: neon elements */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 440 620"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Neon sign outlines - triangle */}
        <polygon
          points="80,80 120,30 160,80"
          stroke="var(--primary)"
          strokeWidth="1.2"
          fill="none"
          opacity="0.08"
          filter="url(#neonGlow)"
        />

        {/* Neon sign outlines - hexagon */}
        <polygon
          points="340,120 365,105 390,120 390,150 365,165 340,150"
          stroke="var(--accent)"
          strokeWidth="1.2"
          fill="none"
          opacity="0.07"
          filter="url(#neonGlow)"
        />

        {/* Circuit trace patterns - L-shaped lines connecting dots */}
        <g opacity="0.06" stroke="var(--primary)" strokeWidth="1" fill="var(--primary)">
          {/* Trace 1 */}
          <circle cx="50" cy="200" r="2" />
          <line x1="50" y1="200" x2="50" y2="260" />
          <line x1="50" y1="260" x2="110" y2="260" />
          <circle cx="110" cy="260" r="2" />
          {/* Trace 2 */}
          <circle cx="350" cy="350" r="2" />
          <line x1="350" y1="350" x2="350" y2="400" />
          <line x1="350" y1="400" x2="400" y2="400" />
          <circle cx="400" cy="400" r="2" />
          {/* Trace 3 */}
          <circle cx="300" cy="500" r="2" />
          <line x1="300" y1="500" x2="250" y2="500" />
          <line x1="250" y1="500" x2="250" y2="550" />
          <circle cx="250" cy="550" r="2" />
        </g>

        {/* Scanline effect - horizontal lines across entire area */}
        <g opacity="0.03" stroke="var(--accent)" strokeWidth="0.5">
          {Array.from({ length: 31 }, (_, i) => (
            <line key={i} x1="0" y1={i * 20} x2="440" y2={i * 20} />
          ))}
        </g>

        {/* Glitch blocks - small offset rectangles */}
        <rect x="60" y="420" width="35" height="8" fill="var(--primary)" opacity="0.06" />
        <rect x="68" y="425" width="25" height="6" fill="var(--accent)" opacity="0.04" />
        <rect x="330" y="280" width="40" height="6" fill="var(--primary)" opacity="0.05" />
        <rect x="335" y="284" width="20" height="8" fill="var(--accent)" opacity="0.04" />
        <rect x="150" y="550" width="30" height="7" fill="var(--accent)" opacity="0.05" />
      </svg>
    </div>
  );
}
