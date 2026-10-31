import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import type content from "@/data/landing-page.json";
import styles from "./Testimonials.module.css";

type Props = { content: typeof content.testimonials };
type Testimonial = Props["content"]["left"][number];

function Star() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        d="M 11.725 0 C 12.87 0 13.771 0.865 14.347 2.031 L 16.269 5.907 C 16.328 6.027 16.466 6.196 16.673 6.351 C 16.881 6.505 17.084 6.59 17.218 6.613 L 20.697 7.196 C 21.954 7.407 23.008 8.023 23.35 9.096 C 23.692 10.168 23.191 11.282 22.287 12.187 L 22.286 12.188 L 19.583 14.914 C 19.476 15.022 19.356 15.225 19.281 15.49 C 19.206 15.754 19.199 15.993 19.233 16.148 L 19.233 16.151 L 20.007 19.522 C 20.328 20.925 20.221 22.317 19.232 23.045 C 18.239 23.775 16.881 23.451 15.649 22.717 L 12.387 20.77 C 12.25 20.688 12.015 20.622 11.731 20.622 C 11.449 20.622 11.209 20.687 11.063 20.772 L 11.061 20.773 L 7.805 22.716 C 6.574 23.453 5.218 23.771 4.225 23.04 C 3.236 22.313 3.124 20.924 3.446 19.521 L 4.219 16.151 L 4.22 16.148 C 4.254 15.993 4.247 15.754 4.172 15.49 C 4.097 15.225 3.977 15.022 3.87 14.914 L 1.165 12.186 C 0.267 11.281 -0.232 10.168 0.107 9.097 C 0.447 8.024 1.498 7.407 2.756 7.196 L 6.233 6.613 L 6.234 6.613 C 6.361 6.591 6.561 6.507 6.768 6.352 C 6.976 6.197 7.114 6.028 7.173 5.907 L 7.176 5.901 L 9.096 2.03 L 9.096 2.029 C 9.677 0.863 10.582 0 11.725 0 Z"
        fill="#ff4c39"
      />
    </svg>
  );
}

function Card({ item, delay, slot }: { item: Testimonial; delay: number; slot: string }) {
  return (
    <Reveal delay={delay} className={`${styles.cardWrap} ${styles[slot]}`}>
      <div className={styles.flip} tabIndex={0}>
        <div className={styles.flipInner}>
          <div className={styles.back}>
            <Image src={item.portrait} alt={item.name} fill sizes="(max-width: 809px) 100vw, 413px" quality={85} />
          </div>
          <div className={styles.front}>
            <div className={styles.stars}>
              {[0, 1, 2, 3, 4].map((star) => (
                <Star key={star} />
              ))}
            </div>
            <p className={styles.quote}>{item.quote}</p>
            <p className={styles.highlight}>{item.highlight}</p>
            <div className={styles.author}>
              <Image src={item.avatar} alt="" width={44} height={44} quality={85} />
              <div className={styles.name}>
                <p>{item.name}</p>
                <span>{item.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Testimonials({ content: testimonials }: Props) {
  const [first, second, third] = testimonials.left;
  const [fourth, fifth] = testimonials.right;

  return (
    <section className={styles.section}>
      <div className={styles.background}>
        <div className={styles.backgroundInner}>
          <Image src={testimonials.background} alt="" fill sizes="100vw" quality={85} />
        </div>
      </div>

      <div className={styles.titleLayer}>
        <div className={styles.titleSticky}>
          <Reveal>
            <h2 className={`h1 ${styles.heading}`}>
              {testimonials.headingLines[0]}
              <br />
              {testimonials.headingLines[1]}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={`body18 ${styles.description}`}>{testimonials.description}</p>
          </Reveal>
        </div>
      </div>

      <div className={styles.columns}>
        <div className={styles.left}>
          <Card item={first} delay={0.2} slot="slotA" />
          <Card item={second} delay={0.4} slot="slotB" />
          <Card item={third} delay={0.6} slot="slotC" />
        </div>
        <div className={styles.right}>
          <Card item={fourth} delay={0.3} slot="slotD" />
          <Card item={fifth} delay={0.5} slot="slotE" />
        </div>
      </div>
    </section>
  );
}
