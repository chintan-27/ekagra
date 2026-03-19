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

const lightRayBase: React.CSSProperties = {
  position: "absolute",
  top: -20,
  width: 60,
  height: 200,
  background: "var(--primaryGlow)",
  opacity: 0.04,
  transform: "skewX(-15deg)",
  borderRadius: "0 0 50% 50%",
  ...transition,
};

const bubbleBase: React.CSSProperties = {
  position: "absolute",
  borderRadius: "50%",
  border: "1px solid var(--primaryGlow)",
  opacity: 0.15,
  ...transition,
};

export default function OceanBackground({ mode }: Props) {
  const bubbles = [
    { left: 30, top: 80, size: 14 },
    { left: 85, top: 200, size: 8 },
    { left: 150, top: 120, size: 18 },
    { left: 210, top: 300, size: 10 },
    { left: 270, top: 160, size: 12 },
    { left: 320, top: 250, size: 16 },
    { left: 60, top: 350, size: 6 },
    { left: 240, top: 400, size: 9 },
  ];

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

      {/* Light rays */}
      <div style={{ ...lightRayBase, left: 60 }} />
      <div style={{ ...lightRayBase, left: 180, width: 40, height: 160, opacity: 0.03, transform: "skewX(-10deg)" }} />
      <div style={{ ...lightRayBase, left: 280, width: 50, height: 180, opacity: 0.025, transform: "skewX(-20deg)" }} />

      {/* Bubbles */}
      {bubbles.map((b, i) => (
        <div
          key={i}
          style={{
            ...bubbleBase,
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size,
          }}
        />
      ))}

      {/* Light caustics at top */}
      <svg
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "40%" }}
        viewBox="0 0 400 200"
        preserveAspectRatio="none"
      >
        <g stroke="var(--primaryGlow)" strokeWidth="0.8" opacity="0.04" fill="none">
          <path d="M20,10 L80,60 L30,110 L90,160" />
          <path d="M60,0 L120,50 L70,100 L130,150 L80,200" />
          <path d="M140,5 L200,55 L150,105 L210,155" />
          <path d="M180,0 L240,50 L190,100 L250,150 L200,200" />
          <path d="M260,10 L320,60 L270,110 L330,160" />
          <path d="M300,0 L360,50 L310,100 L370,150" />
          <path d="M350,5 L400,40" />
          <path d="M0,30 L60,80 L10,130" />
        </g>
      </svg>

      {/* Fish silhouettes */}
      <svg
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        viewBox="0 0 400 600"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Fish 1 — swimming right */}
        <g opacity="0.1" style={transition}>
          <ellipse cx="90" cy="240" rx="12" ry="5" fill="var(--primary)" />
          <polygon points="70,240 64,234 64,246" fill="var(--primary)" />
          <circle cx="97" cy="238" r="1" fill="var(--bgFrom)" />
        </g>

        {/* Fish 2 — swimming left */}
        <g opacity="0.08" style={transition}>
          <ellipse cx="280" cy="340" rx="10" ry="4" fill="var(--accent)" />
          <polygon points="298,340 303,335 303,345" fill="var(--accent)" />
          <circle cx="274" cy="338" r="1" fill="var(--bgFrom)" />
        </g>

        {/* Fish 3 — swimming right */}
        <g opacity="0.07" style={transition}>
          <ellipse cx="190" cy="180" rx="8" ry="3.5" fill="var(--primary)" />
          <polygon points="175,180 170,176 170,184" fill="var(--primary)" />
          <circle cx="195" cy="178.5" r="0.8" fill="var(--bgFrom)" />
        </g>

        {/* Jellyfish */}
        <g opacity="0.09" style={transition}>
          <ellipse cx="340" cy="200" rx="14" ry="10" fill="var(--accent)" />
          <path d="M328,208 C330,225 326,235 328,250" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.8" />
          <path d="M334,210 C333,228 336,240 334,255" fill="none" stroke="var(--accent)" strokeWidth="0.8" opacity="0.7" />
          <path d="M340,210 C341,230 338,242 340,258" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.8" />
          <path d="M346,210 C348,226 345,238 347,252" fill="none" stroke="var(--accent)" strokeWidth="0.8" opacity="0.7" />
          <path d="M352,208 C350,222 353,234 351,248" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.8" />
        </g>

        {/* Coral formation 1 — left */}
        <g opacity="0.1" style={transition}>
          <path d="M70,580 C65,560 75,550 70,540 C65,530 80,520 75,510" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
          <path d="M80,580 C85,565 78,555 83,545" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="75" cy="508" r="4" fill="var(--accent)" opacity="0.6" />
          <circle cx="83" cy="543" r="3" fill="var(--accent)" opacity="0.5" />
        </g>

        {/* Coral formation 2 — right */}
        <g opacity="0.08" style={transition}>
          <path d="M340,580 C345,562 335,552 340,540 C345,528 338,518 342,508" fill="none" stroke="var(--primary)" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M352,580 C348,568 355,558 350,548 C345,538 352,528 348,520" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="342" cy="506" r="3.5" fill="var(--primary)" opacity="0.5" />
          <circle cx="348" cy="518" r="3" fill="var(--primary)" opacity="0.4" />
        </g>

        {/* Coral formation 3 — center */}
        <g opacity="0.06" style={transition}>
          <path d="M200,580 C195,565 205,555 198,545 C191,535 204,528 200,520" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="200" cy="518" r="3" fill="var(--accent)" opacity="0.5" />
        </g>
      </svg>

      {/* Seaweed */}
      <svg
        style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 100 }}
        viewBox="0 0 400 100"
        preserveAspectRatio="none"
      >
        <path
          d="M50,100 C45,70 60,50 50,30 C40,10 55,5 50,0"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
          opacity="0.12"
          style={transition}
        />
        <path
          d="M65,100 C70,75 55,55 65,35 C75,15 60,8 65,0"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          opacity="0.1"
          style={transition}
        />
        <path
          d="M160,100 C155,80 170,60 160,40 C150,20 165,10 160,0"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          opacity="0.08"
          style={transition}
        />
        <path
          d="M310,100 C315,72 300,55 310,35 C320,15 305,8 310,0"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
          opacity="0.1"
          style={transition}
        />
        <path
          d="M325,100 C320,78 335,58 325,38 C315,18 330,5 325,0"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          opacity="0.08"
          style={transition}
        />
      </svg>
    </div>
  );
}
