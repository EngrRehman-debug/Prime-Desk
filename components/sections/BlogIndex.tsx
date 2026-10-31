import Appear from "@/components/ui/Appear";
import BlogCard from "@/components/ui/BlogCard";
import type page from "@/data/blog-page.json";
import styles from "./BlogIndex.module.css";

type Props = { content: typeof page };

export default function BlogIndex({ content }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Appear>
            <h1 className="h1">{content.hero.heading}</h1>
          </Appear>
          <Appear delay={0.1}>
            <p className={`body18 ${styles.description}`}>{content.hero.description}</p>
          </Appear>
        </div>
        <Appear delay={0.2} className={styles.posts}>
          {content.posts.map((post) => (
            <BlogCard key={post.href} post={post} />
          ))}
        </Appear>
      </div>
    </section>
  );
}
