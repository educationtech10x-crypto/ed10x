import type { Metadata } from "next";

import { Hero } from "@/components/site/hero";
import { ServicesGrid } from "@/components/site/services-grid";
import { HowItWorks } from "@/components/site/how-it-works";
import { WhyEd10x } from "@/components/site/why-ed10x";
import { Testimonials } from "@/components/site/testimonials";
import { CtaBanner } from "@/components/site/cta-banner";

export const metadata: Metadata = {
  title: "Home",
  description:
    "ED10X helps businesses run ads across campuses, local offline networks, and digital platforms — fast, affordable, execution-focused.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <HowItWorks />
      <WhyEd10x />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
