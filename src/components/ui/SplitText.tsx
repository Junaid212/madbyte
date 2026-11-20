"use client";

import { useRef, type ElementType } from "react";
import { gsap } from "@/lib/gsap";
import { useScrollMotion } from "@/hooks/useScrollMotion";
import { cn } from "@/lib/cn";

interface Props {
  /** Use "\n" for line breaks and *word* to mark an accent word. */
  text: string;
  as?: ElementType;
  className?: string;
  accentClassName?: string;
  /** "load" plays immediately (hero), "scroll" plays when entering view. */
  trigger?: "load" | "scroll";
  delay?: number;
  stagger?: number;
}

/**
 * Word-by-word headline reveal. Markup is rendered on the server (so it is
 * crawlable and works without JS); GSAP only animates the inner spans.
 */
export function SplitText({
  text,
  as = "h2",
  className,
  accentClassName = "text-champagne",
  trigger = "scroll",
  delay = 0,
  stagger = 0.07,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useScrollMotion(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll(".split-i");
    const vars: gsap.TweenVars = {
      yPercent: 0,
      y: 0,
      duration: 1.1,
      ease: "expo.out",
      stagger,
      delay,
    };
    gsap.fromTo(targets, { yPercent: 112, y: 0 }, {
      ...vars,
      scrollTrigger:
        trigger === "scroll"
          ? { trigger: el, start: "top 88%", once: true }
          : undefined,
    });
  }, ref);

  const lines = text.split("\n");
  const Tag = as;
  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text.replace(/\n/g, " ").replace(/\*/g, "")}</span>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden="true">
          {(() => {
            let on = false;
            const words = line.split(" ");
            return words.map((raw, wi) => {
              if (raw.startsWith("*")) on = true;
              const accent = on;
              if (raw.endsWith("*") && raw.length > 0) on = false;
              const word = raw.replaceAll("*", "");
              return (
                <span key={wi}>
                  <span className="split-w">
                    <span className={cn("split-i", accent && accentClassName)}>{word}</span>
                  </span>
                  {wi < words.length - 1 ? " " : null}
                </span>
              );
            });
          })()}
        </span>
      ))}
    </Tag>
  );
}
