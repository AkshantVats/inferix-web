import type { Metadata } from "next";
import Link from "next/link";
import { GITHUB } from "@/lib/github";
import DocsShell from "@/components/docs/DocsShell";
import {
  DocKicker,
  DocH1,
  DocIntro,
  DocSection,
  DocP,
  DocCode,
  DocUl,
  DocNote,
  DocCallout,
  DocNext,
} from "@/components/docs/DocParts";

export const metadata: Metadata = {
  title: "Quick start — Inferix Docs",
  description:
    "Clone Inferix, run the control plane on :4000, connect a client, and verify LensAI and TraceForge.",
};

export default function QuickstartPage() {
  return (
    <DocsShell pathname="/docs/quickstart">
      <DocKicker>Get started</DocKicker>
      <DocH1>Quick start</DocH1>
      <DocIntro>
        Run Inferix locally, send one chat completion through the control plane, and
        confirm metrics and spans land in LensAI and TraceForge. About ten minutes.
      </DocIntro>

      <DocSection title="1 · Clone the suite">
        <DocP>
          Start from the suite map, then pull observe and trace repos you will verify
          against:
        </DocP>
        <DocCode>{`# Suite overview + product links
git clone ${GITHUB.suite}.git
cd inferix

# LensAI — metrics
git clone ${GITHUB.lensai}.git

# TraceForge — spans
git clone ${GITHUB.traceforge}.git`}</DocCode>
        <DocP>
          Full install options (Compose, Kubernetes):{" "}
          <Link href="/docs/install">Install & self-host</Link>.
        </DocP>
      </DocSection>

      <DocSection title="2 · Start the control plane">
        <DocP>
          Port <code>4000</code> is the control-plane API. Chat completions live at{" "}
          <code>/v1/chat/completions</code>.
        </DocP>
        <DocCode>{`docker run -d \\
  --name inferix \\
  -p 4000:4000 \\
  -e INFERIX_MASTER_KEY=sk-inferix-local \\
  -v $(pwd)/inferix.yaml:/etc/inferix/inferix.yaml \\
  ghcr.io/akshantvats/inferix:latest`}</DocCode>
        <DocNote>
          Use <code>sk-inferix-local</code> only on your machine. Rotate before any
          shared or production environment.
        </DocNote>
        <DocP>Minimal config to mount:</DocP>
        <DocCode>{`# inferix.yaml
listen: ":4000"
master_key: sk-inferix-local

models:
  - name: owned/general-llm
    provider: owned
    endpoint: http://host.docker.internal:8080
  - name: owned/slm-support
    provider: owned
    endpoint: http://host.docker.internal:8081
  - name: owned/slm-apiheal
    provider: owned
    endpoint: http://host.docker.internal:8082

routing:
  default: owned/general-llm
  fallback: owned/general-llm

observe:
  lensai: true
  traces: true

drift:
  enabled: true
  window: 24h`}</DocCode>
      </DocSection>

      <DocSection title="3 · Connect a client">
        <DocP>
          Point your SDK at the control plane. Change{" "}
          <code>base_url</code> to <code>http://localhost:4000/v1</code> and use the
          master key as the API key.
        </DocP>
        <DocCode>{`from openai import OpenAI

client = OpenAI(
    api_key="sk-inferix-local",
    base_url="http://localhost:4000/v1",
)

r = client.chat.completions.create(
    model="owned/general-llm",
    messages=[{"role": "user", "content": "ping"}],
)
print(r.choices[0].message.content)`}</DocCode>
        <DocP>Or curl:</DocP>
        <DocCode>{`curl http://localhost:4000/v1/chat/completions \\
  -H "Authorization: Bearer sk-inferix-local" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "owned/general-llm",
    "messages": [{"role": "user", "content": "ping"}]
  }'`}</DocCode>
      </DocSection>

      <DocSection title="4 · Verify LensAI and TraceForge">
        <DocP>Health and a one-shot metrics peek:</DocP>
        <DocCode>{`# Control plane healthy
curl http://localhost:4000/health

# Models registered
curl -H "Authorization: Bearer sk-inferix-local" \\
  http://localhost:4000/v1/models

# Recent LensAI rollup (latency, cost, errors)
curl -H "Authorization: Bearer sk-inferix-local" \\
  "http://localhost:4000/v1/observe/metrics?window=15m"

# TraceForge: latest spans for your call
curl -H "Authorization: Bearer sk-inferix-local" \\
  "http://localhost:4000/v1/traces?limit=5"`}</DocCode>
        <DocUl
          items={[
            <>
              <strong>LensAI</strong> — you should see request count, p50/p95 latency,
              token cost, and error rate for <code>owned/general-llm</code>.
            </>,
            <>
              <strong>TraceForge</strong> — one root span per call, child spans for
              route decision and model invoke.
            </>,
          ]}
        />
      </DocSection>

      <DocSection title="5 · First RouteIQ policy">
        <DocP>
          Send cheap support intents to <code>owned/slm-support</code>, keep everything
          else on the general model:
        </DocP>
        <DocCode>{`# add under routing: in inferix.yaml
routing:
  default: owned/general-llm
  fallback: owned/general-llm
  rules:
    - name: support-cheap
      when:
        intent: support
      model: owned/slm-support
    - name: apiheal-classify
      when:
        agent: api-healer
      model: owned/slm-apiheal`}</DocCode>
        <DocP>
          Reload config (or restart the container), then send a call with header{" "}
          <code>X-Inferix-Intent: support</code>. LensAI should attribute volume to{" "}
          <code>owned/slm-support</code>. Details:{" "}
          <Link href="/docs/routing">Routing policies</Link>.
        </DocP>
      </DocSection>

      <DocSection title="What is on by default">
        <DocUl
          items={[
            <>
              Ingress on <code>:4000</code> with <code>/v1/chat/completions</code>
            </>,
            <>LensAI metrics + TraceForge spans (<code>observe.*</code>)</>,
            <>RouteIQ default + fallback routes</>,
            <>
              DriftWatch + FineForge ready when you attach a golden set (
              <Link href="/docs/drift-retrain">Drift & retrain</Link>)
            </>,
          ]}
        />
      </DocSection>

      <DocCallout title="Repos">
        <DocUl
          items={[
            <a href={GITHUB.suite} target="_blank" rel="noreferrer">
              Inferix suite
            </a>,
            <a href={GITHUB.lensai} target="_blank" rel="noreferrer">
              LensAI
            </a>,
            <a href={GITHUB.traceforge} target="_blank" rel="noreferrer">
              TraceForge
            </a>,
            <a href={GITHUB.routeiq} target="_blank" rel="noreferrer">
              RouteIQ
            </a>,
            <a href={GITHUB.driftwatch} target="_blank" rel="noreferrer">
              DriftWatch
            </a>,
            <a href={GITHUB.fineforge} target="_blank" rel="noreferrer">
              FineForge
            </a>,
          ]}
        />
      </DocCallout>

      <DocNext
        href="/docs/install"
        label="Install & self-host →"
        hint="Compose, Kubernetes, env vars, and upgrade paths."
      />
    </DocsShell>
  );
}
