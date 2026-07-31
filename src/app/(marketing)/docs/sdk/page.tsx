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
  title: "SDKs & clients — Inferix Docs",
  description:
    "Python, JavaScript, and Go clients for Inferix; OpenTelemetry for TraceForge; env vars.",
};

export default function SdkPage() {
  return (
    <DocsShell pathname="/docs/sdk">
      <DocKicker>Operate</DocKicker>
      <DocH1>SDKs & clients</DocH1>
      <DocIntro>
        Point any chat client at the control plane on <code>:4000</code>. Pass tenant,
        agent, and intent metadata so LensAI and RouteIQ can attribute and route. Export
        OTel spans so TraceForge joins with your existing traces.
      </DocIntro>

      <DocSection title="Environment">
        <DocTable
          headers={["Variable", "Purpose"]}
          rows={[
            [<code key="u">INFERIX_BASE_URL</code>, "http://localhost:4000/v1"],
            [<code key="k">INFERIX_API_KEY</code>, "Master key (Bearer)"],
            [<code key="t">INFERIX_TENANT_ID</code>, "Default tenant_id label"],
            [<code key="a">INFERIX_AGENT_ID</code>, "Default agent_id"],
            [
              <code key="o">OTEL_EXPORTER_OTLP_ENDPOINT</code>,
              "Collector TraceForge also scrapes / joins",
            ],
          ]}
        />
      </DocSection>

      <DocSection title="Python">
        <DocCode>{`import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["INFERIX_API_KEY"],
    base_url=os.environ.get("INFERIX_BASE_URL", "http://localhost:4000/v1"),
)

resp = client.chat.completions.create(
    model="owned/general-llm",
    messages=[{"role": "user", "content": "ping"}],
    extra_headers={
        "X-Inferix-Tenant": os.environ["INFERIX_TENANT_ID"],
        "X-Inferix-Agent": "support",
        "X-Inferix-Intent": "order_status",
    },
)
print(resp.model, resp.choices[0].message.content)`}</DocCode>
      </DocSection>

      <DocSection title="JavaScript / TypeScript">
        <DocCode>{`import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.INFERIX_API_KEY,
  baseURL: process.env.INFERIX_BASE_URL ?? "http://localhost:4000/v1",
});

const resp = await client.chat.completions.create(
  {
    model: "owned/slm-support",
    messages: [{ role: "user", content: "Refund order 4421" }],
  },
  {
    headers: {
      "X-Inferix-Tenant": process.env.INFERIX_TENANT_ID!,
      "X-Inferix-Agent": "support",
      "X-Inferix-Intent": "refund_request",
    },
  },
);`}</DocCode>
      </DocSection>

      <DocSection title="Go">
        <DocCode>{`req, _ := http.NewRequest(
  "POST",
  os.Getenv("INFERIX_BASE_URL")+"/chat/completions",
  body,
)
req.Header.Set("Authorization", "Bearer "+os.Getenv("INFERIX_API_KEY"))
req.Header.Set("Content-Type", "application/json")
req.Header.Set("X-Inferix-Tenant", os.Getenv("INFERIX_TENANT_ID"))
req.Header.Set("X-Inferix-Agent", "incident")
req.Header.Set("X-Inferix-Intent", "kafka_lag")

resp, err := http.DefaultClient.Do(req)`}</DocCode>
      </DocSection>

      <DocSection title="OpenTelemetry for TraceForge">
        <DocP>
          Emit <code>gen_ai.*</code> spans from your agent runtime. Inferix creates a
          root <code>inferix.call</code> span and links child tool spans when you
          propagate <code>traceparent</code> / baggage with <code>tenant_id</code>,{" "}
          <code>agent_id</code>, and <code>task_id</code>.
        </DocP>
        <DocCode>{`# Python sketch
from opentelemetry import trace
tracer = trace.get_tracer("support-agent")

with tracer.start_as_current_span("agent.tool.shop.get_order") as span:
    span.set_attribute("tool_name", "shop.get_order")
    span.set_attribute("gen_ai.operation.name", "tool")
    span.set_attribute("tenant_id", tenant)
    # execute tool...
    span.set_attribute("business.success", True)`}</DocCode>
        <DocUl
          items={[
            <>Always keep the root span (sampling must not drop it)</>,
            <>Hash prompts; do not put raw PII in span attributes</>,
            <>
              Dual-write <code>cost_usd</code> on tool/model spans when available
            </>,
            <>
              Tag HITL waits so long exclusive time is not mistaken for hangs
            </>,
          ]}
        />
        <DocP>
          More: <Link href="/docs/products/traceforge">TraceForge</Link>,{" "}
          <Link href="/docs/observability">Observability</Link>.
        </DocP>
      </DocSection>

      <DocCallout title="Identity dimensions">
        <DocP>
          Required for clean dashboards: <code>tenant_id</code>, <code>agent_id</code>,{" "}
          <code>task_id</code>, <code>trace_id</code>, <code>model_id</code>,{" "}
          <code>prompt_version</code>, <code>tool_schema_version</code>,{" "}
          <code>env</code>. Missing <code>tenant_id</code> breaks cost attribution —
          LensAI rejects unlabeled events at ingest when configured.
        </DocP>
      </DocCallout>

      <DocNext
        href="/docs/products/lensai"
        label="LensAI →"
        hint="Latency, cost, tokens, ingest path, and operator failure modes."
      />
    </DocsShell>
  );
}
