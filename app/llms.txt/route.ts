import landing from "@/data/landing-page.json";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const services = landing.services.items.map((item) => `- ${item.title}: ${item.summary} Includes: ${item.offerings.join("; ")}.`).join("\n");
  const faq = landing.faq.items.map((item) => `- ${item.question} ${item.answer}`).join("\n");

  const body = `# ${site.name}

> ${site.description}

${site.name} is a full-service marketing agency based in ${site.city}, Texas, founded in ${site.founded}. The team spans four countries and works as an embedded marketing department for small businesses in ${site.industries.join(", ").toLowerCase()}.

## Pages

- [Home](${site.url}/): What PrimeDesk does, how it works, and frequently asked questions.
- [Services](${site.url}/services): The five service lines and what each includes.
- [About](${site.url}/about): The PrimeDesk story, what makes it different, and the team.
- [Contact](${site.url}/contact): Book a call or send a message.

## Services

${services}

## Frequently asked questions

${faq}

## Contact

- Phone: ${site.phoneDisplay}
- Email: ${site.email}
- Location: ${site.city}, Texas
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
