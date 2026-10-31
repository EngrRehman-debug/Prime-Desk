"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Uses the softer spring (damping 60) that some original sections use. */
  soft?: boolean;
};

/** Mirrors Framer's in-view appear effect: opacity 0 and y 60 to rest, once. */
export default function Reveal({ children, delay = 0, className = "", soft = false }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Written directly so the transition starts this frame rather than after a React render.
          node.dataset.visible = "true";
          observer.disconnect();
        }
      },
      { threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${soft ? "reveal-soft" : ""} ${className}`}
      data-visible="false"
      style={{ "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}
