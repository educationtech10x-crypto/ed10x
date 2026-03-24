"use client";

import { ClipboardList, Rocket, TrendingUp } from "lucide-react";

import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { motion, fadeUp, stagger } from "@/components/site/motion";
import { Card } from "@/components/ui/card";

const steps = [
  {
    title: "Submit Request",
    desc: "Tell us your goal, budget, and timeline — we reply fast.",
    icon: ClipboardList,
  },
  {
    title: "We Plan & Execute",
    desc: "Channel mix + creatives + placements. Then we run it.",
    icon: Rocket,
  },
  {
    title: "You Get Results",
    desc: "Clear reporting. Real reach. Practical learnings.",
    icon: TrendingUp,
  },
] as const;

export function HowItWorks() {
  return (
    <section className="bg-[#0B0B0F] py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Three steps to a campaign that moves."
          description="No long decks. No overthinking. Just execution with measurable outcomes."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3"
        >
          {steps.map((s, idx) => (
            <motion.div key={s.title} variants={fadeUp}>
              <Card className="relative p-6">
                <div className="absolute right-6 top-6 text-xs font-semibold text-white/45">
                  0{idx + 1}
                </div>
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <s.icon className="h-5 w-5 text-white/80" />
                </div>
                <div className="mt-5 text-base font-semibold text-white">{s.title}</div>
                <div className="mt-2 text-sm leading-6 text-white/65">{s.desc}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

