"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useScrollMotion } from "@/hooks/useScrollMotion";

interface Props {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** up: fade + rise · fade: opacity only · clip: wipe from bottom · children: stagger direct children */
  variant?: "up" | "fade" | "clip" | "children";
  delay?: number;
  stagger?: number;
  start?: string;
}

/** Scroll-triggered entrance. Initial hidden state lives in CSS (`html.anim`). */
export function Reveal({
  children,
  as = "div",
  className,
  variant = "up",
  delay = 0,
  stagger = 0.1,
  start = "top 88%",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useScrollMotion(() => {
    const el = ref.current;
    if (!el) return;
    const st = { trigger: el, start, once: true };
    if (variant === "children") {
      gsap.fromTo(
        el.children,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger, delay, scrollTrigger: st },
      );
    } else if (variant === "clip") {
      gsap.fromTo(
        el,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut", delay, scrollTrigger: st },
      );
      const inner = el.firstElementChild;
      if (inner)
        gsap.fromTo(
          inner,
          { scale: 1.25 },
          { scale: 1, duration: 1.8, ease: "expo.out", delay, scrollTrigger: st },
        );
    } else if (variant === "fade") {
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 1.2, delay, scrollTrigger: st });
    } else {
      gsap.fromTo(
        el,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 1, ease: "expo.out", delay, scrollTrigger: st },
      );
    }
  }, ref);

  const Tag = as;
  return (
    <Tag ref={ref} className={className} data-reveal={variant}>
      {children}
    </Tag>
  );
}
