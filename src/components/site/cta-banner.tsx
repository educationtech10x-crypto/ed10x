"use client";

import Link from "next/link";

import { Container } from "@/components/site/container";
import { Button } from "@/components/ui/button";
import { motion, fadeUp } from "@/components/site/motion";

export function CtaBanner() {
  return (
    <section className="bg-[#0B0B0F] pb-20 sm:pb-24">
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="relative overflow-hidden rounded-3xl bg-white/[0.03] p-8 ring-1 ring-white/10 sm:p-12"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-r from-blue-500/25 to-violet-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-r from-violet-500/20 to-blue-500/20 blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Ready to 10X your brand visibility?
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/65 sm:text-base">
                Tell us what you need. We’ll propose the fastest, cleanest channel mix — then
                execute.
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/contact#start">Start Now</Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

