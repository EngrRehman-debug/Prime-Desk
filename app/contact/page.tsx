import ContactChannels from "@/components/sections/ContactChannels";
import ContactHero from "@/components/sections/ContactHero";
import Cta from "@/components/sections/Cta";
import PageShell from "@/components/sections/PageShell";
import JsonLd from "@/components/ui/JsonLd";
import landing from "@/data/landing-page.json";
import pages from "@/data/pages.json";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/site";

const page = pages.contact;
const title = "Contact PrimeDesk | Book a Call";

export const metadata = pageMetadata({
  title,
  description: page.hero.lead,
  path: "/contact",
  image: "/og/contact.jpg",
});

export default function ContactPage() {
  return (
    <PageShell>
      <JsonLd data={webPageSchema("ContactPage", title, "/contact", page.hero.lead)} />
      <JsonLd data={breadcrumbSchema("Contact", "/contact")} />
      <ContactHero content={page.hero} />
      <ContactChannels content={page.channels} />
      <Cta content={landing.cta} />
    </PageShell>
  );
}
