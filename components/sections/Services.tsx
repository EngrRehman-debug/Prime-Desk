"use client";

import Image from "next/image";
import { Fragment, useState } from "react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import type content from "@/data/landing-page.json";
import styles from "./Services.module.css";

type Props = {
  content: typeof content.services;
  /** Keeps rows static, with no hover expansion, up to 1440px instead of 1200px. */
  staticUntil1440?: boolean;
};

export default function Services({ content: services, staticUntil1440 = false }: Props) {
  const [active, setActive] = useState(0);

  return (
    <section className={styles.section} data-static-until-1440={staticUntil1440}>
      <div className={styles.header}>
        <Reveal>
          <h2 className="h1">{services.heading}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className={`body18 ${styles.description}`}>{services.description}</p>
        </Reveal>
      </div>

      <div className={styles.rows}>
        {services.items.map((item, index) => (
          <Fragment key={item.title}>
            <span className={styles.line} data-hidden={index > 0 && active === index - 1} />
            <article className={styles.row} data-active={active === index} onMouseEnter={() => setActive(index)}>
              <div className={styles.expanded} aria-hidden={active !== index}>
                <Image src={services.background} alt="" fill sizes="100vw" quality={85} className={styles.background} />
                <div className={styles.expandedInner}>
                  <div className={styles.media}>
                    <span className={styles.number}>{item.number}</span>
                    <div className={styles.image}>
                      <Image src={item.image} alt="" fill sizes="387px" quality={85} />
                    </div>
                  </div>
                  <div className={styles.details}>
                    <div className={styles.titleRow}>
                      <div className={styles.titleBlock}>
                        <p className={styles.category}>{item.category}</p>
                        <h3 className={styles.title}>{item.title}</h3>
                      </div>
                      <Button href={services.cta.href} label={services.cta.label} />
                    </div>
                    <div className={styles.summary}>
                      <div className={styles.projects}>
                        <div className={styles.count}>
                          <strong>{services.projectsValue}</strong>
                          <span>{services.projectsLabel}</span>
                        </div>
                        <p className="body18">{services.projectsDescription}</p>
                      </div>
                      <div className={styles.offerings}>
                        {item.offerings.map((offering) => (
                          <div key={offering} className={styles.offering}>
                            {offering}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.collapsed}>
                <span className={styles.number}>{item.number}</span>
                <div className={styles.titleRow}>
                  <div className={styles.titleBlock}>
                    <p className={styles.category}>{item.category}</p>
                    <h3 className={styles.title}>{item.title}</h3>
                  </div>
                  <Button href={services.cta.href} label={services.cta.label} />
                </div>
              </div>
            </article>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
