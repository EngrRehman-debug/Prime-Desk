import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import JsonLd from "@/components/ui/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import "./globals.css";

const urbanist = localFont({
  src: "../public/fonts/urbanist-latin.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-urbanist",
  display: "swap",
});

const display = localFont({
  src: "../public/fonts/bebas-neue-latin-400-normal.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  title: { default: "PrimeDesk | Marketing Agency for Small Businesses", template: "%s | PrimeDesk" },
  description: site.description,
  authors: [{ name: site.legalName }],
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f3efe8",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${urbanist.variable} ${display.variable}`}>
      {/* Browser extensions such as ColorZilla add attributes to <body> before React loads. */}
      <body suppressHydrationWarning>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        {children}
      </body>
    </html>
  );
}
