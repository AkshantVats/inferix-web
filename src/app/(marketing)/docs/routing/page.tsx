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
  title: "Routing policies — Inferix Docs",
  description:
    "RouteIQ policies: default/fallback, cheap SLM, strong path, cache, budgets, and rules by intent/agent/tenant.",
};

export default function RoutingPage() {
  return (
    <DocsShell pathname="/docs/routing">
      <DocKicker>Operate</DocKicker>
      <DocH1>Routing policies</DocH1>
      <DocIntro>
        RouteIQ picks the model for every call before invoke. Policies encode cheap SLM
        paths, general owned models, and hard provider fallbacks — plus cache and
        budgets so cost stays bounded.
      </DocIntro>

      <DocSection title="Decision order">
        <DocP>For each call RouteIQ evaluates:</DocP>
        <DocUl
          items={[
            <>Match first rule whose <code>when</code> matches (intent, agent, tenant, labels)</>,
            <>Else use <code>routing.default</code></>,
            <>On failure or capability miss, walk <code>fallback</code> / rule fallback chain</>,
            <>Apply response cache if the rule allows it</>,
            <>Enforce tenant / agent budget before spend</>,
          ]}
        />
        <DocP>
          Every decision is a TraceForge span and a LensAI label on{" "}
          <code>model_id</code> / <code>route</code>.
        </DocP>
      </DocSection>

      <DocSection title="Capability matrix">
        <DocTable
          headers={["Path", "Typical model", "Use when"]}
          rows={[
            [
              "Cheap SLM",
              <code key="c">owned/slm-support</code>,
              "Classify, refund triage, short CX turns",
            ],
            [
              "Cheap classify",
              <code key="a">owned/slm-apiheal</code>,
              "Schema / intent classify for API healers",
            ],
            [
              "General owned",
              <code key="g">owned/general-llm</code>,
              "Default reasoning, multi-step agents",
            ],
            [
              "Provider hard path",
              "External provider",
              "Capability gap, outage, or explicit escalate",
            ],
          ]}
        />
      </DocSection>

      <DocSection title="Policy example">
        <DocCode>{`routing:
  default: owned/general-llm
  fallback: owned/general-llm

  cache:
    enabled: true
    ttl_seconds: 300
    key: [model, messages_hash, tenant_id]

  budgets:
    - tenant: acme
      daily_usd: 200
      on_exceed: cheap_only   # force cheap SLM until reset
    - agent: gtm-outbound
      daily_usd: 50
      on_exceed: reject

  rules:
    - name: support-cheap
      when:
        intent: support
      model: owned/slm-support
      fallback: owned/general-llm
      cache: true

    - name: apiheal-classify
      when:
        agent: api-healer
      model: owned/slm-apiheal
      fallback: owned/general-llm

    - name: voice-low-latency
      when:
        agent: voice-appointments
      model: owned/slm-support
      fallback: owned/general-llm
      timeout_ms: 800

    - name: tenant-acme-strong
      when:
        tenant: acme
        intent: escalate
      model: owned/general-llm
      fallback:
        - provider/strong`}</DocCode>
      </DocSection>

      <DocSection title="Headers that drive rules">
        <DocTable
          headers={["Header", "Maps to"]}
          rows={[
            [<code key="h1">X-Inferix-Intent</code>, "routing.rules[].when.intent"],
            [<code key="h2">X-Inferix-Agent</code>, "routing.rules[].when.agent"],
            [<code key="h3">X-Inferix-Tenant</code>, "routing.rules[].when.tenant"],
            [<code key="h4">X-Inferix-Trace-Id</code>, "joins LensAI + TraceForge"],
          ]}
        />
      </DocSection>

      <DocCallout title="Cache and quality">
        <DocP>
          Cache only idempotent, non-personalized turns. Disable cache on refund,
          payment, and voice turns where stale replies hurt trust. LensAI exposes
          cache hit rate so you can tune TTL.
        </DocP>
      </DocCallout>

      <DocSection title="What to watch">
        <DocUl
          items={[
            <>
              LensAI: cost by <code>model_id</code>, route distribution, budget rejects
            </>,
            <>
              TraceForge: <code>routeiq.decide</code> span attributes (matched rule,
              fallback used)
            </>,
            <>
              Product deep dive: <Link href="/docs/products/routeiq">RouteIQ</Link>
            </>,
          ]}
        />
      </DocSection>

      <DocNext
        href="/docs/drift-retrain"
        label="Drift & retrain →"
        hint="DriftWatch signals and FineForge promote / rollback."
      />
    </DocsShell>
  );
}
