"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./Ticker.module.css";

const SPEED_PX_PER_SECOND = 51;
const COPIES = 4;

/** Endless left-moving marquee at a constant measured speed. */
export default function Ticker({ children, gap }: { children: ReactNode; gap: number }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const groupWidth = track.scrollWidth / COPIES;
      track.style.animationDuration = `${groupWidth / SPEED_PX_PER_SECOND}s`;
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.viewport}>
      <div ref={trackRef} className={styles.track}>
        {Array.from({ length: COPIES }, (_, copy) => (
          <div key={copy} className={styles.group} style={{ gap, paddingRight: gap }} aria-hidden={copy > 0}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
