import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "@/data/site";
import { SplitText } from "@/components/ui/SplitText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with MADBYTE. Tell us what you're building and we'll reply within two working days.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="grain relative isolate overflow-hidden bg-navy pb-28 pt-36 text-ivory md:pb-44 md:pt-48">
      <div aria-hidden className="absolute -right-40 top-0 -z-10 size-[55vw] rounded-full bg-navy-2/60 blur-3xl" />
      <div className="container-x">
        <SectionLabel>Contact</SectionLabel>
        <SplitText as="h1" text={"Let's make\nsomething *mad.*"} trigger="load" delay={0.15} className="display mt-8 text-mega" />

        <div className="mt-16 grid gap-16 lg:mt-24 lg:grid-cols-12">
          <Reveal className="space-y-10 lg:col-span-4">
            <p className="text-lead text-ivory/85">
              Whether it&apos;s a half-formed idea or a fully-specced brief, we&apos;d like to hear
              it. Tell us what you&apos;re building and what&apos;s in the way. A real human
              (one of six) will reply within two working days.
            </p>
            <dl className="space-y-6 border-t border-ivory/20 pt-8">
              <div>
                <dt className="label text-champagne">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${site.email}`} className="u-link">{site.email}</a>
                </dd>
              </div>
              <div>
                <dt className="label text-champagne">Phone</dt>
                <dd className="mt-1">{site.phone}</dd>
              </div>
              <div>
                <dt className="label text-champagne">Studio</dt>
                <dd className="mt-1">{site.location}</dd>
              </div>
              <div>
                <dt className="label text-champagne">Hours</dt>
                <dd className="mt-1">{site.hours}</dd>
              </div>
            </dl>
            <p className="label text-ivory/50">Contact details above are placeholders. Edit src/data/site.ts</p>
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6">
            <Suspense fallback={<div className="h-96" aria-hidden />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
