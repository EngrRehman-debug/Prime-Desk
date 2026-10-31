import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import type details from "@/data/work-details.json";
import styles from "./WorkDetail.module.css";

type Props = {
  project: (typeof details.projects)["alongside"];
  shared: typeof details.shared;
};

export default function WorkDetail({ project, shared }: Props) {
  const rows = [
    { label: shared.labels.client, value: project.client },
    { label: shared.labels.category, value: shared.category },
    { label: shared.labels.period, value: shared.period },
    { label: shared.labels.industry, value: shared.industry },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Reveal soft className={styles.header}>
          <div className={styles.titleWrap}>
            <h1 className="h1">{project.title}</h1>
            <div className={styles.tags}>
              {project.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <p className={`body18 ${styles.description}`}>{project.description}</p>
        </Reveal>

        <div className={styles.image}>
          <Image src={project.image} alt={project.title} fill sizes="(max-width: 1279px) 100vw, 1200px" quality={85} priority />
        </div>

        <div className={styles.stats}>
          {shared.stats.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>

        <Reveal soft delay={0.2} className={styles.rows}>
          {rows.map((row) => (
            <div key={row.label} className={styles.row}>
              <span className={styles.line} />
              <p>{row.label}</p>
              <h3>{row.value}</h3>
            </div>
          ))}
        </Reveal>

        <Reveal soft delay={0.3} className={styles.story}>
          <div className={styles.copy}>
            <h3>{shared.challenge.heading}</h3>
            {shared.challenge.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className={`${styles.copy} ${styles.strategy}`}>
            <h3>{shared.strategy.heading}</h3>
            {shared.strategy.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
