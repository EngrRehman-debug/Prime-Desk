import type { ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "red" | "white" | "outline" | "planLight" | "planDark" | "work" | "submit" | "dark" | "apply";

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path
        d="M 11 3.414 L 1.414 13 L 0 11.586 L 9.586 2 L 2.5 2 L 2.5 0 L 13 0 L 13 10.5 L 11 10.5 Z"
        fill="currentColor"
        transform="translate(5.5 5.5)"
      />
    </svg>
  );
}

type InnerProps = { label: string; arrow?: boolean; align?: "center" };

export function ButtonInner({ label, arrow = true }: InnerProps) {
  return (
    <>
      <span className={styles.text}>
        <span className={styles.line}>{label}</span>
        <span className={`${styles.line} ${styles.lineHover}`} aria-hidden="true">
          {label}
        </span>
      </span>
      {arrow && (
        <span className={styles.icon}>
          <span className={styles.arrow}>
            <Arrow />
          </span>
          <span className={`${styles.arrow} ${styles.arrowHover}`}>
            <Arrow />
          </span>
        </span>
      )}
    </>
  );
}

type ButtonProps = {
  href?: string;
  label: string;
  variant?: ButtonVariant;
  arrow?: boolean;
  block?: boolean;
  as?: "a" | "span" | "button";
  className?: string;
  children?: ReactNode;
};

/** Pill button with Framer's two-line text slide and diagonal arrow swap on hover. */
export default function Button({ href, label, variant = "red", arrow = true, block, as = "a", className = "" }: ButtonProps) {
  const classes = `${styles.button} ${styles[variant]} ${block ? styles.block : ""} ${className}`;
  const inner = <ButtonInner label={label} arrow={arrow} />;
  if (as === "span") return <span className={classes}>{inner}</span>;
  if (as === "button")
    return (
      <button type="submit" className={classes}>
        {inner}
      </button>
    );
  return (
    <a href={href} className={classes}>
      {inner}
    </a>
  );
}

export const buttonHoverGroup = styles.group;
