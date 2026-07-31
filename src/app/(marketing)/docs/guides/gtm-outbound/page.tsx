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
  title: "GTM & outbound agents — Inferix Docs",
  description:
    "GTM outbound agents on Inferix: enrich, draft, CRM — cost routing and cache.",
};

export default function GtmOutboundGuide() {
  return (
    <DocsShell pathname="/docs/guides/gtm-outbound">
      <DocKicker>Guides</DocKicker>
      <DocH1>GTM & outbound agents</DocH1>
      <DocIntro>
        Enrich lead → draft email → CRM upsert → schedule follow-up.{" "}
        <code>agent_id: gtm</code>. Cost routing and cache dominate this workload.
      </DocIntro>

      <DocSection title="Scenario">
        <DocP>
          Turning off cheap-path routing 3×&apos;d cost per lead overnight. RouteIQ model
          mix plus LensAI cost-by-intent showed the flip immediately.
        </DocP>
      </DocSection>

      <DocSection title="What Inferix gives you">
        <DocUl
          items={[
            <>RouteIQ cheap path + semantic cache for pricing_intro / hours-like FAQ copy</>,
            <>Budget denies per tenant campaign (R11/R12)</>,
            <>LensAI cost.per_successful_task (meeting booked, not just email sent)</>,
            <>TraceForge for enrich → draft → send tool order</>,
          ]}
        />
      </DocSection>

      <DocSection title="Tools & intents">
        <DocTable
          headers={["Tools", "Intents"]}
          rows={[
            [
              "enrich.company, enrich.person, crm.upsert_lead, email.draft, email.send, calendar.book",
              "cold_outbound, warm_followup, event_invite, reengagement, pricing_intro, partner_intro",
            ],
          ]}
        />
      </DocSection>

      <DocSection title="Setup">
        <DocCode>{`routing:
  rules:
    - name: gtm-boilerplate
      when: { agent: gtm, intent: [warm_followup, reengagement] }
      model: owned/slm-support
      cache: { mode: semantic, ttl_s: 3600, key: [tenant_id, intent, prompt_hash] }
    - name: gtm-cold
      when: { agent: gtm, intent: cold_outbound }
      model: owned/general-llm
  budgets:
    tenants:
      sales-east: { weekly_usd: 200, on_deny: cache_only }`}</DocCode>
        <DocP>
          Policies: <Link href="/docs/routing">Routing</Link>.
        </DocP>
      </DocSection>

      <DocSection title="Watch & failures">
        <DocUl
          items={[
            <>Over-escalation (R06) when classifier dies — everything on strong</>,
            <>Cache stampede (R15) after TTL — singleflight</>,
            <>Cross-tenant cache bleed (R18) — composite keys</>,
            <>force_expensive_model chaos — LensAI cost spike</>,
          ]}
        />
        <DocCallout title="Business success">
          <DocP>
            Count CRM upsert + valid send, not HTTP 200 on email.draft alone (T12).
          </DocP>
        </DocCallout>
      </DocSection>

      <DocNext
        href="/docs/guides/voice"
        label="Voice agents →"
        hint="STT / LLM / TTS latency and failover."
      />
    </DocsShell>
  );
}
