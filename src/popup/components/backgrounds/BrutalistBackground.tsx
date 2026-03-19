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

      {/* SVG overlay: brutalist elements */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 440 620"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Brutalist grid - thick lines forming a grid pattern */}
        <g opacity="0.04" stroke="var(--primary)" strokeWidth="3">
          <line x1="100" y1="0" x2="100" y2="620" />
          <line x1="220" y1="0" x2="220" y2="620" />
          <line x1="340" y1="0" x2="340" y2="620" />
          <line x1="0" y1="155" x2="440" y2="155" />
          <line x1="0" y1="310" x2="440" y2="310" />
          <line x1="0" y1="465" x2="440" y2="465" />
        </g>

        {/* Large rectangles - brutalist blocks */}
        <rect x="30" y="50" width="120" height="80" stroke="var(--primary)" strokeWidth="2" fill="none" opacity="0.04" />
        <rect x="300" y="180" width="100" height="60" stroke="var(--primary)" strokeWidth="2" fill="none" opacity="0.03" />
        <rect x="50" y="400" width="90" height="110" stroke="var(--accent)" strokeWidth="2" fill="none" opacity="0.03" />

        {/* Halftone dot pattern - bottom right corner, decreasing size */}
        <g fill="var(--primary)" opacity="0.06">
          {/* Row 1 (largest) */}
          <circle cx="340" cy="520" r="4" />
          <circle cx="360" cy="520" r="3.5" />
          <circle cx="380" cy="520" r="3" />
          <circle cx="400" cy="520" r="2.5" />
          <circle cx="420" cy="520" r="2" />
          {/* Row 2 */}
          <circle cx="340" cy="540" r="3.5" />
          <circle cx="360" cy="540" r="3" />
          <circle cx="380" cy="540" r="2.5" />
          <circle cx="400" cy="540" r="2" />
          <circle cx="420" cy="540" r="1.5" />
          {/* Row 3 */}
          <circle cx="340" cy="560" r="3" />
          <circle cx="360" cy="560" r="2.5" />
          <circle cx="380" cy="560" r="2" />
          <circle cx="400" cy="560" r="1.5" />
          <circle cx="420" cy="560" r="1" />
          {/* Row 4 */}
          <circle cx="340" cy="580" r="2.5" />
          <circle cx="360" cy="580" r="2" />
          <circle cx="380" cy="580" r="1.5" />
          <circle cx="400" cy="580" r="1" />
          {/* Row 5 (smallest) */}
          <circle cx="340" cy="600" r="2" />
          <circle cx="360" cy="600" r="1.5" />
          <circle cx="380" cy="600" r="1" />
        </g>

        {/* Oversized bracket/brace characters - very faint, large */}
        <text
          x="5"
          y="350"
          fontFamily="monospace"
          fontSize="180"
          fontWeight="300"
          fill="var(--primary)"
          opacity="0.03"
        >
          {"{"}
        </text>
        <text
          x="350"
          y="580"
          fontFamily="monospace"
          fontSize="180"
          fontWeight="300"
          fill="var(--accent)"
          opacity="0.03"
        >
          {"}"}
        </text>
      </svg>
    </div>
  );
}
