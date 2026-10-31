import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import type page from "@/data/contact-page.json";
import styles from "./ContactChannels.module.css";

type Props = { content: typeof page.channels };

export default function ContactChannels({ content }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Reveal className={styles.heading}>
          <h2 className="h1">{content.heading}</h2>
        </Reveal>
        <div className={styles.cards}>
          {content.items.map((item, index) => (
            <Reveal key={item.title} delay={0.1 + index * 0.1} className={styles.cardSlot}>
              <article className={styles.card}>
                <span className={styles.icon}>
                  <Image src={item.icon} alt="" width={35} height={35} unoptimized />
                </span>
                <div className={styles.text}>
                  <h3>
                    <a href={item.href}>{item.title}</a>
                  </h3>
                  <p>{item.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
