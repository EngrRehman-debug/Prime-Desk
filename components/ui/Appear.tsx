import type { CSSProperties, ReactNode } from "react";

/** Load-in entrance from the original pages: rises 60px and fades in after `delay` seconds. */
export default function Appear({ delay = 0, className = "", children }: { delay?: number; className?: string; children: ReactNode }) {
  return (
    <div className={`appear ${className}`} style={{ "--appear-delay": `${delay}s` } as CSSProperties}>
      {children}
    </div>
  );
}
