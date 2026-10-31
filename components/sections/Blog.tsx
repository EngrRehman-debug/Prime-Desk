import Image from "next/image";
import BlogCard, { BlogCategory } from "@/components/ui/BlogCard";
import Button, { buttonHoverGroup } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import type content from "@/data/landing-page.json";
import styles from "./Blog.module.css";

type Props = { content: typeof content.blog };

export default function Blog({ content: blog }: Props) {
  const { featured } = blog;
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Reveal className={styles.header}>
          <h2 className={`h1 ${styles.heading}`}>{blog.heading}</h2>
          <div className={styles.headerText}>
            <p className="body18">{blog.description}</p>
            <Button href={blog.cta.href} label={blog.cta.label} />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <a href={featured.href} className={`${styles.featured} ${buttonHoverGroup}`}>
            <div className={styles.featuredImage}>
              <Image src={featured.image} alt={featured.title} fill sizes="(max-width: 809px) 100vw, 566px" quality={85} />
            </div>
            <div className={styles.featuredContent}>
              <div className={styles.featuredText}>
                <BlogCategory label={featured.category} />
                <div className={styles.copy}>
                  <h3>{featured.title}</h3>
                  <p className={`body18 ${styles.featuredDescription}`}>{featured.description}</p>
                </div>
              </div>
              <Button as="span" label={blog.viewLabel} arrow={false} block className={styles.viewButton} />
            </div>
          </a>
        </Reveal>

        <div className={styles.posts}>
          {blog.posts.map((post, index) => (
            <Reveal key={post.title} delay={0.1 + index * 0.1}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
