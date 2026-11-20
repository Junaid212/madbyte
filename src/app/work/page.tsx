import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { WorkGallery } from "@/components/work/WorkGallery";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Concept projects across development, UI/UX, branding and marketing: a preview of how MADBYTE thinks and builds.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        label="Work"
        title={"Proof of\n*mad.*"}
        intro="Everything below is a concept project we made to show how we think. Real client work will live here as it's published, and every concept will stay clearly labelled."
      />
      <section className="on-light relative -mt-10 rounded-t-[2rem] bg-ivory pb-28 pt-16 text-navy md:-mt-16 md:rounded-t-[4rem] md:pb-44 md:pt-24">
        <div className="container-x">
          <h2 className="sr-only">All concept projects</h2>
          <WorkGallery />
        </div>
      </section>
      <CtaBand
        title={"Your project\nnext?"}
        text="We'd rather make your idea than another concept."
        cta="Start a Project"
      />
    </>
  );
}
