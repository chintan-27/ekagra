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

const lightRayBase: React.CSSProperties = {
  position: "absolute",
  top: -20,
  width: 60,
  height: 200,
  background: "var(--primaryGlow)",
  opacity: 0.04,
  transform: "skewX(-15deg)",
  borderRadius: "0 0 50% 50%",
  ...transition,
};

const bubbleBase: React.CSSProperties = {
  position: "absolute",
  borderRadius: "50%",
  border: "1px solid var(--primaryGlow)",
  opacity: 0.15,
  ...transition,
};

export default function OceanBackground({ mode }: Props) {
  const bubbles = [
    { left: 30, top: 80, size: 14 },
    { left: 85, top: 200, size: 8 },
    { left: 150, top: 120, size: 18 },
    { left: 210, top: 300, size: 10 },
    { left: 270, top: 160, size: 12 },
    { left: 320, top: 250, size: 16 },
    { left: 60, top: 350, size: 6 },
    { left: 240, top: 400, size: 9 },
  ];

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

      {/* Light rays */}
      <div style={{ ...lightRayBase, left: 60 }} />
      <div style={{ ...lightRayBase, left: 180, width: 40, height: 160, opacity: 0.03, transform: "skewX(-10deg)" }} />
      <div style={{ ...lightRayBase, left: 280, width: 50, height: 180, opacity: 0.025, transform: "skewX(-20deg)" }} />

      {/* Bubbles */}
      {bubbles.map((b, i) => (
        <div
          key={i}
          style={{
            ...bubbleBase,
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size,
          }}
        />
      ))}

      {/* Seaweed */}
      <svg
        style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 100 }}
        viewBox="0 0 400 100"
        preserveAspectRatio="none"
      >
        <path
          d="M50,100 C45,70 60,50 50,30 C40,10 55,5 50,0"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
          opacity="0.12"
          style={transition}
        />
        <path
          d="M65,100 C70,75 55,55 65,35 C75,15 60,8 65,0"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          opacity="0.1"
          style={transition}
        />
        <path
          d="M160,100 C155,80 170,60 160,40 C150,20 165,10 160,0"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          opacity="0.08"
          style={transition}
        />
        <path
          d="M310,100 C315,72 300,55 310,35 C320,15 305,8 310,0"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
          opacity="0.1"
          style={transition}
        />
        <path
          d="M325,100 C320,78 335,58 325,38 C315,18 330,5 325,0"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          opacity="0.08"
          style={transition}
        />
      </svg>
    </div>
  );
}
