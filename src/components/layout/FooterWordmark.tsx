"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Logo } from "./Logo";

const LETTERS = "MADBYTE".split("");

/**
 * Giant footer wordmark: the logo sits on the left, with the big MADBYTE
 * letters beside it. Letters lift and tilt as the pointer passes (mouse only)
 * and settle back politely.
 */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const spans = ref.current?.querySelectorAll<HTMLElement>("[data-l]");
    spans?.forEach((s) => {
      const r = s.getBoundingClientRect();
      const d = Math.abs(e.clientX - (r.left + r.width / 2));
      const f = Math.max(0, 1 - d / 220);
      gsap.to(s, {
        y: -f * 36,
        rotate: f * (e.clientX < r.left + r.width / 2 ? 6 : -6),
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto",
      });
    });
  };
  const onLeave = () => {
    gsap.to(ref.current?.querySelectorAll("[data-l]") ?? [], {
      y: 0,
      rotate: 0,
      duration: 0.9,
      ease: "elastic.out(1, 0.4)",
      stagger: 0.03,
    });
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-hidden
      className="mt-20 flex select-none items-end gap-[2.5vw] pb-2 text-champagne"
    >
      <Logo className="!h-auto w-[18vw] shrink-0" />
      <div className="display flex flex-1 justify-between text-[clamp(2.2rem,10.6vw,12rem)] leading-[0.8]">
        {LETTERS.map((l, i) => (
          <span key={i} data-l className="inline-block will-change-transform">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
