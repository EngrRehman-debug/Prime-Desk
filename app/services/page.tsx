import Cta from "@/components/sections/Cta";
import PageShell from "@/components/sections/PageShell";
import Services from "@/components/sections/Services";
import ServicesHero from "@/components/sections/ServicesHero";
import JsonLd from "@/components/ui/JsonLd";
import landing from "@/data/landing-page.json";
import pages from "@/data/pages.json";
import { breadcrumbSchema, servicesSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/site";

const page = pages.services;

export const metadata = pageMetadata({
  title: "Marketing, Web, Brand & Support Services | PrimeDesk",
  description: page.hero.description,
  path: "/services",
  image: "/og/services.jpg",
});

export default function ServicesPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema("Services", "/services")} />
      {servicesSchema(landing.services.items).map((schema) => (
        <JsonLd key={schema.name} data={schema} />
      ))}
      <ServicesHero content={page.hero} />
      <Services content={landing.services} staticUntil1440 />
      <Cta content={page.closing} />
    </PageShell>
  );
}
