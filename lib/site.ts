import type { Metadata } from "next";

export const site = {
  // Set NEXT_PUBLIC_SITE_URL once the live domain is final.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.primedeskgroup.com").replace(/\/$/, ""),
  name: "PrimeDesk",
  legalName: "PrimeDesk Business Solutions",
  phone: "+18328198366",
  phoneDisplay: "+1 (832) 819-8366",
  email: "fareed.huda@primedeskgroup.com",
  city: "Houston",
  region: "TX",
  country: "US",
  founded: "2025",
  description:
    "PrimeDesk is a Houston marketing team for small businesses. Social, ads, SEO, web, and brand work from one embedded partner.",
  industries: ["Real estate", "Construction", "Legal", "Healthcare", "Financial services"],
};

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image: string;
  noindex?: boolean;
};

/** Title, description, canonical, Open Graph and Twitter tags for one page. */
export function pageMetadata({ title, description, path, image, noindex = false }: PageMeta): Metadata {
  const images = [{ url: image, width: 1200, height: 630, alt: title }];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: { type: "website", siteName: site.name, locale: "en_US", url: path, title, description, images },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
