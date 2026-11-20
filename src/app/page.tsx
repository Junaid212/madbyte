import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { ServicesStack } from "@/components/home/ServicesStack";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { WhyMadbyte } from "@/components/home/WhyMadbyte";
import { ProcessHorizontal } from "@/components/home/ProcessHorizontal";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaBand } from "@/components/ui/CtaBand";
import { Marquee } from "@/components/ui/Marquee";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="relative z-10 bg-navy pb-16 pt-5 text-ivory md:pb-5" aria-hidden>
        <Marquee items={["Build", "Design", "Create", "Grow", "A little mad", "A lot brilliant"]} />
      </div>
      <Intro />
      <ServicesStack />
      <FeaturedWork />
      <WhyMadbyte />
      <ProcessHorizontal />
      {/* <Testimonials /> */}
      <CtaBand />
    </>
  );
}
