import type { Metadata } from "next";
import Link from "next/link";
import { GITHUB } from "@/lib/github";
import m from "../../marketing.module.css";
import styles from "../docs.module.css";

export const metadata: Metadata = {
  title: "Quick start — Inferix Docs",
  description:
    "Clone Inferix repos and run locally. Point your client at localhost:4000 with a drop-in base URL.",
};

export default function QuickstartPage() {
  return (
    <div className={styles.docs}>
      <aside className={styles.side} aria-label="Docs navigation">
        <p className={styles.sideTitle}>Docs</p>
        <ul>
          <li>
            <Link href="/docs/quickstart" className={styles.sideActive}>
              Quick start
            </Link>
          </li>
          <li>
            <span className={styles.sideSoon}>API reference (soon)</span>
          </li>
          <li>
            <span className={styles.sideSoon}>Routing policies (soon)</span>
          </li>
        </ul>
      </aside>

      <article className={styles.article}>
        <p className={m.kicker}>Docs</p>
        <h1 className={styles.h1}>Quick start</h1>
        <p className={styles.intro}>
          Start from the open-source repos on GitHub. Docker image commands below are placeholders
          until the public image ships — clone paths are live today.
        </p>

        <section className={styles.block}>
          <h2>0 · Clone the suite</h2>
          <p>
            Overview and product links:{" "}
            <a href={GITHUB.suite} target="_blank" rel="noreferrer">
              {GITHUB.suite.replace("https://", "")}
            </a>
          </p>
          <pre className={styles.code}>
            <code>{`# Observe (LensAI)
git clone ${GITHUB.lensai}.git
cd lensai-integration && make up

# Trace (TraceForge)
git clone ${GITHUB.traceforge}.git

# Suite map + upcoming RouteIQ / DriftWatch / FineForge
git clone ${GITHUB.suite}.git`}</code>
          </pre>
        </section>

        <section className={styles.block}>
          <h2>1 · Start Inferix</h2>
          <p>One container. Port 4000 is the control-plane API.</p>
          <pre className={styles.code}>
            <code>{`docker run -d \\
  --name inferix \\
  -p 4000:4000 \\
  -e INFERIX_MASTER_KEY=sk-inferix-local \\
  ghcr.io/inferix/inferix:latest`}</code>
          </pre>
          <p className={styles.note}>
            Use <code>sk-inferix-local</code> only on your machine. Do not ship it. Image is not
            published yet — use the LensAI quickstart above until then.
          </p>
        </section>

        <section className={styles.block}>
          <h2>2 · Point your client</h2>
          <p>
            Point your client at the control plane with a <code>base_url</code>. Most SDKs need
            only that one-line change (OpenAI Python client shown).
          </p>
          <pre className={styles.code}>
            <code>{`from openai import OpenAI

client = OpenAI(
    api_key="sk-inferix-local",
    base_url="http://localhost:4000/v1",
)

r = client.chat.completions.create(
    model="owned/general-llm",
    messages=[{"role": "user", "content": "ping"}],
)
print(r.choices[0].message.content)`}</code>
          </pre>
        </section>

        <section className={styles.block}>
          <h2>3 · Or curl</h2>
          <pre className={styles.code}>
            <code>{`curl http://localhost:4000/v1/chat/completions \\
  -H "Authorization: Bearer sk-inferix-local" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "owned/general-llm",
    "messages": [{"role": "user", "content": "ping"}]
  }'`}</code>
          </pre>
        </section>

        <section className={styles.block}>
          <h2>4 · What turns on by default</h2>
          <ul className={styles.bullets}>
            <li>
              <strong>Ingress</strong> — chat completions on <code>:4000/v1</code>
            </li>
            <li>
              <strong>LensAI + TraceForge</strong> — request metrics and spans (toggle in config)
            </li>
            <li>
              <strong>RouteIQ</strong> — default + fallback model routes
            </li>
            <li>
              <strong>DriftWatch → FineForge</strong> — optional; enable when you have eval signal
            </li>
          </ul>
        </section>

        <section className={styles.block}>
          <h2>Repos on GitHub</h2>
          <ul className={styles.bullets}>
            <li>
              <a href={GITHUB.lensai} target="_blank" rel="noreferrer">
                LensAI
              </a>
            </li>
            <li>
              <a href={GITHUB.traceforge} target="_blank" rel="noreferrer">
                TraceForge
              </a>
            </li>
            <li>
              <a href={GITHUB.routeiq} target="_blank" rel="noreferrer">
                RouteIQ
              </a>
            </li>
            <li>
              <a href={GITHUB.driftwatch} target="_blank" rel="noreferrer">
                DriftWatch
              </a>
            </li>
            <li>
              <a href={GITHUB.fineforge} target="_blank" rel="noreferrer">
                FineForge
              </a>
            </li>
            <li>
              <a href={GITHUB.web} target="_blank" rel="noreferrer">
                Website + brand kit
              </a>
            </li>
          </ul>
        </section>

        <section className={styles.block}>
          <h2>Config sketch</h2>
          <p>Minimal yaml for a local owned model with provider fallback:</p>
          <pre className={styles.code}>
            <code>{`# inferix.yaml (placeholder)
listen: ":4000"
master_key: sk-inferix-local

models:
  - name: owned/general-llm
    provider: owned
    endpoint: http://model-server:8080

routing:
  default: owned/general-llm
  fallback: openai/gpt-4o-mini

observe:
  lensai: true
  traces: true

drift:
  enabled: true
  window: 24h`}</code>
          </pre>
        </section>

        <div className={styles.next}>
          <p>Next: what LensAI, TraceForge, RouteIQ, DriftWatch, and FineForge each do.</p>
          <Link href="/product" className={m.btnSecondary}>
            Product overview →
          </Link>
        </div>
      </article>
    </div>
  );
}
