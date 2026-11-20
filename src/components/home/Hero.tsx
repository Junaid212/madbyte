"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useScrollMotion } from "@/hooks/useScrollMotion";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useScrollMotion(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el.querySelectorAll("[data-intro]"),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.12, delay: 0.9 },
    );
    // Gentle exit parallax: content drifts up and fades as the next section arrives.
    gsap.to(el.querySelector("[data-hero-content]"), {
      yPercent: -12,
      opacity: 0.2,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
    });
  }, ref);

  return (
    <section
      ref={ref}
      className="hero-section grain relative isolate flex min-h-svh flex-col overflow-hidden bg-navy pb-12 pt-28 text-ivory md:pt-32"
    >
      {/* blueprint grid */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#EFEFED 1px, transparent 1px), linear-gradient(90deg, #EFEFED 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          maskImage: "radial-gradient(ellipse at 70% 40%, black, transparent 70%)",
        }}
      />
      <div aria-hidden className="absolute -right-40 top-1/4 -z-10 size-[60vw] rounded-full bg-navy-2/60 blur-3xl" />

      <div data-hero-content className="container-x relative flex flex-1 flex-col justify-center">
        {/* Mobile order: label, title, artwork, description, CTAs. Desktop: text left, artwork right. */}
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-y-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
          <div className="relative z-10 lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:self-end">
            <p data-intro className="label mb-5 text-champagne md:mb-6">
              Creative Technology &amp; Digital Transformation
            </p>
            <h1 className="display text-mega lg:text-[clamp(3rem,6vw,7rem)]">
              <SplitText as="span" text={"A little *mad.*\nA lot brilliant."} trigger="load" delay={0.2} stagger={0.09} className="block" />
            </h1>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
            <HeroVisual scopeRef={ref} />
          </div>

          <div className="relative z-10 lg:col-span-7 lg:col-start-1 lg:row-start-2 lg:self-start">
            <p data-intro className="max-w-xl text-lead text-ivory/85 lg:mt-6">
              We turn unconventional ideas into exceptional digital experiences. From intelligent
              software to unforgettable brands, we build what moves businesses forward.
            </p>
            <div data-intro className="mt-7 flex flex-nowrap gap-2.5 sm:gap-3 [&>span]:min-w-0 [&>span]:flex-1 sm:[&>span]:flex-none [&>span>a]:flex">
              <MagneticButton href="/work" variant="champagne" className="min-w-0 flex-1 justify-center !gap-2 whitespace-nowrap px-3 py-3.5 text-[0.78rem] sm:flex-none sm:px-7 sm:py-4 sm:text-sm [&_svg]:hidden sm:[&_svg]:block">
                Explore Our Work
              </MagneticButton>
              <MagneticButton href="/contact" variant="ghost-light" className="min-w-0 flex-1 justify-center !gap-2 whitespace-nowrap px-3 py-3.5 text-[0.78rem] sm:flex-none sm:px-7 sm:py-4 sm:text-sm [&_svg]:hidden sm:[&_svg]:block">
                Start a Project
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* <div data-intro className="container-x relative mt-12 hidden items-center justify-between md:flex">
        <div className="label flex items-center gap-4 text-ivory/70">
          <span className="relative block h-12 w-px overflow-hidden bg-ivory/25" aria-hidden>
            <span className="absolute inset-x-0 top-0 h-1/2 bg-champagne [animation:scroll-cue_2.2s_cubic-bezier(.7,0,.3,1)_infinite]" />
          </span>
          Scroll
        </div>
        <p className="label text-ivory/60">Independent studio · Six founders</p>
      </div> */}
    </section>
  );
}
