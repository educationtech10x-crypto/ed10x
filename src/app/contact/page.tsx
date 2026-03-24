import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/site/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a campaign with ED10X. Submit your details and we’ll respond quickly with a simple plan and quote.",
};

const cover =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2400&q=80";

function ContactFormFallback() {
  return (
    <div className="grid gap-5">
      <p className="text-sm text-white/50">Loading form…</p>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="bg-[#0B0B0F]">
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <Image src={cover} alt="Startup team discussion" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F] via-[#0B0B0F]/70 to-[#0B0B0F]" />
        </div>
        <Container className="relative py-16 sm:py-20">
          <SectionHeading
            eyebrow="Contact"
            title="Start your campaign in minutes."
            description="Tell us your goal and budget. We’ll respond quickly with a clean plan and quote."
          />
          <div className="mt-8 text-sm text-white/60">
            Prefer WhatsApp? Use the chat button — configure the number at build time via{" "}
            <code className="rounded bg-white/10 px-2 py-1">NEXT_PUBLIC_WHATSAPP_NUMBER</code>.
          </div>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section id="start" className="scroll-mt-24">
            <Card className="p-7 sm:p-10">
              <h2 className="text-2xl font-semibold tracking-tight text-white">Request a quote</h2>
              <p className="mt-3 text-sm leading-7 text-white/65 sm:text-base">
                We’ll confirm the fastest channel mix for your goal (campus, local, digital, or hybrid).
              </p>
              <div className="mt-8">
                <Suspense fallback={<ContactFormFallback />}>
                  <ContactForm />
                </Suspense>
              </div>
            </Card>
          </section>

          <aside className="space-y-6">
            <Card className="p-7 sm:p-8">
              <div className="text-sm font-semibold text-white">What happens next</div>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-white/65">
                <li>1) Quick call to confirm audience + timeline</li>
                <li>2) A simple plan and quote</li>
                <li>3) Campaign kickoff (often within 24–48h)</li>
              </ul>
            </Card>

            <Card className="p-7 sm:p-8">
              <div className="text-sm font-semibold text-white">Alternate tagline</div>
              <p className="mt-3 text-sm leading-7 text-white/65">
                “Where Brands Get Seen” — “Ads That Actually Reach People” — “From Campus to Clicks — We Scale You”
              </p>
              <p className="mt-5 text-xs text-white/45">
                Need something specific? Add it in your message — we’ll tailor the plan.
              </p>
            </Card>

            <div className="text-xs text-white/45">
              By using this site, you agree to be contacted about your request.{" "}
              <Link href="/services" className="text-white/60 hover:text-white">
                View services
              </Link>
              .
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}

