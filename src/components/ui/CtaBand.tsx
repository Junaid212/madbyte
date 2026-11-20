import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { Logo } from "@/components/layout/Logo";

interface Props {
  title?: string;
  text?: string;
  cta?: string;
  href?: string;
}

/** Closing call-to-action used at the end of every page. */
export function CtaBand({
  title = "Got a\ncrazy *idea?*",
  text = "Good. We like those.",
  cta = "Let's Build Something Brilliant",
  href = "/contact",
}: Props) {
  return (
    <section className="bg-navy px-3 py-4 sm:px-5 md:px-8 md:py-8">
      <div className="on-light relative mx-auto max-w-[1760px] overflow-hidden rounded-[1.5rem] bg-champagne py-12 text-navy md:rounded-[2.25rem] md:py-16">
      {/* Oversized faint logo watermark */}
      <Parallax distance={-60} className="pointer-events-none absolute -left-[4vw] top-1/2 -translate-y-1/2">
        <Logo aria-hidden className="!h-auto w-[min(125vw,1500px)] text-navy opacity-[0.08]" />
      </Parallax>
      {/* Solid logo, bottom right */}
      <Logo
        aria-hidden
        className="pointer-events-none absolute bottom-4 right-4 !h-auto w-[min(46vw,520px)] text-navy md:bottom-8 md:right-10"
      />
      <div className="relative px-6 md:px-12 lg:px-16">
        <SplitText as="h2" text={title} accentClassName="text-navy-2 italic" className="display text-[clamp(2.5rem,6.2vw,5.75rem)] leading-[0.92]" />
        <Reveal className="mt-4 flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
          <p className="max-w-sm text-lead font-medium">{text}</p>
          <MagneticButton href={href} variant="navy" className="px-9 py-5 text-base">
            {cta}
          </MagneticButton>
        </Reveal>
      </div>
      </div>
    </section>
  );
}
