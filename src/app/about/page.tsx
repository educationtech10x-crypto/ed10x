import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const cover =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2400&q=80";

export const metadata: Metadata = {
  title: "About",
  description:
    "ED10X simplifies advertising for modern businesses — combining campus, local networks, and digital performance marketing.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#0B0B0F]">
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <Image src={cover} alt="Team discussion" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F] via-[#0B0B0F]/70 to-[#0B0B0F]" />
        </div>
        <Container className="relative py-16 sm:py-20">
          <SectionHeading
            eyebrow="About"
            title="We make advertising feel simple again."
            description="ED10X = Electronic Distribution 10X. We deliver 10X growth through digital and on-ground advertising."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/contact#start">Start Campaign</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-7 sm:p-8">
            <div className="text-sm font-semibold text-white">Who we are</div>
            <p className="mt-3 text-sm leading-7 text-white/65 sm:text-base">
              A lean, execution-focused advertising team built for speed. We plan quickly, launch
              cleanly, and iterate based on results.
            </p>
          </Card>
          <Card className="p-7 sm:p-8">
            <div className="text-sm font-semibold text-white">Mission</div>
            <p className="mt-3 text-sm leading-7 text-white/65 sm:text-base">
              Simplify advertising — so businesses can launch campaigns without agency complexity.
            </p>
          </Card>
          <Card className="p-7 sm:p-8">
            <div className="text-sm font-semibold text-white">Vision</div>
            <p className="mt-3 text-sm leading-7 text-white/65 sm:text-base">
              Make ads accessible for every business — from campus-first startups to local teams
              scaling city-wide.
            </p>
          </Card>
        </div>

        <Card className="mt-6 overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="p-7 sm:p-10">
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                Fast. Affordable. Focused.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/65 sm:text-base">
                We’re built for businesses that want to move quickly. If you need visibility, reach,
                and response — we’ll propose the simplest mix that works, then execute.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <Link href="/contact#start">Get a plan</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/services">Explore services</Link>
                </Button>
              </div>
            </div>
            <div className="relative min-h-[220px] lg:min-h-full">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80"
                alt="Marketing team planning"
                fill
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0B0B0F] via-[#0B0B0F]/30 to-transparent" />
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
}

