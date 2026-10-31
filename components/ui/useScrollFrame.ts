"use client";

import { useEffect } from "react";

/** Runs `onFrame` once per animation frame while the page scrolls or resizes. */
export function useScrollFrame(onFrame: () => void) {
  useEffect(() => {
    let raf = 0;
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        onFrame();
      });
    };
    onFrame();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [onFrame]);
}
