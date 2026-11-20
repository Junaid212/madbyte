"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";

type Navigate = (href: string) => void;
const TransitionContext = createContext<Navigate | null>(null);

export const usePageTransition = () => {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("usePageTransition must be used inside <PageTransition>");
  return ctx;
};

const ease = [0.76, 0, 0.24, 1] as const;

/**
 * Curtain transition: a navy panel wipes up over the page, the route changes
 * underneath it, then the panel exits upward. Total ~1s, skipped entirely
 * for reduced-motion users and browser back/forward.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const controls = useAnimationControls();
  const reduce = useReducedMotion();
  const busy = useRef(false);
  const pending = useRef(false);

  const reveal = useCallback(async () => {
    pending.current = false;
    await controls.start({ y: "-100%", transition: { duration: 0.6, ease, delay: 0.1 } });
    controls.set({ y: "100%" });
    busy.current = false;
  }, [controls]);

  const navigate = useCallback<Navigate>(
    async (href) => {
      if (busy.current) return;
      const target = new URL(href, window.location.href);
      if (target.pathname === window.location.pathname && target.search === window.location.search) {
        if (target.hash) window.location.hash = target.hash;
        return;
      }
      if (reduce) {
        router.push(href);
        return;
      }
      busy.current = true;
      pending.current = true;
      await controls.start({ y: "0%", transition: { duration: 0.5, ease } });
      router.push(href);
      // Safety net: never leave the curtain stuck if the route doesn't change.
      window.setTimeout(() => {
        if (pending.current) void reveal();
      }, 3000);
    },
    [reduce, router, controls, reveal],
  );

  useEffect(() => {
    if (pending.current) void reveal();
  }, [pathname, reveal]);

  return (
    <TransitionContext.Provider value={navigate}>
      {children}
      <motion.div
        aria-hidden
        initial={{ y: "100%" }}
        animate={controls}
        className="page-curtain pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-navy"
        style={{ willChange: "transform" }}
      >
        <span className="display text-2xl text-champagne">
          MAD<span className="font-light text-ivory">BYTE</span>
        </span>
      </motion.div>
    </TransitionContext.Provider>
  );
}
