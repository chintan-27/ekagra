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

const stars = [
  { left: 35, top: 25 },
  { left: 120, top: 60 },
  { left: 280, top: 40 },
  { left: 350, top: 90 },
  { left: 60, top: 160 },
  { left: 200, top: 130 },
  { left: 310, top: 200 },
  { left: 150, top: 280 },
  { left: 80, top: 370 },
  { left: 260, top: 350 },
];

export default function RetroBackground({ mode }: Props) {
  return (
    <div style={container}>
      {/* Dark purple bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, var(--bgFrom), var(--bgTo))",
          ...transition,
        }}
      />

      {/* Scanlines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
          opacity: 0.4,
        }}
      />

      {/* Star dots */}
      {stars.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: s.left,
            top: s.top,
            width: 2,
            height: 2,
            borderRadius: "50%",
            background: "white",
            boxShadow: "0 0 2px 0.5px rgba(255,255,255,0.6)",
            opacity: 0.3 + (i % 4) * 0.1,
          }}
        />
      ))}
    </div>
  );
}
