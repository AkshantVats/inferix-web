import Link from "next/link";
import styles from "@/app/(marketing)/docs/docs.module.css";
import m from "@/app/(marketing)/marketing.module.css";

export function DocKicker({ children }: { children: React.ReactNode }) {
  return <p className={m.kicker}>{children}</p>;
}

export function DocH1({ children }: { children: React.ReactNode }) {
  return <h1 className={styles.h1}>{children}</h1>;
}

export function DocIntro({ children }: { children: React.ReactNode }) {
  return <p className={styles.intro}>{children}</p>;
}

export function DocSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.block}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function DocP({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

export function DocCode({ children }: { children: string }) {
  /* Plain <pre> — no nested <code>, so inline chip styles cannot paint the block */
  return <pre className={styles.code}>{children}</pre>;
}

export function DocNote({ children }: { children: React.ReactNode }) {
  return <p className={styles.note}>{children}</p>;
}

export function DocUl({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className={styles.bullets}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function DocTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DocCallout({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.callout}>
      {title ? <p className={styles.calloutTitle}>{title}</p> : null}
      <div className={styles.calloutBody}>{children}</div>
    </div>
  );
}

export function DocCards({
  items,
}: {
  items: { href: string; title: string; body: string }[];
}) {
  return (
    <ul className={styles.cards}>
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className={styles.card}>
            <span className={styles.cardTitle}>{item.title}</span>
            <span className={styles.cardBody}>{item.body}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function DocNext({
  href,
  label,
  hint,
}: {
  href: string;
  label: string;
  hint: string;
}) {
  return (
    <div className={styles.next}>
      <p>{hint}</p>
      <Link href={href} className={m.btnSecondary}>
        {label}
      </Link>
    </div>
  );
}
