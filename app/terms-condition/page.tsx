import Cta from "@/components/sections/Cta";
import LegalContent from "@/components/sections/LegalContent";
import PageShell from "@/components/sections/PageShell";
import landing from "@/data/landing-page.json";
import pages from "@/data/pages.json";
import { pageMetadata } from "@/lib/site";

const { terms, shared } = pages.legal;

// Stays out of search results until the final terms text is added.
export const metadata = pageMetadata({
  title: "Terms & Conditions | PrimeDesk",
  description: terms.description,
  path: "/terms-condition",
  image: "/og/home.jpg",
  noindex: true,
});

export default function TermsPage() {
  return (
    <PageShell>
      <LegalContent content={terms} cta={shared.cta} />
      <Cta content={landing.cta} />
    </PageShell>
  );
}
