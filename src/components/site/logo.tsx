import Link from "next/link";

import { cn } from "@/lib/utils";

export function Logo({
  className,
  withTagline,
}: {
  className?: string;
  withTagline?: boolean;
}) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-3", className)}>
      <span
        aria-hidden
        className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(59,130,246,0.10)]"
      >
        <LogoIcon className="h-6 w-6" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-base font-semibold tracking-tight text-white">
          ED<span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">10X</span>
        </span>
        {withTagline ? (
          <span className="mt-1 text-xs text-white/55">10X Your Reach. Digitally.</span>
        ) : null}
      </span>
    </Link>
  );
}

export function LogoWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("text-2xl font-semibold tracking-tight text-white", className)}>
      ED
      <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
        10X
      </span>
    </span>
  );
}

export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="ED10X icon"
    >
      <defs>
        <linearGradient id="ed10x-g" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <path
        d="M16 18.5C16 16.0147 18.0147 14 20.5 14H43.5C45.9853 14 48 16.0147 48 18.5V45.5C48 47.9853 45.9853 50 43.5 50H20.5C18.0147 50 16 47.9853 16 45.5V18.5Z"
        className="opacity-80"
        stroke="url(#ed10x-g)"
        strokeWidth="2.5"
      />
      <path
        d="M24 41V23H36.5C39.5376 23 42 25.4624 42 28.5C42 31.5376 39.5376 34 36.5 34H28"
        stroke="url(#ed10x-g)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36 41L45 32M45 41L36 32"
        stroke="url(#ed10x-g)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

