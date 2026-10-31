import Reveal from "@/components/ui/Reveal";
import Ticker from "@/components/ui/Ticker";
import type content from "@/data/landing-page.json";
import styles from "./Clients.module.css";

/** Simple line icons, in the same order as the industry tags. */
const ICONS = [
  "M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z",
  "M3 18h18M5 18v-2a7 7 0 0 1 14 0v2M10 9.4V5h4v4.4",
  "M12 3v18M7 21h10M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z",
  "M12 21s-9-5.5-9-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.500-9 12-9 12zM12 9.500v5M9.500 12h5",
  "M4 21h16M7 17v-6M12 17V4M17 17V8",
];

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
        <p className={`body18 ${styles.description}`}>{clients.description}</p>
      </Reveal>
      <Ticker gap={20}>
        {clients.tags.map((tag, index) => (
          <div key={tag} className={styles.block}>
            <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d={ICONS[index]} />
            </svg>
            {tag}
          </div>
        ))}
      </Ticker>
    </section>
  );
}
