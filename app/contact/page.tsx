import ContactChannels from "@/components/sections/ContactChannels";
import ContactHero from "@/components/sections/ContactHero";
import Cta from "@/components/sections/Cta";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";
import Nav from "@/components/sections/Nav";
import page from "@/data/contact-page.json";
import landing from "@/data/landing-page.json";

export default function ContactPage() {
  return (
    <main>
      <Nav content={landing.nav} />
      <ContactHero content={page.hero} />
      <ContactChannels content={page.channels} />
      <Faq content={landing.faq} placement="afterCards" />
      <Cta content={landing.cta} />
      <Footer content={landing.footer} />
    </main>
  );
}
