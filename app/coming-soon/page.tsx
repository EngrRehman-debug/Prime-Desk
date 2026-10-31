import Cta from "@/components/sections/Cta";
import Footer from "@/components/sections/Footer";
import Nav from "@/components/sections/Nav";
import UtilityHero from "@/components/sections/UtilityHero";
import NotifyForm from "@/components/ui/NotifyForm";
import landing from "@/data/landing-page.json";
import utility from "@/data/utility-pages.json";

export default function ComingSoonPage() {
  const { comingSoon } = utility;
  return (
    <main>
      <Nav content={landing.nav} />
      <UtilityHero image={comingSoon.image} heading={comingSoon.heading} description={comingSoon.description}>
        <NotifyForm placeholder={comingSoon.placeholder} buttonLabel={comingSoon.buttonLabel} />
      </UtilityHero>
      <Cta content={landing.cta} />
      <Footer content={landing.footer} />
    </main>
  );
}
