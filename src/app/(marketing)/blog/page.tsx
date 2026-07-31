import type { Metadata } from "next";
import Link from "next/link";
import m from "../marketing.module.css";
import styles from "../placeholder.module.css";

export const metadata: Metadata = {
  title: "Blog — Inferix",
  description: "Product updates and engineering notes from Inferix.",
};

export default function BlogPage() {
  return (
    <section className={styles.page}>
      <div className={m.wrap}>
        <p className={m.kicker}>Blog</p>
        <h1 className={styles.title}>Engineering notes &amp; product updates</h1>
        <p className={styles.lead}>
          Posts are on the way. Meanwhile, start with the control plane docs or book a walkthrough.
        </p>
        <div className={m.btnRow}>
          <Link href="/docs/quickstart" className={m.btnPrimary}>
            Quick start
          </Link>
          <Link href="/demo" className={m.btnSecondary}>
            Book demo
          </Link>
        </div>
      </div>
    </section>
  );
}
