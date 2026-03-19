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

const blobBase: React.CSSProperties = {
  position: "absolute",
  borderRadius: "50%",
  filter: "blur(40px)",
  ...transition,
};

export default function AuroraBackground({ mode }: Props) {
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

      {/* Aurora blob 1 — top-left */}
      <div
        style={{
          ...blobBase,
          top: -40,
          left: -30,
          width: 220,
          height: 180,
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          opacity: 0.25,
        }}
      />

      {/* Aurora blob 2 — top-right */}
      <div
        style={{
          ...blobBase,
          top: 30,
          right: -40,
          width: 200,
          height: 160,
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          opacity: 0.2,
        }}
      />

      {/* Aurora blob 3 — center */}
      <div
        style={{
          ...blobBase,
          top: "35%",
          left: "20%",
          width: 250,
          height: 200,
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          opacity: 0.15,
        }}
      />

      {/* Aurora blob 4 — bottom */}
      <div
        style={{
          ...blobBase,
          bottom: -20,
          left: "40%",
          width: 180,
          height: 150,
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          opacity: 0.18,
        }}
      />
    </div>
  );
}
