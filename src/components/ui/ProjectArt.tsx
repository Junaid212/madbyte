import type { ArtKind, ArtTheme } from "@/data/projects";

/**
 * Generative, brand-palette artwork used in place of photography.
 * Swap for real project imagery (next/image) once client work exists.
 */
const palettes: Record<ArtTheme, { bg: string; a: string; b: string; c: string }> = {
  navy: { bg: "#182D4C", a: "#DEC6A6", b: "#30415F", c: "#EFEFED" },
  navy2: { bg: "#30415F", a: "#DEC6A6", b: "#182D4C", c: "#EFEFED" },
  ivory: { bg: "#EFEFED", a: "#182D4C", b: "#DEC6A6", c: "#30415F" },
  champagne: { bg: "#DEC6A6", a: "#182D4C", b: "#EFEFED", c: "#30415F" },
  mist: { bg: "#E3E5E7", a: "#182D4C", b: "#DEC6A6", c: "#30415F" },
};

/** Opposite-mood theme, used for the hover reveal layer. */
export const invertTheme: Record<ArtTheme, ArtTheme> = {
  navy: "champagne",
  navy2: "ivory",
  ivory: "navy",
  champagne: "navy",
  mist: "navy2",
};

interface Props {
  kind: ArtKind;
  theme: ArtTheme;
  className?: string;
}

export function ProjectArt({ kind, theme, className }: Props) {
  const p = palettes[theme];
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden
      focusable="false"
    >
      <rect width="800" height="600" fill={p.bg} />
      {kind === "grid" && <Grid p={p} />}
      {kind === "arcs" && <Arcs p={p} />}
      {kind === "bars" && <Bars p={p} />}
      {kind === "orbit" && <Orbit p={p} />}
      {kind === "stripes" && <Stripes p={p} />}
      {kind === "blocks" && <Blocks p={p} />}
      {kind === "waves" && <Waves p={p} />}
      {kind === "poster" && <Poster p={p} />}
    </svg>
  );
}

type P = (typeof palettes)[ArtTheme];

function Grid({ p }: { p: P }) {
  const hot = new Set([3, 9, 14, 20, 27, 33, 38]);
  return (
    <g>
      {Array.from({ length: 48 }, (_, i) => {
        const x = 70 + (i % 8) * 88;
        const y = 60 + Math.floor(i / 8) * 80;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="72"
            height="64"
            fill={hot.has(i) ? p.a : p.b}
            opacity={hot.has(i) ? 1 : 0.5 + ((i * 7) % 5) / 12}
          />
        );
      })}
      <rect x="70" y="300" width="160" height="64" fill="none" stroke={p.c} strokeWidth="3" />
      <circle cx="680" cy="470" r="46" fill="none" stroke={p.a} strokeWidth="3" />
    </g>
  );
}

function Arcs({ p }: { p: P }) {
  return (
    <g fill="none" strokeWidth="26">
      {[260, 210, 160, 110, 60].map((r, i) => (
        <path
          key={r}
          d={`M ${400 - r} 520 A ${r} ${r} 0 0 1 ${400 + r} 520`}
          stroke={[p.b, p.a, p.c, p.a, p.b][i]}
          opacity={i === 2 ? 0.9 : 1}
        />
      ))}
      <circle cx="400" cy="520" r="22" fill={p.a} stroke="none" />
      <path d="M 60 120 H 300 M 500 120 H 740" stroke={p.c} strokeWidth="3" opacity="0.5" />
    </g>
  );
}

function Bars({ p }: { p: P }) {
  const h = [140, 220, 180, 300, 250, 360, 320, 430];
  return (
    <g>
      {h.map((v, i) => (
        <rect
          key={i}
          x={80 + i * 80}
          y={540 - v}
          width="52"
          height={v}
          rx="26"
          fill={i === 5 ? p.a : p.b}
        />
      ))}
      <circle cx="640" cy="130" r="64" fill={p.a} />
      <circle cx="640" cy="130" r="30" fill={p.bg} />
    </g>
  );
}

function Orbit({ p }: { p: P }) {
  return (
    <g fill="none">
      <circle cx="400" cy="300" r="250" stroke={p.b} strokeWidth="2" />
      <circle cx="400" cy="300" r="180" stroke={p.c} strokeWidth="2" opacity="0.5" strokeDasharray="4 10" />
      <circle cx="400" cy="300" r="110" stroke={p.b} strokeWidth="2" />
      <circle cx="400" cy="300" r="60" fill={p.a} />
      <circle cx="610" cy="175" r="24" fill={p.c} />
      <circle cx="205" cy="415" r="16" fill={p.a} />
      <circle cx="420" cy="52" r="10" fill={p.c} />
      <rect x="40" y="40" width="84" height="84" stroke={p.c} strokeWidth="2" />
    </g>
  );
}

function Stripes({ p }: { p: P }) {
  return (
    <g>
      {Array.from({ length: 14 }, (_, i) => (
        <rect key={i} x={-200 + i * 80} y="-100" width="30" height="900" fill={p.a} transform="rotate(25 400 300)" opacity={i % 3 === 0 ? 1 : 0.8} />
      ))}
      <circle cx="400" cy="300" r="150" fill={p.b} />
      <circle cx="400" cy="300" r="150" fill="none" stroke={p.a} strokeWidth="6" />
      <path d="M 300 300 H 500" stroke={p.c} strokeWidth="6" />
    </g>
  );
}

function Blocks({ p }: { p: P }) {
  return (
    <g>
      <rect x="60" y="60" width="240" height="240" fill={p.a} />
      <path d="M 300 60 A 240 240 0 0 1 540 300 H 300 Z" fill={p.b} />
      <circle cx="660" cy="180" r="100" fill={p.c} opacity="0.9" />
      <rect x="60" y="300" width="240" height="240" fill={p.c} opacity="0.85" />
      <path d="M 300 540 V 300 A 240 240 0 0 1 540 540 Z" fill={p.a} />
      <rect x="540" y="300" width="200" height="240" fill={p.b} />
    </g>
  );
}

function Waves({ p }: { p: P }) {
  return (
    <g fill="none" strokeWidth="18" strokeLinecap="round">
      {Array.from({ length: 7 }, (_, i) => {
        const y = 110 + i * 62;
        return (
          <path
            key={i}
            d={`M -20 ${y} C 120 ${y - 70}, 220 ${y + 70}, 360 ${y} S 600 ${y - 70}, 820 ${y}`}
            stroke={i === 3 ? p.c : i % 2 ? p.b : p.a}
          />
        );
      })}
    </g>
  );
}

function Poster({ p }: { p: P }) {
  return (
    <g>
      <circle cx="400" cy="270" r="190" fill={p.b} />
      <path d="M 400 80 A 190 190 0 0 1 400 460 Z" fill={p.a} />
      <rect x="60" y="500" width="680" height="10" fill={p.a} />
      <rect x="60" y="525" width="300" height="10" fill={p.a} />
      <circle cx="140" cy="130" r="26" fill={p.c} />
      <path d="M 640 80 l 30 52 h -60 z" fill={p.c} />
      <path d="M 640 400 h 60 M 670 370 v 60" stroke={p.a} strokeWidth="6" />
    </g>
  );
}
