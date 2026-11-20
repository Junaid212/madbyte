import { pillars } from "@/data/content";
import { SplitText } from "@/components/ui/SplitText";
import { ScrubText } from "@/components/ui/ScrubText";
import { Reveal } from "@/components/ui/Reveal";
import { Divider } from "@/components/ui/Divider";
import { Counter } from "@/components/ui/Counter";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Parallax } from "@/components/ui/Parallax";

export function Intro() {
  return (
    <section className="on-light relative -mt-10 rounded-t-[2rem] bg-ivory pb-24 pt-20 text-navy md:-mt-16 md:rounded-t-[4rem] md:pb-40 md:pt-32">
      <div className="container-x">
        <SectionLabel num="01">The MADBYTE approach</SectionLabel>

        <SplitText
          text={"We don't\ndo *ordinary.*"}
          as="h2"
          accentClassName="text-navy-2 italic"
          className="display mt-8 text-huge"
        />

        <div className="mt-16 grid gap-14 md:mt-24 lg:grid-cols-12">
          <div className="relative lg:col-span-4">
            <Parallax distance={-60}>
              <dl className="grid grid-cols-3 gap-4 lg:grid-cols-1 lg:gap-10">
                {[
                  { n: 4, l: "Divisions, one studio" },
                  { n: 6, l: "Founders, hands-on" },
                  { n: 1, l: "Mad vision" },
                ].map((s) => (
                  <div key={s.l}>
                    <dt className="sr-only">{s.l}</dt>
                    <dd>
                      <Counter to={s.n} pad={2} className="display block text-[clamp(2.6rem,6vw,5.5rem)] leading-none" />
                      <span className="label mt-2 block text-navy-2">{s.l}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Parallax>
          </div>

          <div className="lg:col-span-8">
            <ScrubText
              className="text-[clamp(1.5rem,3vw,2.9rem)] font-medium leading-[1.2] tracking-tight"
              text="MADBYTE lives where creative thinking, intelligent technology and business strategy overlap. Most agencies pick one. We think the interesting work happens when all three share a table: a brand that understands how the software works, software that looks like it was designed on purpose, and a strategy that ties both to something your business actually wants. It's a little mad. It also happens to work."
            />
          </div>
        </div>

        <div className="mt-20 md:mt-32">
          <Divider />
          <Reveal variant="children" className="grid gap-10 pt-10 md:grid-cols-3 md:gap-14">
            {pillars.map((p, i) => (
              <div key={p.title} className="md:[&:nth-child(2)]:mt-12 md:[&:nth-child(3)]:mt-24">
                <p className="label text-navy-2">0{i + 1}</p>
                <h3 className="display mt-3 text-[clamp(1.5rem,2.4vw,2.2rem)] leading-[1.05]">{p.title}</h3>
                <p className="mt-3 max-w-xs text-navy-2">{p.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
