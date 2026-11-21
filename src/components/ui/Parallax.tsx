"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useScrollMotion } from "@/hooks/useScrollMotion";

interface Props {
  children: ReactNode;
  className?: string;
  /** Total travel in px (negative moves against scroll). Halved on phones. */
  distance?: number;
}

/** Scroll-scrubbed vertical drift using transforms only. */
export function Parallax({ children, className, distance = -80 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useScrollMotion(({ desktop }) => {
    if (!ref.current) return;
    const d = desktop ? distance : distance * 0.5; // gentler drift on phones
    gsap.fromTo(
      ref.current,
      { y: -d / 2 },
      {
        y: d / 2,
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
