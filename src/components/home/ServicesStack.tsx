"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { services, type Service, type ServiceId } from "@/data/services";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useScrollMotion } from "@/hooks/useScrollMotion";
import { cn } from "@/lib/cn";
import { SplitText } from "@/components/ui/SplitText";
import { Counter } from "@/components/ui/Counter";
import { ServiceArt } from "@/components/ui/ServiceArt";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { SectionLabel } from "@/components/ui/SectionLabel";

const looks: Record<
  ServiceId,
  { panel: string; text: string; tone: "dark" | "light"; flip: boolean; muted: string; line: string; stroke: string }
> = {
  build: { panel: "bg-navy-2", text: "text-ivory", tone: "dark", flip: false, muted: "text-ivory/75", line: "border-ivory/20", stroke: "[-webkit-text-stroke:1.5px_#EFEFED]" },
  design: { panel: "bg-ivory", text: "text-navy", tone: "light", flip: true, muted: "text-navy-2", line: "border-navy/20", stroke: "[-webkit-text-stroke:1.5px_#182D4C]" },
  create: { panel: "bg-champagne", text: "text-navy", tone: "light", flip: false, muted: "text-navy/80", line: "border-navy/25", stroke: "[-webkit-text-stroke:1.5px_#182D4C]" },
  grow: { panel: "bg-navy", text: "text-ivory", tone: "dark", flip: true, muted: "text-ivory/75", line: "border-ivory/20", stroke: "[-webkit-text-stroke:1.5px_#EFEFED]" },
};

export function ServicesStack() {
  const ref = useRef<HTMLElement>(null);

  // Desktop: each panel slides over the previous one, which recedes slightly.
  // Each panel pins, then the next one slides over it while it recedes slightly.
  // On phones a panel can be taller than the screen, so it pins when its BOTTOM
  // reaches the bottom of the viewport (negative top) and stays fully readable.
  useScrollMotion(({ desktop }) => {
    if (!ref.current) return;
    const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", ref.current);
    const setTops = () =>
      panels.forEach((p) => {
        p.style.top = desktop ? "0px" : `${Math.min(0, window.innerHeight - p.offsetHeight)}px`;
      });
    setTops();
    ScrollTrigger.addEventListener("refreshInit", setTops);
    panels.forEach((panel, i) => {
      const next = panels[i + 1];
      if (!next) return;
      gsap.to(panel.querySelector("[data-panel-inner]"), {
        scale: 0.92,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
      });
    });
    return () => {
      ScrollTrigger.removeEventListener("refreshInit", setTops);
      panels.forEach((p) => (p.style.top = ""));
    };
  }, ref);

  return (
    <section ref={ref} id="services" className="bg-navy text-ivory">
      <div className="container-x pb-14 pt-24 md:pb-20 md:pt-20">
        <SectionLabel num="02">What we do</SectionLabel>
        <div className="mt-8 grid items-end gap-8 lg:grid-cols-12">
          <SplitText
            as="h2"
            text={"Four divisions.\nOne *obsession.*"}
            className="display text-huge lg:col-span-8"
          />
          <p className="max-w-md text-lead text-ivory/80 lg:col-span-4">
            Build it, design it, brand it, grow it. Pick one division or bring the whole madhouse.
          </p>
        </div>
      </div>

      <div>
        {services.map((s, i) => (
          <Panel key={s.id} s={s} index={i} />
        ))}
      </div>
    </section>
  );
}

function Panel({ s, index }: { s: Service; index: number }) {
  const look = looks[s.id];
  return (
    <article
      data-panel
      id={`panel-${s.id}`}
      className={cn("group sticky top-0 min-h-svh lg:h-svh rounded-t-[2rem] md:rounded-t-[4rem]", look.panel, look.text, "on-" + look.tone)}
    >
      <div data-panel-inner className="container-x flex min-h-svh flex-col justify-center py-16 will-change-transform lg:h-full lg:min-h-0 lg:py-0">
        <div className={cn("grid items-center gap-10 lg:grid-cols-12 lg:gap-16", look.flip && "lg:[&>*:first-child]:order-2")}>
          {/* Art */}
          <div className="lg:col-span-5">
            <ServiceArt id={s.id} tone={look.tone} className="mx-auto aspect-square w-full max-w-[min(68%,40svh)] sm:max-w-[min(100%,56svh)] lg:max-w-[min(100%,62svh)]" />
          </div>

          {/* Copy */}
          <div className="lg:col-span-7">
            <div className="flex items-baseline gap-4">
              <Counter to={index + 1} pad={2} className={cn(look.stroke, "display text-[clamp(3.5rem,9vw,9rem)] leading-[0.8] text-transparent")} />
              <span className="label opacity-90">/ 04 · {s.kicker}</span>
            </div>
            <h3 className="display mt-6 text-[clamp(2.6rem,7.5vw,7.5rem)] leading-[0.9]">
              MAD<span className="font-light">BYTE</span>
              <br />
              <span className="opacity-100">{s.division}</span>
            </h3>
            <p className={cn("mt-6 max-w-xl text-lead", look.muted)}>{s.short}</p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {s.offerings.map((o) => (
                <li key={o} className={cn("label border-b pb-1.5", look.line)}>
                  {o}
                </li>
              ))}
            </ul>
            <TransitionLink
              href={`/services#${s.id}`}
              className="mt-10 inline-flex items-center gap-3 text-sm font-semibold"
            >
              <span className="u-link">Explore {s.division}</span>
              <span className="grid size-10 place-items-center rounded-full border border-current transition-transform duration-500 group-hover:translate-x-1">
                <ArrowRight aria-hidden className="size-4" />
              </span>
            </TransitionLink>
          </div>
        </div>
      </div>
    </article>
  );
}
