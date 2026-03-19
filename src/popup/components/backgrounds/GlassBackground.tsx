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
    </div>
  );
}
