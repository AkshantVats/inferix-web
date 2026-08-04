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

/**
 * Langfuse-style scale strip — labeled TARGETS (we do not have cloud volume yet).
 * See brand/METRICS.md.
 */
const SCALE_TARGETS = [
  {
    value: "Billions+",
    label: "Observations / month · platform scale",
    kind: "Target",
  },
  {
    value: "<100 ms",
    label: "Ingest P99 · accept + WAL + enqueue",
    kind: "Target",
  },
  {
    value: "Minutes",
    label: "Self-host to first dashboard · your laptop or VPC",
    kind: "Target",
  },
  {
    value: "1 plane",
    label: "Agents + owned models · observe · route · drift · retrain",
    kind: "Target",
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
            <span className={styles.targetsAccent}>Enterprise scale.</span>
            <br />
            These are our targets.
          </h2>
          <p className={styles.targetsLead}>
            Same shape of ambition as mature LLM platforms — volume, latency, deploy speed, and one
            plane for agents and models. Labeled targets until published production numbers replace
            them.
          </p>
          <p className={styles.targetsBadge}>Platform targets · not live cloud stats</p>

          <ul className={styles.metricRow}>
            {SCALE_TARGETS.map((metric) => (
              <li key={metric.label} className={styles.metricCard}>
                <p className={styles.metricKind}>{metric.kind}</p>
                <p className={styles.metricValue}>{metric.value}</p>
                <p className={styles.metricLabel}>{metric.label}</p>
              </li>
            ))}
          </ul>

          <div className={styles.chartRow}>
            <article className={`${styles.chartCard} ${styles.chartCardWide}`}>
              <h3 className={styles.chartTitle}>What “scale” means for Inferix</h3>
              <ul className={styles.proofList}>
                <li>
                  <strong>Observations</strong> — design for billions of inference and agent
                  observations per month across the platform (Langfuse-class monthly volume), not a
                  vanity events/min headline
                </li>
                <li>
                  <strong>Ingest</strong> — P99 &lt;100 ms at accept + WAL + enqueue so the plane
                  stays off the critical path of your apps
                </li>
                <li>
                  <strong>RouteIQ</strong> — policy decision overhead &lt;2 ms when the router is
                  measured
                </li>
                <li>
                  <strong>DriftWatch</strong> — catch quality drift vs teacher / golden set before
                  tickets pile up (time-to-detect target &lt;5 min)
                </li>
                <li>
                  <strong>Attribution</strong> — cost and latency by tenant, model, and agent — fail
                  closed when tenant is missing
                </li>
              </ul>
            </article>
          </div>

          <p className={styles.targetsFoot}>
            When a target is proven in the open repos, the label upgrades from Target to a measured
            number. We do not invent customer counts or Fortune logos.
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
