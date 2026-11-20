import type { Metadata } from "next";
import { team, values } from "@/data/content";
import { PageHero } from "@/components/ui/PageHero";
import { SplitText } from "@/components/ui/SplitText";
import { ScrubText } from "@/components/ui/ScrubText";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { Divider } from "@/components/ui/Divider";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectArt } from "@/components/ui/ProjectArt";
import { CtaBand } from "@/components/ui/CtaBand";
import { TeamAvatar } from "@/components/about/TeamAvatar";

export const metadata: Metadata = {
  title: "About",
  description:
    "Six founders, four disciplines, one slightly mad vision. Meet the independent creative technology studio behind MADBYTE.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About MADBYTE"
        title={"Creative enough\nto be *mad.*\nSkilled enough\nto deliver."}
        intro="We're an independent studio of six founders who got tired of choosing between work that's interesting and work that's dependable. So we built a company that does both."
      />

      {/* Story */}
      <section className="on-light relative -mt-10 rounded-t-[2rem] bg-ivory py-24 text-navy md:-mt-16 md:rounded-t-[4rem] md:py-40">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel num="01">Our story</SectionLabel>
            <SplitText as="h2" text={"It started with\na bad *brief.*"} accentClassName="text-navy-2 italic" className="display mt-8 text-big" />
            <Parallax distance={-70} className="mt-14 hidden lg:block">
              <Reveal variant="clip" className="aspect-[4/5] w-[78%] overflow-hidden">
                <ProjectArt kind="blocks" theme="navy" className="size-full" />
              </Reveal>
            </Parallax>
          </div>
          <div className="space-y-10 lg:col-span-7 lg:pt-24">
            <ScrubText
              className="text-[clamp(1.4rem,2.6vw,2.4rem)] font-medium leading-[1.25] tracking-tight"
              text="Before MADBYTE, we worked in places where design, engineering and marketing sat on different floors and communicated by ticket. Good ideas arrived at the other end flattened. Great engineering shipped wearing the wrong clothes. We decided there had to be a better way to work, so we started a studio where everyone shares one room and one goal."
            />
            <Reveal className="grid gap-8 text-navy-2 md:grid-cols-2">
              <p>
                Today MADBYTE is four divisions under one roof: Build, Design, Create and Grow.
                Each can stand alone. Together they cover the whole journey from a first sketch
                to the thousandth customer.
              </p>
              <p>
                We take on fewer projects than we could, so each one gets people who care and
                the time to do it properly. That&apos;s the whole business model. It&apos;s
                refreshingly simple.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Brand meaning */}
      <section className="relative overflow-hidden bg-navy text-ivory">
        <div className="grid min-h-[80svh] md:grid-cols-2">
          <Reveal variant="fade" className="relative flex flex-col justify-between border-b border-ivory/15 p-8 md:border-b-0 md:border-r md:p-16">
            <p className="label text-champagne">The name, part one</p>
            <div className="py-20">
              <h2 className="display text-[clamp(5rem,17vw,16rem)] leading-[0.8]">
                MAD
              </h2>
              <p className="mt-8 max-w-sm text-lead text-ivory/80">
                Unconventional creativity. The refusal to accept the first idea, the safe idea, the
                idea everyone else already had.
              </p>
            </div>
            <p className="label text-ivory/85">Ideas · Instinct · Nerve</p>
          </Reveal>
          <Reveal variant="fade" delay={0.15} className="relative flex flex-col justify-between bg-navy-2 p-8 md:p-16">
            <p className="label text-champagne">The name, part two</p>
            <div className="py-20">
              <h2 className="display text-[clamp(5rem,17vw,16rem)] font-light leading-[0.8]">
                BYTE
              </h2>
              <p className="mt-8 max-w-sm text-lead text-ivory/80">
                Technology and intelligent execution. Precise, tested, scalable, and built by people
                who sweat the details nobody sees.
              </p>
            </div>
            <p className="label text-ivory/85">Code · Craft · Rigour</p>
          </Reveal>
        </div>
        <div className="container-x py-16 text-center md:py-24">
          <SplitText as="p" text={"MAD gets you noticed.\nBYTE gets it *done.*"} className="display text-big" />
        </div>
      </section>

      {/* Team */}
      <section className="on-light bg-mist py-24 text-navy md:py-40">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel num="02">The six</SectionLabel>
              <SplitText as="h2" text={"Meet the\n*founders.*"} accentClassName="text-navy-2 italic" className="display mt-8 text-huge" />
            </div>
            <p className="label border border-navy/40 px-4 py-2 text-navy-2">
              Editable placeholders · edit src/data/content.ts
            </p>
          </div>

          <Reveal variant="children" stagger={0.08} className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-3">
            {team.map((m, i) => (
              <article key={m.name} className={i % 3 === 1 ? "lg:mt-16" : i % 3 === 2 ? "lg:mt-32" : ""}>
                <TeamAvatar index={i} />
                <p className="label mt-5 text-navy-2">0{i + 1} · {m.role}</p>
                <h3 className="display mt-2 text-[clamp(1.4rem,2.2vw,2rem)]">{m.name}</h3>
                <p className="mt-3 max-w-xs text-sm text-navy-2">{m.bio}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Mission / vision / values */}
      <section className="bg-navy py-24 text-ivory md:py-40">
        <div className="container-x">
          <div className="grid gap-16 md:grid-cols-2 md:gap-24">
            <Reveal>
              <p className="label text-champagne">Mission</p>
              <p className="display mt-6 text-[clamp(1.8rem,3.4vw,3.2rem)] leading-[1.05]">
                To make ambitious businesses impossible to ignore, online and in the real world.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="label text-champagne">Vision</p>
              <p className="display mt-6 text-[clamp(1.8rem,3.4vw,3.2rem)] leading-[1.05]">
                A world where &ldquo;digital transformation&rdquo; means something people actually enjoy.
              </p>
            </Reveal>
          </div>

          <div className="mt-24 md:mt-36">
            <SectionLabel num="03">What we stand for</SectionLabel>
            <ul className="mt-10">
              {values.map((v, i) => (
                <li key={v.title}>
                  <Divider />
                  <Reveal className="group grid items-baseline gap-3 py-7 md:grid-cols-12 md:gap-8 md:py-9">
                    <span className="label text-champagne md:col-span-1">0{i + 1}</span>
                    <h3 className="display text-[clamp(1.8rem,4vw,3.6rem)] leading-none transition-transform duration-500 group-hover:translate-x-3 md:col-span-6">
                      {v.title}
                    </h3>
                    <p className="text-ivory/75 md:col-span-5">{v.text}</p>
                  </Reveal>
                </li>
              ))}
              <li>
                <Divider />
              </li>
            </ul>
          </div>
        </div>
      </section>

      <CtaBand
        title={"Let's work\n*together.*"}
        text="Tell us what you're building, or what's broken. Either is a good start."
        cta="Start a Project"
      />
    </>
  );
}
