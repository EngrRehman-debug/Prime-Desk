import Image from "next/image";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import type content from "@/data/landing-page.json";
import styles from "./Footer.module.css";

type Props = { content: typeof content.footer };

export default function Footer({ content: footer }: Props) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Reveal className={styles.top}>
          <div className={styles.brand}>
            <a href="/" className={styles.logo}>
              {footer.name}
            </a>
            <p>{footer.description}</p>
          </div>
          <form className={styles.form} action="#">
            <p className={styles.formTitle}>{footer.newsletter.title}</p>
            <div className={styles.field}>
              <input type="email" name="email" aria-label="Email" placeholder={footer.newsletter.placeholder} />
              <Button as="button" label={footer.newsletter.buttonLabel} variant="submit" className={styles.submit} />
            </div>
            <p className={styles.note}>{footer.newsletter.note}</p>
          </form>
        </Reveal>

        <div className={styles.columns}>
          {footer.columns.map((column, index) => (
            <Reveal key={column.title} delay={(index + 1) * 0.1} className={styles.column}>
              <p className={styles.columnTitle}>{column.title}</p>
              <ul className={styles.list}>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
          <Reveal delay={0.6} className={`${styles.column} ${styles.contactColumn}`}>
            <p className={styles.columnTitle}>{footer.contact.title}</p>
            <ul className={styles.contactList}>
              {footer.contact.items.map((item) => (
                <li key={item.label} className={styles.contactItem}>
                  <Image src={item.icon} alt="" width={40} height={40} unoptimized />
                  <div>
                    <a href={item.href}>{item.label}</a>
                    <p>{item.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className={styles.wordmark}>
          <svg viewBox="0 0 1000 162" aria-hidden="true">
            <defs>
              <linearGradient id="footer-wordmark-fade" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="162">
                <stop offset="0" stopColor="#0066fa" />
                <stop offset="0.45" stopColor="#0b3fa8" />
                <stop offset="1" stopColor="#192033" />
              </linearGradient>
            </defs>
            <text x="0" y="150" textLength="1000" lengthAdjust="spacingAndGlyphs" fill="url(#footer-wordmark-fade)">
              {footer.name}
            </text>
          </svg>
        </Reveal>

        <p className={styles.copyright}>{footer.copyright}</p>
      </div>
    </footer>
  );
}
