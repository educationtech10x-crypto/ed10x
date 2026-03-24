"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";

function sanitizeNumber(v: string) {
  return v.replace(/[^\d]/g, "");
}

export function WhatsAppFab({ className }: { className?: string }) {
  const number = sanitizeNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "");
  const message = encodeURIComponent("Hi ED10X — I want to start an ad campaign.");

  if (!number) return null;

  return (
    <Link
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-5 right-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-[0_20px_60px_rgba(59,130,246,0.25)] ring-1 ring-white/15 transition hover:from-blue-400 hover:to-violet-400",
        className,
      )}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
    </Link>
  );
}

