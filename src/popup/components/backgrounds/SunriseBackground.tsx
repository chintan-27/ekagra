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

      {/* Sun circle — large, faint, upper area */}
      <svg
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "50%", transition: "all 0.6s ease" }}
        viewBox="0 0 400 250"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="sunrise-sun-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />
            <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sunrise-lens-flare" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.12" />
            <stop offset="40%" stopColor="var(--accent)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Sun disc */}
        <circle cx="300" cy="80" r="60" fill="url(#sunrise-sun-glow)" />
        <circle cx="300" cy="80" r="30" fill="var(--accent)" opacity="0.12" />

        {/* Lens flare */}
        <circle cx="260" cy="120" r="20" fill="url(#sunrise-lens-flare)" />

        {/* Cloud wisp 1 */}
        <g opacity="0.08">
          <ellipse cx="90" cy="60" rx="35" ry="10" fill="white" />
          <ellipse cx="115" cy="55" rx="25" ry="8" fill="white" />
          <ellipse cx="70" cy="57" rx="20" ry="7" fill="white" />
        </g>

        {/* Cloud wisp 2 */}
        <g opacity="0.06">
          <ellipse cx="220" cy="90" rx="30" ry="9" fill="white" />
          <ellipse cx="245" cy="86" rx="22" ry="7" fill="white" />
          <ellipse cx="200" cy="87" rx="18" ry="6" fill="white" />
        </g>

        {/* Cloud wisp 3 */}
        <g opacity="0.05">
          <ellipse cx="150" cy="110" rx="25" ry="7" fill="white" />
          <ellipse cx="170" cy="107" rx="18" ry="6" fill="white" />
        </g>

        {/* Bird silhouettes */}
        <g stroke="var(--primary)" fill="none" strokeWidth="1.2" opacity="0.1">
          <path d="M120,40 Q124,35 128,40 Q132,35 136,40" />
          <path d="M155,55 Q158,51 161,55 Q164,51 167,55" />
          <path d="M180,35 Q183,31 186,35 Q189,31 192,35" />
          <path d="M100,65 Q103,61 106,65 Q109,61 112,65" />
        </g>
      </svg>

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
