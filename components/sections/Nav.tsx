"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import type content from "@/data/landing-page.json";
import styles from "./Nav.module.css";

type Props = { content: typeof content.nav };

export default function Nav({ content: nav }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.nav} data-open={menuOpen} aria-label="Main">
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          {nav.name}
        </a>

        <div className={styles.links}>
          {nav.links.map((link) => (
            <a key={link.label} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </div>

        <div className={styles.cta}>
          <Button href={nav.cta.href} label={nav.cta.label} />
        </div>

        <button
          type="button"
          className={styles.menuButton}
          aria-label="Menu"
          aria-expanded={menuOpen}
          data-open={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={styles.menu} data-open={menuOpen} aria-hidden={!menuOpen}>
        <div className={styles.menuGroup}>
          <div className={styles.menuGrid}>
            {nav.links.map((link) => (
              <a key={link.label} href={link.href} className={styles.menuLink} tabIndex={menuOpen ? 0 : -1}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <Button href={nav.cta.href} label={nav.cta.label} block />
      </div>
    </nav>
  );
}
