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

export default function AnalogBackground({ mode }: Props) {
  return (
    <div style={container}>
      {/* Dark warm bg */}
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
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--primaryGlow) 0%, transparent 70%)",
          opacity: 0.08,
          ...transition,
        }}
      />

      {/* SVG noise texture */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <filter id="analog-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect
          width="100%"
          height="100%"
          filter="url(#analog-noise)"
          opacity="0.03"
        />
      </svg>

      {/* Analog watch SVG overlay */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Faint watch-face numerals positioned around center */}
        <text
          x="200"
          y="100"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--primary)"
          fontSize="22"
          fontFamily="serif"
          opacity="0.06"
          style={transition}
        >
          12
        </text>
        <text
          x="310"
          y="250"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--primary)"
          fontSize="22"
          fontFamily="serif"
          opacity="0.06"
          style={transition}
        >
          3
        </text>
        <text
          x="200"
          y="400"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--primary)"
          fontSize="22"
          fontFamily="serif"
          opacity="0.06"
          style={transition}
        >
          6
        </text>
        <text
          x="90"
          y="250"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--primary)"
          fontSize="22"
          fontFamily="serif"
          opacity="0.06"
          style={transition}
        >
          9
        </text>

        {/* Gear/cog outline 1 — top-right area */}
        <g transform="translate(320, 80)" opacity="0.05" style={transition}>
          <circle cx="0" cy="0" r="28" fill="none" stroke="var(--accent)" strokeWidth="1" />
          <circle cx="0" cy="0" r="20" fill="none" stroke="var(--accent)" strokeWidth="0.6" />
          {/* Gear teeth */}
          <rect x="-3" y="-34" width="6" height="8" fill="var(--accent)" rx="1" />
          <rect x="-3" y="26" width="6" height="8" fill="var(--accent)" rx="1" />
          <rect x="26" y="-3" width="8" height="6" fill="var(--accent)" rx="1" />
          <rect x="-34" y="-3" width="8" height="6" fill="var(--accent)" rx="1" />
          <rect x="17" y="-23" width="6" height="8" fill="var(--accent)" rx="1" transform="rotate(45 20 -19)" />
          <rect x="-23" y="17" width="6" height="8" fill="var(--accent)" rx="1" transform="rotate(45 -20 21)" />
          <rect x="17" y="17" width="6" height="8" fill="var(--accent)" rx="1" transform="rotate(-45 20 21)" />
          <rect x="-23" y="-23" width="6" height="8" fill="var(--accent)" rx="1" transform="rotate(-45 -20 -19)" />
        </g>

        {/* Gear/cog outline 2 — bottom-left area */}
        <g transform="translate(70, 430)" opacity="0.04" style={transition}>
          <circle cx="0" cy="0" r="22" fill="none" stroke="var(--primary)" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="15" fill="none" stroke="var(--primary)" strokeWidth="0.5" />
          <rect x="-2.5" y="-27" width="5" height="7" fill="var(--primary)" rx="1" />
          <rect x="-2.5" y="20" width="5" height="7" fill="var(--primary)" rx="1" />
          <rect x="20" y="-2.5" width="7" height="5" fill="var(--primary)" rx="1" />
          <rect x="-27" y="-2.5" width="7" height="5" fill="var(--primary)" rx="1" />
          <rect x="13" y="-18" width="5" height="7" fill="var(--primary)" rx="1" transform="rotate(45 15.5 -14.5)" />
          <rect x="-18" y="13" width="5" height="7" fill="var(--primary)" rx="1" transform="rotate(45 -15.5 16.5)" />
        </g>

        {/* Luxury texture — diagonal fine lines */}
        <g opacity="0.03">
          <line x1="0" y1="0" x2="400" y2="500" stroke="var(--accent)" strokeWidth="0.4" />
          <line x1="40" y1="0" x2="400" y2="450" stroke="var(--accent)" strokeWidth="0.4" />
          <line x1="80" y1="0" x2="400" y2="400" stroke="var(--accent)" strokeWidth="0.4" />
          <line x1="120" y1="0" x2="400" y2="350" stroke="var(--accent)" strokeWidth="0.4" />
          <line x1="160" y1="0" x2="400" y2="300" stroke="var(--accent)" strokeWidth="0.4" />
          <line x1="200" y1="0" x2="400" y2="250" stroke="var(--accent)" strokeWidth="0.4" />
          <line x1="240" y1="0" x2="400" y2="200" stroke="var(--accent)" strokeWidth="0.4" />
          <line x1="0" y1="50" x2="360" y2="500" stroke="var(--accent)" strokeWidth="0.4" />
          <line x1="0" y1="100" x2="320" y2="500" stroke="var(--accent)" strokeWidth="0.4" />
          <line x1="0" y1="150" x2="280" y2="500" stroke="var(--accent)" strokeWidth="0.4" />
          <line x1="0" y1="200" x2="240" y2="500" stroke="var(--accent)" strokeWidth="0.4" />
          <line x1="0" y1="250" x2="200" y2="500" stroke="var(--accent)" strokeWidth="0.4" />
        </g>

        {/* Gold filigree corner — top-left */}
        <g opacity="0.06" style={transition}>
          <path
            d="M5,5 C5,5 5,40 20,55 C35,70 55,55 40,35 C25,15 50,5 65,15 C80,25 70,50 55,45"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.8"
          />
          <path
            d="M5,5 C15,20 10,45 25,50"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.6"
          />
        </g>

        {/* Gold filigree corner — top-right */}
        <g opacity="0.06" transform="translate(400, 0) scale(-1, 1)" style={transition}>
          <path
            d="M5,5 C5,5 5,40 20,55 C35,70 55,55 40,35 C25,15 50,5 65,15 C80,25 70,50 55,45"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.8"
          />
          <path
            d="M5,5 C15,20 10,45 25,50"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.6"
          />
        </g>

        {/* Gold filigree corner — bottom-left */}
        <g opacity="0.06" transform="translate(0, 500) scale(1, -1)" style={transition}>
          <path
            d="M5,5 C5,5 5,40 20,55 C35,70 55,55 40,35 C25,15 50,5 65,15 C80,25 70,50 55,45"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.8"
          />
          <path
            d="M5,5 C15,20 10,45 25,50"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.6"
          />
        </g>

        {/* Gold filigree corner — bottom-right */}
        <g opacity="0.06" transform="translate(400, 500) scale(-1, -1)" style={transition}>
          <path
            d="M5,5 C5,5 5,40 20,55 C35,70 55,55 40,35 C25,15 50,5 65,15 C80,25 70,50 55,45"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.8"
          />
          <path
            d="M5,5 C15,20 10,45 25,50"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.6"
          />
        </g>
      </svg>
    </div>
  );
}
