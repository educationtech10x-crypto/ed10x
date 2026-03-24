"use client";

import Image from "next/image";

import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { motion, fadeUp, stagger } from "@/components/site/motion";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Rohit S.",
    role: "Founder, D2C Brand",
    quote:
      "ED10X launched our campus + Instagram push in 48 hours. The campaign was clean, the reporting was simple, and we saw a noticeable lift in inbound leads.",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Ayesha K.",
    role: "Marketing Lead, Startup",
    quote:
      "What I liked most: speed and clarity. No long meetings — just a plan, quick creative iterations, and execution across channels.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Vikram P.",
    role: "Owner, Local Business",
    quote:
      "We wanted hyperlocal visibility and footfall. ED10X handled distribution + digital ads and kept us updated. Solid results for the budget.",
    img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=800&q=80",
  },
] as const;

export function Testimonials() {
  return (
    <section className="bg-[#0B0B0F] py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by founders and local teams."
          description="A simple process, fast execution, and campaigns that actually reach people."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={fadeUp}>
              <Card className="flex h-full flex-col p-6">
                <p className="text-sm leading-7 text-white/70">“{t.quote}”</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-white/10">
                    <Image src={t.img} alt={t.name} fill className="object-cover" />
                  </div>
                  <div className="leading-tight">
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-white/55">{t.role}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

