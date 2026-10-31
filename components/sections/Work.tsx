"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import Appear from "@/components/ui/Appear";
import Button, { buttonHoverGroup } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { useScrollSpring } from "@/components/ui/useScrollSpring";
import type content from "@/data/landing-page.json";
import styles from "./Work.module.css";

type Props = {
  content: typeof content.work;
  /** "page" is the top of the Work page: a load-in entrance, h1 and page spacing. */
  variant?: "section" | "page";
};

/** Total scale lost by each stacked card, and the scroll offset where it starts shrinking. */
const SCALE_STEPS = [2, 2, 1, 0];
const SCALE_PER_STEP = 0.1;
const CARD_GAP = 20;
const SPRING_POLES = [3.46, 40] as const;
const SETTLE_DISTANCE = 0.001;
const startOffset = (width: number) => (width >= 1200 ? 360 : width >= 810 ? 470 : 180);

export default function Work({ content: work, variant = "section" }: Props) {
  const isPage = variant === "page";
  const Entrance = isPage ? Appear : Reveal;
  const Heading = isPage ? "h1" : "h2";

  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const readTargets = useCallback(() => {
    const wrapper = slotRefs.current[0]?.parentElement;
    if (!wrapper) return [];
    const offset = startOffset(window.innerWidth);
    const scrollY = window.scrollY;
    // Slots are sticky, so their resting position is derived from the wrapper and slot heights.
    let flowTop = wrapper.getBoundingClientRect().top + scrollY;
    return slotRefs.current.map((slot, index) => {
      const spacing = (slot?.offsetHeight ?? 0) + CARD_GAP;
      const start = flowTop - offset;
      const firstStepEnd = start + spacing;
      // A card that would start shrinking above the page top instead starts at scroll 0.
      const progress = start < 0 && scrollY < firstStepEnd ? scrollY / firstStepEnd : (scrollY - start) / spacing;
      const steps = Math.min(SCALE_STEPS[index], Math.max(0, progress));
      flowTop += spacing;
      return 1 - steps * SCALE_PER_STEP;
    });
  }, []);

  const apply = useCallback((scales: number[]) => {
    scales.forEach((scale, index) => {
      const card = cardRefs.current[index];
      if (card) card.style.transform = scale === 1 ? "" : `scale(${scale})`;
    });
  }, []);

  useScrollSpring(readTargets, apply, SPRING_POLES[0], SPRING_POLES[1], SETTLE_DISTANCE);

  return (
    <section className={styles.section} data-variant={variant}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Entrance>
            <Heading className="h1">{work.heading}</Heading>
          </Entrance>
          <Entrance delay={0.1}>
            <p className={`body18 ${styles.description}`}>{work.description}</p>
          </Entrance>
        </div>

        <Reveal delay={0.2}>
          <div className={styles.cards}>
            {work.items.map((item, index) => (
              <div
                key={item.title}
                ref={(node) => {
                  slotRefs.current[index] = node;
                }}
                className={styles.slot}
              >
                <div
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  className={styles.scaler}
                >
                  <a href={item.href} className={`${styles.card} ${buttonHoverGroup}`}>
                    <div className={styles.content}>
                      <div className={styles.info}>
                        <div className={styles.intro}>
                          <h3>{item.title}</h3>
                          <p className="body18">{item.description}</p>
                        </div>
                        <span className={styles.rule} />
                        <div className={styles.meta}>
                          <p className={styles.metaLabel}>{work.clientLabel}</p>
                          <div className={styles.metaItem}>
                            <span className={styles.dot} />
                            {item.client}
                          </div>
                        </div>
                        <span className={styles.rule} />
                        <div className={styles.meta}>
                          <p className={styles.metaLabel}>{work.servicesLabel}</p>
                          <div className={styles.metaList}>
                            {item.services.map((service) => (
                              <div key={service} className={styles.metaItem}>
                                <span className={styles.dot} />
                                {service}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Button as="span" label={work.ctaLabel} variant="work" className={styles.button} />
                    </div>
                    <div className={styles.image}>
                      <Image src={item.image} alt={item.title} fill sizes="(max-width: 809px) 100vw, 592px" quality={85} />
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
