import { ArrowUpRight } from "lucide-react";
import { getService, type Service } from "@/data/services";
import { cn } from "@/lib/cn";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { Divider } from "@/components/ui/Divider";
import { Parallax } from "@/components/ui/Parallax";
import { ServiceArt } from "@/components/ui/ServiceArt";
import { TransitionLink } from "@/components/ui/TransitionLink";

const enquire = (s: Service) => `/contact?service=${s.id}`;

function Related({ s, muted }: { s: Service; muted: string }) {
  return (
    <div className="mt-16 md:mt-24">
      <p className="label opacity-90">Pairs well with</p>
      <ul className="mt-5 grid gap-6 md:grid-cols-2">
        {s.related.map((r) => {
          const rs = getService(r.id);
          return (
            <li key={r.id}>
              <TransitionLink href={`/services#${r.id}`} className="group block">
                <span className="display flex items-center gap-2 text-xl">
                  <span className="u-link">{rs.name}</span>
                  <ArrowUpRight aria-hidden className="size-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
                <span className={cn("mt-2 block max-w-sm text-sm", muted)}>{r.why}</span>
              </TransitionLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function EnquireLink({ s, className }: { s: Service; className?: string }) {
  return (
    <TransitionLink
      href={enquire(s)}
      className={cn("inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-semibold transition-colors duration-300", className)}
    >
      Enquire about {s.division}
      <ArrowUpRight aria-hidden className="size-4" />
    </TransitionLink>
  );
}

/* 01 · BUILD — dark split with sticky title and a terminal-style deliverables list */
export function BuildSection({ s }: { s: Service }) {
  return (
    <section id={s.id} className="relative scroll-mt-0 bg-navy-2 py-24 text-ivory md:py-20 rounded-t-[2rem] md:rounded-t-[4rem]">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="label text-champagne">{s.num} · {s.kicker}</p>
            <h2 className="display mt-6 text-big">
              <SplitText as="span" text={`${s.name.replace("MADBYTE ", "MADBYTE\n")}`} className="block" />
            </h2>
            <p className="mt-6 text-lead text-ivory/85">{s.headline}</p>
            <p className="mt-6 max-w-md text-ivory/75">{s.description}</p>
            <ServiceArt id="build" className="group mt-12 hidden w-[min(100%,360px)] lg:block" />
            <div className="mt-10">
              <EnquireLink s={s} className="bg-champagne text-navy hover:bg-ivory" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 lg:pt-10">
          <p className="label text-champagne">What we build</p>
          <Reveal as="ul" variant="children" stagger={0.06} className="mt-6 grid grid-cols-2 gap-px bg-ivory/15 sm:grid-cols-3">
            {s.offerings.map((o) => (
              <li key={o} className="bg-navy-2 p-5 transition-colors duration-300 hover:bg-navy">
                <span className="display text-lg leading-tight">{o}</span>
              </li>
            ))}
          </Reveal>

          <p className="label mt-14 text-champagne">Deliverables</p>
          <ol className="mt-4 font-mono text-sm">
            {s.deliverables.map((d, i) => (
              <li key={d}>
                <Divider />
                <Reveal className="flex gap-5 py-4">
                  <span className="text-champagne">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-ivory/85">{d}</span>
                </Reveal>
              </li>
            ))}
          </ol>

          <p className="label mt-14 text-champagne">What it does for your business</p>
          <Reveal variant="children" className="mt-6 grid gap-8 md:grid-cols-3">
            {s.benefits.map((b) => (
              <div key={b.title}>
                <h3 className="display text-xl leading-tight">{b.title}</h3>
                <p className="mt-2 text-sm text-ivory/70">{b.text}</p>
              </div>
            ))}
          </Reveal>
          <Related s={s} muted="text-ivory/70" />
        </div>
      </div>
    </section>
  );
}

/* 02 · DESIGN — light, outlined giant title bleeding off the edge, boxed deliverables */
export function DesignSection({ s }: { s: Service }) {
  return (
    <section id={s.id} className="on-light relative overflow-hidden bg-ivory py-24 text-navy md:py-20">
      <Parallax distance={-160} className="pointer-events-none absolute left-0 top-10 w-full select-none">
        <p aria-hidden className="display whitespace-nowrap text-[clamp(8rem,28vw,30rem)] leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(24,45,76,0.18)]">
          DESIGN DESIGN
        </p>
      </Parallax>
      <div className="container-x relative">
        <p className="label text-navy-2">{s.num} · {s.kicker}</p>
        <div className="mt-8 grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SplitText as="h2" text={"MADBYTE\n*Design*"} accentClassName="text-navy-2 italic" className="display text-huge" />
            <p className="mt-8 max-w-xl text-lead font-medium">{s.headline}</p>
            <p className="mt-5 max-w-xl text-navy-2">{s.description}</p>
            <div className="mt-10 flex flex-wrap gap-2">
              {s.offerings.map((o) => (
                <span key={o} className="label border border-navy/40 px-4 py-2">{o}</span>
              ))}
            </div>
          </div>
          <div className="group lg:col-span-5">
            <ServiceArt id="design" tone="light" className="mx-auto w-full max-w-[460px]" />
          </div>
        </div>

        <div className="mt-20 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="label text-navy-2">Deliverables</p>
            <Reveal as="ul" variant="children" stagger={0.07} className="mt-6 grid gap-px bg-navy/20 sm:grid-cols-2">
              {s.deliverables.map((d, i) => (
                <li key={d} className="flex gap-4 bg-ivory p-6">
                  <span className="label text-navy-2">0{i + 1}</span>
                  <span className="font-medium">{d}</span>
                </li>
              ))}
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <p className="label text-navy-2">Why it matters</p>
            <ul className="mt-6 space-y-8">
              {s.benefits.map((b) => (
                <li key={b.title}>
                  <Divider className="mb-6" />
                  <Reveal>
                    <h3 className="display text-2xl leading-tight">{b.title}</h3>
                    <p className="mt-2 text-navy-2">{b.text}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Related s={s} muted="text-navy-2" />
        <div className="mt-12">
          <EnquireLink s={s} className="bg-navy text-ivory hover:bg-navy-2" />
        </div>
      </div>
    </section>
  );
}

/* 03 · CREATE — champagne poster composition */
export function CreateSection({ s }: { s: Service }) {
  return (
    <section id={s.id} className="on-light relative overflow-hidden bg-champagne py-24 text-navy md:py-20">
      <div className="container-x relative">
        <div className="flex items-start justify-between gap-6">
          <p className="label">{s.num} · {s.kicker}</p>
          <p className="label hidden md:block">Brand · Logo · Print · Campaign</p>
        </div>
        <div className="relative mt-10">
          <SplitText as="h2" text={"MADBYTE\nCREATE"} className="display text-[clamp(3.4rem,13vw,14rem)] leading-[0.82]" />
          <Parallax distance={-90} className="pointer-events-none absolute -right-4 top-0 hidden w-[34%] lg:block">
            <div className="group">
              <ServiceArt id="create" tone="light" className="w-full" />
            </div>
          </Parallax>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:col-start-1">
            <p className="text-lead font-medium">{s.headline}</p>
            <p className="mt-5 text-navy/80">{s.description}</p>
            <div className="mt-8">
              <EnquireLink s={s} className="bg-navy text-ivory hover:bg-navy-2" />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="label">Deliverables</p>
            <Reveal as="ul" variant="children" stagger={0.05} className="mt-6 flex flex-wrap gap-3">
              {s.deliverables.map((d) => (
                <li key={d} className="rounded-full border border-navy px-5 py-2.5 text-sm font-medium transition-colors duration-300 hover:bg-navy hover:text-champagne">
                  {d}
                </li>
              ))}
            </Reveal>
            <div className="mt-14 grid gap-8 sm:grid-cols-3">
              {s.benefits.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.08}>
                  <h3 className="display text-xl leading-tight">{b.title}</h3>
                  <p className="mt-2 text-sm text-navy/80">{b.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 lg:ml-[41.6%]">
          <Related s={s} muted="text-navy/80" />
        </div>
      </div>
    </section>
  );
}

/* 04 · GROW — dark, statement-style benefits and a rising bar chart */
export function GrowSection({ s }: { s: Service }) {
  return (
    <section id={s.id} className="relative overflow-hidden bg-navy py-24 text-ivory md:py-20">
      <div className="container-x">
        <p className="label text-champagne">{s.num} · {s.kicker}</p>
        <div className="mt-8 grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SplitText as="h2" text={"MADBYTE\n*Grow*"} className="display text-huge" />
            <p className="mt-8 max-w-2xl text-big leading-[1.05] tracking-tight">{s.headline}</p>
          </div>
          <div className="group lg:col-span-4">
            <ServiceArt id="grow" className="mx-auto w-full max-w-[420px]" />
          </div>
        </div>

        <div className="mt-20 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="max-w-md text-ivory/80">{s.description}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {s.offerings.map((o) => (
                <span key={o} className="label border border-ivory/30 px-4 py-2">{o}</span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            {s.benefits.map((b, i) => (
              <div key={b.title}>
                <Divider />
                <Reveal className="grid gap-3 py-8 md:grid-cols-[5rem_1fr_1.2fr] md:items-baseline md:gap-8">
                  <span className="display text-4xl text-champagne">0{i + 1}</span>
                  <h3 className="display text-2xl leading-tight">{b.title}</h3>
                  <p className="text-ivory/75">{b.text}</p>
                </Reveal>
              </div>
            ))}
            <Divider />
          </div>
        </div>

        <div className="mt-16">
          <p className="label text-champagne">Deliverables</p>
          <Reveal as="ul" variant="children" stagger={0.06} className="mt-6 grid gap-x-10 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
            {s.deliverables.map((d) => (
              <li key={d} className="flex gap-3 border-t border-ivory/20 pt-4">
                <span aria-hidden className="mt-2 inline-block size-2 shrink-0 rotate-45 bg-champagne" />
                <span>{d}</span>
              </li>
            ))}
          </Reveal>
        </div>
        <Related s={s} muted="text-ivory/70" />
        <div className="mt-12">
          <EnquireLink s={s} className="bg-champagne text-navy hover:bg-ivory" />
        </div>
      </div>
    </section>
  );
}
