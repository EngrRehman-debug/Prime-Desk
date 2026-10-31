import { site } from "@/lib/site";

const organizationId = `${site.url}/#organization`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": organizationId,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}/icon-512.png`,
  image: `${site.url}/og/home.jpg`,
  description: site.description,
  telephone: site.phone,
  email: site.email,
  foundingDate: site.founded,
  address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: site.region, addressCountry: site.country },
  areaServed: { "@type": "Country", name: "United States" },
  knowsAbout: ["Digital marketing", "Social media marketing", "Paid advertising", "Email marketing", "Local SEO", "Web design", "Brand identity"],
  contactPoint: { "@type": "ContactPoint", contactType: "sales", telephone: site.phone, email: site.email, availableLanguage: "English" },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  inLanguage: "en-US",
  publisher: { "@id": organizationId },
};

export function breadcrumbSchema(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name, item: `${site.url}${path}` },
    ],
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function servicesSchema(items: { title: string; summary: string; offerings: string[] }[]) {
  return items.map((item) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: item.title,
    description: item.summary,
    serviceType: item.title,
    provider: { "@id": organizationId },
    areaServed: { "@type": "Country", name: "United States" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: item.title,
      itemListElement: item.offerings.map((offering) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: offering },
      })),
    },
  }));
}

export function webPageSchema(type: "AboutPage" | "ContactPage", name: string, path: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url: `${site.url}${path}`,
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": organizationId },
  };
}
