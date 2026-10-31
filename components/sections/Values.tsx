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
  // With three cards the image column holds one, as in the original layout.
  const [left, right] =
    values.items.length === 3
      ? [values.items.slice(0, 1), values.items.slice(1)]
      : [values.items.filter((_, index) => index % 2 === 0), values.items.filter((_, index) => index % 2 === 1)];
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
            {left.map((value) => (
              <ValueCard key={value.title} value={value} />
            ))}
          </div>
          <div className={styles.column}>
            {right.map((value) => (
              <ValueCard key={value.title} value={value} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
