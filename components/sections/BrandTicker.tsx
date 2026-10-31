import { Fragment } from "react";
import Ticker from "@/components/ui/Ticker";
import styles from "./BrandTicker.module.css";

export default function BrandTicker({ items }: { items: string[] }) {
  return (
    <section className={styles.section}>
      <Ticker gap={35}>
        {items.map((item, index) => (
          <Fragment key={`${item}-${index}`}>
            <div className={styles.item}>
              <span className={styles.slash}>/</span>
              <span>{item}</span>
            </div>
            <span className={styles.line} />
          </Fragment>
        ))}
      </Ticker>
    </section>
  );
}
