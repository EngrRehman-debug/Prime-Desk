import type { Metadata } from "next";
import Cta from "@/components/sections/Cta";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";
import Nav from "@/components/sections/Nav";
import Pricing from "@/components/sections/Pricing";
import Services from "@/components/sections/Services";
import ServicesHero from "@/components/sections/ServicesHero";
import landing from "@/data/landing-page.json";
import page from "@/data/services-page.json";

export const metadata: Metadata = {
  title: page.meta.title,
};

export default function ServicesPage() {
  return (
    <main>
      <Nav content={landing.nav} />
      <ServicesHero content={page.hero} />
      <Services content={landing.services} staticUntil1440 />
      <Faq content={landing.faq} placement="beforePricing" />
      <Pricing content={landing.pricing} twoColumnsUntil1440 />
      <Cta content={landing.cta} />
      <Footer content={landing.footer} />
    </main>
  );
}
