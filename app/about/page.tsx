import Awards from "@/components/sections/Awards";
import Clients from "@/components/sections/Clients";
import Cta from "@/components/sections/Cta";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";
import Impact from "@/components/sections/Impact";
import Nav from "@/components/sections/Nav";
import PageIntro from "@/components/sections/PageIntro";
import Team from "@/components/sections/Team";
import Values from "@/components/sections/Values";
import page from "@/data/about-page.json";
import landing from "@/data/landing-page.json";

export default function AboutPage() {
  return (
    <main>
      <Nav content={landing.nav} />
      <PageIntro content={page.hero} />
      <Impact content={page.impact} />
      <Clients content={landing.clients} tabletUntil1440 />
      <Values content={landing.values} tabletUntil1440 />
      <Team content={page.team} />
      <Awards content={page.awards} />
      <Faq content={landing.faq} placement="standalone" />
      <Cta content={landing.cta} />
      <Footer content={landing.footer} />
    </main>
  );
}
