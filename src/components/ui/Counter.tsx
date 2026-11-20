"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useScrollMotion } from "@/hooks/useScrollMotion";

interface Props {
  to: number;
  /** Pad with leading zeros, e.g. 2 -> "04". */
  pad?: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

/** Number that counts up when scrolled into view. Server renders the final value. */
export function Counter({ to, pad = 0, suffix = "", className, duration = 1.6 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) => String(Math.round(n)).padStart(pad, "0") + suffix;

  useScrollMotion(() => {
    const el = ref.current;
    if (!el) return;
    const state = { v: 0 };
    el.textContent = fmt(0);
    gsap.to(state, {
      v: to,
      duration,
      ease: "power3.out",
      onUpdate: () => {
        el.textContent = fmt(state.v);
      },
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
    return () => {
      el.textContent = fmt(to);
    };
  }, ref);

  return (
    <span ref={ref} className={className} aria-label={fmt(to)}>
      {fmt(to)}
    </span>
  );
}
