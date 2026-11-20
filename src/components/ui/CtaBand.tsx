import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";

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
    <section className="on-light relative overflow-hidden bg-champagne py-28 text-navy md:py-44">
      <Parallax distance={-120} className="pointer-events-none absolute -right-[12vw] top-1/2 -translate-y-1/2">
        <svg aria-hidden viewBox="0 0 400 400" className="spin-slow size-[min(70vw,680px)] opacity-[0.14]">
          <circle cx="200" cy="200" r="190" fill="none" stroke="#182D4C" strokeWidth="2" strokeDasharray="3 9" />
          <circle cx="200" cy="200" r="120" fill="none" stroke="#182D4C" strokeWidth="2" />
          <rect x="140" y="140" width="120" height="120" fill="#182D4C" />
        </svg>
      </Parallax>
      <div className="container-x relative">
        <SplitText as="h2" text={title} accentClassName="text-navy-2 italic" className="display text-mega" />
        <Reveal className="mt-10 flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
          <p className="max-w-sm text-lead font-medium">{text}</p>
          <MagneticButton href={href} variant="navy" className="px-9 py-5 text-base">
            {cta}
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
