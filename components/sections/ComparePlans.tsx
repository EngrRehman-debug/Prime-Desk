import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import type page from "@/data/pricing-page.json";
import styles from "./ComparePlans.module.css";

type Props = { content: typeof page.compare };

export default function ComparePlans({ content: compare }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Reveal soft>
            <h2 className="h1">{compare.heading}</h2>
          </Reveal>
          <Reveal soft delay={0.1}>
            <p className="body18">{compare.description}</p>
          </Reveal>
        </div>

        <Reveal soft delay={0.2}>
          <div className={styles.table} role="table">
            <div className={styles.row} role="row">
              {compare.columns.map((column) => (
                <h3 key={column} className={styles.columnTitle} role="columnheader">
                  {column}
                </h3>
              ))}
            </div>
            {compare.rows.map((row) => (
              <div key={row.label} className={styles.row} role="row">
                <p className={styles.cell} role="cell">
                  {row.label}
                </p>
                {row.cells.map((cell, index) =>
                  typeof cell === "string" ? (
                    <p key={index} className={styles.cell} role="cell">
                      {cell}
                    </p>
                  ) : (
                    <div key={index} className={styles.cell} role="cell" aria-label={cell > 0 ? "Included" : "Not included"}>
                      {cell > 0 ? (
                        Array.from({ length: cell }, (_, tick) => <Image key={tick} src={compare.yes} alt="" width={24} height={24} unoptimized className={styles.icon} />)
                      ) : (
                        <Image src={compare.no} alt="" width={24} height={24} unoptimized className={styles.icon} />
                      )}
                    </div>
                  ),
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
