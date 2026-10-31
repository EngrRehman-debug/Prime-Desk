import CareerHero from "@/components/sections/CareerHero";
import Cta from "@/components/sections/Cta";
import EmployeeStories from "@/components/sections/EmployeeStories";
import Footer from "@/components/sections/Footer";
import Nav from "@/components/sections/Nav";
import OpenPositions from "@/components/sections/OpenPositions";
import page from "@/data/career-page.json";
import landing from "@/data/landing-page.json";

export default function CareerPage() {
  return (
    <main>
      <Nav content={landing.nav} />
      <CareerHero content={page.hero} />
      <OpenPositions content={page.positions} />
      <EmployeeStories content={page.stories} />
      <Cta content={landing.cta} />
      <Footer content={landing.footer} />
    </main>
  );
}
