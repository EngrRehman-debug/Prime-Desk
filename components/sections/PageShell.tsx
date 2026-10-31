import type { ReactNode } from "react";
import Footer from "@/components/sections/Footer";
import Nav from "@/components/sections/Nav";
import content from "@/data/landing-page.json";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav content={content.nav} />
      <main>{children}</main>
      <Footer content={content.footer} />
    </>
  );
}
