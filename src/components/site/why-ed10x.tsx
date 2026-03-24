"use client";

import { BadgeCheck, Clock, Target, Wallet } from "lucide-react";

import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { motion, fadeUp, stagger } from "@/components/site/motion";
import { Card } from "@/components/ui/card";

const reasons = [
  {
    title: "Fast Execution",
    desc: "Launch quickly with a clear plan and fast turnaround.",
    icon: Clock,
  },
  {
    title: "Targeted Reach",
    desc: "Campus, hyperlocal, and digital — where your buyers are.",
    icon: Target,
  },
  {
    title: "Budget-Friendly",
    desc: "Simple packages and channel mixes that fit your spend.",
    icon: Wallet,
  },
  {
    title: "Real Results",
    desc: "We track what matters and iterate based on performance.",
    icon: BadgeCheck,
  },
] as const;

export function WhyEd10x() {
  return (
    <section className="bg-[#0B0B0F] py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow="Why ED10X"
            title="Built for speed, not complexity."
            description="We’re not a complicated agency. We’re the team that ships campaigns — fast, affordable, and focused on reach."
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {reasons.map((r) => (
              <motion.div key={r.title} variants={fadeUp}>
                <Card className="p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                    <r.icon className="h-5 w-5 text-white/80" />
                  </div>
                  <div className="mt-5 text-base font-semibold text-white">{r.title}</div>
                  <div className="mt-2 text-sm leading-6 text-white/65">{r.desc}</div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

