"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import { useScrollSpring } from "@/components/ui/useScrollSpring";
import type content from "@/data/landing-page.json";
import styles from "./Process.module.css";

type Props = { content: typeof content.process };

const TABLET_TRAVEL = 660;
const PHONE_TRAVEL = 1055;
const SPRING_POLES = [10, 30] as const;

export default function Process({ content: process }: Props) {
  const railRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const readTargets = useCallback(() => {
    const spacer = scrollRef.current;
    const width = window.innerWidth;
    if (!spacer || width >= 1200) return [0];
    const box = spacer.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (window.innerHeight - box.top) / box.height));
    return [-(width >= 810 ? TABLET_TRAVEL : PHONE_TRAVEL) * progress];
  }, []);

  const apply = useCallback(([x]: number[]) => {
    if (railRef.current) railRef.current.style.transform = x === 0 ? "" : `translate3d(${x}px, 0, 0)`;
  }, []);

  useScrollSpring(readTargets, apply, SPRING_POLES[0], SPRING_POLES[1]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Reveal className={styles.header}>
          <h2 className={`h1 ${styles.heading}`}>{process.heading}</h2>
          <p className={`body18 ${styles.description}`}>{process.description}</p>
        </Reveal>
        <Reveal delay={0.1} className={styles.wrapper}>
          <div ref={railRef} className={styles.rail}>
            {process.steps.map((step, index) => (
              <div key={step.number} className={styles.row}>
                <div className={styles.slot} style={{ gridColumn: index + 1 }}>
                  <article className={styles.card}>
                    <Image src={step.image} alt="" fill sizes="(max-width: 1199px) 335px, 285px" quality={85} className={styles.image} />
                    <span className={styles.number}>{step.number}</span>
                    <div className={styles.text}>
                      <h3>{step.title}</h3>
                      <p className="body18">{step.description}</p>
                    </div>
                  </article>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <div ref={scrollRef} className={styles.scrollSpacer} />
    </section>
  );
}
