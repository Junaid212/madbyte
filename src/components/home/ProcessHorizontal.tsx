"use client";

import { useRef } from "react";
import { processSteps } from "@/data/content";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useScrollMotion } from "@/hooks/useScrollMotion";
import { SplitText } from "@/components/ui/SplitText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/cn";
import { sectionTone } from "@/config/sectionTheme";

// Switch light/dark in src/config/sectionTheme.ts
const light = sectionTone("process") === "light";

/**
 * Desktop: vertical scroll drives a horizontal timeline (CSS `position: sticky`
 * + a scrubbed transform, no DOM pinning). Mobile / reduced motion: a plain
 * vertical list, so nothing is hidden or trapped.
 */
export function ProcessHorizontal() {
  const section = useRef<HTMLElement>(null);

  useScrollMotion(({ desktop }) => {
    const el = section.current;
    if (!el) return;
    const track = el.querySelector<HTMLElement>("[data-track]")!;
    const bar = el.querySelector<HTMLElement>("[data-bar]")!;
    const steps = gsap.utils.toArray<HTMLElement>("[data-step]", el);
    const count = el.querySelector<HTMLElement>("[data-count]")!;

    el.dataset.hscroll = "on";
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
    const setHeight = () => {
      el.style.height = `${distance() + window.innerHeight}px`;
    };
    setHeight();
    ScrollTrigger.addEventListener("refreshInit", setHeight);

    let active = -1;
    gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          bar.style.transform = `scaleX(${self.progress})`;
          const idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length * 0.999));
          if (idx !== active) {
            active = idx;
            steps.forEach((s, i) => s.setAttribute("data-active", i <= idx ? "true" : "false"));
            count.textContent = String(idx + 1).padStart(2, "0");
          }
        },
      },
    });

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", setHeight);
      el.style.height = "";
      delete el.dataset.hscroll;
    };
  }, section);

  return (
    <section ref={section} id="process" className={cn("relative", light ? "on-light bg-mist text-navy" : "bg-navy-2 text-ivory")}>
      <div className="hs-pin flex flex-col justify-center py-16 md:py-32">
        <div className="container-x">
          <div className="flex items-end justify-between gap-8">
            <div>
              <SectionLabel num="05">How we work</SectionLabel>
              <SplitText as="h2" text={"From first sketch\nto *final launch.*"} accentClassName={light ? "text-navy-2 italic" : "text-champagne"} className="display mt-6 text-big" />
            </div>
            <p className={cn("label flex items-baseline gap-2", light ? "text-navy-2" : "text-champagne")}>
              <span data-count className={cn("display text-3xl", light ? "text-navy" : "text-ivory")}>01</span>/ 05
            </p>
          </div>
          <div aria-hidden className={cn("mt-6 h-px w-full lg:mt-8", light ? "bg-navy/20" : "bg-ivory/20")}>
            <div data-bar className={cn("h-[3px] origin-left -translate-y-px", light ? "bg-navy" : "bg-champagne")} style={{ transform: "scaleX(0)" }} />
          </div>
        </div>

        <ol
          data-track
          className="hs-track container-x mt-8 grid gap-0 md:mt-14 lg:mt-16"
        >
          {processSteps.map((s) => (
            <li
              key={s.num}
              data-step
              data-active="true"
              className={cn("hs-step group border-t py-8 transition-opacity duration-500 md:grid md:grid-cols-[8rem_1fr] md:gap-6 data-[active=false]:opacity-35", light ? "border-navy/20" : "border-ivory/20")}
            >
              <span className={cn("display block text-[clamp(3.5rem,9vw,8rem)] leading-[0.85] text-transparent", light ? "[-webkit-text-stroke:1.5px_#30415F]" : "[-webkit-text-stroke:1.5px_#DEC6A6]")}>
                {s.num}
              </span>
              <div className="mt-4 md:mt-0">
                <h3 className="display text-[clamp(1.8rem,3.4vw,3.4rem)] leading-none">{s.title}</h3>
                <p className={cn("mt-4 max-w-md", light ? "text-navy-2" : "text-ivory/80")}>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
