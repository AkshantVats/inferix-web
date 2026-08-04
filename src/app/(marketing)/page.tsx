import type { Metadata } from "next";
import Link from "next/link";
import InferixHiw from "@/components/brand/InferixHiw";
import WhyLoopSection from "@/components/site/WhyLoopSection";
import { GITHUB } from "@/lib/github";
import { PRODUCTS, POSITIONING } from "@/lib/products";
import m from "./marketing.module.css";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "Inferix — Control agents and inference in one place",
  description: POSITIONING,
};

const MARQUEE = [
  "Platform engineering",
  "ML ops",
  "Agent builders",
  "Inference operators",
  "AI product teams",
] as const;

/** Homepage proof strip — see brand/METRICS.md. Never mix measured vs target. */
const PROOF_METRICS = [
  {
    value: "5",
    label: "Products · one observe → route → drift → retrain loop",
    kind: "Proven",
  },
  {
    value: "~15 min",
    label: "First LensAI dashboard · clone → build → make up → Grafana",
    kind: "Typical first run",
  },
  {
    value: "<100 ms",
    label: "Ingest P99 · accept + WAL + enqueue (not CH visibility)",
    kind: "Design target",
  },
  {
    value: "5 modes",
    label: "Chaos paths · Kafka/CH/Redis/OOM — no silent drop",
    kind: "Documented",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={`${m.wrapWide} ${styles.heroInner}`}>
          <div className={`${styles.copy} ${m.fadeUp}`}>
            <h1 className={styles.headline}>
              The control plane
              <br />
              <span className={styles.headlineAccent}>for platform teams</span>
            </h1>
            <p className={styles.support}>
              Put agents and models behind one plane. See every call, route by policy, and catch
              quality drift. When quality drops, retrain and roll forward — without guessing.
            </p>
            <div className={`${m.btnRow} ${styles.heroBtns}`}>
              <Link href="/docs/quickstart" className={m.btnPrimary}>
                Start free
              </Link>
              <a href={GITHUB.suite} className={m.btnSecondary} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
            <p className={styles.micro}>Self-host in minutes. No credit card.</p>
          </div>
          <div className={styles.visual}>
            <InferixHiw />
          </div>
        </div>
      </section>

      <section className={styles.proof} aria-label="Audience">
        <div className={m.wrapWide}>
          <p className={styles.proofLabel}>Built for teams running agents and owned models</p>
          <div className={styles.marquee} data-reduced="false">
            <div className={styles.marqueeTrack}>
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  className={styles.marqueeList}
                  aria-hidden={copy === 1 ? true : undefined}
                >
                  {MARQUEE.map((item) => (
                    <li key={`${copy}-${item}`}>{item}</li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.why} id="why-inferix" aria-labelledby="why-heading">
        <div className={m.wrap}>
          <p className={m.kicker}>Why Inferix</p>
          <h2 id="why-heading" className={styles.whyTitle}>
            The AI Control Plane for{" "}
            <span className={m.accent}>monitoring, routing, and optimizing</span> every
            inference across your organization.
          </h2>

          <WhyLoopSection />
        </div>
      </section>

      <section className={`${m.sectionTight} ${styles.strip}`} aria-labelledby="products-heading">
        <div className={m.wrap}>
          <div className={styles.stripHead}>
            <p className={m.kicker}>What you get</p>
            <h2 id="products-heading" className={styles.stripTitle}>
              Five products. <span className={m.accent}>One loop.</span>
            </h2>
            <p className={styles.stripLead}>
              See traffic. Trace agents. Route by policy. Catch drift. Retrain. Each product is a
              clear job — not another jargon stack.
            </p>
          </div>
          <ul className={styles.productRow}>
            {PRODUCTS.map((p) => (
              <li key={p.name} className={styles.productItem}>
                <Link href={`/docs/products/${p.slug}`} className={styles.productLink}>
                  <img src={p.icon} alt="" width={28} height={28} />
                  <div>
                    <p className={styles.productName}>{p.name}</p>
                    <p className={styles.productRole}>{p.role}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <p className={styles.stripCta}>
            <Link href="/product">Product details →</Link>
          </p>
        </div>
      </section>

      <section className={m.section} id="how-it-works" aria-labelledby="hiw-heading">
        <div className={m.wrap}>
          <div className={styles.hiwHead}>
            <p className={m.kicker}>How it works</p>
            <h2 id="hiw-heading" className={m.h2}>
              Connect once. <span className={m.accent}>See everything.</span> Improve what drifts.
            </h2>
            <p className={m.lead}>Three steps from first request to a better model.</p>
          </div>
          <ol className={styles.steps}>
            <li>
              <span className={styles.stepNum}>1</span>
              <div>
                <h3>Connect</h3>
                <p>
                  Send agent and app traffic through Inferix. One plane sits in front of your models
                  and providers.
                </p>
              </div>
            </li>
            <li>
              <span className={styles.stepNum}>2</span>
              <div>
                <h3>See &amp; route</h3>
                <p>
                  LensAI and TraceForge show each run. RouteIQ picks owned models or providers by
                  policy.
                </p>
              </div>
            </li>
            <li>
              <span className={styles.stepNum}>3</span>
              <div>
                <h3>Detect &amp; retrain</h3>
                <p>
                  DriftWatch alerts when quality slips. FineForge turns that into the next fine-tune
                  job.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section
        className={styles.targets}
        id="design-targets"
        aria-labelledby="targets-heading"
      >
        <div className={m.wrap}>
          <p className={styles.targetsKicker}>
            <span>04</span>
            <span className={styles.targetsDot} aria-hidden />
          </p>
          <h2 id="targets-heading" className={styles.targetsTitle}>
            <span className={styles.targetsAccent}>What we prove today.</span>
            <br />
            Honest numbers for an open control plane.
          </h2>
          <p className={styles.targetsLead}>
            Buyers and interviewers should be able to verify every claim. Measured and documented
            facts sit next to labeled design targets — never mixed as race results.
          </p>
          <p className={styles.targetsBadge}>Proven · documented · design targets only where labeled</p>

          <ul className={styles.metricRow}>
            {PROOF_METRICS.map((metric) => (
              <li key={metric.label} className={styles.metricCard}>
                <p className={styles.metricKind}>{metric.kind}</p>
                <p className={styles.metricValue}>{metric.value}</p>
                <p className={styles.metricLabel}>{metric.label}</p>
              </li>
            ))}
          </ul>

          <div className={styles.chartRow}>
            <article className={styles.chartCard}>
              <h3 className={styles.chartTitle}>What ships and is checkable</h3>
              <ul className={styles.proofList}>
                <li>
                  <strong>LensAI path</strong> — Rust ingest → Kafka → ClickHouse → Grafana; chaos
                  scripts and BENCHMARKS in{" "}
                  <a href={GITHUB.streaming} target="_blank" rel="noreferrer">
                    infra-ai-streaming
                  </a>
                </li>
                <li>
                  <strong>Quickstart</strong> —{" "}
                  <a href={GITHUB.lensai} target="_blank" rel="noreferrer">
                    lensai-integration
                  </a>{" "}
                  <code>make build && make up</code> → Grafana :3000
                </li>
                <li>
                  <strong>TraceForge collector</strong> — active work in{" "}
                  <a href={GITHUB.traceforge} target="_blank" rel="noreferrer">
                    agent-trace-collector
                  </a>
                </li>
                <li>
                  <strong>Suite map</strong> —{" "}
                  <a href={GITHUB.suite} target="_blank" rel="noreferrer">
                    inferix
                  </a>{" "}
                  links all five products
                </li>
              </ul>
            </article>

            <article className={styles.chartCard}>
              <h3 className={styles.chartTitle}>Design targets — not suite SLOs yet</h3>
              <ul className={styles.proofList}>
                <li>
                  <strong>Ingest</strong> — P99 &lt;100 ms at accept + WAL + enqueue; 1M events/min
                  eng target (k6 lock pending)
                </li>
                <li>
                  <strong>RouteIQ</strong> — policy decision overhead target &lt;2 ms when the router
                  ships measured benches
                </li>
                <li>
                  <strong>DriftWatch</strong> — time-to-detect target &lt;5 min once judge/shadow
                  path is measured
                </li>
                <li>
                  <strong>Cost attribution</strong> — by tenant / model / agent when labels are
                  present; fail-closed on missing tenant is the policy direction
                </li>
              </ul>
            </article>
          </div>

          <p className={styles.targetsFoot}>
            No vendor bake-offs on this page. Founder production scale (1.5T events/day TSDB, 7M+
            sensors, etc.) is prior work — not an Inferix hosted-load claim. See{" "}
            <code>brand/METRICS.md</code>.
          </p>
        </div>
      </section>

      <section className={`${m.section} ${styles.differ}`} aria-labelledby="diff-heading">
        <div className={m.wrap}>
          <p className={m.kicker}>Where Inferix sits</p>
          <h2 id="diff-heading" className={m.h2}>
            Next to your gateway and your traces —{" "}
            <span className={m.accent}>not instead of them</span>
          </h2>
          <ul className={styles.diffList}>
            <li>
              <strong>vs LiteLLM / Portkey</strong> — gateways give you one key and many providers.
              Inferix is the plane around that layer: see calls, route with policy, catch drift, and
              retrain.
            </li>
            <li>
              <strong>vs Langfuse / Helicone</strong> — observability shows what apps did. Inferix
              adds operator routing, drift alerts, and a fine-tune loop for models you run.
            </li>
          </ul>
        </div>
      </section>

      <section className={`${m.sectionTight} ${styles.ctaBand}`}>
        <div className={m.wrap}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Run it locally in a few minutes</h2>
            <p className={styles.ctaSupport}>
              One Docker command. Then add routing and drift when you need them.
            </p>
            <div className={m.btnRow}>
              <Link href="/docs/quickstart" className={m.btnPrimary}>
                Open quick start
              </Link>
              <Link href="/pricing" className={m.btnSecondary}>
                Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
