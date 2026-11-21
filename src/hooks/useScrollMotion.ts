"use client";

import type { RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "./useIsoLayoutEffect";

interface Conditions {
  /** >= 1024px and motion allowed */
  desktop: boolean;
}

/**
 * Runs GSAP setup inside a scoped gsap.context + matchMedia.
 * - Nothing runs when the user prefers reduced motion.
 * - Everything is reverted on unmount / media change (strict-mode safe).
 */
export function useScrollMotion(
  setup: (c: Conditions) => void | (() => void),
  scope: RefObject<HTMLElement | null>,
) {
  useIsoLayoutEffect(() => {
    document.documentElement.dataset.motion = "ready";
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(min-width: 0px)",
          desktop: "(min-width: 1024px)",
        },
        (mc) => {
          const cond = mc.conditions as { motion: boolean; desktop: boolean };
          if (!cond.motion) return;
          return setup({ desktop: cond.desktop });
        },
      );
    }, scope.current ?? undefined);
    return () => ctx.revert();
  }, []);
}
