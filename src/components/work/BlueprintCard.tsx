import { ArrowRight } from "lucide-react";
import type { Blueprint, Division } from "@/data/blueprints";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { cn } from "@/lib/cn";

const tag: Record<Division, string> = {
  Build: "bg-navy text-ivory",
  Design: "bg-champagne text-navy",
  Create: "bg-navy-2 text-ivory",
  Grow: "border border-navy text-navy",
};

/** One capability blueprint: problem, what we engineer, stack, and a scope CTA. */
export function BlueprintCard({ b }: { b: Blueprint }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-navy/15 bg-white/60 p-6 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1.5 hover:border-navy/50 hover:shadow-[0_30px_60px_-30px_rgba(24,45,76,0.35)] md:p-9">
      {/* blueprint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#182D4C 1px, transparent 1px), linear-gradient(90deg, #182D4C 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "linear-gradient(to bottom, black, transparent 55%)",
        }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="display text-[clamp(3.5rem,6vw,5.5rem)] leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_#30415F]">
          {b.index}
        </span>
        <span className={cn("label rounded-full px-4 py-2", tag[b.division])}>{b.division}</span>
      </div>

      <p className="label relative mt-8 text-navy-2">{b.archetype}</p>
      <h3 className="display relative mt-3 text-[clamp(1.5rem,2.3vw,2.1rem)] leading-[1.02]">{b.title}</h3>

      <dl className="relative mt-8 space-y-6 border-t border-navy/15 pt-6">
        <div>
          <dt className="label text-navy-2">The problem</dt>
          <dd className="mt-2 text-navy/85">{b.problem}</dd>
        </div>
        <div>
          <dt className="label text-navy-2">What we engineer</dt>
          <dd className="mt-2 text-navy/85">{b.architect}</dd>
        </div>
      </dl>

      <div className="relative mt-8">
        <p className="label text-navy-2">Tech / craft stack</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {b.stack.map((s) => (
            <li
              key={s}
              className="rounded-full border border-navy/25 px-3 py-1.5 font-mono text-[0.7rem] tracking-wide text-navy"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-auto pt-10">
        <TransitionLink
          href="/contact"
          className="inline-flex items-center gap-3 border-b border-navy pb-1 text-sm font-semibold text-navy"
        >
          Scope This Build
          <ArrowRight aria-hidden className="size-4 transition-transform duration-500 group-hover:translate-x-1.5" />
        </TransitionLink>
      </div>
    </article>
  );
}
