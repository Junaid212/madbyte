"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Tiny external store so components can read the single Lenis instance.
let current: Lenis | null = null;
const listeners = new Set<() => void>();
const setCurrent = (l: Lenis | null) => {
  current = l;
  listeners.forEach((fn) => fn());
};
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export const useLenis = () =>
  useSyncExternalStore(
    subscribe,
    () => current,
    () => null,
  );

/**
 * One Lenis instance, driven by GSAP's ticker (the single animation frame
 * loop for the whole app) and feeding ScrollTrigger on every scroll event.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      anchors: { offset: -80 },
      autoRaf: false, // GSAP ticker drives it
    });
    const onScroll = () => ScrollTrigger.update();
    instance.on("scroll", onScroll);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setCurrent(instance);

    return () => {
      gsap.ticker.remove(tick);
      instance.off("scroll", onScroll);
      instance.destroy();
      setCurrent(null);
    };
  }, []);

  // New route: jump to top (or to the #hash target) and let ScrollTrigger re-measure.
  useEffect(() => {
    const t = window.setTimeout(() => {
      ScrollTrigger.refresh();
      const hash = window.location.hash;
      const el = hash ? document.querySelector<HTMLElement>(hash) : null;
      if (el) {
        if (lenis) lenis.scrollTo(el, { immediate: true, offset: -80, force: true });
        else el.scrollIntoView();
      }
    }, 150);
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
    return () => window.clearTimeout(t);
  }, [pathname, lenis]);

  // Full-page captures and printing never scroll, so scroll-triggered reveals would
  // stay hidden. In those cases, finish every reveal and show everything.
  useEffect(() => {
    const html = document.documentElement;
    let t: number | undefined;
    const finish = () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.once || st.vars.id === "scrub-text") st.animation?.progress(1);
      });
    };
    const check = () => {
      const capture = window.innerHeight > 3000 || window.matchMedia("print").matches;
      html.classList.toggle("reveal-all", capture);
      if (capture) {
        window.clearTimeout(t);
        t = window.setTimeout(finish, 400);
      }
    };
    check();
    window.addEventListener("resize", check);
    window.addEventListener("beforeprint", check);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", check);
      window.removeEventListener("beforeprint", check);
    };
  }, []);

  // Late-loading fonts shift layout.
  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    document.fonts?.ready.then(onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return <>{children}</>;
}
