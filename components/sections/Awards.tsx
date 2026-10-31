"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import type page from "@/data/about-page.json";
import styles from "./Awards.module.css";

type Props = { content: typeof page.awards };

export default function Awards({ content: awards }: Props) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className={styles.section}>
      <Image src={awards.background} alt="" fill sizes="100vw" quality={85} className={styles.background} />
      <div className={styles.container}>
        <div className={styles.header}>
          <Reveal soft>
            <h2 className="h1">{awards.heading}</h2>
          </Reveal>
          <Reveal soft delay={0.1}>
            <p className="body18">{awards.description}</p>
          </Reveal>
        </div>

        <Reveal soft delay={0.2} className={styles.content}>
          <div className={styles.preview}>
            {awards.items.map((item, index) => (
              <div key={item.title} className={styles.previewImage} data-on={active === index}>
                <Image src={item.image} alt="" fill sizes="285px" quality={85} />
              </div>
            ))}
          </div>
          <div className={styles.rows} onMouseLeave={() => setActive(null)}>
            {awards.items.map((item, index) => (
              <div key={item.title} className={styles.row} onMouseEnter={() => setActive(index)}>
                <span className={styles.meta}>{item.number}</span>
                <span className={styles.meta}>{item.year}</span>
                <h3>{item.title}</h3>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
