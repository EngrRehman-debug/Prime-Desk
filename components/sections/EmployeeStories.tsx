"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollFrame } from "@/components/ui/useScrollFrame";
import { useScrollSpring } from "@/components/ui/useScrollSpring";
import type page from "@/data/career-page.json";
import styles from "./EmployeeStories.module.css";

type Props = { content: typeof page.stories };
type Story = Props["content"]["items"][number];

const SPRING_POLES = [10, 30] as const;
const FIRST_IMAGE_TRAVEL = 600;
const NEXT_IMAGE_TRAVEL = 520;
const PINNED_MIN_WIDTH = 1440;

function QuoteMark() {
  return (
    <svg viewBox="0 0 64 47" width="46" height="34.3" aria-hidden="true">
      <path
        d="M 4.565 46.109 L 18.261 46.109 L 27.391 27.848 L 27.391 0.457 L 0 0.457 L 0 27.848 L 13.696 27.848 Z M 41.087 46.109 L 54.783 46.109 L 63.913 27.848 L 63.913 0.457 L 36.522 0.457 L 36.522 27.848 L 50.217 27.848 Z"
        fill="currentColor"
      />
    </svg>
  );
}

function StoryContent({ story, content, activeIndex }: { story: Story; content: Props["content"]; activeIndex: number }) {
  return (
    <div className={styles.content}>
      <Image src={content.texture} alt="" fill sizes="(max-width: 809px) 100vw, 600px" quality={85} className={styles.texture} />
      <QuoteMark />
      <div className={styles.text}>
        <h3>{story.quote}</h3>
        <div>
          <p className={styles.name}>{story.name}</p>
          <p className={styles.role}>{story.role}</p>
        </div>
      </div>
      <div className={styles.avatars}>
        {content.avatars.map((avatar, index) => (
          <span key={avatar} className={styles.avatar} data-active={index === activeIndex}>
            <Image src={avatar} alt="" width={48} height={48} quality={85} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function EmployeeStories({ content }: Props) {
  const [active, setActive] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const spacerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const playRef = useRef<HTMLButtonElement>(null);

  const progressOf = (spacer: HTMLDivElement | null) => {
    if (!spacer) return 0;
    const box = spacer.getBoundingClientRect();
    return Math.min(1, Math.max(0, (window.innerHeight - box.top) / box.height));
  };

  const readTargets = useCallback(() => {
    if (window.innerWidth < PINNED_MIN_WIDTH) return [0, 0, 0];
    return spacerRefs.current.map(progressOf);
  }, []);

  const apply = useCallback(([first, second, third]: number[]) => {
    const [firstImage, secondImage, thirdImage] = imageRefs.current;
    if (firstImage) firstImage.style.transform = `translate3d(${first * FIRST_IMAGE_TRAVEL}px, 0, 0)`;
    if (secondImage) secondImage.style.transform = `translate3d(0, ${(1 - second) * NEXT_IMAGE_TRAVEL}px, 0)`;
    if (thirdImage) thirdImage.style.transform = `translate3d(0, ${(1 - third) * NEXT_IMAGE_TRAVEL}px, 0)`;
    if (playRef.current) {
      playRef.current.style.opacity = String(1 - first);
      playRef.current.style.transform = `scale(${1 - first * 0.7})`;
      playRef.current.style.visibility = first >= 1 ? "hidden" : "visible";
    }
  }, []);

  useScrollSpring(readTargets, apply, SPRING_POLES[0], SPRING_POLES[1]);

  // The quote changes once the next section reaches the middle of the viewport.
  const updateActive = useCallback(() => {
    const middle = window.innerHeight / 2;
    let next = 0;
    spacerRefs.current.forEach((spacer, index) => {
      if (index > 0 && spacer && spacer.getBoundingClientRect().top <= middle) next = index;
    });
    setActive(next);
  }, []);

  useScrollFrame(updateActive);

  useEffect(() => {
    if (!videoOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setVideoOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [videoOpen]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className="h1">{content.heading}</h2>
          <p className={`body18 ${styles.description}`}>{content.description}</p>
        </div>

        <div className={styles.pinned}>
          <div className={styles.stage}>
            <StoryContent story={content.items[active]} content={content} activeIndex={active} />
            {content.items.map((item, index) => (
              <div
                key={item.image}
                ref={(node) => {
                  imageRefs.current[index] = node;
                }}
                className={index === 0 ? styles.firstImage : styles.nextImage}
              >
                <Image src={item.image} alt={item.name} fill sizes={index === 0 ? "1200px" : "600px"} quality={85} />
              </div>
            ))}
            <button ref={playRef} type="button" className={styles.play} aria-label="Play video" onClick={() => setVideoOpen(true)}>
              <Image src={content.playIcon} alt="" width={44} height={44} unoptimized />
              <svg viewBox="0 0 100 100" className={styles.playText} aria-hidden="true">
                <defs>
                  <path id="career-play-path" d="M 0 50 A 50 50 0 1 1 100 50 A 50 50 0 1 1 0 50" />
                </defs>
                <text>
                  <textPath href="#career-play-path" alignmentBaseline="hanging" dominantBaseline="hanging">
                    {content.playLabel}
                  </textPath>
                </text>
              </svg>
            </button>
          </div>
          {content.items.map((item, index) => (
            <div
              key={item.image}
              ref={(node) => {
                spacerRefs.current[index] = node;
              }}
              className={styles.spacer}
            />
          ))}
        </div>

        <div className={styles.stack}>
          {content.items.map((item, index) => (
            <article key={item.image} className={styles.card}>
              <StoryContent story={item} content={content} activeIndex={index} />
              <div className={styles.cardImage}>
                <Image src={item.image} alt={item.name} fill sizes="(max-width: 809px) 100vw, 50vw" quality={85} />
              </div>
            </article>
          ))}
        </div>
      </div>

      {videoOpen && (
        <div className={styles.overlay} role="dialog" aria-modal="true" onClick={() => setVideoOpen(false)}>
          <button type="button" className={styles.close} aria-label="Close video">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <iframe className={styles.video} src={content.videoUrl} title="Employee story video" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
        </div>
      )}
    </section>
  );
}
