import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-svh items-center overflow-hidden bg-navy pb-20 pt-36 text-ivory">
      <div className="container-x">
        <p className="label text-champagne">Error 404</p>
        <SplitText as="h1" text={"Even we\ncan't find *that.*"} trigger="load" className="display mt-6 text-mega" />
        <p className="mt-8 max-w-md text-lead text-ivory/80">
          The page you&apos;re after has moved, vanished, or never existed. Slightly mad, we know.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <MagneticButton href="/">Back to home</MagneticButton>
          <MagneticButton href="/work" variant="ghost-light">See our work</MagneticButton>
        </div>
      </div>
    </section>
  );
}
