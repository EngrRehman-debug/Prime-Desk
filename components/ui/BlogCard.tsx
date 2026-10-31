import Image from "next/image";
import styles from "./BlogCard.module.css";

export function BlogCategory({ label, overlay = false }: { label: string; overlay?: boolean }) {
  return (
    <span className={`${styles.category} ${overlay ? styles.overlay : ""}`}>
      <span className={styles.dot} />
      {label}
    </span>
  );
}

type Post = {
  category: string;
  title: string;
  description: string;
  href: string;
  image: string;
  objectPosition: string;
};

/** Blog post card with a zooming image and its category over the image corner. */
export default function BlogCard({ post }: { post: Post }) {
  return (
    <a href={post.href} className={styles.card}>
      <div className={styles.image}>
        <Image src={post.image} alt={post.title} fill sizes="(max-width: 809px) 100vw, 558px" quality={85} style={{ objectPosition: post.objectPosition }} />
        <BlogCategory label={post.category} overlay />
      </div>
      <div className={styles.copy}>
        <h3>{post.title}</h3>
        <p className="body18">{post.description}</p>
      </div>
    </a>
  );
}
