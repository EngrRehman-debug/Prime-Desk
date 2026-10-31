"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Appear from "@/components/ui/Appear";
import type page from "@/data/pages.json";
import styles from "./ContactHero.module.css";

type Props = { content: typeof page.contact.hero };
type Status = "idle" | "sending" | "sent" | "error";

export default function ContactHero({ content: hero }: Props) {
  const { form } = hero;
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  // Links from a service row name that service, so its checkbox starts ticked.
  useEffect(() => {
    const service = new URLSearchParams(window.location.search).get("service");
    if (!service) return;
    formRef.current?.querySelectorAll<HTMLInputElement>('input[name="needs"]').forEach((input) => {
      if (input.value === service) input.checked = true;
    });
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const element = event.currentTarget;
    const data = new FormData(element);
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          company: data.get("company"),
          needs: data.getAll("needs"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });
      if (!response.ok) throw new Error("Request failed");
      element.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Appear className={styles.header}>
          <h1 className="h1">{hero.heading}</h1>
          <div className={styles.lead}>
            <p className="body18">{hero.lead}</p>
          </div>
        </Appear>

        <Appear delay={0.1} className={styles.content}>
          <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.names}>
              <label className={styles.field}>
                {form.name.label}
                <input type="text" name="name" autoComplete="name" required maxLength={120} placeholder={form.name.placeholder} />
              </label>
              <label className={styles.field}>
                {form.email.label}
                <input type="email" name="email" autoComplete="email" required maxLength={200} placeholder={form.email.placeholder} />
              </label>
            </div>
            <div className={styles.names}>
              <label className={styles.field}>
                {form.phone.label}
                <input type="tel" name="phone" autoComplete="tel" maxLength={40} placeholder={form.phone.placeholder} />
              </label>
              <label className={styles.field}>
                {form.company.label}
                <input type="text" name="company" autoComplete="organization" maxLength={160} placeholder={form.company.placeholder} />
              </label>
            </div>
            <fieldset className={styles.needs}>
              <legend>{form.needs.label}</legend>
              <div className={styles.options}>
                {form.needs.options.map((option) => (
                  <label key={option} className={styles.option}>
                    <input type="checkbox" name="needs" value={option} />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className={styles.field}>
              {form.message.label}
              <textarea name="message" maxLength={4000} placeholder={form.message.placeholder} />
            </label>
            {/* Hidden from people; bots that fill it are ignored by the API route. */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className={styles.trap} />
            <button type="submit" className={styles.submit} disabled={status === "sending"}>
              {status === "sending" ? form.sendingLabel : form.submitLabel}
            </button>
            <div role="status">
              {status === "sent" && <p className={styles.status}>{form.success}</p>}
              {status === "error" && (
                <p className={styles.status} data-status="error">
                  {form.error}
                </p>
              )}
            </div>
          </form>
          <div className={styles.image}>
            <Image src={hero.image.src} alt={hero.image.alt} fill sizes="(max-width: 1439px) 100vw, 572px" quality={85} />
          </div>
        </Appear>
      </div>
    </section>
  );
}
