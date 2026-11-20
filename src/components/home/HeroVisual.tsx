"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useScrollMotion } from "@/hooks/useScrollMotion";

const TASKS = [
  { label: "Brand identity", tag: "Design", dot: "bg-champagne", active: false },
  { label: "Web app build", tag: "Build", dot: "bg-navy", active: true },
  { label: "Launch campaign", tag: "Grow", dot: "bg-ivory", active: false },
];
const MENU = ["Build", "Design", "Create", "Grow"];

/**
 * Hero artwork: a tall arch holding two floating app screens, glowing orbs
 * and glass activity chips. Layers drift at different depths on mouse move.
 * All motion is transform/opacity only.
 */
export function HeroVisual({ scopeRef }: { scopeRef: React.RefObject<HTMLElement | null> }) {
  const root = useRef<HTMLDivElement>(null);

  useScrollMotion(({ desktop }) => {
    const el = root.current;
    if (!el) return;
    const layers = gsap.utils.toArray<HTMLElement>("[data-depth]", el);

    gsap.fromTo(
      layers,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.4, ease: "expo.out", stagger: 0.12, delay: 0.3 },
    );

    if (!desktop) return;
    const host = scopeRef.current;
    if (!host) return;
    const tos = layers.map((l) => ({
      depth: parseFloat(l.dataset.depth ?? "0"),
      x: gsap.quickTo(l, "x", { duration: 1.2, ease: "power3.out" }),
      y: gsap.quickTo(l, "yPercent", { duration: 1.2, ease: "power3.out" }),
    }));
    const move = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      tos.forEach((t) => {
        t.x(nx * t.depth);
        t.y(ny * t.depth * 0.3);
      });
    };
    host.addEventListener("pointermove", move);
    return () => host.removeEventListener("pointermove", move);
  }, scopeRef);

  return (
    <div ref={root} aria-hidden className="relative mx-auto aspect-[4/5] w-full max-w-[460px] lg:max-w-[90%]">
      {/* Arch */}
      <div className="absolute inset-x-[6%] inset-y-0 overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] bg-gradient-to-b from-navy-2 via-navy-2/60 to-champagne/25 ring-1 ring-ivory/10">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-ivory/10 to-transparent" />
      </div>

      {/* Glowing orbs */}
      <span data-depth="-30" className="absolute left-[14%] top-[34%] aspect-square w-[7%] rounded-full bg-ivory shadow-[0_0_40px_14px_rgba(239,239,237,0.45)]" />
      <span data-depth="24" className="absolute right-[12%] top-[52%] aspect-square w-[3.5%] rounded-full bg-ivory/90 shadow-[0_0_24px_8px_rgba(239,239,237,0.4)]" />
      <span data-depth="-18" className="absolute bottom-[34%] left-[10%] aspect-square w-[3%] rounded-full bg-champagne shadow-[0_0_20px_8px_rgba(222,198,166,0.5)]" />

      {/* Back screen: menu */}
      <div data-depth="-22" className="absolute left-[10%] top-[40%] w-[54%]">
        <div className="wobble" style={{ transform: "rotate(-14deg) skewY(6deg)" }}>
          <div className="rounded-3xl bg-navy/95 p-4 shadow-[0_40px_70px_-24px_rgba(0,0,0,0.65)] ring-1 ring-ivory/10">
            <p className="label mb-3 text-[0.5rem] text-champagne">Our services</p>
            <ul className="space-y-2.5">
              {MENU.map((m, i) => (
                <li key={m} className={`flex items-center gap-2 text-[0.62rem] ${i === 0 ? "text-ivory" : "text-ivory/55"}`}>
                  <span className={`size-2 rounded-sm ${i === 0 ? "bg-champagne" : "bg-ivory/25"}`} />
                  {m}
                </li>
              ))}
            </ul>
            <p className="label mt-4 text-[0.5rem] text-ivory/50">A little mad. A lot brilliant.</p>
          </div>
        </div>
      </div>

      {/* Front screen: project */}
      <div data-depth="30" className="absolute right-[8%] top-[14%] w-[50%]">
        <div className="wobble" style={{ animationDelay: "-3s" }}>
          <div className="overflow-hidden rounded-3xl bg-navy shadow-[0_40px_80px_-24px_rgba(0,0,0,0.7)] ring-1 ring-ivory/15">
            <div className="relative h-[5.5rem] bg-gradient-to-br from-champagne via-champagne/70 to-ivory/80">
              <span className="absolute left-4 top-4 size-5 bg-navy" />
              <span className="absolute bottom-3 right-5 size-8 rounded-full bg-navy/85" />
            </div>
            <div className="p-4">
              <p className="display text-[0.85rem] leading-none">Ledgerline</p>
              <p className="mt-1.5 text-[0.5rem] leading-snug text-ivory/55">Fintech dashboard: designed, built and launched by MADBYTE.</p>
              <ul className="mt-4 space-y-2">
                {TASKS.map((t) => (
                  <li
                    key={t.label}
                    className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[0.58rem] ${
                      t.active ? "bg-champagne text-navy" : "bg-ivory/[0.07] text-ivory/80"
                    }`}
                  >
                    <span className={`size-2 rounded-sm ${t.dot}`} />
                    <span className="flex-1">{t.label}</span>
                    <span className="text-[0.5rem] uppercase tracking-wider opacity-60">{t.tag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Glass chips */}
      {/* <div data-depth="44" className="absolute bottom-[9%] left-[2%] flex items-center gap-2.5 rounded-full bg-ivory/90 py-1.5 pl-1.5 pr-4 text-[0.7rem] text-navy shadow-xl backdrop-blur">
        <span className="grid size-7 place-items-center rounded-full bg-navy text-[0.55rem] font-bold text-champagne">MB</span>
        <span><b>MADBYTE BUILD</b> shipped v2.0</span>
      </div> */}
      {/* <div data-depth="52" className="absolute bottom-[1%] left-[10%] flex items-center gap-2.5 rounded-full bg-ivory/55 py-1.5 pl-1.5 pr-4 text-[0.7rem] text-navy/70 shadow-lg backdrop-blur">
        <span className="grid size-7 place-items-center rounded-full bg-champagne text-[0.55rem] font-bold text-navy">AI</span>
        <span><b>Ledgerline</b> went live</span>
      </div> */}
    </div>
  );
}
