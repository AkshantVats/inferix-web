import Link from "next/link";
import styles from "@/app/(marketing)/home.module.css";

export type LoopMockStat = { label: string; value: string };
export type LoopMockRow = { label: string; values: string[] };

export type WhyLoopPillar = {
  num: string;
  title: string;
  accent?: string;
  body: string;
  product: string;
  href: string;
  bullets: string[];
  panel: {
    title: string;
    subtitle: string;
    status: string;
    tabs: string[];
    activeTab: string;
    stats: LoopMockStat[];
    rows: LoopMockRow[];
  };
};

export const WHY_LOOP: WhyLoopPillar[] = [
  {
    num: "01",
    accent: "Observe:",
    title: "See every call",
    body: "Latency, cost, tokens, and errors for agents and models — one dashboard, not five tools.",
    product: "LensAI",
    href: "/docs/products/lensai",
    bullets: [
      "p95 / p99 latency and error rate by model, agent, and tenant",
      "Cost and token volume attributed on every call",
      "Anomaly signals when spend or latency leave the baseline",
      "One panel for owned models and providers together",
    ],
    panel: {
      title: "LensAI — live traffic",
      subtitle: "tenant · acme-platform",
      status: "Healthy",
      tabs: ["Overview", "Models", "Agents", "Cost"],
      activeTab: "Overview",
      stats: [
        { label: "p95 latency", value: "312 ms" },
        { label: "Cost / 1h", value: "$48.20" },
        { label: "Error rate", value: "0.4%" },
        { label: "Calls / min", value: "1,840" },
      ],
      rows: [
        { label: "Top model", values: ["owned/general-llm"] },
        { label: "Hot agent", values: ["support-refund"] },
        { label: "Alerts", values: ["latency-spike", "cost-budget-80%"] },
      ],
    },
  },
  {
    num: "02",
    accent: "Trace:",
    title: "Follow the whole agent",
    body: "Tools and model steps in one graph. Debug a bad run without guessing which hop failed.",
    product: "TraceForge",
    href: "/docs/products/traceforge",
    bullets: [
      "Parent/child spans for tools, models, memory, and HITL waits",
      "Business success vs HTTP 200 — know if the job actually worked",
      "Cost and exclusive time on every hop",
      "Replay a single bad run from the waterfall",
    ],
    panel: {
      title: "TraceForge — run waterfalls",
      subtitle: "trace · tr_8f2a…c91",
      status: "Failed hop",
      tabs: ["Waterfall", "Spans", "Cost", "Replay"],
      activeTab: "Waterfall",
      stats: [
        { label: "Spans", value: "14" },
        { label: "Duration", value: "2.4 s" },
        { label: "Tools", value: "6" },
        { label: "Cost", value: "$0.018" },
      ],
      rows: [
        { label: "Path", values: ["Tool call", "Model hop", "Final response"] },
        { label: "Failed", values: ["payments.refund"] },
        { label: "Taxonomy", values: ["llm", "external", "memory"] },
      ],
    },
  },
  {
    num: "03",
    accent: "Route:",
    title: "Send each call by policy",
    body: "Cheap owned SLM for simple asks. Strong path or provider when you need it. Policy decides — not a spreadsheet.",
    product: "RouteIQ",
    href: "/docs/products/routeiq",
    bullets: [
      "Default, fallback, and intent-based routes in one policy",
      "Cheap SLM vs strong owned vs provider hard path",
      "Budgets, cache hits, and capability deny matrices",
      "Sticky routing mid-task so agents don’t flip models mid-run",
    ],
    panel: {
      title: "RouteIQ — policy map",
      subtitle: "policy · cx-default-v3",
      status: "Active",
      tabs: ["Routes", "Budgets", "Cache", "A/B"],
      activeTab: "Routes",
      stats: [
        { label: "Cheap path", value: "68%" },
        { label: "Strong path", value: "24%" },
        { label: "Provider", value: "8%" },
        { label: "Cache hit", value: "31%" },
      ],
      rows: [
        { label: "Default", values: ["owned/slm-support"] },
        { label: "Escalate", values: ["owned/general-llm", "openai/gpt-4o"] },
        { label: "Deny", values: ["heal-tools on slm-apiheal"] },
      ],
    },
  },
  {
    num: "04",
    accent: "Detect:",
    title: "Catch quality before tickets",
    body: "Alert when answers go bad versus a teacher or golden set. Know before users complain.",
    product: "DriftWatch",
    href: "/docs/products/driftwatch",
    bullets: [
      "Golden-set and teacher-gap scores by intent and locale",
      "Prompt, tool, provider, and retrieval drift types",
      "Deploy markers so you see which change moved quality",
      "Alert windows tuned for operators — not noise floods",
    ],
    panel: {
      title: "DriftWatch — quality",
      subtitle: "slice · refund_request · en-IN",
      status: "Drift alert",
      tabs: ["Scores", "Slices", "Teachers", "Alerts"],
      activeTab: "Scores",
      stats: [
        { label: "Quality", value: "0.81 ↓" },
        { label: "Teacher gap", value: "+12%" },
        { label: "Golden pass", value: "86%" },
        { label: "TTD", value: "3.2 min" },
      ],
      rows: [
        { label: "Type", values: ["prompt-drift"] },
        { label: "Baseline", values: ["golden-v12", "claude-teacher"] },
        { label: "Action", values: ["page-oncall", "open FineForge"] },
      ],
    },
  },
  {
    num: "05",
    accent: "Improve:",
    title: "Retrain and ship safely",
    body: "Turn drift into the next fine-tune. Promote or roll back without guessing.",
    product: "FineForge",
    href: "/docs/products/fineforge",
    bullets: [
      "Jobs from DriftWatch failures and TraceForge bad runs",
      "Prompt, adapter, and model artifacts in one promote bundle",
      "Canary → promote → rollback with eval gates",
      "Owned model registry stays in sync with RouteIQ",
    ],
    panel: {
      title: "FineForge — ship loop",
      subtitle: "job · ff_retrain_19",
      status: "Canary",
      tabs: ["Jobs", "Eval", "Promote", "Registry"],
      activeTab: "Promote",
      stats: [
        { label: "Candidate", value: "v19" },
        { label: "Eval pass", value: "94%" },
        { label: "Canary", value: "5%" },
        { label: "Rollback", value: "1-click" },
      ],
      rows: [
        { label: "Bundle", values: ["prompt-v19", "adapter-v3", "route-patch"] },
        { label: "Gates", values: ["golden", "teacher-gap", "latency"] },
        { label: "Next", values: ["Promote version", "Safe rollback"] },
      ],
    },
  },
];

