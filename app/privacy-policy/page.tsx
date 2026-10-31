import Cta from "@/components/sections/Cta";
import LegalContent from "@/components/sections/LegalContent";
import PageShell from "@/components/sections/PageShell";
import landing from "@/data/landing-page.json";
import pages from "@/data/pages.json";
import { pageMetadata } from "@/lib/site";

const { privacy, shared } = pages.legal;

// Stays out of search results until the final policy text is added.
export const metadata = pageMetadata({
  title: "Privacy Policy | PrimeDesk",
  description: privacy.description,
  path: "/privacy-policy",
  image: "/og/home.jpg",
  noindex: true,
});

export default function PrivacyPolicyPage() {
  return (
    <PageShell>
      <LegalContent content={privacy} cta={shared.cta} />
      <Cta content={landing.cta} />
    </PageShell>
  );
}
