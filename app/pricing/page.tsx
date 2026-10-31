import ComparePlans from "@/components/sections/ComparePlans";
import Cta from "@/components/sections/Cta";
import Footer from "@/components/sections/Footer";
import Nav from "@/components/sections/Nav";
import Pricing from "@/components/sections/Pricing";
import landing from "@/data/landing-page.json";
import page from "@/data/pricing-page.json";

export default function PricingPage() {
  return (
    <main>
      <Nav content={landing.nav} />
      <Pricing content={landing.pricing} twoColumnsUntil1440 variant="page" />
      <ComparePlans content={page.compare} />
      <Cta content={landing.cta} />
      <Footer content={landing.footer} />
    </main>
  );
}
