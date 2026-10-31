import Cta from "@/components/sections/Cta";
import Footer from "@/components/sections/Footer";
import LegalContent from "@/components/sections/LegalContent";
import Nav from "@/components/sections/Nav";
import landing from "@/data/landing-page.json";
import legal from "@/data/legal-pages.json";

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Nav content={landing.nav} />
      <LegalContent content={legal.privacy} cta={legal.shared.cta} />
      <Cta content={landing.cta} />
      <Footer content={landing.footer} />
    </main>
  );
}
