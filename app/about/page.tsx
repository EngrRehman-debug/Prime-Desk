import Clients from "@/components/sections/Clients";
import Cta from "@/components/sections/Cta";
import Impact from "@/components/sections/Impact";
import PageIntro from "@/components/sections/PageIntro";
import PageShell from "@/components/sections/PageShell";
import Team from "@/components/sections/Team";
import Values from "@/components/sections/Values";
import JsonLd from "@/components/ui/JsonLd";
import landing from "@/data/landing-page.json";
import pages from "@/data/pages.json";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/site";

const page = pages.about;
const title = "About PrimeDesk | Houston Marketing Team for Small Businesses";

export const metadata = pageMetadata({
  title,
  description: page.hero.statement,
  path: "/about",
  image: "/og/about.jpg",
});

export default function AboutPage() {
  return (
    <PageShell>
      <JsonLd data={webPageSchema("AboutPage", title, "/about", page.hero.statement)} />
      <JsonLd data={breadcrumbSchema("About", "/about")} />
      <PageIntro content={page.hero} />
      <Impact content={page.impact} />
      <Clients content={landing.clients} tabletUntil1440 />
      <Values content={page.different} tabletUntil1440 />
      <Team content={page.team} />
      <Cta content={page.cta} />
    </PageShell>
  );
}
