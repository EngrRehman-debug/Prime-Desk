import type { CSSProperties } from "react";
import Reveal from "@/components/ui/Reveal";
import Ticker from "@/components/ui/Ticker";
import type content from "@/data/landing-page.json";
import styles from "./Clients.module.css";

type Props = {
  content: typeof content.clients;
  /** Keeps the tablet layout up to 1440px instead of 1200px, as inner pages do. */
  tabletUntil1440?: boolean;
};

export default function Clients({ content: clients, tabletUntil1440 = false }: Props) {
  return (
    <section className={styles.section} data-tablet-until-1440={tabletUntil1440}>
      <Reveal className={styles.header}>
        <h2 className={`h1 ${styles.heading}`}>{clients.heading}</h2>
        <p className={`body18 ${styles.description}`}>
          {clients.description}
        </p>
      </Reveal>
      <Ticker gap={20}>
        {clients.logos.map((logo) => (
          <div
            key={logo.src}
            className={styles.block}
            style={{ "--logo-width": `${logo.width}px`, "--logo-width-phone": `${logo.phoneWidth}px` } as CSSProperties}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG logos */}
            <img src={logo.src} alt={logo.alt} />
          </div>
        ))}
      </Ticker>
    </section>
  );
}
