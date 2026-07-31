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
  title: "API reference — Inferix Docs",
  description:
    "Inferix control-plane API on :4000 — chat completions, health, models, traces, policies, drift, FineForge.",
};

export default function ApiPage() {
  return (
    <DocsShell pathname="/docs/api">
      <DocKicker>Operate</DocKicker>
      <DocH1>API reference</DocH1>
      <DocIntro>
        Control-plane HTTP API listens on <code>:4000</code>. Auth:{" "}
        <code>Authorization: Bearer &lt;master_key&gt;</code>. Grafana dashboards stay on{" "}
        <code>:3000</code>; LensAI streaming ingest (if separate) on <code>:8080</code> —
        do not confuse those with the control plane.
      </DocIntro>

      <DocSection title="Ports">
        <DocTable
          headers={["Port", "Service", "Role"]}
          rows={[
            [":4000", "Inferix control plane", "Chat, policies, traces query, drift, jobs"],
            [":3000", "Grafana", "LensAI / TraceForge dashboards"],
            [":8080", "Streaming ingest", "eBPF/HTTP → Redpanda path (LensAI pipeline)"],
          ]}
        />
      </DocSection>

      <DocSection title="Health">
        <DocCode>{`GET /health

# 200
{
  "status": "ok",
  "listen": ":4000",
  "models_loaded": 3,
  "observe": { "lensai": true, "traces": true }
}`}</DocCode>
      </DocSection>

      <DocSection title="Chat completions">
        <DocCode>{`POST /v1/chat/completions
Authorization: Bearer sk-...
Content-Type: application/json

{
  "model": "owned/general-llm",
  "messages": [
    { "role": "user", "content": "Summarize order #4421" }
  ],
  "stream": false,
  "metadata": {
    "tenant_id": "acme",
    "agent_id": "support",
    "intent": "order_status",
    "trace_id": "optional-client-trace"
  }
}

# Response (abbrev)
{
  "id": "chatcmpl_...",
  "model": "owned/slm-support",
  "choices": [{ "message": { "role": "assistant", "content": "..." } }],
  "usage": { "prompt_tokens": 120, "completion_tokens": 48 },
  "inferix": {
    "route_decision": "cheap",
    "rule": "support-cheap",
    "trace_id": "trc_...",
    "cost_usd": 0.0004
  }
}`}</DocCode>
        <DocP>
          Headers also accepted: <code>X-Inferix-Tenant</code>,{" "}
          <code>X-Inferix-Agent</code>, <code>X-Inferix-Intent</code>. RouteIQ may rewrite{" "}
          <code>model</code> to the policy target; response <code>model</code> is what
          actually ran.
        </DocP>
      </DocSection>

      <DocSection title="Models">
        <DocCode>{`GET /v1/models

{
  "data": [
    {
      "id": "owned/general-llm",
      "owned_by": "owned",
      "revision": "general-llm-v3",
      "capabilities": ["chat", "tools"]
    },
    {
      "id": "owned/slm-support",
      "owned_by": "owned",
      "revision": "slm-support-v2",
      "capabilities": ["chat"]
    }
  ]
}`}</DocCode>
      </DocSection>

      <DocSection title="Observe metrics">
        <DocCode>{`GET /v1/observe/metrics?window=1h&group_by=model_id,tenant_id

{
  "window": "1h",
  "series": [
    {
      "model_id": "owned/slm-support",
      "tenant_id": "acme",
      "request_count": 1840,
      "error_rate": 0.012,
      "latency_ms": { "p50": 180, "p95": 420, "p99": 900 },
      "tokens_in": 220000,
      "tokens_out": 61000,
      "cost_usd": 4.12
    }
  ]
}`}</DocCode>
      </DocSection>

      <DocSection title="Traces">
        <DocCode>{`GET /v1/traces?limit=20&agent_id=support
GET /v1/traces/{trace_id}

{
  "trace_id": "trc_...",
  "business_success": true,
  "spans": [
    {
      "name": "inferix.call",
      "kind": "SERVER",
      "attributes": { "gen_ai.system": "inferix", "tenant_id": "acme" }
    },
    {
      "name": "routeiq.decide",
      "attributes": { "route_decision": "cheap", "model_id": "owned/slm-support" }
    },
    {
      "name": "agent.tool.policy.check_refund",
      "attributes": { "tool_name": "policy.check_refund", "http.status": 200 }
    }
  ]
}`}</DocCode>
        <DocCallout title="Business success ≠ HTTP 200">
          <DocP>
            TraceForge stores a business-success predicate on the root task. A 200 tool
            call that skipped a required step is still a failure for DriftWatch and
            dashboards.
          </DocP>
        </DocCallout>
      </DocSection>

      <DocSection title="Policies (RouteIQ)">
        <DocCode>{`GET  /v1/policies
PUT  /v1/policies
POST /v1/policies/reload

# PUT body — same shape as routing: in inferix.yaml
{
  "default": "owned/general-llm",
  "fallback": "owned/general-llm",
  "rules": [
    {
      "name": "support-cheap",
      "when": { "intent": "refund_request", "agent": "support" },
      "model": "owned/slm-support",
      "cache": { "mode": "semantic", "ttl_s": 300 }
    }
  ],
  "budgets": {
    "tenants": { "acme": { "weekly_usd": 500 } }
  }
}`}</DocCode>
      </DocSection>

      <DocSection title="Drift alerts">
        <DocCode>{`GET /v1/drift/alerts?status=open
GET /v1/drift/alerts/{alert_id}

{
  "id": "dw_alert_8f2a",
  "slice": { "intent": "refund_request", "agent": "support" },
  "score_prod": 0.81,
  "score_baseline": 0.92,
  "delta": -0.11,
  "samples": 240,
  "signal": "prompt_regression",
  "status": "open"
}`}</DocCode>
      </DocSection>

      <DocSection title="FineForge jobs">
        <DocCode>{`POST /v1/fineforge/jobs
GET  /v1/fineforge/jobs/{job_id}
POST /v1/fineforge/jobs/{job_id}/promote
POST /v1/fineforge/jobs/{job_id}/rollback

# Job status
{
  "id": "ff_job_11",
  "kind": "prompt_patch",
  "state": "shadowing",
  "artifacts": {
    "prompt_version": "support-sys-v14",
    "bundle": ["prompt", "adapter"]
  },
  "canary_pct": 5,
  "eval_pass_rate": 0.97
}`}</DocCode>
      </DocSection>

      <DocSection title="Errors">
        <DocUl
          items={[
            <>401 — missing or invalid master key</>,
            <>402 / 429 — budget deny or rate limit (body includes reason)</>,
            <>404 — unknown model / trace / job</>,
            <>502 — all models in fallback chain failed</>,
            <>503 — control plane not ready (models still loading)</>,
          ]}
        />
        <DocP>
          Client patterns: <Link href="/docs/sdk">SDKs & clients</Link>.
        </DocP>
      </DocSection>

      <DocNext
        href="/docs/sdk"
        label="SDKs & clients →"
        hint="Python, JS, Go, and OpenTelemetry for TraceForge."
      />
    </DocsShell>
  );
}
