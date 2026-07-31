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
  title: "TraceForge — Inferix Docs",
  description:
    "TraceForge: OTel gen_ai spans, tool taxonomy, business success vs HTTP 200, replay.",
};

export default function TraceForgeProductPage() {
  return (
    <DocsShell pathname="/docs/products/traceforge">
      <DocKicker>Products</DocKicker>
      <DocH1>TraceForge</DocH1>
      <DocIntro>
        Follow one request across tools, models, and agent steps. TraceForge is the
        span layer of the control plane — RCA and required-step correctness, next to
        your existing traces.
      </DocIntro>

      <DocSection title="When to use">
        <DocUl
          items={[
            <>Multi-step agents where tool order and skips matter</>,
            <>You need business success, not just HTTP 200</>,
            <>N+1 tool loops, retry storms, or planner infinite loops</>,
          ]}
        />
      </DocSection>

      <DocSection title="Span model">
        <DocCode>{`inferix.call                    # root — keep always (T17)
├── routeiq.decide              # route_decision, model_id
├── agent.tool.<taxonomy>       # tool_name, schema version
├── gen_ai.chat                 # model invoke (OTel gen_ai)
└── hitl.wait                   # optional — tag exclusive waits (T20)`}</DocCode>
        <DocP>
          Use OpenTelemetry <code>gen_ai.*</code> attributes. Propagate{" "}
          <code>trace_id</code> / baggage across multi-agent handoffs (T22). Versioned
          tool taxonomy keeps step names stable (T24).
        </DocP>
      </DocSection>

      <DocSection title="Business success">
        <DocCallout title="HTTP 200 is not success">
          <DocP>
            A refund tool can return 200 while the agent skipped{" "}
            <code>policy.check_refund</code>. TraceForge records{" "}
            <code>business_success</code> from a domain predicate. Dashboards use{" "}
            <code>traceforge.tasks.succeeded</code> and{" "}
            <code>traceforge.steps.skipped_required</code>.
          </DocP>
        </DocCallout>
      </DocSection>

      <DocSection title="Key metrics">
        <DocUl
          items={[
            <>
              <code>traceforge.tasks.started/succeeded/failed</code>
            </>,
            <>
              <code>traceforge.tools.error_rate</code>, <code>tools.p99</code>,{" "}
              <code>tools.retries</code>
            </>,
            <>
              <code>traceforge.graph.n_plus_one</code>,{" "}
              <code>graph.exclusive_time_ms</code>
            </>,
            <>
              <code>traceforge.steps.skipped_required</code>,{" "}
              <code>replay.available</code>
            </>,
          ]}
        />
      </DocSection>

      <DocSection title="Operator failure modes">
        <DocTable
          headers={["ID", "Problem", "Next action"]}
          rows={[
            ["T01", "Required step missing", "Hard gate + alert"],
            ["T03", "Tool 4xx schema error", "Bump schema; FineForge adapter"],
            ["T05", "Retry amplification", "Cap retries; backoff"],
            ["T06", "N+1 tool loops", "Batch tool; cache"],
            ["T07", "Infinite planner loop", "Max steps; kill switch"],
            ["T11", "Hallucinated tool args", "Validate before execute"],
            ["T12", "Partial success unmarked", "Business-success predicate"],
            ["T14", "PII in tool args", "Hash args; vault payload"],
            ["T16", "Orphan spans", "Fix context propagation in SDK"],
            ["T23", "Cost missing on tool spans", "Dual-write LensAI cost"],
          ]}
        />
      </DocSection>

      <DocSection title="Config">
        <DocCode>{`observe:
  traces: true
  otlp_endpoint: http://otel-collector:4317
  taxonomy: /etc/inferix/tool-taxonomy.yaml
  keep_root_always: true
  redact_tool_args: true`}</DocCode>
        <DocP>
          Query API: <Link href="/docs/api">GET /v1/traces</Link>. Client patterns:{" "}
          <Link href="/docs/sdk">SDKs</Link>.
        </DocP>
      </DocSection>

      <DocSection title="Source">
        <DocP>
          <a href={GITHUB.traceforge} target="_blank" rel="noreferrer">
            {GITHUB.traceforge}
          </a>
        </DocP>
      </DocSection>

      <DocNext
        href="/docs/products/routeiq"
        label="RouteIQ →"
        hint="Cheap SLM, general, hard path, cache, budgets."
      />
    </DocsShell>
  );
}
