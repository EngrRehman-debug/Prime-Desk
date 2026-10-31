import Image from "next/image";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import type content from "@/data/landing-page.json";
import styles from "./Cta.module.css";

type Props = { content: typeof content.cta };

export default function Cta({ content: cta }: Props) {
  return (
    <section className={styles.section}>
      <Reveal>
        <div className={styles.shape}>
          <Image src={cta.image} alt="" fill sizes="321px" quality={85} />
        </div>
      </Reveal>
      <div className={styles.title}>
        <Reveal delay={0.1}>
          <h2 className="h1">{cta.heading}</h2>
        </Reveal>
        {cta.description && (
          <Reveal delay={0.2}>
            <p className={`body18 ${styles.description}`}>{cta.description}</p>
          </Reveal>
        )}
        <Reveal delay={0.3} className={styles.button}>
          <Button href={cta.button.href} label={cta.button.label} />
        </Reveal>
      </div>
    </section>
  );
}
