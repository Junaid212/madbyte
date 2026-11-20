import { cn } from "@/lib/cn";

/** Pure-CSS infinite marquee (no JS, pauses on hover and for reduced motion). */
export function Marquee({ items, className }: { items: readonly string[]; className?: string }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((it, i) => (
        <li key={i} className="flex items-center">
          <span className="display px-6 text-[clamp(1.6rem,3.2vw,3rem)] whitespace-nowrap">{it}</span>
          <span aria-hidden className="inline-block size-2 rotate-45 bg-champagne" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cn("marquee overflow-hidden", className)}>
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
