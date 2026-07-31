import type { Metadata } from "next";
import Link from "next/link";
import m from "../marketing.module.css";
import styles from "../placeholder.module.css";

export const metadata: Metadata = {
  title: "Careers — Inferix",
  description: "Join Inferix — building the control plane for agents and owned models.",
};

export default function CareersPage() {
  return (
    <section className={styles.page}>
      <div className={m.wrap}>
        <p className={m.kicker}>Careers</p>
        <h1 className={styles.title}>Build the control plane for AI ops</h1>
        <p className={styles.lead}>
          We&apos;re early. If you care about inference operators, agents, and owned models, say hello —
          roles open soon.
        </p>
        <div className={m.btnRow}>
          <a href="mailto:careers@inferix.ai" className={m.btnPrimary}>
            Email careers@inferix.ai
          </a>
          <Link href="/product" className={m.btnSecondary}>
            See the product
          </Link>
        </div>
      </div>
    </section>
  );
}
