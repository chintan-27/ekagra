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

      {/* SVG overlay: retro elements */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 440 620"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="shootingStarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
          {/* CRT vignette radial gradient */}
          <radialGradient id="crtVignette" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
          </radialGradient>
        </defs>

        {/* Pixel art mountains - blocky stepped polygon */}
        <polygon
          points="0,580 0,540 30,540 30,520 60,520 60,500 90,500 90,480 120,480 120,460 150,460 150,480 180,480 180,500 210,500 210,480 240,480 240,450 270,450 270,430 300,430 300,450 330,450 330,470 360,470 360,490 390,490 390,510 420,510 420,540 440,540 440,580"
          fill="var(--primary)"
          opacity="0.05"
        />

        {/* Retro sun - circle with horizontal stripes */}
        <g opacity="0.07">
          <circle cx="350" cy="80" r="40" fill="var(--accent)" />
          {/* Horizontal stripes cutting through the sun */}
          <rect x="310" y="68" width="80" height="4" fill="var(--bgFrom)" />
          <rect x="310" y="78" width="80" height="5" fill="var(--bgFrom)" />
          <rect x="310" y="89" width="80" height="6" fill="var(--bgFrom)" />
          <rect x="310" y="101" width="80" height="7" fill="var(--bgFrom)" />
        </g>

        {/* Shooting star */}
        <line
          x1="50" y1="100"
          x2="140" y2="70"
          stroke="url(#shootingStarGrad)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="50" cy="100" r="2" fill="var(--accent)" opacity="0.12" />

        {/* Space invader silhouettes - tiny pixel creatures */}
        {/* Invader 1 */}
        <g fill="var(--primary)" opacity="0.06" transform="translate(60, 300)">
          <rect x="4" y="0" width="2" height="2" />
          <rect x="10" y="0" width="2" height="2" />
          <rect x="2" y="2" width="2" height="2" />
          <rect x="6" y="2" width="4" height="2" />
          <rect x="12" y="2" width="2" height="2" />
          <rect x="0" y="4" width="2" height="2" />
          <rect x="4" y="4" width="2" height="2" />
          <rect x="6" y="4" width="4" height="2" />
          <rect x="10" y="4" width="2" height="2" />
          <rect x="14" y="4" width="2" height="2" />
          <rect x="0" y="6" width="16" height="2" />
          <rect x="2" y="8" width="4" height="2" />
          <rect x="10" y="8" width="4" height="2" />
        </g>
        {/* Invader 2 */}
        <g fill="var(--accent)" opacity="0.05" transform="translate(340, 420)">
          <rect x="4" y="0" width="2" height="2" />
          <rect x="10" y="0" width="2" height="2" />
          <rect x="2" y="2" width="2" height="2" />
          <rect x="6" y="2" width="4" height="2" />
          <rect x="12" y="2" width="2" height="2" />
          <rect x="0" y="4" width="2" height="2" />
          <rect x="4" y="4" width="2" height="2" />
          <rect x="6" y="4" width="4" height="2" />
          <rect x="10" y="4" width="2" height="2" />
          <rect x="14" y="4" width="2" height="2" />
          <rect x="0" y="6" width="16" height="2" />
          <rect x="2" y="8" width="4" height="2" />
          <rect x="10" y="8" width="4" height="2" />
        </g>

        {/* CRT vignette - dark edges */}
        <rect x="0" y="0" width="440" height="620" fill="url(#crtVignette)" />
      </svg>
    </div>
  );
}
