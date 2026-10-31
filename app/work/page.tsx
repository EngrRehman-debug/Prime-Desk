import Cta from "@/components/sections/Cta";
import Footer from "@/components/sections/Footer";
import Nav from "@/components/sections/Nav";
import Work from "@/components/sections/Work";
import landing from "@/data/landing-page.json";

export default function WorkPage() {
  return (
    <main>
      <Nav content={landing.nav} />
      <Work content={landing.work} variant="page" />
      <Cta content={landing.cta} />
      <Footer content={landing.footer} />
    </main>
  );
}
