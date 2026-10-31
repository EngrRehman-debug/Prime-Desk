import type { Metadata } from "next";
import Cta from "@/components/sections/Cta";
import PageShell from "@/components/sections/PageShell";
import UtilityHero from "@/components/sections/UtilityHero";
import Button from "@/components/ui/Button";
import landing from "@/data/landing-page.json";
import pages from "@/data/pages.json";

export const metadata: Metadata = {
  title: { absolute: "Page not found | PrimeDesk" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const { notFound } = pages;
  return (
    <PageShell>
      <UtilityHero image={notFound.image} heading={notFound.heading} description={notFound.description}>
        <Button href={notFound.cta.href} label={notFound.cta.label} />
      </UtilityHero>
      <Cta content={landing.cta} />
    </PageShell>
  );
}
