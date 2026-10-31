import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import content from "@/data/landing-page.json";
import "./globals.css";

const urbanist = localFont({
  src: "../public/fonts/urbanist-latin.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3101"),
  title: content.meta.title,
  description: content.meta.description,
  icons: { icon: "/images/favicon-light.webp" },
  openGraph: {
    title: content.meta.title,
    description: content.meta.description,
    images: ["/images/og-image.webp"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={urbanist.variable}>
      {/* Browser extensions such as ColorZilla add attributes to <body> before React loads. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
