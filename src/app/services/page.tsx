import type { Metadata } from "next";
import { getService } from "@/data/services";
import { PageHero } from "@/components/ui/PageHero";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { Divider } from "@/components/ui/Divider";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaBand } from "@/components/ui/CtaBand";
import { TransitionLink } from "@/components/ui/TransitionLink";
import {
  BuildSection,
  CreateSection,
  DesignSection,
  GrowSection,
} from "@/components/services/ServiceBlocks";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Build, Design, Create and Grow: web and mobile development, ERP systems, UI/UX, brand identity and digital marketing from one multidisciplinary studio.",
  alternates: { canonical: "/services" },
};

const combos = [
  { a: "Build", b: "Design", out: "Products people actually enjoy using", href: "/services#build" },
  { a: "Design", b: "Create", out: "One visual language, interface to billboard", href: "/services#design" },
  { a: "Create", b: "Grow", out: "Campaigns that look great and perform", href: "/services#create" },
  { a: "Build", b: "Grow", out: "Funnels and tools that measure themselves", href: "/services#grow" },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title={"Four divisions.\nNo *silos.*"}
        intro="Pick one when you know exactly what you need. Combine them when you want one team that sees the whole picture."
      >
        <nav aria-label="Service divisions" className="mt-14 flex flex-wrap gap-3">
          {["build", "design", "create", "grow"].map((id) => (
            <TransitionLink
              key={id}
              href={`/services#${id}`}
              className="label rounded-full border border-ivory/40 px-5 py-3 transition-colors duration-300 hover:border-champagne hover:bg-champagne hover:text-navy"
            >
              {getService(id as "build").name}
            </TransitionLink>
          ))}
        </nav>
      </PageHero>

      <BuildSection s={getService("build")} />
      <DesignSection s={getService("design")} />
      <CreateSection s={getService("create")} />
      <GrowSection s={getService("grow")} />

      {/* Cross-disciplinary */}
      <section className="on-light bg-mist py-24 text-navy md:py-40">
        <div className="container-x">
          <SectionLabel num="05">Better together</SectionLabel>
          <SplitText as="h2" text={"The mad\n*in-between.*"} accentClassName="text-navy-2 italic" className="display mt-8 text-huge" />
          <p className="mt-8 max-w-xl text-lead text-navy-2">
            The best work lives at the overlaps. Here&apos;s what happens when our divisions
            share a brief.
          </p>
          <ul className="mt-16">
            {combos.map((c) => (
              <li key={c.out}>
                <Divider />
                <Reveal>
                  <TransitionLink href={c.href} className="group grid items-baseline gap-2 py-8 md:grid-cols-12 md:gap-8 md:py-10">
                    <span className="display text-[clamp(1.8rem,4vw,3.6rem)] leading-none md:col-span-5">
                      {c.a} <span className="text-navy-2">+</span> {c.b}
                    </span>
                    <span className="text-lead md:col-span-6 md:col-start-7">{c.out}</span>
                    <span aria-hidden className="hidden transition-transform duration-500 group-hover:translate-x-2 md:col-span-1 md:block md:text-right">
                      →
                    </span>
                  </TransitionLink>
                </Reveal>
              </li>
            ))}
            <li>
              <Divider />
            </li>
          </ul>
        </div>
      </section>

      <CtaBand
        title={"Not sure what\nyou *need?*"}
        text="Tell us the problem. We'll tell you honestly which division, or combination, fits."
        cta="Enquire Now"
      />
    </>
  );
}
