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

const orbBase: React.CSSProperties = {
  position: "absolute",
  borderRadius: "50%",
  ...transition,
};

export default function GlassBackground({ mode }: Props) {
  return (
    <div style={container}>
      {/* Dark gradient bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, var(--bgFrom), var(--bgTo))",
          ...transition,
        }}
      />

      {/* Orb 1 — top-left */}
      <div
        style={{
          ...orbBase,
          top: -60,
          left: -40,
          width: 240,
          height: 240,
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          filter: "blur(35px)",
          opacity: 0.2,
        }}
      />

      {/* Orb 2 — center-right */}
      <div
        style={{
          ...orbBase,
          top: "40%",
          right: -50,
          width: 200,
          height: 200,
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          filter: "blur(40px)",
          opacity: 0.15,
        }}
      />

      {/* Orb 3 — bottom-left */}
      <div
        style={{
          ...orbBase,
          bottom: -40,
          left: "10%",
          width: 220,
          height: 220,
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          filter: "blur(30px)",
          opacity: 0.12,
        }}
      />

      {/* Frosted glass layers — rotated semi-transparent rectangles */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "5%",
          width: 280,
          height: 160,
          background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
          border: "1px solid rgba(255,255,255,0.04)",
          borderRadius: 16,
          transform: "rotate(-8deg)",
          backdropFilter: "blur(1px)",
          ...transition,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          right: "3%",
          width: 250,
          height: 140,
          background: "linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.005))",
          border: "1px solid rgba(255,255,255,0.03)",
          borderRadius: 14,
          transform: "rotate(6deg)",
          backdropFilter: "blur(1px)",
          ...transition,
        }}
      />

      {/* SVG overlay for glass elements */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Light refraction lines — diagonal */}
        <line
          x1="50"
          y1="0"
          x2="250"
          y2="500"
          stroke="white"
          strokeWidth="0.5"
          opacity="0.04"
        />
        <line
          x1="150"
          y1="0"
          x2="350"
          y2="500"
          stroke="var(--primary)"
          strokeWidth="0.6"
          opacity="0.04"
          style={transition}
        />
        <line
          x1="300"
          y1="0"
          x2="100"
          y2="500"
          stroke="var(--accent)"
          strokeWidth="0.5"
          opacity="0.03"
          style={transition}
        />
        <line
          x1="380"
          y1="0"
          x2="180"
          y2="500"
          stroke="white"
          strokeWidth="0.4"
          opacity="0.03"
        />

        {/* Depth blur rings — concentric circles */}
        <circle
          cx="200"
          cy="250"
          r="140"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="0.6"
          opacity="0.04"
          style={transition}
        />
        <circle
          cx="200"
          cy="250"
          r="110"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          opacity="0.03"
        />
        <circle
          cx="200"
          cy="250"
          r="80"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="0.4"
          opacity="0.04"
          style={transition}
        />
        <circle
          cx="200"
          cy="250"
          r="50"
          fill="none"
          stroke="white"
          strokeWidth="0.3"
          opacity="0.03"
        />

        {/* Floating prism triangles */}
        <polygon
          points="100,120 130,170 70,170"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="0.8"
          opacity="0.05"
          transform="rotate(15 100 145)"
          style={transition}
        />
        <polygon
          points="320,80 345,125 295,125"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="0.7"
          opacity="0.04"
          transform="rotate(-10 320 102)"
          style={transition}
        />
        <polygon
          points="280,380 310,430 250,430"
          fill="none"
          stroke="white"
          strokeWidth="0.6"
          opacity="0.04"
          transform="rotate(25 280 405)"
        />
        <polygon
          points="60,350 85,390 35,390"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="0.7"
          opacity="0.03"
          transform="rotate(-20 60 370)"
          style={transition}
        />
      </svg>
    </div>
  );
}
