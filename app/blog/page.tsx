import BlogIndex from "@/components/sections/BlogIndex";
import Cta from "@/components/sections/Cta";
import Footer from "@/components/sections/Footer";
import Nav from "@/components/sections/Nav";
import page from "@/data/blog-page.json";
import landing from "@/data/landing-page.json";

export default function BlogPage() {
  return (
    <main>
      <Nav content={landing.nav} />
      <BlogIndex content={page} />
      <Cta content={landing.cta} />
      <Footer content={landing.footer} />
    </main>
  );
}
