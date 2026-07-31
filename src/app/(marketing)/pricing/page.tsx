import type { Metadata } from "next";
import Link from "next/link";
import m from "../marketing.module.css";
import styles from "./pricing.module.css";

export const metadata: Metadata = {
  title: "Pricing — Inferix",
  description:
    "Inferix Free for local eval. Pro and Enterprise sketched — billing not live yet.",
};

const TIERS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    blurb: "Run Inferix on your laptop and point a client at localhost:4000.",
    features: [
      "Local control plane",
      "LensAI + TraceForge on one node",
      "Basic RouteIQ policies",
      "Community support",
    ],
    cta: "Quick start",
    href: "/docs/quickstart",
    highlight: false,
  },
  {
    name: "Pro",
    price: "Soon",
    period: "per month",
    blurb: "Shared team plane with drift alerts and retrain hooks. Price TBD at GA.",
    features: [
      "Everything in Free",
      "DriftWatch alerts",
      "FineForge job hooks",
      "Multi-project routing",
      "Email support",
    ],
    cta: "Join waitlist",
    href: "/docs/quickstart",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "annual",
    blurb: "VPC or air-gapped deploy, SSO, and a named support path.",
    features: [
      "Everything in Pro",
      "SSO / SCIM",
      "Private networking",
      "SLA & dedicated support",
      "Custom model onboarding",
    ],
    cta: "Talk to us",
    href: "/docs/quickstart",
    highlight: false,
  },
] as const;

export default function PricingPage() {
  return (
    <>
      <section className={`${m.section} ${styles.hero}`}>
        <div className={m.wrap}>
          <p className={m.kicker}>Pricing</p>
          <h1 className={styles.title}>Free to try. Paid when you need the team plane.</h1>
          <p className={styles.support}>
            Free covers local evaluation today. Pro and Enterprise are the planned paid tiers —
            checkout is not live yet. Numbers land at GA.
          </p>
          <p className={styles.badge}>Pro &amp; Enterprise checkout — coming soon</p>
        </div>
      </section>

      <section className={styles.tiers} aria-label="Pricing tiers">
        <div className={m.wrap}>
          <ul className={styles.grid}>
            {TIERS.map((t) => (
              <li
                key={t.name}
                className={`${styles.card} ${t.highlight ? styles.cardHighlight : ""}`}
              >
                <div className={styles.cardTop}>
                  <h2>{t.name}</h2>
                  {t.highlight && <span className={styles.pill}>Planned</span>}
                </div>
                <p className={styles.price}>
                  {t.price}
                  <span>/{t.period}</span>
                </p>
                <p className={styles.blurb}>{t.blurb}</p>
                <ul className={styles.features}>
                  {t.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <Link
                  href={t.href}
                  className={t.highlight ? m.btnPrimary : m.btnSecondary}
                >
                  {t.cta}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${m.sectionTight} ${styles.note}`}>
        <div className={m.wrap}>
          <p>
            Questions on deploy or early access? Start with{" "}
            <Link href="/docs/quickstart">quick start</Link> — sales contact lands with GA.
          </p>
        </div>
      </section>
    </>
  );
}
