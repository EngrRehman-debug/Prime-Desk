import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import type details from "@/data/blog-details.json";
import styles from "./BlogDetail.module.css";

type Props = {
  post: (typeof details.posts)["why-most-digital-marketing-campaigns-fail"];
  shared: typeof details.shared;
};

export default function BlogDetail({ post, shared }: Props) {
  const { subscribe } = shared;
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Reveal>
            <h1 className={`h1 ${styles.title}`}>{post.title}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={`body18 ${styles.description}`}>{post.description}</p>
          </Reveal>
        </div>

        <div className={styles.image}>
          <Image src={post.image} alt={post.title} fill sizes="(max-width: 1279px) 100vw, 1200px" quality={85} priority style={{ objectPosition: post.objectPosition }} />
        </div>
        <div className={`body18 ${styles.meta}`}>
          <p className={styles.readTime}>
            <span>{post.readTime}</span>
            <span>{post.readTimeLabel}</span>
          </p>
          <p>{post.category}</p>
          <p>{post.tag}</p>
        </div>

        <Reveal soft delay={0.4} className={styles.content}>
          <article className={styles.body}>
            {shared.body.map((block) => (
              <div key={block.heading} className={styles.block}>
                <h3>{block.heading}</h3>
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ))}
          </article>

          <form className={styles.subscribe} action="#">
            <p className={styles.subscribeTitle}>{subscribe.title}</p>
            <p className={styles.subscribeNote}>{subscribe.note}</p>
            <div className={styles.field}>
              <input type="email" name="email" aria-label="Email" placeholder={subscribe.placeholder} />
              <button type="submit" aria-label="Subscribe">
                <Image src={subscribe.arrow} alt="" width={24} height={24} unoptimized />
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
