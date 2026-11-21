"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useFinePointer } from "@/hooks/useFinePointer";

/**
 * Decorative follower ring. The native cursor is NEVER hidden.
 * Only mounts for mouse/trackpad users who haven't asked for reduced motion.
 * Elements opt in with data-cursor="Label" (e.g. "Drag", "View").
 */
export function Cursor() {
  const fine = useFinePointer();
  if (!fine) return null;
  return <CursorInner />;
}

function CursorInner() {
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ring.current;
    const text = label.current;
    if (!el || !text) return;

    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      gsap.to(el, { opacity: 1, duration: 0.3, overwrite: "auto" });
    };
    const over = (e: PointerEvent) => {
      const t = e.target as Element | null;
      const tagged = t?.closest<HTMLElement>("[data-cursor]");
      const cue = tagged?.dataset.cursor;
      if (cue) {
        text.textContent = cue;
        gsap.to(el, { scale: 1, width: 92, height: 92, backgroundColor: "rgba(222,198,166,0.95)", borderColor: "rgba(222,198,166,1)", duration: 0.4, ease: "expo.out", overwrite: "auto" });
        gsap.to(text, { opacity: 1, duration: 0.2 });
      } else if (t?.closest("a,button,input,select,textarea,summary")) {
        text.textContent = "";
        gsap.to(el, { width: 56, height: 56, backgroundColor: "rgba(222,198,166,0)", borderColor: "rgba(222,198,166,0.9)", duration: 0.35, ease: "expo.out", overwrite: "auto" });
        gsap.to(text, { opacity: 0, duration: 0.1 });
      } else {
        text.textContent = "";
        gsap.to(el, { width: 28, height: 28, backgroundColor: "rgba(222,198,166,0)", borderColor: "rgba(222,198,166,0.7)", duration: 0.35, ease: "expo.out", overwrite: "auto" });
        gsap.to(text, { opacity: 0, duration: 0.1 });
      }
    };
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.3 });

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={ring}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80] flex items-center justify-center rounded-full border mix-blend-normal"
      style={{ width: 28, height: 28, borderColor: "rgba(222,198,166,0.7)" }}
    >
      <span ref={label} className="label text-[0.62rem] font-semibold text-navy opacity-0" />
    </div>
  );
}
