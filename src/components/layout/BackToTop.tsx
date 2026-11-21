"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useLenis } from "./SmoothScroll";

/**
 * Round back-to-top button. A wavy "water" level rises inside the ring as the
 * page scrolls; click returns to the top.
 */
export function BackToTop() {
  const lenis = useLenis();
  const { scrollY, scrollYProgress } = useScroll();
  const [shown, setShown] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShown(y > 400));

  const level = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const y = useTransform(level, [0, 1], ["100%", "0%"]);

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      initial={false}
      animate={{ opacity: shown ? 1 : 0, scale: shown ? 1 : 0.6, y: shown ? 0 : 20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: shown ? "auto" : "none" }}
      tabIndex={shown ? 0 : -1}
      className="fixed bottom-5 right-4 z-[65] size-14 rounded-full bg-ivory/90 p-[5px] ring-1 ring-navy/20 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)] backdrop-blur md:bottom-8 md:right-8 md:size-14"
    >
      <span className="relative block size-full overflow-hidden rounded-full bg-navy">
        {/* rising level with a wavy surface */}
        <motion.span aria-hidden className="absolute inset-x-0 bottom-0 top-0 block" style={{ y }}>
          <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="absolute -top-[10px] left-0 h-[12px] w-[200%] animate-[wave_3.5s_linear_infinite] fill-[#7d93b3]">
            <path d="M0 10 Q 25 0 50 10 T 100 10 T 150 10 T 200 10 V20 H0 Z" />
          </svg>
          <span className="absolute inset-x-0 top-[2px] bottom-[-2px] bg-[#7d93b3]" />
        </motion.span>
        <ChevronUp aria-hidden className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 text-ivory" strokeWidth={2.5} />
      </span>
    </motion.button>
  );
}
