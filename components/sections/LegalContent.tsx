import Image from "next/image";
import Appear from "@/components/ui/Appear";
import Button from "@/components/ui/Button";
import type legal from "@/data/legal-pages.json";
import styles from "./LegalContent.module.css";

type Props = {
  content: typeof legal.privacy;
  cta: typeof legal.shared.cta;
};

export default function LegalContent({ content, cta }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Appear>
            <h1 className="h1">{content.heading}</h1>
          </Appear>
          <Appear delay={0.1}>
            <p className={`body18 ${styles.description}`}>{content.description}</p>
          </Appear>
          <Appear delay={0.2} className={styles.updated}>
            <span className={styles.updatedLabel}>
              <Image src="/images/icon-updated.svg" alt="" width={22} height={22} unoptimized />
              {content.updatedLabel}
            </span>
            <span className={styles.separator}>{content.separator}</span>
            <span className={styles.note}>{content.note}</span>
          </Appear>
        </div>

        {content.rows.map((row) => (
          <div key={row.heading} className={styles.row}>
            <h3>{row.heading}</h3>
            <div className={styles.body} data-tight={"tight" in row}>
              {row.blocks.map((block, index) =>
                "bullet" in block ? (
                  <p key={index} className={styles.bullet}>
                    {block.bullet}
                  </p>
                ) : (
                  <p key={index} className={styles.text}>
                    {block.text}
                  </p>
                ),
              )}
              {"cta" in row && <Button href={cta.href} label={cta.label} variant="dark" arrow={false} className={styles.cta} />}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
