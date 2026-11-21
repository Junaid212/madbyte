import { Logo } from "./Logo";

const COLS = 12;
const ROWS = 5;
const CELLS = Array.from({ length: COLS * ROWS }, (_, i) => i);
const BITS = Array.from({ length: 8 }, (_, i) => i);

/**
 * Brand loader: the logo is revealed by a pixel dissolve, the MADBYTE name
 * follows, and a row of "bits" ticks along underneath. CSS-only, so it also
 * works in server components (route loading state) and before JS runs.
 * `compact` skips the dissolve (used inside the page-transition curtain).
 */
export function Loader({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-5 text-ivory" aria-hidden>
      <div className="relative w-[min(54vw,250px)]">
        <Logo className="!h-auto w-full" />
        {!compact && (
          <div className="absolute inset-[-1px] grid" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}>
            {CELLS.map((i) => (
              <span
                key={i}
                className="px-out bg-navy"
                style={{ animationDelay: `${0.15 + ((i * 37) % CELLS.length) * 0.012}s` }}
              />
            ))}
          </div>
        )}
      </div>
      <p className={`display text-xl tracking-tight ${compact ? "" : "loader-name"}`}>
        MAD<span className="font-light text-champagne">BYTE</span>
      </p>
      <div className="flex gap-1.5">
        {BITS.map((i) => (
          <span key={i} className="loader-bit size-2 bg-champagne" style={{ animationDelay: `${i * 0.12}s` }} />
        ))}
      </div>
    </div>
  );
}
