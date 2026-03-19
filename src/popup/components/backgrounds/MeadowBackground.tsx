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

export default function MeadowBackground({ mode }: Props) {
  return (
    <div style={container}>
      {/* Sky gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, var(--bgFrom), var(--bgTo))",
          ...transition,
        }}
      />

      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Sun */}
        <circle
          cx="340"
          cy="60"
          r="30"
          fill="var(--accent)"
          opacity="0.35"
          style={transition}
        />

        {/* Cloud 1 */}
        <g opacity="0.15">
          <ellipse cx="80" cy="70" rx="30" ry="12" fill="white" />
          <ellipse cx="100" cy="65" rx="22" ry="10" fill="white" />
          <ellipse cx="65" cy="67" rx="18" ry="9" fill="white" />
        </g>

        {/* Cloud 2 */}
        <g opacity="0.1">
          <ellipse cx="260" cy="100" rx="25" ry="10" fill="white" />
          <ellipse cx="280" cy="96" rx="20" ry="8" fill="white" />
          <ellipse cx="248" cy="97" rx="15" ry="7" fill="white" />
        </g>

        {/* Mountain range - back */}
        <polygon
          points="0,350 80,220 180,310 260,200 400,340 400,400 0,400"
          fill="var(--primary)"
          opacity="0.08"
          style={transition}
        />

        {/* Mountain range - front */}
        <polygon
          points="0,380 120,260 200,330 320,250 400,360 400,420 0,420"
          fill="var(--primary)"
          opacity="0.06"
          style={transition}
        />

        {/* Rolling hill 1 */}
        <ellipse cx="100" cy="480" rx="200" ry="60" fill="var(--accent)" opacity="0.12" style={transition} />

        {/* Rolling hill 2 */}
        <ellipse cx="300" cy="490" rx="180" ry="50" fill="var(--primary)" opacity="0.1" style={transition} />

        {/* Rolling hill 3 */}
        <ellipse cx="200" cy="500" rx="250" ry="55" fill="var(--accent)" opacity="0.08" style={transition} />

        {/* Tree 1 */}
        <g opacity="0.15" style={transition}>
          <rect x="135" y="400" width="6" height="20" rx="2" fill="var(--primary)" />
          <circle cx="138" cy="392" r="14" fill="var(--accent)" />
        </g>

        {/* Tree 2 */}
        <g opacity="0.12" style={transition}>
          <rect x="295" y="410" width="5" height="16" rx="2" fill="var(--primary)" />
          <circle cx="297" cy="404" r="11" fill="var(--accent)" />
        </g>

        {/* Pine tree 1 */}
        <g opacity="0.13" style={transition}>
          <rect x="57" y="415" width="4" height="14" rx="1" fill="var(--primary)" />
          <polygon points="59,380 45,415 73,415" fill="var(--primary)" />
          <polygon points="59,390 48,410 70,410" fill="var(--primary)" />
        </g>

        {/* Pine tree 2 */}
        <g opacity="0.1" style={transition}>
          <rect x="348" y="405" width="4" height="12" rx="1" fill="var(--primary)" />
          <polygon points="350,375 338,405 362,405" fill="var(--primary)" />
          <polygon points="350,383 341,400 359,400" fill="var(--primary)" />
        </g>

        {/* Pine tree 3 — small, distant */}
        <g opacity="0.07" style={transition}>
          <rect x="218" y="390" width="3" height="10" rx="1" fill="var(--primary)" />
          <polygon points="219,365 210,390 228,390" fill="var(--primary)" />
        </g>

        {/* Winding path through hills */}
        <path
          d="M160,500 C170,480 130,470 150,460 C170,450 200,455 190,445 C180,435 210,420 230,430 C250,440 260,435 280,425"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="3"
          opacity="0.06"
          strokeLinecap="round"
          style={transition}
        />

        {/* Flowers on foreground hill */}
        <g opacity="0.15" style={transition}>
          {/* Flower 1 */}
          <line x1="80" y1="472" x2="80" y2="462" stroke="var(--primary)" strokeWidth="1" />
          <circle cx="80" cy="460" r="3" fill="var(--accent)" />

          {/* Flower 2 */}
          <line x1="105" y1="468" x2="105" y2="458" stroke="var(--primary)" strokeWidth="1" />
          <circle cx="105" cy="456" r="2.5" fill="var(--primary)" />

          {/* Flower 3 */}
          <line x1="130" y1="470" x2="130" y2="460" stroke="var(--primary)" strokeWidth="1" />
          <circle cx="130" cy="458" r="3" fill="var(--accent)" />

          {/* Flower 4 */}
          <line x1="250" y1="478" x2="250" y2="468" stroke="var(--primary)" strokeWidth="1" />
          <circle cx="250" cy="466" r="2.5" fill="var(--accent)" />

          {/* Flower 5 */}
          <line x1="280" y1="475" x2="280" y2="465" stroke="var(--primary)" strokeWidth="1" />
          <circle cx="280" cy="463" r="3" fill="var(--primary)" />

          {/* Flower 6 */}
          <line x1="320" y1="480" x2="320" y2="470" stroke="var(--primary)" strokeWidth="1" />
          <circle cx="320" cy="468" r="2" fill="var(--accent)" />
        </g>

        {/* Butterfly */}
        <g opacity="0.14" style={transition}>
          <ellipse cx="178" cy="350" rx="5" ry="3.5" fill="var(--accent)" transform="rotate(-20 178 350)" />
          <ellipse cx="184" cy="350" rx="5" ry="3.5" fill="var(--accent)" transform="rotate(20 184 350)" />
          <ellipse cx="179" cy="353" rx="3.5" ry="2.5" fill="var(--primary)" transform="rotate(-15 179 353)" />
          <ellipse cx="183" cy="353" rx="3.5" ry="2.5" fill="var(--primary)" transform="rotate(15 183 353)" />
          <line x1="181" y1="347" x2="181" y2="356" stroke="var(--primary)" strokeWidth="0.8" />
        </g>
      </svg>
    </div>
  );
}
