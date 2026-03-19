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

      {/* SVG overlay: zen garden elements */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 440 620"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Moon - large circle, upper right corner */}
        <circle cx="370" cy="60" r="35" fill="var(--primary)" opacity="0.05" />

        {/* Floating leaf shapes */}
        <g opacity="0.04" stroke="var(--primary)" strokeWidth="1" fill="none">
          <path
            d="M60 150 Q75 130 90 150 Q75 170 60 150 Z"
            transform="rotate(-20 75 150)"
          />
          <path
            d="M320 250 Q335 230 350 250 Q335 270 320 250 Z"
            transform="rotate(15 335 250)"
          />
          <path
            d="M180 450 Q195 430 210 450 Q195 470 180 450 Z"
            transform="rotate(-35 195 450)"
          />
          <path
            d="M100 520 Q115 500 130 520 Q115 540 100 520 Z"
            transform="rotate(25 115 520)"
          />
        </g>

        {/* Zen garden ripple circles - concentric, no fill */}
        <g opacity="0.05" stroke="var(--accent)" strokeWidth="0.8" fill="none">
          <circle cx="220" cy="500" r="25" />
          <circle cx="220" cy="500" r="40" />
          <circle cx="220" cy="500" r="55" />
        </g>

        {/* Bamboo stalks - left side */}
        <g opacity="0.04" stroke="var(--primary)" strokeWidth="2" fill="none">
          {/* Left stalk */}
          <line x1="20" y1="100" x2="20" y2="550" />
          <line x1="15" y1="200" x2="25" y2="200" />
          <line x1="15" y1="330" x2="25" y2="330" />
          <line x1="15" y1="460" x2="25" y2="460" />
          {/* Right stalk */}
          <line x1="420" y1="80" x2="420" y2="580" />
          <line x1="415" y1="180" x2="425" y2="180" />
          <line x1="415" y1="310" x2="425" y2="310" />
          <line x1="415" y1="440" x2="425" y2="440" />
        </g>
      </svg>
    </div>
  );
}
