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
  DocTable,
  DocCallout,
  DocNext,
} from "@/components/docs/DocParts";

export const metadata: Metadata = {
  title: "LensAI — Inferix Docs",
  description:
    "LensAI: latency, cost, tokens, errors — eBPF/HTTP ingest → Redpanda → ClickHouse → Grafana.",
};

export default function LensAIProductPage() {
  return (
    <DocsShell pathname="/docs/products/lensai">
      <DocKicker>Products</DocKicker>
      <DocH1>LensAI</DocH1>
      <DocIntro>
        See latency, cost, tokens, errors, and volume across models and agents. LensAI is
        the observe layer of the control plane — fleet SLOs and cost attribution, not a
        replacement for your APM.
      </DocIntro>

      <DocSection title="When to use">
        <DocUl
          items={[
            <>You need p50/p95/p99 and $/task by tenant, agent, and model</>,
            <>Finance and platform must share one cost number</>,
            <>You want anomaly feeds that jump to TraceForge via trace_id</>,
          ]}
        />
      </DocSection>

      <DocSection title="Ingest path">
        <DocCode>{`eBPF tracer  or  HTTP/SDK events
        ↓
  streaming ingest :8080
        ↓
     Redpanda
        ↓
    ClickHouse
        ↓
  Grafana :3000   ← dashboards
  Inferix :4000   ← /v1/observe/metrics query`}</DocCode>
        <DocP>
          Control plane API stays on <code>:4000</code>. Do not point chat clients at
          ingest or Grafana ports. Streaming stack:{" "}
          <a href={GITHUB.streaming} target="_blank" rel="noreferrer">
            infra-ai-streaming
          </a>
          ; eBPF:{" "}
          <a href={GITHUB.ebpf} target="_blank" rel="noreferrer">
            ebpf-llm-tracer
          </a>
          .
        </DocP>
      </DocSection>

      <DocSection title="Required labels">
        <DocTable
          headers={["Label", "Why"]}
          rows={[
            [<code key="t">tenant_id</code>, "Cost attribution; reject if missing"],
            [<code key="m">model_id</code>, "Model mix and SLO by revision"],
            [<code key="tr">trace_id</code>, "Join spike → TraceForge waterfall"],
            [<code key="a">agent_id</code>, "Per-agent burn and errors"],
            [<code key="e">env</code>, "Keep chaos/shadow out of prod SLO"],
          ]}
        />
      </DocSection>

      <DocSection title="Core metrics">
        <DocUl
          items={[
            <>
              <code>lensai.latency.p50/p95/p99</code> — inference latency (ms)
            </>,
            <>
              <code>lensai.tokens.input/output</code> — finalize streams or under-count
            </>,
            <>
              <code>lensai.cost.usd</code> / <code>cost.per_successful_task</code>
            </>,
            <>
              <code>lensai.errors.timeout</code>, <code>provider_5xx</code>,{" "}
              <code>rate_limit.429s</code>
            </>,
            <>
              <code>lensai.ingest.lag_ms</code>, <code>cardinality.active_series</code>
            </>,
          ]}
        />
      </DocSection>

      <DocSection title="Operator failure modes">
        <DocTable
          headers={["ID", "Problem", "Next action"]}
          rows={[
            ["L08", "Missing tenant_id → unattributed cost", "Reject unlabeled at ingest"],
            ["L09", "Token under-count on streams", "Hook stream-end events"],
            ["L12", "HTTP 200 with empty body", "Treat empty as error class"],
            ["L13", "429 thrash burns retry cost", "Respect Retry-After; jitter"],
            ["L20", "Fallback to strong model spikes bill", "Budget caps in RouteIQ"],
            ["L23", "Cannot jump spike → trace", "Require trace_id on events"],
            ["L01", "Cardinality explosion", "Drop high-churn labels; aggregate"],
            ["L18", "Sampling hides rare errors", "Always sample errors + slow"],
          ]}
        />
      </DocSection>

      <DocCallout title="Config knobs">
        <DocCode>{`observe:
  lensai: true
  sample_rate: 1.0          # spans only; metrics stay full
  require_tenant_id: true
  redact_pii: true`}</DocCode>
      </DocCallout>

      <DocSection title="Source">
        <DocP>
          <a href={GITHUB.lensai} target="_blank" rel="noreferrer">
            {GITHUB.lensai}
          </a>
        </DocP>
      </DocSection>

      <DocNext
        href="/docs/products/traceforge"
        label="TraceForge →"
        hint="Spans, tool taxonomy, business success."
      />
    </DocsShell>
  );
}
