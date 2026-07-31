import type { Metadata } from "next";
import Link from "next/link";
import { GITHUB } from "@/lib/github";
import { PRODUCTS, POSITIONING, WHY_PILLARS } from "@/lib/products";
import m from "../marketing.module.css";
import styles from "./product.module.css";

export const metadata: Metadata = {
  title: "Product — Inferix",
  description: POSITIONING,
};

export default function ProductPage() {
  return (
    <>
      <section className={`${m.section} ${styles.hero}`}>
        <div className={m.wrap}>
          <p className={m.kicker}>Product</p>
          <h1 className={styles.title}>
            Control agents and inference —
            <br />
            <span className={styles.titleAccent}>in one place</span>
          </h1>
          <p className={styles.support}>
            Inferix sits in front of owned models and providers. See every call, route by policy,
            catch quality drift, and retrain — without a second stack.
          </p>
          <div className={m.btnRow}>
            <Link href="/docs/quickstart" className={m.btnPrimary}>
              Quick start
            </Link>
            <a href={GITHUB.suite} className={m.btnSecondary} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </section>

      <section className={styles.why} id="why-inferix" aria-labelledby="why-heading">
        <div className={m.wrap}>
          <p className={m.kicker}>Why Inferix</p>
          <h2 id="why-heading" className={m.h2}>
            Give your whole org control — then{" "}
            <span className={m.accent}>see, route, and improve</span> every request.
          </h2>
          <ul className={styles.whyGrid}>
            {WHY_PILLARS.map((p) => (
              <li key={p.num}>
                <Link href={p.href} className={styles.whyCardLink}>
                  <span className={styles.whyNum}>{p.num}</span>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                  <span className={styles.whyProduct}>{p.product}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.story} aria-labelledby="loop-heading">
        <div className={m.wrap}>
          <h2 id="loop-heading" className={m.h2}>
            One loop. Four jobs.
          </h2>
          <p className={m.lead}>
            Day one you see traffic. Then you route, catch drift, and ship the next model.
          </p>

          <div className={styles.loop}>
            <div className={styles.loopStep}>
              <span>Observe</span>
              <p>LensAI metrics + TraceForge spans on every run.</p>
            </div>
            <span className={styles.arrow} aria-hidden>
              →
            </span>
            <div className={styles.loopStep}>
              <span>Route</span>
              <p>RouteIQ policies across owned models and providers.</p>
            </div>
            <span className={styles.arrow} aria-hidden>
              →
            </span>
            <div className={styles.loopStep}>
              <span>Detect drift</span>
              <p>DriftWatch alerts when quality slips.</p>
            </div>
            <span className={styles.arrow} aria-hidden>
              →
            </span>
            <div className={styles.loopStep}>
              <span>Retrain</span>
              <p>FineForge turns that signal into the next job.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${m.section} ${styles.products}`} aria-labelledby="products-heading">
        <div className={m.wrap}>
          <p className={m.kicker}>Product suite</p>
          <h2 id="products-heading" className={m.h2}>
            What each product does
          </h2>
          <ul className={styles.grid}>
            {PRODUCTS.map((p) => (
              <li key={p.name} id={p.slug} className={styles.card}>
                <div className={styles.cardHead}>
                  <img src={p.icon} alt="" width={32} height={32} />
                  <div>
                    <h3>{p.name}</h3>
                    <p className={styles.role}>{p.role}</p>
                  </div>
                </div>
                <p className={styles.detail}>{p.detail}</p>
                <div className={styles.cardLinks}>
                  <a
                    href={`/docs/products/${p.slug}`}
                    className={styles.repoLink}
                  >
                    Read docs →
                  </a>
                  <a
                    href={p.repo}
                    className={styles.repoLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub →
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${m.section} ${styles.clients}`} aria-labelledby="clients-heading">
        <div className={m.wrap}>
          <p className={m.kicker}>Who it&apos;s for</p>
          <h2 id="clients-heading" className={m.h2}>
            Teams that run models and agent fleets
          </h2>
          <p className={m.lead}>
            If you already proxy LLMs or collect traces, Inferix ties routing, quality, and retrain
            together. Owned models and agents share the same telemetry and policy.
          </p>
        </div>
      </section>

      <section className={`${m.sectionTight} ${styles.cta}`}>
        <div className={m.wrap}>
          <div className={styles.ctaBox}>
            <h2>Try it locally</h2>
            <p>One Docker command. Connect in minutes from quick start.</p>
            <Link href="/docs/quickstart" className={m.btnPrimary}>
              Open quick start
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
