import About from "@/components/sections/About";
import BrandTicker from "@/components/sections/BrandTicker";
import Blog from "@/components/sections/Blog";
import Clients from "@/components/sections/Clients";
import Cta from "@/components/sections/Cta";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Nav from "@/components/sections/Nav";
import Pricing from "@/components/sections/Pricing";
import Process from "@/components/sections/Process";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Values from "@/components/sections/Values";
import Work from "@/components/sections/Work";
import content from "@/data/landing-page.json";

export default function Home() {
  return (
    <main>
      <Nav content={content.nav} />
      <Hero content={content.hero} />
      <BrandTicker items={content.brandTicker} />
      <About content={content.about} />
      <Clients content={content.clients} />
      <Process content={content.process} />
      <Values content={content.values} />
      <Services content={content.services} />
      <Work content={content.work} />
      <Testimonials content={content.testimonials} />
      <Pricing content={content.pricing} />
      <Faq content={content.faq} />
      <Blog content={content.blog} />
      <Cta content={content.cta} />
      <Footer content={content.footer} />
    </main>
  );
}
