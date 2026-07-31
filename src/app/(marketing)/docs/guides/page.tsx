import type { Metadata } from "next";
import DocsShell from "@/components/docs/DocsShell";
import {
  DocKicker,
  DocH1,
  DocIntro,
  DocSection,
  DocCards,
  DocNext,
} from "@/components/docs/DocParts";

export const metadata: Metadata = {
  title: "Guides — Inferix Docs",
  description:
    "Operator and agent guides: platform ops, CX, SRE, finance, GTM, voice, API healing, durable agents, owned models.",
};

export default function GuidesIndexPage() {
  return (
    <DocsShell pathname="/docs/guides">
      <DocKicker>Guides</DocKicker>
      <DocH1>All guides</DocH1>
      <DocIntro>
        Practical playbooks for running Inferix and shaping agents on the control plane.
        Each guide: scenario → what Inferix gives you → setup → dashboards → failure
        modes.
      </DocIntro>

      <DocSection title="Operators & models">
        <DocCards
          items={[
            {
              href: "/docs/guides/platform-operators",
              title: "Platform operators",
              body: "Run the control plane: SLOs, budgets, promote gates, tenant views.",
            },
            {
              href: "/docs/guides/owned-models",
              title: "Owned models",
              body: "Register SLMs, cheap vs strong RouteIQ paths, FineForge revisions.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Agent workloads">
        <DocCards
          items={[
            {
              href: "/docs/guides/support-cx",
              title: "Support & CX agents",
              body: "Order, policy, refund tools — required steps and cheap SLM path.",
            },
            {
              href: "/docs/guides/incident-sre",
              title: "Incident & SRE agents",
              body: "Metrics, logs, deploys, RCA — TraceForge for competing hypotheses.",
            },
            {
              href: "/docs/guides/finance",
              title: "Finance agents",
              body: "Invoice reconciliation — schema drift and ERP tool graphs.",
            },
            {
              href: "/docs/guides/gtm-outbound",
              title: "GTM & outbound agents",
              body: "Lead enrich → email — cost routing and cache.",
            },
            {
              href: "/docs/guides/voice",
              title: "Voice agents",
              body: "STT / LLM / TTS latency tags and failover.",
            },
            {
              href: "/docs/guides/api-healing",
              title: "API healing agents",
              body: "Flagship wedge — schema drift, adapters, canary, error budget.",
            },
            {
              href: "/docs/guides/durable-agents",
              title: "Durable agents",
              body: "Checkpoint, resume, sticky routes, memory-poison drift.",
            },
          ]}
        />
      </DocSection>

      <DocNext
        href="/docs/guides/platform-operators"
        label="Platform operators →"
        hint="Start here if you own the control plane."
      />
    </DocsShell>
  );
}
