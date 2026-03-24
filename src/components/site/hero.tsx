"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { motion, fadeUp, stagger } from "@/components/site/motion";

const heroImage =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=80";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0B0B0F]">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Digital marketing team working"
          fill
          priority
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F] via-[#0B0B0F]/70 to-[#0B0B0F]" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/25 to-violet-500/25 blur-3xl" />
      </div>

      <Container className="relative py-20 sm:py-28">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-white/70 ring-1 ring-white/10"
          >
            Execution-first ads across campus + digital
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-6xl"
          >
            10X Your Reach.{" "}
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              Digitally.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg"
          >
            Run ads across campuses, local networks, and digital platforms — all from one place.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact#start">Start Campaign</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">Get Quote</Link>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 grid grid-cols-2 gap-4 rounded-3xl bg-white/[0.03] p-4 ring-1 ring-white/10 sm:grid-cols-4"
          >
            <Stat label="Avg. kickoff" value="24–48h" />
            <Stat label="Channels" value="Campus + Digital" />
            <Stat label="Best for" value="SMBs + Startups" />
            <Stat label="Focus" value="Reach + Leads" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.02] p-4 ring-1 ring-white/5">
      <div className="text-lg font-semibold text-white">{value}</div>
      <div className="mt-1 text-xs text-white/55">{label}</div>
    </div>
  );
}

