import Image from "next/image";
import Button from "@/components/ui/Button";
import type content from "@/data/landing-page.json";
import styles from "./Hero.module.css";

type Props = { content: typeof content.hero };

export default function Hero({ content: hero }: Props) {
  return (
    <>
      <section className={styles.title}>
        <div className={styles.eyebrows}>
          <span>{hero.eyebrowLeft}</span>
          <span>{hero.eyebrowRight}</span>
        </div>
        <h1 className={`${styles.wordmark} ${styles.headline}`}>
          {hero.headlineLines.map((line) => (
            <span key={line}>{line} </span>
          ))}
        </h1>
      </section>

      <section className={styles.banner}>
        <Image src={hero.portrait.src} alt={hero.portrait.alt} fill sizes="100vw" quality={85} priority className={styles.portrait} />
        <div className={styles.content}>
          <div className={styles.stats}>
            {hero.stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.bottom}>
            <div className={styles.lead}>
              <p className={`body18 ${styles.description}`}>{hero.description}</p>
              <div className={styles.actions}>
                <Button href={hero.primaryCta.href} label={hero.primaryCta.label} variant="white" />
                <Button href={hero.secondaryCta.href} label={hero.secondaryCta.label} variant="outline" />
              </div>
            </div>
            <div className={styles.tags}>
              {hero.tags.map((tag) => (
                <a key={tag.label} href={tag.href} className={styles.tag}>
                  {tag.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
