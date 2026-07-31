import type { Metadata } from "next";
import Link from "next/link";
import DocsShell from "@/components/docs/DocsShell";
import {
  DocKicker,
  DocH1,
  DocIntro,
  DocSection,
  DocP,
  DocTable,
  DocUl,
  DocNext,
} from "@/components/docs/DocParts";

export const metadata: Metadata = {
  title: "Core concepts — Inferix Docs",
  description:
    "Glossary: control plane, call, span, policy, owned model, drift, golden set, promote.",
};

export default function ConceptsPage() {
  return (
    <DocsShell pathname="/docs/concepts">
      <DocKicker>Get started</DocKicker>
      <DocH1>Core concepts</DocH1>
      <DocIntro>
        Shared vocabulary for operators running Inferix. Use these terms in policies,
        dashboards, and runbooks.
      </DocIntro>

      <DocSection title="Glossary">
        <DocTable
          headers={["Term", "Meaning"]}
          rows={[
            [
              "Control plane",
              "Inferix process in front of owned models and providers. Observes, routes, watches drift, and kicks retrain — it does not replace your gateway or APM.",
            ],
            [
              "Call",
              "One inference request entering /v1/chat/completions (or equivalent). Attributed to a model, agent, tenant, and route decision.",
            ],
            [
              "Span / trace",
              "TraceForge unit of work. A trace is a tree of spans: route decision, tool calls, model invoke, downstream HTTP.",
            ],
            [
              "Policy",
              "RouteIQ rule set: which model handles a call given intent, agent, tenant, or attributes.",
            ],
            [
              "Owned model",
              "Model you host and register in inferix.yaml (e.g. owned/general-llm, owned/slm-support). Inferix routes to its endpoint.",
            ],
            [
              "Provider",
              "External inference API registered alongside owned models. Used as primary or fallback per policy.",
            ],
            [
              "Route",
              "The chosen model (and optional fallback chain) for a single call after RouteIQ evaluates rules.",
            ],
            [
              "Drift",
              "Quality shift vs a baseline or golden set — DriftWatch signals this before user complaints spike.",
            ],
            [
              "Golden set",
              "Labeled prompts + expected outputs used by DriftWatch to score quality over a sliding window.",
            ],
            [
              "Teacher",
              "Stronger model used by FineForge to generate training targets for a student SLM.",
            ],
            [
              "Promote",
              "FineForge action: ship a trained candidate into the live route for a model name.",
            ],
            [
              "Rollback",
              "FineForge action: restore the previous promoted revision after a bad ship.",
            ],
          ]}
        />
      </DocSection>

      <DocSection title="Product roles in one line">
        <DocUl
          items={[
            <>
              <Link href="/docs/products/lensai">LensAI</Link> — latency, cost, errors,
              volume
            </>,
            <>
              <Link href="/docs/products/traceforge">TraceForge</Link> — follow one
              request across tools and models
            </>,
            <>
              <Link href="/docs/products/routeiq">RouteIQ</Link> — policy routing to
              owned models or providers
            </>,
            <>
              <Link href="/docs/products/driftwatch">DriftWatch</Link> — quality drift
              alerts
            </>,
            <>
              <Link href="/docs/products/fineforge">FineForge</Link> — retrain, promote,
              rollback
            </>,
          ]}
        />
      </DocSection>

      <DocSection title="The operator loop">
        <DocP>
          Observe with LensAI and TraceForge → route with RouteIQ → detect drift with
          DriftWatch → retrain and promote with FineForge. Every guide in these docs
          assumes that loop.
        </DocP>
      </DocSection>

      <DocNext
        href="/docs/architecture"
        label="Architecture →"
        hint="Request path, product roles, and data stores."
      />
    </DocsShell>
  );
}
