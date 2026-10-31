"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import type content from "@/data/landing-page.json";
import styles from "./Faq.module.css";

type Props = {
  content: typeof content.faq;
  /** Vertical spacing depends on the neighbouring sections of each page. */
  placement?: "afterPricing" | "beforePricing" | "standalone" | "afterCards";
};

export default function Faq({ content: faq, placement = "afterPricing" }: Props) {
  const [tabIndex, setTabIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const visible = faq.tabs[tabIndex].items;
  const listRef = useRef<HTMLDivElement>(null);
  const heightBeforeSwitch = useRef<number | null>(null);

  useEffect(() => {
    const list = listRef.current;
    const answer = list?.querySelector(`[data-open="true"] .${styles.answer}`);
    if (!list || !answer) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          list.dataset.answerSeen = "true";
          observer.disconnect();
        }
      },
      { threshold: 0 },
    );
    observer.observe(answer);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const list = listRef.current;
    const from = heightBeforeSwitch.current;
    if (!list || from === null) return;
    heightBeforeSwitch.current = null;
    const to = list.offsetHeight;
    list.style.height = `${from}px`;
    list.dataset.resizing = "true";
    void list.offsetHeight;
    list.style.height = `${to}px`;
    const finish = (event: TransitionEvent) => {
      if (event.target !== list) return;
      list.style.height = "";
      list.dataset.resizing = "false";
      list.removeEventListener("transitionend", finish);
    };
    list.addEventListener("transitionend", finish);
    return () => list.removeEventListener("transitionend", finish);
  }, [tabIndex]);

  return (
    <section className={styles.section} data-placement={placement}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Reveal>
            <h2 className="h1">{faq.heading}</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className={`body18 ${styles.description}`}>{faq.description}</p>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div className={styles.tabs} role="tablist">
            {faq.tabs.map((tab, index) => (
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={tabIndex === index}
                className={styles.tab}
                data-active={tabIndex === index}
                onClick={() => {
                  if (index !== tabIndex) heightBeforeSwitch.current = listRef.current?.offsetHeight ?? null;
                  setTabIndex(index);
                  setOpenIndex(0);
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div ref={listRef} className={styles.items} data-answer-seen="false">
          {visible.map((itemIndex) => {
            const item = faq.items[itemIndex];
            const open = openIndex === itemIndex;
            return (
              <div key={item.question} className={styles.item} data-open={open}>
                <button
                  type="button"
                  className={styles.question}
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : itemIndex)}
                >
                  <span>{item.question}</span>
                  <span className={styles.icon}>
                    <Image src={open ? "/images/icon-minus.svg" : "/images/icon-plus.svg"} alt="" width={24} height={24} unoptimized />
                  </span>
                </button>
                <div className={styles.answerWrap}>
                  <div className={styles.answerClip}>
                    <p className={styles.answer}>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
