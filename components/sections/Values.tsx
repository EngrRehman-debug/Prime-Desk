import Image from "next/image";
import type content from "@/data/landing-page.json";
import styles from "./Values.module.css";

type Props = {
  content: typeof content.values;
  /** Keeps the tablet layout up to 1440px instead of 1200px, as inner pages do. */
  tabletUntil1440?: boolean;
};
type Value = Props["content"]["items"][number];

function ValueCard({ value }: { value: Value }) {
  return (
    <article className={styles.card}>
      <Image src={value.icon} alt="" width={44} height={44} unoptimized />
      <div className={styles.text}>
        <h3>{value.title}</h3>
        <p>{value.description}</p>
      </div>
    </article>
  );
}

export default function Values({ content: values, tabletUntil1440 = false }: Props) {
  const [innovation, collaboration, integrity] = values.items;
  return (
    <section className={styles.section} data-tablet-until-1440={tabletUntil1440}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className="h1">{values.heading}</h2>
          <p className={`body18 ${styles.description}`}>{values.description}</p>
        </div>
        <div className={styles.columns}>
          <div className={styles.column}>
            <div className={styles.image}>
              <Image src={values.image.src} alt={values.image.alt} fill sizes="(max-width: 809px) 100vw, 590px" quality={85} />
            </div>
            <ValueCard value={innovation} />
          </div>
          <div className={styles.column}>
            <ValueCard value={collaboration} />
            <ValueCard value={integrity} />
          </div>
        </div>
      </div>
    </section>
  );
}
