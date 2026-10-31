import Image from "next/image";
import type { ReactNode } from "react";
import Appear from "@/components/ui/Appear";
import styles from "./UtilityHero.module.css";

type Props = {
  image: string;
  heading: string;
  description: string;
  children: ReactNode;
};

/** Full-height centered message used by the Coming Soon and 404 pages. */
export default function UtilityHero({ image, heading, description, children }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Appear>
          <Image src={image} alt="" width={220} height={220} unoptimized priority />
        </Appear>
        <div className={styles.title}>
          <Appear delay={0.1}>
            <h1 className="h1">{heading}</h1>
          </Appear>
          <Appear delay={0.2}>
            <p className={`body18 ${styles.description}`}>{description}</p>
          </Appear>
        </div>
        <Appear delay={0.3} className={styles.action}>
          {children}
        </Appear>
      </div>
    </section>
  );
}
