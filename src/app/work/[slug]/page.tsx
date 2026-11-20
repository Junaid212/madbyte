import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { Divider } from "@/components/ui/Divider";
import { Parallax } from "@/components/ui/Parallax";
import { ProjectArt } from "@/components/ui/ProjectArt";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaBand } from "@/components/ui/CtaBand";
import { TransitionLink } from "@/components/ui/TransitionLink";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title} (concept)`,
    description: `${p.tagline} ${p.summary}`,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title: `${p.title} | MADBYTE concept project`, description: p.tagline },
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(i + 1) % projects.length];

  return (
    <>
      <section className="grain relative isolate overflow-hidden bg-navy pb-16 pt-36 text-ivory md:pb-24 md:pt-48">
        <div className="container-x">
          <TransitionLink href="/work" className="label u-link inline-block">
            ← All work
          </TransitionLink>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="label bg-champagne px-3 py-1.5 text-navy">Concept project</span>
            <span className="label text-champagne">{p.category}</span>
          </div>
          <SplitText as="h1" text={p.title} trigger="load" delay={0.1} className="display mt-6 text-mega" />
          <p className="mt-8 max-w-2xl text-big leading-[1.05] tracking-tight text-ivory/90">{p.tagline}</p>
        </div>
      </section>

      <div className="relative z-10 bg-ivory">
        <Reveal variant="clip" className="aspect-[4/3] w-full overflow-hidden md:aspect-[21/9]">
          <ProjectArt kind={p.art.kind} theme={p.art.theme} className="size-full" />
        </Reveal>
      </div>

      <section className="on-light bg-ivory py-20 text-navy md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <dl className="space-y-6">
              {[
                ["Category", p.category],
                ["Services", p.services.join(" · ")],
                ["Status", `${p.year}`],
                ["Client", "None. Self-initiated concept"],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-navy/25 pt-4">
                  <dt className="label text-navy-2">{k}</dt>
                  <dd className="mt-1 font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-navy-2">
              This is a demonstration concept. It was not built for, or delivered to, a real
              company.
            </p>
          </aside>

          <div className="space-y-24 lg:col-span-8">
            <Reveal>
              <SectionLabel num="01">Overview</SectionLabel>
              <p className="mt-6 text-[clamp(1.4rem,2.6vw,2.4rem)] font-medium leading-[1.25] tracking-tight">
                {p.overview}
              </p>
            </Reveal>

            <Reveal>
              <SectionLabel num="02">The challenge</SectionLabel>
              <p className="mt-6 max-w-2xl text-lead text-navy-2">{p.challenge}</p>
            </Reveal>

            <div>
              <SectionLabel num="03">Our approach</SectionLabel>
              <ol className="mt-6">
                {p.approach.map((a, n) => (
                  <li key={a}>
                    <Divider />
                    <Reveal className="grid grid-cols-[3rem_1fr] gap-4 py-6">
                      <span className="display text-2xl text-navy-2">0{n + 1}</span>
                      <p className="max-w-2xl text-lead">{a}</p>
                    </Reveal>
                  </li>
                ))}
                <li>
                  <Divider />
                </li>
              </ol>
            </div>

            <Reveal>
              <SectionLabel num="04">The solution</SectionLabel>
              <p className="mt-6 max-w-2xl text-lead text-navy-2">{p.solution}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-navy py-20 text-ivory md:py-32">
        <div className="container-x">
          <SectionLabel num="05">What we were aiming for</SectionLabel>
          <p className="mt-4 max-w-xl text-sm text-ivory/70">
            Concept goals, not measured results. Real outcomes will replace these once this kind of
            work ships for a client.
          </p>
          <Reveal variant="children" className="mt-12 grid gap-10 md:grid-cols-3">
            {p.outcomes.map((o, n) => (
              <div key={o.text} className="border-t border-champagne pt-6">
                <p className="label text-champagne">{o.label} 0{n + 1}</p>
                <p className="display mt-4 text-[clamp(1.4rem,2.2vw,2rem)] leading-tight">{o.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="on-light bg-mist py-20 text-navy md:py-32">
        <div className="container-x">
          <p className="label text-navy-2">Next project</p>
          <TransitionLink href={`/work/${next.slug}`} className="group mt-6 grid items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <span className="display flex items-center gap-4 text-huge leading-none">
                <span className="u-link">{next.title}</span>
                <ArrowUpRight aria-hidden className="size-[0.6em] shrink-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2" />
              </span>
              <span className="mt-4 block text-navy-2">{next.tagline}</span>
            </div>
            <Parallax distance={-40} className="md:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden">
                <ProjectArt kind={next.art.kind} theme={next.art.theme} className="size-full transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.08]" />
              </div>
            </Parallax>
          </TransitionLink>
        </div>
      </section>

      <CtaBand title={"Want something\nlike this?"} text="Tell us what you're imagining. We'll tell you how we'd build it." cta="Start a Project" />
    </>
  );
}
