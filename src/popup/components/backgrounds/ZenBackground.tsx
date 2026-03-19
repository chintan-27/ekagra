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

const dotBase: React.CSSProperties = {
  position: "absolute",
  borderRadius: "50%",
  background: "var(--primaryGlow)",
  boxShadow: "0 0 4px 1px var(--primaryGlow)",
  ...transition,
};

const dots = [
  { left: 25, top: 40, size: 2 },
  { left: 310, top: 75, size: 3 },
  { left: 180, top: 30, size: 2 },
  { left: 70, top: 180, size: 2 },
  { left: 350, top: 200, size: 3 },
  { left: 140, top: 320, size: 2 },
  { left: 280, top: 380, size: 2 },
  { left: 40, top: 420, size: 3 },
  { left: 220, top: 150, size: 2 },
  { left: 90, top: 290, size: 2 },
];

export default function ZenBackground({ mode }: Props) {
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

      {/* Centered radial glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--primaryGlow) 0%, transparent 70%)",
          opacity: 0.06,
          ...transition,
        }}
      />

      {/* Scattered dots */}
      {dots.map((d, i) => (
        <div
          key={i}
          style={{
            ...dotBase,
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            opacity: 0.4 + (i % 3) * 0.1,
          }}
        />
      ))}
    </div>
  );
}
