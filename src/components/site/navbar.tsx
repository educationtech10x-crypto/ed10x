import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { Logo } from "@/components/site/logo";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0B0B0F]/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-white/70 transition hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild variant="secondary" size="sm" className="hidden sm:inline-flex">
            <Link href="/contact">Get Quote</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/contact#start">Start Campaign</Link>
          </Button>
        </div>
      </Container>
    </header>
  );
}

