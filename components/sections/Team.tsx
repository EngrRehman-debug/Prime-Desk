import Image from "next/image";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import type page from "@/data/about-page.json";
import styles from "./Team.module.css";

type Props = { content: typeof page.team };

export default function Team({ content: team }: Props) {
  const { join } = team;
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Reveal soft>
            <h2 className="h1">{team.heading}</h2>
          </Reveal>
          <Reveal soft delay={0.1}>
            <p className={`body18 ${styles.description}`}>{team.description}</p>
          </Reveal>
        </div>

        <div className={styles.grid}>
          <Reveal soft delay={0.2} className={styles.joinSlot}>
            <article className={styles.join}>
              <div className={styles.joinText}>
                <p className={styles.joinEyebrow}>{join.eyebrow}</p>
                <h3>{join.title}</h3>
                <p className={styles.joinDescription}>{join.description}</p>
              </div>
              <Button href={join.cta.href} label={join.cta.label} />
            </article>
          </Reveal>

          {team.members.map((member, index) => (
            <Reveal key={member.name} soft delay={0.3 + index * 0.1} className={styles.memberSlot}>
              <article className={styles.member}>
                <div className={styles.photo}>
                  <Image src={member.image} alt={member.name} fill sizes="(max-width: 809px) 100vw, (max-width: 1199px) 50vw, 285px" quality={85} />
                  <span className={styles.blur} />
                  <div className={styles.socials}>
                    {team.socials.map((social) => (
                      <a key={social.label} href={social.href} aria-label={social.label} className={styles.social}>
                        <Image src={social.icon} alt="" width={24} height={24} unoptimized />
                      </a>
                    ))}
                  </div>
                </div>
                <h3>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
