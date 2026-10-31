import { notFound } from "next/navigation";
import Cta from "@/components/sections/Cta";
import Footer from "@/components/sections/Footer";
import Nav from "@/components/sections/Nav";
import WorkDetail from "@/components/sections/WorkDetail";
import landing from "@/data/landing-page.json";
import details from "@/data/work-details.json";

type Params = { params: Promise<{ slug: string }> };
type Slug = keyof typeof details.projects;

export function generateStaticParams() {
  return Object.keys(details.projects).map((slug) => ({ slug }));
}

export default async function WorkDetailPage({ params }: Params) {
  const { slug } = await params;
  const project = details.projects[slug as Slug];
  if (!project) notFound();

  return (
    <main>
      <Nav content={landing.nav} />
      <WorkDetail project={project} shared={details.shared} />
      <Cta content={landing.cta} />
      <Footer content={landing.footer} />
    </main>
  );
}
