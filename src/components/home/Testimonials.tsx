"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { testimonials } from "@/data/content";
import { cn } from "@/lib/cn";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";

export function Testimonials() {
  const [viewport, embla] = useEmblaCarousel({ loop: true, align: "start" });
  const [index, setIndex] = useState(0);

  const sync = useCallback(() => embla && setIndex(embla.selectedScrollSnap()), [embla]);
  useEffect(() => {
    if (!embla) return;
    const raf = requestAnimationFrame(sync);
    embla.on("select", sync).on("reInit", sync);
    return () => {
      cancelAnimationFrame(raf);
      embla.off("select", sync).off("reInit", sync);
    };
  }, [embla, sync]);

  return (
    <section className="on-light bg-ivory py-24 text-navy md:py-40">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel num="06">Kind words</SectionLabel>
            <SplitText as="h2" text={"What clients\nwill *say.*"} accentClassName="text-navy-2 italic" className="display mt-8 text-big" />
          </div>
          <p className="label border border-navy/40 px-4 py-2 text-navy-2">
            Placeholder content · not real clients
          </p>
        </div>

        <div
          className="mt-14 md:mt-20"
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials (placeholders)"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") embla?.scrollNext();
            if (e.key === "ArrowLeft") embla?.scrollPrev();
          }}
        >
          <div ref={viewport} className="overflow-hidden" data-cursor="Drag">
            <div className="flex touch-pan-y">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${testimonials.length}`}
                  className="min-w-0 flex-[0_0_100%] pr-6 md:pr-24"
                >
                  <span aria-hidden className="display block text-[clamp(5rem,12vw,11rem)] leading-[0.6] text-navy/15">
                    &ldquo;
                  </span>
                  <blockquote className="mt-4 max-w-4xl text-[clamp(1.4rem,3vw,2.8rem)] font-medium leading-[1.2] tracking-tight">
                    {t.quote}
                  </blockquote>
                  <div className="mt-8 flex items-center gap-4">
                    <span aria-hidden className="grid size-12 place-items-center rounded-full bg-navy text-champagne display text-lg">
                      ?
                    </span>
                    <span>
                      <span className="block font-semibold">{t.name}</span>
                      <span className="label text-navy-2">{t.role}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between">
            <div className="flex gap-2" aria-hidden>
              {testimonials.map((_, i) => (
                <span
                  key={i}
                  className={cn("h-1 rounded-full bg-navy transition-all duration-500", i === index ? "w-12" : "w-4 opacity-25")}
                />
              ))}
            </div>
            <CarouselControls
              tone="light"
              label="testimonial"
              canPrev
              canNext
              onPrev={() => embla?.scrollPrev()}
              onNext={() => embla?.scrollNext()}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
