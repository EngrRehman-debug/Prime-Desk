"use client";

import { useEffect, useRef } from "react";

const MAX_STEP = 1 / 240;

/**
 * Follows scroll-derived targets with an overdamped spring, the way Framer smooths
 * scroll-linked transforms. `slowPole` and `fastPole` are the spring's decay rates in 1/s;
 * the spring stops once it is within `settleDistance` of its target.
 */
export function useScrollSpring(
  readTargets: () => number[],
  apply: (values: number[]) => void,
  slowPole: number,
  fastPole: number,
  settleDistance = 0.0005,
) {
  const values = useRef<number[] | null>(null);
  const velocities = useRef<number[]>([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = 0;

    const frame = (now: number) => {
      raf = 0;
      const targets = readTargets();
      const current = values.current;
      if (!current || current.length !== targets.length || reducedMotion) {
        values.current = [...targets];
        velocities.current = targets.map(() => 0);
        apply(targets);
        return;
      }

      const elapsed = Math.min((now - last) / 1000, 0.05);
      last = now;
      const steps = Math.max(1, Math.ceil(elapsed / MAX_STEP));
      const dt = elapsed / steps;
      let moving = false;

      targets.forEach((target, index) => {
        let value = current[index];
        let velocity = velocities.current[index];
        for (let step = 0; step < steps; step += 1) {
          const acceleration = -(slowPole + fastPole) * velocity - slowPole * fastPole * (value - target);
          velocity += acceleration * dt;
          value += velocity * dt;
        }
        if (Math.abs(value - target) < settleDistance && Math.abs(velocity) < settleDistance * 10) {
          value = target;
          velocity = 0;
        } else {
          moving = true;
        }
        current[index] = value;
        velocities.current[index] = velocity;
      });

      apply(current);
      if (moving) raf = requestAnimationFrame(frame);
    };

    const schedule = () => {
      if (raf) return;
      // Count the frame that is about to run, so motion starts with the scroll instead of a frame behind it.
      last = performance.now() - 1000 / 60;
      raf = requestAnimationFrame(frame);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [readTargets, apply, slowPole, fastPole, settleDistance]);
}
