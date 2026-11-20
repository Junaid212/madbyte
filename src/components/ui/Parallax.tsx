"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useScrollMotion } from "@/hooks/useScrollMotion";

interface Props {
  children: ReactNode;
  className?: string;
  /** Total travel in px (negative moves against scroll). Desktop only. */
  distance?: number;
}

/** Scroll-scrubbed vertical drift using transforms only. Desktop only. */
export function Parallax({ children, className, distance = -80 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useScrollMotion(({ desktop }) => {
    if (!desktop || !ref.current) return;
    gsap.fromTo(
      ref.current,
      { y: -distance / 2 },
      {
        y: distance / 2,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  }, ref);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
