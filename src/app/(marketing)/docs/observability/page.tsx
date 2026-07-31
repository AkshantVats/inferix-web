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
  title: "Observability — Inferix Docs",
  description:
    "LensAI + TraceForge: ingest path, metrics, spans, cost attribution, ports.",
};

export default function ObservabilityPage() {
  return (
    <DocsShell pathname="/docs/observability">
      <DocKicker>Operate</DocKicker>
      <DocH1>Observability</DocH1>
      <DocIntro>
        LensAI tells you what is happening across the fleet. TraceForge tells you why a
        single request behaved that way. Metrics for SLOs and cost; spans for RCA.
        Inferix sits next to your gateway and existing traces — not instead of them.
      </DocIntro>

      <DocSection title="Ports (do not mix them up)">
        <DocTable
          headers={["Port", "What"]}
          rows={[
            [":4000", "Inferix control plane — chat, policy, /v1/observe, /v1/traces"],
            [":3000", "Grafana — LensAI / TraceForge dashboards"],
            [":8080", "Streaming ingest — eBPF/HTTP events into Redpanda"],
          ]}
        />
      </DocSection>

      <DocSection title="LensAI pipeline">
        <DocCode>{`eBPF or HTTP/SDK  →  ingest :8080  →  Redpanda  →  ClickHouse  →  Grafana :3000
                                                      ↑
                                         query also via :4000 /v1/observe/metrics`}</DocCode>
        <DocP>
          Labels that must exist: <code>tenant_id</code>, <code>model_id</code>,{" "}
          <code>trace_id</code>, plus <code>agent_id</code> and <code>env</code>. Missing
          tenant breaks cost; missing trace_id blocks spike→trace jumps.
        </DocP>
        <DocUl
          items={[
            <>
              Latency: <code>lensai.latency.p50/p95/p99</code>
            </>,
            <>
              Tokens / cost: <code>tokens.*</code>, <code>cost.usd</code>,{" "}
              <code>cost.per_successful_task</code>
            </>,
            <>
              Errors: timeouts, provider 5xx, 429s, empty-200 class
            </>,
            <>
              Pipeline health: ingest lag, cardinality, WAL depth
            </>,
          ]}
        />
        <DocP>
          Deep dive: <Link href="/docs/products/lensai">LensAI</Link>. Repos:{" "}
          <a href={GITHUB.lensai} target="_blank" rel="noreferrer">
            LensAI
          </a>
          ,{" "}
          <a href={GITHUB.streaming} target="_blank" rel="noreferrer">
            streaming
          </a>
          ,{" "}
          <a href={GITHUB.ebpf} target="_blank" rel="noreferrer">
            eBPF
          </a>
          .
        </DocP>
      </DocSection>

      <DocSection title="TraceForge spans">
        <DocP>OTel <code>gen_ai</code> spans with a versioned tool taxonomy:</DocP>
        <DocCode>{`inferix.call
├── routeiq.decide
├── agent.tool.<name>
└── gen_ai.chat`}</DocCode>
        <DocUl
          items={[
            <>Business success predicate on the task — not HTTP 200 alone</>,
            <>Watch N+1 loops, retry storms, skipped required steps</>,
            <>Keep root spans under sampling; hash prompts; scrub PII</>,
          ]}
        />
        <DocP>
          Deep dive: <Link href="/docs/products/traceforge">TraceForge</Link>.
        </DocP>
      </DocSection>

      <DocSection title="Together">
        <DocTable
          headers={["Question", "Use", "Signal"]}
          rows={[
            ["Is p95 up for slm-support?", "LensAI", "latency by model_id"],
            ["Why did this refund stall?", "TraceForge", "span tree + tools"],
            ["Tenant X burn today?", "LensAI", "cost by tenant_id"],
            ["Which route ran?", "TraceForge + LensAI", "route_decision"],
            ["Quality vs yesterday?", "DriftWatch overlay", "score + deploy marker"],
          ]}
        />
      </DocSection>

      <DocCallout title="Sampling">
        <DocP>
          <code>observe.sample_rate</code> applies to TraceForge spans. LensAI metrics
          stay complete so cost and SLOs stay honest. Always sample errors and slow
          traces.
        </DocP>
      </DocCallout>

      <DocNext
        href="/docs/routing"
        label="Routing policies →"
        hint="RouteIQ cheap / general / hard path."
      />
    </DocsShell>
  );
}
