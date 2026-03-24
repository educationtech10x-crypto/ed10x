import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ed10x.com"),
  title: {
    default: "ED10X.com — 10X Your Reach. Digitally.",
    template: "%s — ED10X.com",
  },
  description:
    "Run ads across campuses, local networks, and digital platforms — all from one place. Fast, affordable, execution-focused.",
  keywords: [
    "campus advertising",
    "college marketing",
    "local promotions",
    "digital ads",
    "Instagram ads",
    "Google ads",
    "hybrid campaigns",
    "India advertising",
  ],
  openGraph: {
    title: "ED10X.com — 10X Your Reach. Digitally.",
    description:
      "Fast, affordable, execution-focused advertising across campuses, local networks, and digital platforms.",
    type: "website",
    url: "https://ed10x.com",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-[#0B0B0F] text-white`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
        <Toaster />
      </body>
    </html>
  );
}
