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

      {/* SVG overlay: stars, mountains, aurora bands, shimmer */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 400 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="aurora-band-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="30%" stopColor="var(--primary)" stopOpacity="0.12" />
            <stop offset="70%" stopColor="var(--accent)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="aurora-band-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="25%" stopColor="var(--accent)" stopOpacity="0.08" />
            <stop offset="60%" stopColor="var(--primary)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="aurora-band-3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="40%" stopColor="var(--primary)" stopOpacity="0.06" />
            <stop offset="80%" stopColor="var(--accent)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Star field — 20 tiny dots scattered across upper area */}
        <g fill="white">
          <circle cx="25" cy="30" r="0.8" opacity="0.3" />
          <circle cx="75" cy="55" r="1" opacity="0.25" />
          <circle cx="120" cy="20" r="0.7" opacity="0.35" />
          <circle cx="155" cy="80" r="0.9" opacity="0.2" />
          <circle cx="200" cy="15" r="1.1" opacity="0.3" />
          <circle cx="240" cy="60" r="0.8" opacity="0.25" />
          <circle cx="280" cy="35" r="1" opacity="0.35" />
          <circle cx="310" cy="90" r="0.7" opacity="0.2" />
          <circle cx="350" cy="25" r="0.9" opacity="0.3" />
          <circle cx="385" cy="70" r="0.8" opacity="0.25" />
          <circle cx="50" cy="130" r="0.7" opacity="0.2" />
          <circle cx="95" cy="160" r="1" opacity="0.15" />
          <circle cx="170" cy="140" r="0.8" opacity="0.2" />
          <circle cx="225" cy="120" r="0.9" opacity="0.18" />
          <circle cx="300" cy="150" r="0.7" opacity="0.15" />
          <circle cx="365" cy="130" r="1" opacity="0.2" />
          <circle cx="40" cy="200" r="0.6" opacity="0.12" />
          <circle cx="130" cy="220" r="0.8" opacity="0.1" />
          <circle cx="260" cy="200" r="0.7" opacity="0.12" />
          <circle cx="340" cy="185" r="0.9" opacity="0.1" />
        </g>

        {/* Aurora band 1 — upper flowing band */}
        <path
          d="M0,120 C60,90 120,140 200,100 C280,60 340,130 400,110"
          fill="none"
          stroke="url(#aurora-band-1)"
          strokeWidth="18"
          opacity="0.5"
          strokeLinecap="round"
        />

        {/* Aurora band 2 — middle band */}
        <path
          d="M0,200 C80,170 150,220 240,180 C330,140 370,210 400,190"
          fill="none"
          stroke="url(#aurora-band-2)"
          strokeWidth="14"
          opacity="0.4"
          strokeLinecap="round"
        />

        {/* Aurora band 3 — lower accent */}
        <path
          d="M0,270 C100,240 180,290 260,250 C340,210 380,265 400,255"
          fill="none"
          stroke="url(#aurora-band-3)"
          strokeWidth="10"
          opacity="0.35"
          strokeLinecap="round"
        />

        {/* Mountain silhouette along bottom */}
        <polygon
          points="0,600 0,520 40,490 80,510 120,460 170,500 210,450 260,480 300,440 340,475 380,455 400,470 400,600"
          fill="var(--primary)"
          opacity="0.08"
        />
        <polygon
          points="0,600 0,540 50,510 100,530 150,490 200,520 250,485 310,510 360,480 400,500 400,600"
          fill="var(--primary)"
          opacity="0.05"
        />

        {/* Shimmer dots — small bright highlights */}
        <g fill="white">
          <circle cx="65" cy="105" r="1.2" opacity="0.4" />
          <circle cx="185" cy="88" r="1" opacity="0.35" />
          <circle cx="290" cy="75" r="1.3" opacity="0.3" />
          <circle cx="135" cy="180" r="1.1" opacity="0.25" />
          <circle cx="320" cy="160" r="1" opacity="0.3" />
          <circle cx="50" cy="250" r="0.9" opacity="0.2" />
          <circle cx="230" cy="240" r="1.2" opacity="0.25" />
          <circle cx="370" cy="220" r="1" opacity="0.2" />
        </g>
      </svg>
    </div>
  );
}
