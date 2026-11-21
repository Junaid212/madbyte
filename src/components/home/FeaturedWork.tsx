"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/work/ProjectCard";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { SplitText } from "@/components/ui/SplitText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";

const featured = projects.slice(0, 6);

export function FeaturedWork() {
  const [viewport, embla] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", dragFree: false });
  const [index, setIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const bar = useRef<HTMLDivElement>(null);

  const sync = useCallback(() => {
    if (!embla) return;
    setIndex(embla.selectedScrollSnap());
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  const progress = useCallback(() => {
    if (!embla || !bar.current) return;
    const p = Math.max(0, Math.min(1, embla.scrollProgress()));
    bar.current.style.transform = `scaleX(${0.12 + p * 0.88})`;
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    const raf = requestAnimationFrame(() => {
      sync();
      progress();
    });
    embla.on("select", sync).on("reInit", sync).on("scroll", progress).on("reInit", progress);
    return () => {
      cancelAnimationFrame(raf);
      embla.off("select", sync).off("reInit", sync).off("scroll", progress).off("reInit", progress);
    };
  }, [embla, sync, progress]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") embla?.scrollNext();
    if (e.key === "ArrowLeft") embla?.scrollPrev();
  };

  return (
    <section id="work" className="on-light relative bg-mist py-24 text-navy md:py-20">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionLabel num="03">Selected work</SectionLabel>
            <SplitText as="h2" text={"Ideas,\n*shipped.*"} accentClassName="text-navy-2 italic" className="display mt-8 text-huge" />
          </div>
          <div className="max-w-sm">
            <p className="text-navy-2">
              A first look at what we make. These are concept projects we designed to show our
              thinking, not client work.
            </p>
          </div>
        </div>
      </div>

      <div
        className="mt-14 md:mt-20"
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured concept projects"
        tabIndex={0}
        onKeyDown={onKey}
      >
        <div ref={viewport} className="overflow-hidden pl-[clamp(1.25rem,4vw,4rem)]" data-cursor="Drag">
          <div className="flex touch-pan-y gap-5 md:gap-8">
            {featured.map((p, i) => (
              <div
                key={p.slug}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${featured.length}`}
                className="min-w-0 flex-[0_0_82%] sm:flex-[0_0_52%] lg:flex-[0_0_36%] xl:flex-[0_0_30%]"
              >
                <ProjectCard project={p} index={i} tone="light" cursor="View" aspect={i % 2 ? "aspect-[4/5]" : "aspect-[4/5] lg:mt-16"} />
              </div>
            ))}
            <div className="flex-[0_0_1px]" aria-hidden />
          </div>
        </div>

        <div className="container-x mt-12 flex items-center gap-6 md:gap-10">
          <div className="display flex items-baseline gap-2 overflow-hidden text-[clamp(1.8rem,3vw,2.6rem)] leading-none">
            <span className="relative inline-block h-[1em] w-[1.3em] overflow-hidden" aria-live="polite">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={index}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  {String(index + 1).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="label text-navy-2">/ {String(featured.length).padStart(2, "0")}</span>
          </div>
          <div className="h-px flex-1 bg-navy/20" aria-hidden>
            <div ref={bar} className="h-full origin-left bg-navy transition-transform duration-200" style={{ transform: "scaleX(0.12)" }} />
          </div>
          <CarouselControls
            tone="light"
            label="project"
            canPrev={canPrev}
            canNext={canNext}
            onPrev={() => embla?.scrollPrev()}
            onNext={() => embla?.scrollNext()}
          />
        </div>
      </div>

      <Reveal className="container-x mt-16 flex justify-center md:mt-24">
        <MagneticButton href="/work" variant="navy">
          View all projects
        </MagneticButton>
      </Reveal>
    </section>
  );
}
