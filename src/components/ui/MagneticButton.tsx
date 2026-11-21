"use client";

import { useEffect, useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { TransitionLink } from "./TransitionLink";

type Variant = "champagne" | "navy" | "ghost-light" | "ghost-dark";

const styles: Record<Variant, string> = {
  champagne: "bg-champagne text-navy hover:bg-ivory",
  navy: "bg-navy text-ivory hover:bg-navy-2",
  "ghost-light": "border border-ivory/40 text-ivory hover:border-champagne hover:text-champagne",
  "ghost-dark": "border border-navy/40 text-navy hover:border-navy hover:bg-navy hover:text-ivory",
};

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  magnetic?: boolean;
  icon?: boolean;
}
type Props =
  | (BaseProps & { href: string } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">)
  | (BaseProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">);

/**
 * Pill CTA with a hover text-roll and an optional magnetic pull (precision
 * pointers only). Renders a link when `href` is given, otherwise a button.
 */
export function MagneticButton({
  children,
  variant = "champagne",
  className,
  magnetic = true,
  icon = true,
  href,
  ...rest
}: Props) {
  const wrap = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el || !magnetic) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!mq.matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [magnetic]);

  const label = typeof children === "string" ? children : null;
  const cls = cn(
    "group relative inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-semibold tracking-wide transition-colors duration-300",
    styles[variant],
    className,
  );
  const inner = (
    <>
      {label ? (
        <span className="relative inline-block h-[1.4em] overflow-hidden leading-[1.4]">
          <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full">
            {label}
          </span>
          <span
            aria-hidden
            className="absolute left-0 top-full block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full"
          >
            {label}
          </span>
        </span>
      ) : (
        children
      )}
      {icon && (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  return (
    <span ref={wrap} className="inline-block" data-cursor="">
      {href ? (
        <TransitionLink href={href} className={cls}>
          {inner}
        </TransitionLink>
      ) : (
        <button className={cls} {...rest}>
          {inner}
        </button>
      )}
    </span>
  );
}
