import { site } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const body = `Contact: mailto:${site.email}
Expires: 2027-10-31T00:00:00.000Z
Preferred-Languages: en
Canonical: ${site.url}/.well-known/security.txt
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
