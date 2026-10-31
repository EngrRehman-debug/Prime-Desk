import Appear from "@/components/ui/Appear";
import Button from "@/components/ui/Button";
import StatementRow from "@/components/ui/StatementRow";
import type page from "@/data/career-page.json";
import styles from "./CareerHero.module.css";

type Props = { content: typeof page.hero };

export default function CareerHero({ content: hero }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <Appear>
            <h1 className="h1">{hero.heading}</h1>
          </Appear>
          <Appear delay={0.1}>
            <p className={`body18 ${styles.description}`}>{hero.description}</p>
          </Appear>
          <Appear delay={0.2} className={styles.cta}>
            <Button href={hero.cta.href} label={hero.cta.label} />
          </Appear>
        </div>
        <Appear delay={0.3}>
          <StatementRow eyebrow={hero.eyebrow} statement={hero.statement} />
        </Appear>
      </div>
    </section>
  );
}
