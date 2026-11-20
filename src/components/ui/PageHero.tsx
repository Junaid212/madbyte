import { SplitText } from "@/components/ui/SplitText";
import { SectionLabel } from "@/components/ui/SectionLabel";

interface Props {
  label: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}

/** Dark editorial hero shared by inner pages. */
export function PageHero({ label, title, intro, children }: Props) {
  return (
    <section className="grain relative isolate overflow-hidden bg-navy pb-20 pt-36 text-ivory md:pb-32 md:pt-48">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#EFEFED 1px, transparent 1px), linear-gradient(90deg, #EFEFED 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          maskImage: "radial-gradient(ellipse at 80% 20%, black, transparent 70%)",
        }}
      />
      <div aria-hidden className="absolute -right-32 -top-32 -z-10 size-[50vw] rounded-full bg-navy-2/60 blur-3xl" />
      <div className="container-x">
        <SectionLabel>{label}</SectionLabel>
        <SplitText as="h1" text={title} trigger="load" delay={0.15} className="display mt-8 text-mega" />
        {intro && <p className="mt-10 max-w-2xl text-lead text-ivory/85">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
