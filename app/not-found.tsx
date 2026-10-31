import Cta from "@/components/sections/Cta";
import Footer from "@/components/sections/Footer";
import Nav from "@/components/sections/Nav";
import UtilityHero from "@/components/sections/UtilityHero";
import Button from "@/components/ui/Button";
import landing from "@/data/landing-page.json";
import utility from "@/data/utility-pages.json";

export default function NotFound() {
  const { notFound } = utility;
  return (
    <main>
      <Nav content={landing.nav} />
      <UtilityHero image={notFound.image} heading={notFound.heading} description={notFound.description}>
        <Button href={notFound.cta.href} label={notFound.cta.label} />
      </UtilityHero>
      <Cta content={landing.cta} />
      <Footer content={landing.footer} />
    </main>
  );
}
