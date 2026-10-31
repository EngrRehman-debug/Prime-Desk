"use client";

import Image from "next/image";
import { useState } from "react";
import Button from "@/components/ui/Button";
import type content from "@/data/landing-page.json";
import styles from "./Nav.module.css";

type Props = { content: typeof content.nav };

export default function Nav({ content: nav }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const mobileGroups = nav.mobileOrder
    .map((title) => nav.dropdown.find((group) => group.title === title))
    .filter((group): group is (typeof nav.dropdown)[number] => Boolean(group));

  return (
    <nav className={styles.nav} data-open={menuOpen} onMouseLeave={() => setDropdownOpen(false)}>
      <div className={styles.container}>
        <a href="/" className={styles.logo} aria-label={nav.logo.alt}>
          <Image src={nav.logo.src} alt="" width={161} height={24} priority unoptimized />
        </a>

        <div className={styles.links}>
          {nav.links.map((link) => (
            <a key={link.label} href={link.href} className={`${styles.link} ${link.desktopOnly ? styles.desktopOnly : ""}`}>
              {link.label}
            </a>
          ))}
          <button
            type="button"
            className={styles.allPages}
            aria-expanded={dropdownOpen}
            data-open={dropdownOpen}
            onMouseEnter={() => setDropdownOpen(true)}
            onClick={() => setDropdownOpen((open) => !open)}
          >
            {nav.allPagesLabel}
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M 0 0 L 6 6 L 12 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="translate(6 9)" />
            </svg>
          </button>
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

      <div className={styles.dropdown} data-open={dropdownOpen} aria-hidden={!dropdownOpen}>
        {nav.dropdown.map((group) => (
          <div key={group.title} className={styles.dropdownGroup}>
            <p className={styles.groupTitle}>{group.title}</p>
            {group.links.map((link) => (
              <a key={link.label} href={link.href} className={styles.dropdownLink} tabIndex={dropdownOpen ? 0 : -1}>
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.menu} data-open={menuOpen} aria-hidden={!menuOpen}>
        {mobileGroups.map((group) => (
          <div key={group.title} className={styles.menuGroup} data-group={group.title}>
            <p className={styles.groupTitle}>{group.title}</p>
            <div className={styles.menuGrid}>
              {group.links.map((link) => (
                <a key={link.label} href={link.href} className={styles.menuLink} tabIndex={menuOpen ? 0 : -1}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ))}
        <Button href={nav.cta.href} label={nav.cta.label} block />
      </div>
    </nav>
  );
}
