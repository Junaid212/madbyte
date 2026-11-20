"use client";

import { useRef } from "react";
import { mindsValues } from "@/data/content";
import { gsap } from "@/lib/gsap";
import { useScrollMotion } from "@/hooks/useScrollMotion";
import { SplitText } from "@/components/ui/SplitText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Divider } from "@/components/ui/Divider";

const minds = ["Creative", "Tech", "Design", "Brand", "Growth", "Delivery"];

export function WhyMadbyte() {
  const visual = useRef<HTMLDivElement>(null);

  // Six separate discs drift together into one.
  useScrollMotion(({ desktop }) => {
    const el = visual.current;
    if (!el) return;
    const discs = gsap.utils.toArray<HTMLElement>("[data-mind]", el);
    const one = el.querySelector("[data-one]");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
        end: desktop ? "bottom 40%" : "bottom 55%",
        scrub: true,
      },
    });
    discs.forEach((d, i) => {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
      tl.fromTo(
        d,
        { x: Math.cos(a) * 0, y: Math.sin(a) * 0, scale: 0.9 },
        { x: -Math.cos(a) * 62, y: -Math.sin(a) * 62, scale: 0.86, ease: "power2.inOut" },
        0,
      );
    });
    tl.fromTo(one, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, ease: "power2.out" }, 0.55);
  }, visual);

  return (
    <section className="relative overflow-hidden bg-navy py-24 text-ivory md:py-40">
      <div className="container-x">
        <SectionLabel num="04">Why MADBYTE</SectionLabel>
        <div className="mt-8 grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <SplitText
              as="h2"
              text={"Six minds.\nOne *mad* vision."}
              className="display text-huge"
            />
            <Reveal className="mt-8 max-w-lg space-y-5 text-lead text-ivory/80">
              <p>
                Six founders, six different crafts: design, engineering, brand, growth, delivery and
                creative direction. We don&apos;t pass work down a conveyor belt. We argue about it
                together, early, while it&apos;s cheap to change.
              </p>
              <p>
                The result is work where the idea, the interface and the infrastructure all point
                the same way.
              </p>
            </Reveal>

            {/* Six become one */}
            <div ref={visual} aria-hidden className="relative mx-auto mt-16 aspect-square w-[min(80vw,440px)] lg:mx-0">
              <div className="absolute inset-[8%] rounded-full border border-dashed border-ivory/25" />
              {minds.map((m, i) => {
                const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
                return (
                  <div
                    key={m}
                    data-mind
                    className="absolute left-1/2 top-1/2 grid size-[27%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-champagne/70 bg-navy-2/80"
                    style={{
                      left: `${50 + Math.cos(a) * 36}%`,
                      top: `${50 + Math.sin(a) * 36}%`,
                    }}
                  >
                    <span className="label text-[0.6rem] text-champagne">{m}</span>
                  </div>
                );
              })}
              <div
                data-one
                className="absolute left-1/2 top-1/2 grid size-[38%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-champagne text-navy"
              >
                <span className="display text-xl">ONE</span>
              </div>
            </div>
          </div>

          <ol className="lg:col-span-6 lg:pt-6">
            {mindsValues.map((v, i) => (
              <li key={v.title}>
                <Divider />
                <Reveal className="grid grid-cols-[3rem_1fr] gap-4 py-8 md:grid-cols-[4rem_1fr] md:py-10">
                  <span className="label pt-2 text-champagne">0{i + 1}</span>
                  <div>
                    <h3 className="display text-[clamp(1.8rem,3.4vw,3.2rem)] leading-none">{v.title}</h3>
                    <p className="mt-3 max-w-md text-ivory/75">{v.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
            <li>
              <Divider />
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
