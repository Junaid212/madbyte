import { mindsValues } from "@/data/content";
import { SplitText } from "@/components/ui/SplitText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Divider } from "@/components/ui/Divider";

const highlights = mindsValues.slice(0, 3);

/** Compact "why us" block: one headline, one line of copy, three proof points. */
export function WhyMadbyte() {
  return (
    <section className="relative overflow-hidden bg-navy py-14 text-ivory md:py-20">
      <div className="container-x">
        <SectionLabel num="04">Why MADBYTE</SectionLabel>
        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <SplitText as="h2" text={"Six minds.\nOne *mad* vision."} className="display text-big" />
            <Reveal className="mt-5 max-w-md text-ivory/80">
              <p>
                Six founders, six crafts, one table. We argue about the work early, while it&apos;s
                cheap to change.
              </p>
            </Reveal>
          </div>

          <ol className="lg:col-span-6">
            {highlights.map((v, i) => (
              <li key={v.title}>
                <Divider />
                <Reveal className="grid grid-cols-[2.5rem_1fr] gap-3 py-4 md:py-5">
                  <span className="label pt-1 text-champagne">0{i + 1}</span>
                  <div>
                    <h3 className="display text-[clamp(1.2rem,2vw,1.6rem)] leading-none">{v.title}</h3>
                    <p className="mt-2 max-w-md text-sm text-ivory/70">{v.text}</p>
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
