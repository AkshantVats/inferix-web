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
  title: "RouteIQ — Inferix Docs",
  description:
    "RouteIQ: cheap SLM, general owned, provider hard path, cache, budgets, capability matrix.",
};

export default function RouteIQProductPage() {
  return (
    <DocsShell pathname="/docs/products/routeiq">
      <DocKicker>Products</DocKicker>
      <DocH1>RouteIQ</DocH1>
      <DocIntro>
        Send each call to the right owned model or provider by policy. RouteIQ is the
        route layer — cheap SLM, general owned, provider hard path, plus cache and
        budgets.
      </DocIntro>

      <DocSection title="Capability matrix">
        <DocTable
          headers={["Path", "model_id family", "When"]}
          rows={[
            ["Cheap SLM", "owned/slm-support, owned/slm-apiheal", "Easy / classify intents"],
            ["General owned", "owned/general-llm", "Default multi-step reasoning"],
            ["Provider hard", "provider/*", "Ambiguity, risk, capability gap, outage"],
            ["Cache", "exact / semantic hit", "FAQ and boilerplate; tenant-keyed"],
            ["Deny", "budget / policy", "Weekly $ exceeded; soft degrade to cache-only"],
          ]}
        />
        <DocP>
          Tool-aware routing (R19): models that lack tools are denied when{" "}
          <code>tools_required</code> is set. Example: heal tools denied on{" "}
          <code>slm-apiheal-*</code> classify-only revisions.
        </DocP>
      </DocSection>

      <DocSection title="Decision metrics">
        <DocUl
          items={[
            <>
              <code>routeiq.model.mix</code> — share by model_id
            </>,
            <>
              <code>routeiq.cache.hit_rate</code> — exact + semantic
            </>,
            <>
              <code>routeiq.escalation.rate</code> — cheap → strong
            </>,
            <>
              <code>routeiq.fallback.count</code>, <code>budget.denies</code>
            </>,
            <>
              <code>routeiq.overhead_ms</code> — keep rules in-process (R16)
            </>,
          ]}
        />
      </DocSection>

      <DocSection title="Policy sketch">
        <DocCode>{`routing:
  default: owned/general-llm
  fallback: provider/strong
  max_cascade: 2
  rules:
    - name: cx-cheap
      when: { agent: support, intent: [order_status, hours_faq] }
      model: owned/slm-support
      cache: { mode: semantic, ttl_s: 600, key: [tenant_id, intent, prompt_hash] }
    - name: apiheal-classify
      when: { agent: apiheal }
      model: owned/slm-apiheal
      capabilities: { tools: deny }
    - name: risk-hard
      when: { risk: high }
      model: provider/strong
  budgets:
    tenants:
      acme: { weekly_usd: 500, on_deny: cache_only }
  sticky:
    mid_task: true   # durable agents — avoid flip-flop`}</DocCode>
        <DocP>
          Full operate guide: <Link href="/docs/routing">Routing policies</Link>.
        </DocP>
      </DocSection>

      <DocSection title="Operator failure modes">
        <DocTable
          headers={["ID", "Problem", "Next action"]}
          rows={[
            ["R03", "Semantic false cache hit", "Raise threshold; intent gate"],
            ["R06", "Over-escalation burns $", "Tighten rules; cost alert"],
            ["R07", "Under-escalation hurts quality", "Force escalate on keywords"],
            ["R11", "Budget deny surprises users", "Soft degrade; notify tenant"],
            ["R15", "Cache stampede on expiry", "Singleflight; staggered TTL"],
            ["R17", "Stale cache after prompt change", "Invalidate on prompt_version"],
            ["R18", "Cache key missing tenant", "Composite key always"],
            ["R23", "Cascade A→B→C→D too long", "Max 2 hops"],
          ]}
        />
      </DocSection>

      <DocCallout title="Fits the loop">
        <DocP>
          Route decisions are TraceForge spans and LensAI dimensions. DriftWatch scores
          by route mix; FineForge can ship route-rule bundles with prompts.
        </DocP>
      </DocCallout>

      <DocSection title="Source">
        <DocP>
          <a href={GITHUB.routeiq} target="_blank" rel="noreferrer">
            {GITHUB.routeiq}
          </a>
        </DocP>
      </DocSection>

      <DocNext
        href="/docs/products/driftwatch"
        label="DriftWatch →"
        hint="Golden sets, teachers, slice alerts."
      />
    </DocsShell>
  );
}
