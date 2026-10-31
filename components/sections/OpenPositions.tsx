import { Fragment } from "react";
import Button, { buttonHoverGroup } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import type page from "@/data/career-page.json";
import styles from "./OpenPositions.module.css";

type Props = { content: typeof page.positions };

export default function OpenPositions({ content: positions }: Props) {
  const [location, ...details] = positions.details;
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Reveal>
            <h2 className="h1">{positions.heading}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={`body18 ${styles.description}`}>{positions.description}</p>
          </Reveal>
        </div>
        <div>
          {positions.roles.map((role) => (
            <a key={role} href={positions.href} className={`${styles.row} ${buttonHoverGroup}`}>
              <div className={styles.info}>
                <h3>{role}</h3>
                <div className={styles.details}>
                  <span>{positions.locationLabel}</span>
                  <span>{location}</span>
                  {details.map((detail) => (
                    <Fragment key={detail}>
                      <i className={styles.dot} />
                      <span>{detail}</span>
                    </Fragment>
                  ))}
                </div>
              </div>
              <Button as="span" label={positions.applyLabel} variant="apply" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
