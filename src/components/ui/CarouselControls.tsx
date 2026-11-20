"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface Props {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  label: string;
  tone?: "dark" | "light";
}

/** Round prev/next arrows used by every carousel. */
export function CarouselControls({ onPrev, onNext, canPrev, canNext, label, tone = "dark" }: Props) {
  const base = cn(
    "grid size-14 place-items-center rounded-full border transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30",
    tone === "dark"
      ? "border-ivory/40 text-ivory hover:enabled:border-champagne hover:enabled:bg-champagne hover:enabled:text-navy"
      : "border-navy/40 text-navy hover:enabled:bg-navy hover:enabled:text-ivory",
  );
  return (
    <div className="flex gap-3">
      <button type="button" onClick={onPrev} disabled={!canPrev} aria-label={`Previous ${label}`} className={base}>
        <ArrowLeft aria-hidden className="size-5" />
      </button>
      <button type="button" onClick={onNext} disabled={!canNext} aria-label={`Next ${label}`} className={base}>
        <ArrowRight aria-hidden className="size-5" />
      </button>
    </div>
  );
}
