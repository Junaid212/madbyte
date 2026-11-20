"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useScrollMotion } from "@/hooks/useScrollMotion";
import { cn } from "@/lib/cn";

/** Hairline that draws itself across the page when scrolled into view. */
export function Divider({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useScrollMotion(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.6,
        ease: "expo.inOut",
        scrollTrigger: { trigger: ref.current, start: "top 95%", once: true },
      },
    );
  }, ref);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("h-px w-full origin-left bg-current opacity-30", className)}
    />
  );
}
