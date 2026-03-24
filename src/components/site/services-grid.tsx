"use client";

import Link from "next/link";
import { Building2, Megaphone, MousePointerClick, Route } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { motion, fadeUp, stagger } from "@/components/site/motion";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "College Advertising",
    desc: "Reach students where attention is highest.",
    icon: Building2,
    href: "/services#college",
  },
  {
    title: "Digital Ads",
    desc: "Instagram + Google campaigns that convert.",
    icon: MousePointerClick,
    href: "/services#digital",
  },
  {
    title: "Local Promotions",
    desc: "Hyperlocal distribution that drives footfall.",
    icon: Route,
    href: "/services#local",
  },
  {
    title: "Brand Campaigns",
    desc: "Hybrid campaigns for maximum visibility.",
    icon: Megaphone,
    href: "/services#brand",
  },
] as const;

export function ServicesGrid() {
  return (
    <section className="bg-[#0B0B0F] py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="Simple services. Serious reach."
          description="Pick what you need — we execute fast, stay on budget, and keep reporting clean."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((s) => (
            <motion.div key={s.title} variants={fadeUp}>
              <Link href={s.href} className="group block h-full">
                <Card className="h-full p-6 transition hover:bg-white/[0.05] hover:ring-white/15">
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                      <s.icon className="h-5 w-5 text-white/80" />
                    </div>
                    <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 opacity-70 transition group-hover:opacity-100" />
                  </div>
                  <div className="mt-5">
                    <div className="text-base font-semibold text-white">{s.title}</div>
                    <div className={cn("mt-2 text-sm leading-6 text-white/65")}>{s.desc}</div>
                    <div className="mt-5 text-sm font-medium text-white/70 group-hover:text-white">
                      Learn more →
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

