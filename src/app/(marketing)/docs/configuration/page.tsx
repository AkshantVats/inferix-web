import type { Metadata } from "next";
import Link from "next/link";
import DocsShell from "@/components/docs/DocsShell";
import {
  DocKicker,
  DocH1,
  DocIntro,
  DocSection,
  DocP,
  DocCode,
  DocUl,
  DocTable,
  DocCallout,
  DocNext,
} from "@/components/docs/DocParts";

export const metadata: Metadata = {
  title: "Configuration — Inferix Docs",
  description:
    "Full inferix.yaml reference: listen, master key, models, routing, observe, drift.",
};

export default function ConfigurationPage() {
  return (
    <DocsShell pathname="/docs/configuration">
      <DocKicker>Operate</DocKicker>
      <DocH1>Configuration</DocH1>
      <DocIntro>
        All control-plane behavior is declared in <code>inferix.yaml</code>. Mount it
        at <code>/etc/inferix/inferix.yaml</code> or set <code>INFERIX_CONFIG</code>.
      </DocIntro>

      <DocSection title="Complete reference example">
        <DocCode>{`listen: ":4000"
master_key: \${INFERIX_MASTER_KEY}

models:
  - name: owned/general-llm
    provider: owned
    endpoint: http://general-llm:8080/v1
    timeout_ms: 60000
    max_retries: 1

  - name: owned/slm-support
    provider: owned
    endpoint: http://slm-support:8080/v1
    timeout_ms: 15000
    labels:
      tier: cheap
      domain: cx

  - name: owned/slm-apiheal
    provider: owned
    endpoint: http://slm-apiheal:8080/v1
    timeout_ms: 10000
    labels:
      tier: cheap
      domain: apiheal

  - name: openai/gpt-4o-mini
    provider: openai
    api_key_env: OPENAI_API_KEY
    timeout_ms: 60000

routing:
  default: owned/general-llm
  fallback: openai/gpt-4o-mini
  rules:
    - name: support-cheap
      when:
        intent: support
      model: owned/slm-support
      fallback: owned/general-llm
    - name: apiheal-classify
      when:
        agent: api-healer
      model: owned/slm-apiheal
    - name: tenant-premium
      when:
        tenant: acme-premium
      model: owned/general-llm
      fallback: openai/gpt-4o-mini

observe:
  lensai: true
  traces: true
  sample_rate: 1.0
  attributes:
    - agent
    - tenant
    - intent
  otlp_endpoint: \${INFERIX_OTLP_ENDPOINT}

drift:
  enabled: true
  window: 24h
  golden_set: /var/lib/inferix/golden/support.jsonl
  min_samples: 50
  alert_threshold: 0.08
  notify:
    webhook: https://hooks.example.com/inferix-drift

fineforge:
  enabled: true
  teacher: owned/general-llm
  student: owned/slm-support
  auto_promote: false
  artifact_dir: /var/lib/inferix/fineforge`}</DocCode>
      </DocSection>

      <DocSection title="Top-level keys">
        <DocTable
          headers={["Key", "Type", "Description"]}
          rows={[
            [
              <code key="a">listen</code>,
              "string",
              "Bind address. Default :4000.",
            ],
            [
              <code key="b">master_key</code>,
              "string",
              "Bearer secret for API auth. Prefer env interpolation.",
            ],
            [
              <code key="c">models</code>,
              "list",
              "Registered owned models and providers.",
            ],
            [
              <code key="d">routing</code>,
              "object",
              "RouteIQ default, fallback, and rules.",
            ],
            [
              <code key="e">observe</code>,
              "object",
              "LensAI + TraceForge toggles and sampling.",
            ],
            [
              <code key="f">drift</code>,
              "object",
              "DriftWatch windows, golden set, thresholds.",
            ],
            [
              <code key="g">fineforge</code>,
              "object",
              "Teacher/student, promote policy, artifacts.",
            ],
          ]}
        />
      </DocSection>

      <DocSection title="models[]">
        <DocUl
          items={[
            <>
              <code>name</code> — canonical id used in API <code>model</code> and RouteIQ
              (e.g. <code>owned/general-llm</code>).
            </>,
            <>
              <code>provider</code> — <code>owned</code> | <code>openai</code> |{" "}
              <code>anthropic</code> | <code>custom</code>.
            </>,
            <>
              <code>endpoint</code> — base URL for owned/custom servers.
            </>,
            <>
              <code>api_key_env</code> — env var name holding the provider key.
            </>,
            <>
              <code>timeout_ms</code>, <code>max_retries</code>, <code>labels</code> —
              operational metadata for LensAI filters.
            </>,
          ]}
        />
      </DocSection>

      <DocSection title="routing">
        <DocP>
          Rules are evaluated top-down; first match wins. Unmatched calls use{" "}
          <code>default</code>, then <code>fallback</code> on invoke failure. Match keys:{" "}
          <code>intent</code>, <code>agent</code>, <code>tenant</code>, and request
          attributes. Full policy guide: <Link href="/docs/routing">Routing policies</Link>.
        </DocP>
      </DocSection>

      <DocSection title="observe">
        <DocUl
          items={[
            <>
              <code>lensai: true</code> — emit metrics per call.
            </>,
            <>
              <code>traces: true</code> — emit TraceForge spans.
            </>,
            <>
              <code>sample_rate</code> — 0.0–1.0 for span sampling (metrics stay full).
            </>,
            <>
              <code>otlp_endpoint</code> — optional export to your collector.
            </>,
          ]}
        />
      </DocSection>

      <DocSection title="drift & fineforge">
        <DocP>
          <code>window</code> and <code>alert_threshold</code> drive DriftWatch.{" "}
          <code>auto_promote: false</code> is recommended until you trust the golden set.
          See <Link href="/docs/drift-retrain">Drift & retrain</Link>.
        </DocP>
      </DocSection>

      <DocCallout title="Secrets">
        <DocP>
          Never commit real master keys or provider keys. Use env interpolation (
          <code>$&#123;VAR&#125;</code>) and Kubernetes Secrets / Docker secrets.
        </DocP>
      </DocCallout>

      <DocNext
        href="/docs/observability"
        label="Observability →"
        hint="LensAI metrics and TraceForge spans together."
      />
    </DocsShell>
  );
}
