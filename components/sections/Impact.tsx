import Image from "next/image";
import Appear from "@/components/ui/Appear";
import Counter from "@/components/ui/Counter";
import type page from "@/data/about-page.json";
import styles from "./Impact.module.css";

type Props = { content: typeof page.impact };

function QuoteMark() {
  return (
    <svg viewBox="0 0 64 47" width="46" height="34.3" aria-hidden="true">
      <path
        d="M 4.565 46.109 L 18.261 46.109 L 27.391 27.848 L 27.391 0.457 L 0 0.457 L 0 27.848 L 13.696 27.848 Z M 41.087 46.109 L 54.783 46.109 L 63.913 27.848 L 63.913 0.457 L 36.522 0.457 L 36.522 27.848 L 50.217 27.848 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Impact({ content: impact }: Props) {
  const { review } = impact;
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Appear delay={0.1}>
            <h2 className="h1">{impact.heading}</h2>
          </Appear>
          <Appear delay={0.2}>
            <p className={`body18 ${styles.description}`}>{impact.description}</p>
          </Appear>
        </div>

        <Appear delay={0.3} className={styles.content}>
          <article className={styles.review}>
            <div className={styles.quote}>
              <QuoteMark />
              <h3>{review.quote}</h3>
            </div>
            <div className={styles.author}>
              <Image src={review.avatar} alt="" width={58} height={58} quality={85} />
              <div>
                <p className={styles.name}>{review.name}</p>
                <p className="body18">{review.role}</p>
              </div>
            </div>
          </article>

          <div className={styles.stats}>
            {impact.stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <Counter end={stat.end} suffix={stat.suffix} className={styles.counter} />
                <h3 className={styles.label}>{stat.label}</h3>
              </div>
            ))}
          </div>
        </Appear>
      </div>
    </section>
  );
}
