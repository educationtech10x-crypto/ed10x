import Link from "next/link";

import { Container } from "@/components/site/container";
import { Logo } from "@/components/site/logo";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0B0B0F]">
      <Container className="py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo withTagline />
            <p className="mt-4 text-sm leading-6 text-white/60">
              Fast, affordable, execution-focused advertising across campuses, local networks, and
              digital platforms.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <FooterCol
              title="Company"
              links={[
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                { href: "/contact", label: "Contact" },
              ]}
            />
            <FooterCol
              title="Services"
              links={[
                { href: "/services#college", label: "College Advertising" },
                { href: "/services#digital", label: "Digital Ads" },
                { href: "/services#local", label: "Local Promotions" },
              ]}
            />
            <FooterCol
              title="Get started"
              links={[
                { href: "/contact#start", label: "Start Campaign" },
                { href: "/contact", label: "Get Quote" },
              ]}
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/5 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} ED10X.com. All rights reserved.</span>
          <span className="text-white/35">
            Built for speed • SEO-ready • Conversion-focused
          </span>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <div>
      <div className="text-sm font-semibold text-white">{title}</div>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-white/60 hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