export default function WhyLoopSection() {
  return (
    <ol className={styles.whyList}>
      {WHY_LOOP.map((pillar) => (
        <li key={pillar.num} className={styles.whyItem}>
          <div className={styles.whyCopy}>
            <span className={styles.whyNum}>{pillar.num}</span>
            <h3 className={styles.whyItemTitle}>
              <Link href={pillar.href}>
                {pillar.accent ? (
                  <>
                    <span className={styles.whyAccent}>{pillar.accent}</span> {pillar.title}
                  </>
                ) : (
                  pillar.title
                )}
              </Link>
            </h3>
            <p className={styles.whyBody}>{pillar.body}</p>
            <ul className={styles.whyBullets}>
              {pillar.bullets.map((b) => (
                <li key={b}>
                  <span className={styles.whyCheck} aria-hidden>
                    ✓
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p className={styles.whyProduct}>
              <Link href={pillar.href}>{pillar.product}</Link>
            </p>
          </div>

          <Link
            href={pillar.href}
            className={styles.whyPanel}
            aria-label={`${pillar.product} panel — ${pillar.title}`}
          >
            <div className={styles.whyPanelTabs} aria-hidden>
              {pillar.panel.tabs.map((tab) => (
                <span
                  key={tab}
                  className={
                    tab === pillar.panel.activeTab
                      ? `${styles.whyPanelTab} ${styles.whyPanelTabActive}`
                      : styles.whyPanelTab
                  }
                >
                  {tab}
                </span>
              ))}
            </div>
            <div className={styles.whyPanelHead}>
              <div>
                <p className={styles.whyPanelTitle}>{pillar.panel.title}</p>
                <p className={styles.whyPanelSub}>{pillar.panel.subtitle}</p>
              </div>
              <span className={styles.whyPanelStatus}>{pillar.panel.status}</span>
            </div>
            <div className={styles.whyPanelStats}>
              {pillar.panel.stats.map((s) => (
                <div key={s.label} className={styles.whyPanelStat}>
                  <span className={styles.whyPanelStatVal}>{s.value}</span>
                  <span className={styles.whyPanelStatLabel}>{s.label}</span>
                </div>
              ))}
            </div>
            <ul className={styles.whyPanelRows}>
              {pillar.panel.rows.map((row) => (
                <li key={row.label}>
                  <span className={styles.whyPanelRowLabel}>{row.label}</span>
                  <span className={styles.whyPanelTags}>
                    {row.values.map((v) => (
                      <span key={v} className={styles.whyPanelTag}>
                        {v}
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </Link>
        </li>
      ))}
    </ol>
  );
}
