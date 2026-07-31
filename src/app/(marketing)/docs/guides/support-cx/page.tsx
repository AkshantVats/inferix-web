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
  title: "Support & CX agents — Inferix Docs",
  description:
    "Support/refund agents on Inferix: order, policy, refund tools, cheap SLM, required steps.",
};

export default function SupportCxGuide() {
  return (
    <DocsShell pathname="/docs/guides/support-cx">
      <DocKicker>Guides</DocKicker>
      <DocH1>Support & CX agents</DocH1>
      <DocIntro>
        Lookup order → check refund policy → refund or replace → notify. Reference
        workload for CX automation on Inferix (<code>agent_id: support</code>).
      </DocIntro>

      <DocSection title="Scenario">
        <DocP>
          A prompt change made the agent skip <code>policy.check_refund</code> —
          customers got unauthorized refunds. HTTP tools still returned 200. You need
          required-step gates, cheap routing for FAQ, and drift on refund intents.
        </DocP>
      </DocSection>

      <DocSection title="What Inferix gives you">
        <DocUl
          items={[
            <>TraceForge required-step misses (T01) and business_success</>,
            <>RouteIQ cheap path on owned/slm-support for easy intents</>,
            <>LensAI cost per successful refund / order_status</>,
            <>DriftWatch slice on refund_request; FineForge prompt rollback</>,
          ]}
        />
      </DocSection>

      <DocSection title="Tools & intents">
        <DocTable
          headers={["Tools", "Intents"]}
          rows={[
            [
              "shop.get_order, policy.check_refund, payments.refund/replace, crm.notify, knowledge.search_faq",
              "order_status, refund_request, partial_return, exchange, shipping_delay, cancel_order",
            ],
          ]}
        />
      </DocSection>

      <DocSection title="Setup">
        <DocCode>{`routing:
  rules:
    - name: support-faq
      when: { agent: support, intent: [order_status, shipping_delay] }
      model: owned/slm-support
      cache: { mode: semantic, ttl_s: 600 }
    - name: support-refund
      when: { agent: support, intent: refund_request }
      model: owned/slm-support
      escalate_if: { risk: high, model: owned/general-llm }

# TraceForge: mark policy.check_refund required for refund_request
# Golden set: unauthorized refund cases must fail business_success`}</DocCode>
        <DocP>
          Register <code>owned/slm-support</code>:{" "}
          <Link href="/docs/guides/owned-models">Owned models</Link>.
        </DocP>
      </DocSection>

      <DocSection title="Watch">
        <DocUl
          items={[
            <>skipped_required for policy.check_refund</>,
            <>route mix: % on slm-support vs general-llm</>,
            <>cost.per_successful_task for support agent</>,
            <>drift slice refund_request after prompt deploys</>,
          ]}
        />
      </DocSection>

      <DocSection title="Failure modes">
        <DocUl
          items={[
            <>T01 required step skipped — hard gate in agent</>,
            <>T11 hallucinated order ids — validate before payments.refund</>,
            <>R03 semantic cache false hit on similar FAQ — raise threshold</>,
            <>D01 prompt regression — FineForge rollback</>,
          ]}
        />
        <DocCallout title="Chaos drills">
          <DocP>
            Practice with toggles: bad_prompt, broken_tool_schema, drop_tool:policy.check_refund,
            force_expensive_model, inject_latency:shop.get_order.
          </DocP>
        </DocCallout>
      </DocSection>

      <DocNext
        href="/docs/guides/incident-sre"
        label="Incident & SRE agents →"
        hint="RCA with metrics, logs, and deploys."
      />
    </DocsShell>
  );
}
