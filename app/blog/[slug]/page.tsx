import { notFound } from "next/navigation";
import BlogDetail from "@/components/sections/BlogDetail";
import Cta from "@/components/sections/Cta";
import Footer from "@/components/sections/Footer";
import Nav from "@/components/sections/Nav";
import details from "@/data/blog-details.json";
import landing from "@/data/landing-page.json";

type Params = { params: Promise<{ slug: string }> };
type Slug = keyof typeof details.posts;

export function generateStaticParams() {
  return Object.keys(details.posts).map((slug) => ({ slug }));
}

export default async function BlogDetailPage({ params }: Params) {
  const { slug } = await params;
  const post = details.posts[slug as Slug];
  if (!post) notFound();

  return (
    <main>
      <Nav content={landing.nav} />
      <BlogDetail post={post} shared={details.shared} />
      <Cta content={landing.cta} />
      <Footer content={landing.footer} />
    </main>
  );
}
