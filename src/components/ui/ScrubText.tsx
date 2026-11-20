"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useScrollMotion } from "@/hooks/useScrollMotion";

/** Paragraph whose words light up one by one as you scroll through it. */
export function ScrubText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useScrollMotion(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el.querySelectorAll(".sw"),
      { opacity: 0.16 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.1,
        scrollTrigger: { id: "scrub-text", trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
      },
    );
  }, ref);

  return (
    <p ref={ref} data-scrub className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i}>
          <span className="sw">{w}</span>{" "}
        </span>
      ))}
    </p>
  );
}
