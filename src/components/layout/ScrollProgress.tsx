"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin champagne bar tracking page scroll (reads native scroll, which Lenis drives). */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-champagne"
      style={{ scaleX }}
    />
  );
}
