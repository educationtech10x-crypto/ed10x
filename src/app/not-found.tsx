import Link from "next/link";

import { Container } from "@/components/site/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="bg-[#0B0B0F] py-20 sm:py-28">
      <Container>
        <div className="max-w-xl">
          <div className="text-xs font-semibold uppercase tracking-widest text-white/55">
            404
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Page not found
          </h1>
          <p className="mt-4 text-base leading-7 text-white/65">
            The page you’re looking for doesn’t exist. Head back home or start a campaign.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/">Go home</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/contact#start">Start campaign</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

