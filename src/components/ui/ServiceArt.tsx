import type { ServiceId } from "@/data/services";

const C = {
  navy: "#182D4C",
  navy2: "#30415F",
  ivory: "#EFEFED",
  mist: "#E3E5E7",
  champagne: "#DEC6A6",
};

const hov = "[transform-box:fill-box] origin-center transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)]";

/**
 * One abstract illustration per division. Each reacts to a parent `.group`
 * hover. `tone` flips colours for use on light or dark panels.
 */
export function ServiceArt({
  id,
  tone = "dark",
  className,
}: {
  id: ServiceId;
  tone?: "dark" | "light";
  className?: string;
}) {
  const fg = tone === "dark" ? C.ivory : C.navy;
  const soft = tone === "dark" ? C.navy : C.mist;
  const hi = tone === "dark" ? C.champagne : C.navy;

  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden focusable="false">
      {id === "build" && (
        <g>
          {/* code lines */}
          {[
            [60, 90, 200],
            [100, 150, 280],
            [100, 210, 180],
            [140, 270, 300],
            [100, 330, 120],
            [60, 390, 240],
          ].map(([x, y, w], i) => (
            <rect
              key={i}
              x={x}
              y={y}
              width={w}
              height="22"
              fill={i === 3 ? hi : fg}
              opacity={i === 3 ? 1 : 0.22 + (i % 3) * 0.12}
              className={`${hov} group-hover:scale-x-[1.12]`}
            />
          ))}
          <rect x="204" y="330" width="14" height="22" fill={hi} className="bit" />
          {/* brackets */}
          <path d="M 440 120 L 360 210 L 440 300" fill="none" stroke={hi} strokeWidth="26" strokeLinecap="square" className={`${hov} group-hover:-translate-x-4`} />
          <path d="M 480 120 L 560 210 L 480 300" fill="none" stroke={fg} strokeWidth="26" strokeLinecap="square" className={`${hov} group-hover:translate-x-4`} />
          <rect x="60" y="460" width="480" height="60" fill="none" stroke={fg} strokeOpacity="0.5" strokeWidth="2" />
          <rect x="60" y="460" width="300" height="60" fill={hi} className={`${hov} origin-left group-hover:scale-x-[1.4]`} />
        </g>
      )}

      {id === "design" && (
        <g fill="none">
          {/* pen-tool curve with handles */}
          <path d="M 70 470 C 150 90, 330 90, 380 300 S 480 520, 540 150" stroke={fg} strokeWidth="14" strokeLinecap="round" />
          <g stroke={hi} strokeWidth="2">
            <path d="M 70 470 L 150 90" />
            <path d="M 380 300 L 330 90 M 380 300 L 430 470" />
            <path d="M 540 150 L 480 520" />
          </g>
          {[[70, 470], [380, 300], [540, 150]].map(([x, y], i) => (
            <rect key={i} x={x - 14} y={y - 14} width="28" height="28" fill={soft} stroke={hi} strokeWidth="4" className={`${hov} group-hover:rotate-45`} />
          ))}
          {[[150, 90], [330, 90], [430, 470], [480, 520]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="10" fill={hi} className={`${hov} group-hover:scale-[1.8]`} />
          ))}
          <circle cx="300" cy="300" r="250" stroke={fg} strokeOpacity="0.15" strokeWidth="2" strokeDasharray="4 10" />
        </g>
      )}

      {id === "create" && (
        <g style={{ mixBlendMode: "multiply" }}>
          <circle cx="230" cy="250" r="170" fill={C.navy} className={`${hov} group-hover:-translate-x-6 group-hover:-translate-y-3`} />
          <circle cx="380" cy="250" r="170" fill={C.ivory} className={`${hov} group-hover:translate-x-6 group-hover:-translate-y-3`} />
          <circle cx="305" cy="380" r="170" fill={C.navy2} className={`${hov} group-hover:translate-y-6`} />
          <text x="305" y="320" textAnchor="middle" fontFamily="var(--font-bricolage)" fontWeight="800" fontSize="120" fill={C.champagne} style={{ mixBlendMode: "normal" }}>
            Aa
          </text>
        </g>
      )}

      {id === "grow" && (
        <g>
          {[110, 170, 150, 250, 220, 340, 310].map((h, i) => (
            <rect
              key={i}
              x={50 + i * 74}
              y={540 - h}
              width="52"
              height={h}
              fill={i === 5 ? C.champagne : tone === "dark" ? C.navy2 : C.navy}
              className={`${hov} origin-bottom group-hover:scale-y-[1.18]`}
            />
          ))}
          <path d="M 76 430 L 224 380 L 298 360 L 446 250 L 594 150" fill="none" stroke={C.ivory} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" transform="translate(-40 -60)" />
          <path d="M 480 70 H 560 V 150" fill="none" stroke={C.ivory} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className={`${hov} group-hover:translate-x-2 group-hover:-translate-y-2`} />
        </g>
      )}
    </svg>
  );
}
