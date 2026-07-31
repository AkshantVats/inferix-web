import type { Metadata } from "next";
import Link from "next/link";
import m from "../marketing.module.css";
import styles from "../placeholder.module.css";

export const metadata: Metadata = {
  title: "Book a demo — Inferix",
  description: "Talk to Inferix about the control plane for agents and owned models.",
};

export default function DemoPage() {
  return (
    <section className={styles.page}>
      <div className={m.wrap}>
        <p className={m.kicker}>Book demo</p>
        <h1 className={styles.title}>See Inferix on your stack</h1>
        <p className={styles.lead}>
          Walk through observe → route → drift → retrain with your models and agents. Prefer email?
          Reach us directly.
        </p>
        <div className={m.btnRow}>
          <a href="mailto:hello@inferix.ai?subject=Book%20a%20demo" className={m.btnPrimary}>
            Email hello@inferix.ai
          </a>
          <Link href="/docs/quickstart" className={m.btnSecondary}>
            Start free instead
          </Link>
        </div>
      </div>
    </section>
  );
}
