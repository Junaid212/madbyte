import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import { BlueprintGallery } from "@/components/work/BlueprintGallery";
import { blueprintPoints } from "@/data/blueprints";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Capability blueprints from MADBYTE: the systems, interfaces and growth engines we architect from scratch, from operations software to brand identity and paid acquisition.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        label="03 / Capability Blueprints"
        title={"Engineered to ship.\n*Ready to build.*"}
        intro="MADBYTE is a new studio backed by 2+ years of real-world product, brand, and growth execution. Instead of recycled agency case studies, explore the exact systems, interfaces, and growth engines we architect from scratch."
      />

      <section className="on-light relative -mt-10 rounded-t-[2rem] bg-ivory pb-24 pt-14 text-navy md:-mt-16 md:rounded-t-[4rem] md:pb-36 md:pt-20">
        <div className="container-x">
          <h2 className="sr-only">Capability blueprints</h2>
          <BlueprintGallery />
        </div>
      </section>

      <section className="bg-navy py-20 text-ivory md:py-28">
        <div className="container-x">
          <SectionLabel>Why start with a blueprint?</SectionLabel>
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
            {blueprintPoints.map((p, i) => (
              <li key={p.title}>
                <Reveal delay={i * 0.1} className="border-t border-ivory/20 pt-6">
                  <span className="label text-champagne">0{i + 1}</span>
                  <h3 className="display mt-4 text-[clamp(1.5rem,2.4vw,2.2rem)] leading-[1.02]">{p.title}</h3>
                  <p className="mt-4 max-w-sm text-ivory/75">{p.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title={"Have something\nspecific you need\n*built?*"}
        text="Pick a blueprint above or bring us a blank slate. Tell us what you're launching, and we'll map out the exact build."
        cta="Start a Project"
      />
    </>
  );
}
