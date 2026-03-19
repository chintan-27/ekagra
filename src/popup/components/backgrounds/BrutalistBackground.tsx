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

export default function BrutalistBackground({ mode }: Props) {
  return (
    <div style={container}>
      {/* Light flat bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--bgFrom)",
          ...transition,
        }}
      />

      {/* Oversized ghost number watermark */}
      <div
        style={{
          position: "absolute",
          top: -20,
          right: -10,
          fontSize: 200,
          fontWeight: 900,
          lineHeight: 1,
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "var(--primary)",
          opacity: 0.04,
          userSelect: "none",
          ...transition,
        }}
      >
        25
      </div>
    </div>
  );
}
