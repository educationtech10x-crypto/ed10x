import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const cover =
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=2400&q=80";

export const metadata: Metadata = {
  title: "Services",
  description:
    "College advertising, digital ads, local promotions, and hybrid brand campaigns — fast execution with clean reporting.",
};

export default function ServicesPage() {
  return (
    <div className="bg-[#0B0B0F]">
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <Image src={cover} alt="Marketing analytics" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F] via-[#0B0B0F]/70 to-[#0B0B0F]" />
        </div>
        <Container className="relative py-16 sm:py-20">
          <SectionHeading
            eyebrow="Services"
            title="Everything you need to get seen."
            description="Choose a single channel or a hybrid mix. We keep it minimal: plan, execute, report."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/contact#start">Start Campaign</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/contact">Get Quote</Link>
            </Button>
          </div>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <div className="grid gap-6">
          <ServiceBlock
            id="college"
            title="College Advertising"
            summary="On-campus visibility that’s hard to ignore."
            useCases={["Student offers & apps", "Events & fests", "D2C sampling + QR lead capture"]}
          />
          <ServiceBlock
            id="digital"
            title="Digital Ads"
            summary="Instagram + Google campaigns optimized for response."
            useCases={["Lead generation", "Retargeting", "Local awareness + calls"]}
          />
          <ServiceBlock
            id="local"
            title="Local Promotions"
            summary="Hyperlocal distribution and offline network placements."
            useCases={["Retail footfall", "Neighborhood launches", "Service-area coverage"]}
          />
          <ServiceBlock
            id="brand"
            title="Brand Campaigns (Hybrid)"
            summary="Campus + local + digital, combined for maximum reach."
            useCases={["New product launch", "City-level visibility", "Recruitment + awareness"]}
          />
        </div>
      </Container>
    </div>
  );
}

function ServiceBlock({
  id,
  title,
  summary,
  useCases,
}: {
  id: string;
  title: string;
  summary: string;
  useCases: string[];
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <Card className="p-7 sm:p-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-white/65 ring-1 ring-white/10">
              {id.toUpperCase()}
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/65 sm:text-base">{summary}</p>

            <div className="mt-6">
              <div className="text-sm font-semibold text-white">Use cases</div>
              <ul className="mt-3 grid gap-2 text-sm text-white/65 sm:grid-cols-2">
                {useCases.map((u) => (
                  <li key={u} className="rounded-2xl bg-white/[0.02] px-4 py-3 ring-1 ring-white/10">
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 md:w-[260px]">
            <Button asChild>
              <Link href={`/contact#start`}>Start now</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={`/contact?service=${encodeURIComponent(title)}#start`}>Request quote</Link>
            </Button>
            <p className="text-xs leading-6 text-white/45">
              Typical kickoff: 24–48h. We’ll confirm placements and timelines after your request.
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
}

