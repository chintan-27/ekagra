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

const waveSvg: React.CSSProperties = {
  position: "absolute",
  left: 0,
  width: "100%",
  transition: "all 0.6s ease",
};

const catBody: React.CSSProperties = {
  position: "absolute",
  bottom: 12,
  width: 20,
  height: 14,
  borderRadius: "50%",
  background: "var(--primary)",
  opacity: 0.12,
  transition: "all 0.6s ease",
};

const catHead: React.CSSProperties = {
  position: "absolute",
  bottom: 22,
  width: 10,
  height: 10,
  borderRadius: "50%",
  background: "var(--primary)",
  opacity: 0.12,
  transition: "all 0.6s ease",
};

const earBase: React.CSSProperties = {
  position: "absolute",
  width: 0,
  height: 0,
  borderLeft: "3px solid transparent",
  borderRight: "3px solid transparent",
  borderBottom: "6px solid var(--primary)",
  opacity: 0.12,
  transition: "all 0.6s ease",
};

export default function SunriseBackground({ mode }: Props) {
  return (
    <div style={container}>
      {/* Full-screen gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, var(--bgFrom), var(--bgVia), var(--bgTo))",
          transition: "all 0.6s ease",
        }}
      />

      {/* Wave layer 1 */}
      <svg style={{ ...waveSvg, bottom: 0, height: 80 }} viewBox="0 0 400 80" preserveAspectRatio="none">
        <path
          d="M0,40 C80,20 160,60 240,35 C320,10 360,50 400,30 L400,80 L0,80 Z"
          fill="rgba(255,255,255,0.08)"
        />
      </svg>

      {/* Wave layer 2 */}
      <svg style={{ ...waveSvg, bottom: 0, height: 60 }} viewBox="0 0 400 60" preserveAspectRatio="none">
        <path
          d="M0,30 C60,45 140,15 220,35 C300,55 360,20 400,40 L400,60 L0,60 Z"
          fill="rgba(255,255,255,0.06)"
        />
      </svg>

      {/* Wave layer 3 */}
      <svg style={{ ...waveSvg, bottom: 0, height: 45 }} viewBox="0 0 400 45" preserveAspectRatio="none">
        <path
          d="M0,25 C100,10 200,35 300,20 C350,12 380,28 400,22 L400,45 L0,45 Z"
          fill="rgba(255,255,255,0.04)"
        />
      </svg>

      {/* Cat 1 */}
      <div style={{ ...catBody, left: 40 }} />
      <div style={{ ...catHead, left: 45 }} />
      <div style={{ ...earBase, left: 45, bottom: 31 }} />
      <div style={{ ...earBase, left: 51, bottom: 31 }} />

      {/* Cat 2 */}
      <div style={{ ...catBody, right: 55, left: "auto" }} />
      <div style={{ ...catHead, right: 60, left: "auto" }} />
      <div style={{ ...earBase, right: 60, left: "auto", bottom: 31 }} />
      <div style={{ ...earBase, right: 54, left: "auto", bottom: 31 }} />
    </div>
  );
}
