"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import type content from "@/data/landing-page.json";
import styles from "./Pricing.module.css";

type Props = {
  content: typeof content.pricing;
  /** Keeps the two-column plan grid up to 1440px instead of 1200px. */
  twoColumnsUntil1440?: boolean;
  /** "page" is the top of the Pricing page: an h1 and spacing below the nav. */
  variant?: "section" | "page";
};

export default function Pricing({ content: pricing, twoColumnsUntil1440 = false, variant = "section" }: Props) {
  const Heading = variant === "page" ? "h1" : "h2";

  const [yearly, setYearly] = useState(false);

  return (
    <section className={styles.section} data-two-columns-until-1440={twoColumnsUntil1440} data-variant={variant}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Reveal>
            <Heading className="h1">{pricing.heading}</Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={`body18 ${styles.description}`}>{pricing.description}</p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className={styles.switcher}>
            <span className={styles.switchLabel} data-on={!yearly}>
              {pricing.monthlyLabel}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={yearly}
              aria-label={pricing.yearlyLabel}
              className={styles.track}
              onClick={() => setYearly((value) => !value)}
            >
              <span className={styles.knob} data-on={yearly} />
            </button>
            <span className={styles.switchLabel} data-on={yearly}>
              {pricing.yearlyLabel}
            </span>
            <span className={styles.save}>{pricing.saveLabel}</span>
          </div>

          <div className={styles.plans}>
          {pricing.plans.map((plan) => (
            <article key={plan.name} className={styles.plan} data-featured={plan.featured}>
              <div className={styles.top}>
                <div className={styles.title}>
                  <h3>{plan.name}</h3>
                  <p className="body18">{plan.description}</p>
                </div>
                {plan.featured && <span className={styles.popular}>{pricing.popularLabel}</span>}
                <div className={styles.price}>
                  <span className={styles.unit}>{pricing.currency}</span>
                  <strong>{yearly ? plan.yearly : plan.monthly}</strong>
                  <span className={styles.unit}>{pricing.period}</span>
                </div>
                <Button href={pricing.ctaHref} label={pricing.ctaLabel} variant={plan.featured ? "planDark" : "planLight"} arrow={false} block />
              </div>
              <div className={styles.features}>
                <p className={styles.featuresTitle}>{pricing.featuresLabel}</p>
                <ul className={styles.list}>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <span className={styles.dot} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
