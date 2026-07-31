import type { Metadata } from "next";
import DocsShell from "@/components/docs/DocsShell";
import {
  DocKicker,
  DocH1,
  DocIntro,
  DocSection,
  DocP,
  DocUl,
  DocCards,
  DocCallout,
  DocNext,
} from "@/components/docs/DocParts";

export const metadata: Metadata = {
  title: "Docs — Inferix",
  description:
    "Inferix control plane docs: observe, route, detect drift, and retrain for AI inference and agents.",
};

export default function DocsIndexPage() {
  return (
    <DocsShell pathname="/docs">
      <DocKicker>Docs</DocKicker>
      <DocH1>Inferix documentation</DocH1>
      <DocIntro>
        Inferix is the control plane for AI inference and agents. Observe every call,
        route by policy, detect quality drift, and retrain when signal says so. It sits
        next to your gateway and traces — not instead of them.
      </DocIntro>

      <DocSection title="The loop">
        <DocP>
          Platform teams run one control plane in front of owned models and providers.
          Traffic flows through the same path every time:
        </DocP>
        <DocUl
          items={[
            <>
              <strong>LensAI</strong> — latency, cost, errors, volume
            </>,
            <>
              <strong>TraceForge</strong> — spans across tools, models, and agent steps
            </>,
            <>
              <strong>RouteIQ</strong> — policy: which model handles this call
            </>,
            <>
              <strong>DriftWatch</strong> — quality slips before users complain
            </>,
            <>
              <strong>FineForge</strong> — fine-tune, promote, or roll back
            </>,
          ]}
        />
      </DocSection>

      <DocSection title="Get started">
        <DocCards
          items={[
            {
              href: "/docs/quickstart",
              title: "Quick start",
              body: "Clone, run Docker, connect a client, verify LensAI and TraceForge.",
            },
            {
              href: "/docs/install",
              title: "Install & self-host",
              body: "Compose, Kubernetes sketch, env vars, and upgrades.",
            },
            {
              href: "/docs/concepts",
              title: "Core concepts",
              body: "Control plane, call, span, policy, drift, promote — glossary.",
            },
            {
              href: "/docs/architecture",
              title: "Architecture",
              body: "Request path, product roles, and data stores.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Operate">
        <DocCards
          items={[
            {
              href: "/docs/configuration",
              title: "Configuration",
              body: "Full inferix.yaml reference for models, routing, observe, and drift.",
            },
            {
              href: "/docs/observability",
              title: "Observability",
              body: "LensAI metrics and TraceForge spans together.",
            },
            {
              href: "/docs/routing",
              title: "Routing policies",
              body: "RouteIQ defaults, cheap SLMs, strong paths, tenant rules.",
            },
            {
              href: "/docs/drift-retrain",
              title: "Drift & retrain",
              body: "DriftWatch signals and FineForge promote / rollback.",
            },
            {
              href: "/docs/api",
              title: "API reference",
              body: "Chat completions, health, models, traces, policies, alerts.",
            },
            {
              href: "/docs/sdk",
              title: "SDKs & clients",
              body: "Python, JS, Go patterns and OpenTelemetry for TraceForge.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Products">
        <DocCards
          items={[
            {
              href: "/docs/products/lensai",
              title: "LensAI",
              body: "See latency, cost, errors, and volume across models and agents.",
            },
            {
              href: "/docs/products/traceforge",
              title: "TraceForge",
              body: "Follow one request across tools, models, and agent steps.",
            },
            {
              href: "/docs/products/routeiq",
              title: "RouteIQ",
              body: "Send each call to the right owned model or provider by policy.",
            },
            {
              href: "/docs/products/driftwatch",
              title: "DriftWatch",
              body: "Alert when quality slips — before users complain.",
            },
            {
              href: "/docs/products/fineforge",
              title: "FineForge",
              body: "Turn drift into a fine-tune job you can ship or roll back.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Guides">
        <DocP>
          Practical agent and operator playbooks — from support CX and incident SRE to
          voice, API healing, and owned SLMs.
        </DocP>
        <DocCards
          items={[
            {
              href: "/docs/guides",
              title: "All guides",
              body: "Index of every operator and agent guide.",
            },
            {
              href: "/docs/guides/platform-operators",
              title: "Platform operators",
              body: "Run the control plane for ML and platform teams.",
            },
            {
              href: "/docs/guides/owned-models",
              title: "Owned models",
              body: "Register SLMs, cheap vs strong RouteIQ paths, FineForge.",
            },
          ]}
        />
      </DocSection>

      <DocCallout title="Who this is for">
        <DocP>
          Platform and ML ops teams who own inference cost, quality, and agent
          reliability. If you already have a gateway or an APM, Inferix sits next to
          them and closes the observe → route → drift → retrain loop.
        </DocP>
      </DocCallout>

      <DocNext
        href="/docs/quickstart"
        label="Quick start →"
        hint="Run the control plane locally and send your first call."
      />
    </DocsShell>
  );
}
