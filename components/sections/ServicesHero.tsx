import Image from "next/image";
import Appear from "@/components/ui/Appear";
import Counter from "@/components/ui/Counter";
import StatementRow from "@/components/ui/StatementRow";
import type page from "@/data/services-page.json";
import styles from "./ServicesHero.module.css";

type Props = { content: typeof page.hero };

function IconBadge({ src }: { src: string }) {
  return (
    <span className={styles.iconBadge}>
      <Image src={src} alt="" width={24} height={24} unoptimized />
    </span>
  );
}

export default function ServicesHero({ content: hero }: Props) {
  const { statCard, imageCard, tagCard } = hero;
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <Appear delay={0}>
            <h1 className="h1">{hero.heading}</h1>
          </Appear>
          <Appear delay={0.1}>
            <p className={`body18 ${styles.description}`}>{hero.description}</p>
          </Appear>
        </div>

        <Appear delay={0.2} className={styles.summary}>
          <StatementRow eyebrow={hero.eyebrow} statement={hero.statement} />
        </Appear>

        <div className={styles.cards}>
          <Appear delay={0.3} className={styles.cardSlot}>
            <article className={`${styles.card} ${styles.imageCard}`}>
              <Image src={statCard.image} alt="" fill sizes="(max-width: 809px) 100vw, (max-width: 1199px) 50vw, 387px" quality={85} className={styles.cardImage} />
              <div className={styles.cardTop}>
                <h3>{statCard.title}</h3>
                <IconBadge src={statCard.icon} />
              </div>
              <div className={styles.cardBottom}>
                <Counter end={statCard.counterEnd} suffix={statCard.counterSuffix} className={styles.counter} />
                <p>{statCard.description}</p>
              </div>
            </article>
          </Appear>

          <Appear delay={0.4} className={styles.cardSlot}>
            <article className={`${styles.card} ${styles.imageCard}`}>
              <Image src={imageCard.image} alt="" fill sizes="(max-width: 809px) 100vw, (max-width: 1199px) 50vw, 387px" quality={85} className={`${styles.cardImage} ${styles.brandImage}`} />
              <span className={styles.shade} />
              <div className={`${styles.cardTop} ${styles.cardTopEnd}`}>
                <IconBadge src={imageCard.icon} />
              </div>
              <div className={styles.cardBottom}>
                <h3>{imageCard.title}</h3>
                <p>{imageCard.description}</p>
              </div>
            </article>
          </Appear>

          <Appear delay={0.5} className={`${styles.cardSlot} ${styles.tagSlot}`}>
            <article className={`${styles.card} ${styles.tagCard}`}>
              <h3>{tagCard.title}</h3>
              <div className={styles.tags}>
                {tagCard.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </Appear>
        </div>
      </div>
    </section>
  );
}
