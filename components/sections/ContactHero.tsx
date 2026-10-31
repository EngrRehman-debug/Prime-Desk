"use client";

import Image from "next/image";
import type { FormEvent } from "react";
import Appear from "@/components/ui/Appear";
import type page from "@/data/contact-page.json";
import styles from "./ContactHero.module.css";

type Props = { content: typeof page.hero };

export default function ContactHero({ content: hero }: Props) {
  const { form } = hero;

  // This clone has no form backend yet, so a valid submission only clears the form.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Appear className={styles.header}>
          <h1 className="h1">{hero.heading}</h1>
          <div className={styles.lead}>
            <p className="body18">{hero.lead}</p>
            <p className="body18">{hero.description}</p>
          </div>
        </Appear>

        <Appear delay={0.1} className={styles.content}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.names}>
              <label className={styles.field}>
                {form.firstName.label}
                <input type="text" name="firstName" required placeholder={form.firstName.placeholder} />
              </label>
              <label className={styles.field}>
                {form.lastName.label}
                <input type="text" name="lastName" required placeholder={form.lastName.placeholder} />
              </label>
            </div>
            <label className={styles.field}>
              {form.email.label}
              <input type="email" name="email" required placeholder={form.email.placeholder} />
            </label>
            <label className={styles.field}>
              {form.service.label}
              <span className={styles.selectWrap}>
                <select name="service" required defaultValue="">
                  <option value="" disabled>
                    {form.service.placeholder}
                  </option>
                  {form.service.options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </span>
            </label>
            <label className={styles.field}>
              {form.message.label}
              <textarea name="message" placeholder={form.message.placeholder} />
            </label>
            <button type="submit" className={styles.submit}>
              {form.submitLabel}
            </button>
          </form>
          <div className={styles.image}>
            <Image src={hero.image} alt="" fill sizes="(max-width: 1439px) 100vw, 572px" quality={85} />
          </div>
        </Appear>
      </div>
    </section>
  );
}
