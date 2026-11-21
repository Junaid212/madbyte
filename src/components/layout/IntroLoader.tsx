"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { Loader } from "./Loader";

const SHOW_MS = 1700;

/** First visit per session: brand loader that wipes away upward. */
export function IntroLoader() {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Hold entrance animations until the loader lifts, so the hero plays on screen.
    gsap.globalTimeline.pause();
    const t1 = window.setTimeout(() => {
      setLeaving(true);
      gsap.globalTimeline.play();
    }, SHOW_MS);
    const t2 = window.setTimeout(() => {
      setGone(true);
      try {
        sessionStorage.setItem("mb-intro", "1");
      } catch {}
      document.documentElement.classList.add("intro-done");
    }, SHOW_MS + 900);
    return () => {
      gsap.globalTimeline.play();
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (gone) return null;
  return (
    <motion.div
      className="intro-loader fixed inset-0 z-[95] grid place-items-center bg-navy"
      initial={false}
      animate={{ y: leaving ? "-100%" : "0%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      role="status"
      aria-label="Loading"
    >
      <Loader />
    </motion.div>
  );
}
