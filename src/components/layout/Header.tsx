"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { nav, site } from "@/data/site";
import { cn } from "@/lib/cn";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Logo } from "./Logo";
import { useLenis } from "./SmoothScroll";

const isActive = (href: string, path: string) =>
  href === "/" ? path === "/" : path === href || path.startsWith(href + "/");

export function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [, setHidden] = useState(false);
  // Menu state is keyed to the path it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (v: boolean | ((o: boolean) => boolean)) => {
    const next = typeof v === "function" ? v(open) : v;
    setOpenOn(next ? pathname : null);
  };

  useMotionValueEvent(scrollY, "change", (y) => {
    if (open) return; // scroll is locked while the menu is open; ignore layout-induced jitter
    setScrolled(y > 40);
    setHidden(false);
  });

  // Lock scroll + Escape while the menu is open.
  useEffect(() => {
    if (!open) return;
    // Lenis already clips the page when stopped; only fall back to body overflow without it.
    if (lenis) lenis.stop();
    else document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      if (!lenis) document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[60] text-ivory">
        <div
          className={cn(
            "pointer-events-auto mx-auto flex items-center justify-between  transition-[width,max-width,margin,padding,background-color,box-shadow,border-color,backdrop-filter] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]",
            scrolled
              ? "mt-3 w-[calc(100%-1.5rem)] max-w-[62rem] rounded-full border border-ivory/10 bg-navy/80 px-5 py-2 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl md:px-7"
              : "mt-0 w-full max-w-[1760px] rounded-full border border-transparent bg-transparent px-[clamp(1.25rem,4vw,4rem)] py-5 md:py-7",
          )}
        >
          <TransitionLink href="/" aria-label="MADBYTE home" className="relative z-[70]">
            <Logo withText className={scrolled ? "h-7" : "h-9"} textClassName={scrolled ? "text-[1.05rem]" : "text-[1.25rem]"} />
          </TransitionLink>

          <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
            {nav.map((item, i) => {
              const active = isActive(item.href, pathname);
              return (
                <TransitionLink
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="relative flex items-baseline gap-2 text-sm font-medium tracking-wide group"
                >
                  {/* <span className="label text-[0.6rem] text-champagne/80">0{i + 1}</span> */}
                  <span className="relative inline-block h-[1.4em] overflow-hidden leading-[1.4]">
                    <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full">
                      {item.label}
                    </span>
                    <span
                      aria-hidden
                      className="absolute left-0 top-full block text-champagne transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full"
                    >
                      {item.label}
                    </span>
                  </span>
                  <motion.span
                    aria-hidden
                    initial={false}
                    animate={{ scaleX: active ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute -bottom-1.5 left-0 h-px w-full origin-left bg-champagne"
                  />
                </TransitionLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <TransitionLink
              href="/contact"
              className="hidden rounded-full border border-champagne px-5 py-2.5 text-sm font-semibold text-champagne transition-colors duration-300 hover:bg-champagne hover:text-navy md:inline-flex"
            >
              Start a Project
            </TransitionLink>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-[70] flex size-11 flex-col items-center justify-center gap-[7px] lg:hidden"
            >
              <span className={cn("h-px w-7 bg-current transition-transform duration-500", open && "translate-y-[4px] rotate-45")} />
              <span className={cn("h-px w-7 bg-current transition-transform duration-500", open && "-translate-y-[4px] -rotate-45")} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            data-lenis-prevent
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            style={{ willChange: "clip-path" }}
            className="fixed inset-0 z-[55] overflow-y-auto bg-navy-2 text-ivory lg:hidden"
          >
            <div className="container-x flex min-h-svh flex-col justify-between pb-8 pt-28">
              <ul className="space-y-1">
                {nav.map((item, i) => {
                  const active = isActive(item.href, pathname);
                  return (
                    <li key={item.href} className="overflow-hidden">
                      <motion.div
                        initial={{ y: "110%" }}
                        animate={{ y: 0, transition: { delay: 0.3 + i * 0.07, duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
                        exit={{ y: "110%", transition: { duration: 0.3 } }}
                      >
                        <TransitionLink
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className="display flex items-baseline gap-4 py-1 text-[clamp(2.6rem,13vw,5rem)] leading-[1.05]"
                        >
                          {/* <span className="label text-xs text-champagne">0{i + 1}</span> */}
                          <span className={cn(active && "text-champagne")}>{item.label}</span>
                        </TransitionLink>
                      </motion.div>
                    </li>
                  );
                })}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.8 } }}
                exit={{ opacity: 0 }}
                className="mt-12 space-y-6"
              >
                <TransitionLink
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex rounded-full bg-champagne px-7 py-4 text-sm font-semibold text-navy"
                >
                  Start a Project
                </TransitionLink>
                <p className="text-sm text-ivory/70">
                  <a href={`mailto:${site.email}`} className="u-link">
                    {site.email}
                  </a>
                </p>
                <p className="label text-ivory/60">{site.tagline}</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
