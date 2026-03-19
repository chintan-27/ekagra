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

export default function CoralBackground({ mode }: Props) {
  return (
    <div style={container}>
      {/* Coral/pink gradient bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, var(--bgFrom), var(--bgVia), var(--bgTo))",
          ...transition,
        }}
      />

      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Abstract floral circles — top area */}
        <circle
          cx="280"
          cy="60"
          r="50"
          fill="white"
          opacity="0.06"
          style={transition}
        />
        <circle
          cx="310"
          cy="90"
          r="35"
          fill="var(--accent)"
          opacity="0.1"
          style={transition}
        />
        <circle
          cx="250"
          cy="85"
          r="40"
          fill="white"
          opacity="0.05"
          style={transition}
        />
        <circle
          cx="295"
          cy="40"
          r="25"
          fill="var(--primary)"
          opacity="0.08"
          style={transition}
        />

        {/* Subtle wavy line */}
        <path
          d="M0,250 C80,230 160,270 240,245 C320,220 360,260 400,240"
          fill="none"
          stroke="white"
          strokeWidth="1"
          opacity="0.08"
        />

        {/* Organic coral/amoeba blob outlines */}
        <path
          d="M60,380 C40,350 70,310 110,320 C150,330 160,290 140,270 C120,250 140,220 170,240 C200,260 220,240 200,280 C180,320 210,360 170,380 C130,400 80,410 60,380Z"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1.2"
          opacity="0.07"
          style={transition}
        />
        <path
          d="M300,350 C280,320 310,290 340,310 C370,330 390,300 370,280 C350,260 370,240 390,260 C400,275 400,330 380,360 C360,390 320,390 300,350Z"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1"
          opacity="0.06"
          style={transition}
        />
        <path
          d="M30,150 C20,120 50,100 80,115 C110,130 130,105 115,85 C100,65 120,45 145,60 C170,75 165,110 145,130 C125,150 50,180 30,150Z"
          fill="none"
          stroke="white"
          strokeWidth="0.8"
          opacity="0.05"
          style={transition}
        />

        {/* Floating dots — varied sizes and opacities */}
        <circle cx="50" cy="70" r="3" fill="var(--primary)" opacity="0.1" style={transition} />
        <circle cx="150" cy="130" r="2" fill="white" opacity="0.08" />
        <circle cx="340" cy="180" r="4" fill="var(--accent)" opacity="0.07" style={transition} />
        <circle cx="80" cy="240" r="2.5" fill="white" opacity="0.06" />
        <circle cx="200" cy="330" r="3.5" fill="var(--primary)" opacity="0.09" style={transition} />
        <circle cx="370" cy="420" r="2" fill="white" opacity="0.07" />
        <circle cx="120" cy="450" r="3" fill="var(--accent)" opacity="0.08" style={transition} />
        <circle cx="260" cy="160" r="1.5" fill="white" opacity="0.1" />
        <circle cx="320" cy="460" r="2.5" fill="var(--primary)" opacity="0.06" style={transition} />
        <circle cx="180" cy="50" r="2" fill="var(--accent)" opacity="0.05" style={transition} />

        {/* Gentle sine wave pattern */}
        <path
          d="M0,400 C50,385 100,415 150,400 C200,385 250,415 300,400 C350,385 380,415 400,400"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="0.8"
          opacity="0.06"
          style={transition}
        />
        <path
          d="M0,160 C60,148 120,172 180,160 C240,148 300,172 360,160 C380,155 400,162 400,160"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="0.6"
          opacity="0.05"
          style={transition}
        />

        {/* Bubble clusters */}
        <g opacity="0.07" style={transition}>
          <circle cx="350" cy="130" r="5" fill="none" stroke="white" strokeWidth="0.6" />
          <circle cx="360" cy="122" r="3" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="343" cy="120" r="4" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="355" cy="137" r="2.5" fill="none" stroke="white" strokeWidth="0.4" />
        </g>
        <g opacity="0.06" style={transition}>
          <circle cx="70" cy="320" r="6" fill="none" stroke="var(--primary)" strokeWidth="0.6" />
          <circle cx="82" cy="312" r="3.5" fill="none" stroke="var(--primary)" strokeWidth="0.5" />
          <circle cx="60" cy="310" r="4" fill="none" stroke="var(--primary)" strokeWidth="0.5" />
        </g>
        <g opacity="0.05" style={transition}>
          <circle cx="220" cy="440" r="5" fill="none" stroke="var(--accent)" strokeWidth="0.6" />
          <circle cx="232" cy="434" r="3" fill="none" stroke="var(--accent)" strokeWidth="0.5" />
          <circle cx="214" cy="432" r="3.5" fill="none" stroke="var(--accent)" strokeWidth="0.5" />
          <circle cx="226" cy="448" r="2" fill="none" stroke="var(--accent)" strokeWidth="0.4" />
        </g>
      </svg>
    </div>
  );
}
