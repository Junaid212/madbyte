const sets = [
  { bg: "#182D4C", a: "#DEC6A6", b: "#30415F" },
  { bg: "#DEC6A6", a: "#182D4C", b: "#EFEFED" },
  { bg: "#30415F", a: "#EFEFED", b: "#DEC6A6" },
  { bg: "#EFEFED", a: "#182D4C", b: "#DEC6A6" },
  { bg: "#182D4C", a: "#EFEFED", b: "#DEC6A6" },
  { bg: "#E3E5E7", a: "#30415F", b: "#DEC6A6" },
];

/** Abstract portrait placeholder. Replace with next/image headshots when ready. */
export function TeamAvatar({ index }: { index: number }) {
  const c = sets[index % sets.length];
  const shapes = [
    <circle key="h" cx="150" cy="130" r="58" fill={c.a} />,
    <rect key="h" x="92" y="72" width="116" height="116" fill={c.a} />,
    <path key="h" d="M150 66 L212 188 H88 Z" fill={c.a} />,
    <circle key="h" cx="150" cy="130" r="58" fill="none" stroke={c.a} strokeWidth="18" />,
    <rect key="h" x="92" y="72" width="116" height="116" rx="58" fill={c.a} />,
    <path key="h" d="M92 188 A58 58 0 0 1 208 188 Z" fill={c.a} transform="translate(0 -40)" />,
  ];
  return (
    <div className="group relative aspect-[4/5] overflow-hidden" data-cursor="">
      <svg viewBox="0 0 300 375" preserveAspectRatio="xMidYMid slice" className="size-full transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]" aria-hidden>
        <rect width="300" height="375" fill={c.bg} />
        {shapes[index % shapes.length]}
        <path d="M30 375 C30 270 90 230 150 230 S270 270 270 375 Z" fill={c.b} />
      </svg>
      <span className="label absolute bottom-3 left-3 bg-navy px-2 py-1 text-[0.6rem] text-champagne">Photo placeholder</span>
    </div>
  );
}
