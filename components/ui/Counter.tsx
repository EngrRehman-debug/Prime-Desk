"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1000;

/** Counts up to `end` in the original counter's stepped intervals, restarting whenever it re-enters view. */
export default function Counter({ end, suffix = "", className }: { end: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const steps = Math.min(1000, Math.max(20, end <= 100 ? end : end <= 1000 ? Math.ceil(end / 2) : Math.ceil(end / 10)));
    let timer = 0;

    const run = () => {
      window.clearInterval(timer);
      let step = 0;
      timer = window.setInterval(() => {
        step += 1;
        if (step >= steps) {
          setValue(end);
          window.clearInterval(timer);
          return;
        }
        setValue(Math.round((end / steps) * step));
      }, DURATION_MS / steps);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) run();
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [end]);

  return (
    <div ref={ref} className={className}>
      {value}
      {suffix}
    </div>
  );
}
