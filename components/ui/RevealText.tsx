"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollFrame } from "@/components/ui/useScrollFrame";
import styles from "./RevealText.module.css";

/** Reveal window from the original component: text top from 60% of the viewport up to 0%. */
const VIEWPORT_START = 0.6;
const LOAD_MEASURE_DELAY_MS = 350;

/** Darkens text one character at a time as it scrolls up the viewport. */
export default function RevealText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [revealed, setRevealed] = useState(0);
  const characters = text.split("");

  const update = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    const start = window.innerHeight * VIEWPORT_START;
    const progress = Math.min(1, Math.max(0, (start - node.getBoundingClientRect().top) / start));
    setRevealed(Math.ceil(characters.length * progress));
  }, [characters.length]);

  useScrollFrame(update);

  // The original measures once while its load-in entrance is still moving the text.
  useEffect(() => {
    const timer = window.setTimeout(update, LOAD_MEASURE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [update]);

  return (
    <p ref={ref} className={`${styles.text} ${className}`} aria-label={text}>
      {characters.map((character, index) => (
        <span key={index} className={styles.character} data-on={index < revealed} aria-hidden="true">
          {character}
        </span>
      ))}
    </p>
  );
}
