import About from "@/components/sections/About";
import BrandTicker from "@/components/sections/BrandTicker";
import Clients from "@/components/sections/Clients";
import Cta from "@/components/sections/Cta";
import Faq from "@/components/sections/Faq";
import Hero from "@/components/sections/Hero";
import PageShell from "@/components/sections/PageShell";
import Process from "@/components/sections/Process";
import Services from "@/components/sections/Services";
import Values from "@/components/sections/Values";
import JsonLd from "@/components/ui/JsonLd";
import content from "@/data/landing-page.json";
import { faqSchema } from "@/lib/schema";
import { pageMetadata, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "PrimeDesk | Marketing Agency for Small Businesses",
  description: site.description,
  path: "/",
  image: "/og/home.jpg",
});

export default function Home() {
  return (
    <PageShell>
      <JsonLd data={faqSchema(content.faq.items)} />
      <Hero content={content.hero} />
      <BrandTicker items={content.brandTicker} />
      <About content={content.about} />
      <Clients content={content.clients} />
      <Process content={content.process} />
      <Values content={content.values} />
      <Services content={content.services} />
      <Faq content={content.faq} />
      <Cta content={content.cta} />
    </PageShell>
  );
}
