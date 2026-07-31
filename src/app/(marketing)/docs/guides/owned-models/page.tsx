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
  title: "Owned models — Inferix Docs",
  description:
    "Register owned SLMs and LLMs, RouteIQ cheap vs strong paths, FineForge promote.",
};

export default function OwnedModelsGuide() {
  return (
    <DocsShell pathname="/docs/guides/owned-models">
      <DocKicker>Guides</DocKicker>
      <DocH1>Owned models</DocH1>
      <DocIntro>
        Owned models are clients of Inferix. You train and serve them; Inferix observes,
        routes, watches drift, and promotes revisions. Three families: general-llm,
        slm-support (cheap CX), slm-apiheal (cheap classify).
      </DocIntro>

      <DocSection title="Scenario">
        <DocP>
          You have checkpoints on disk and local serve endpoints. You want RouteIQ to
          send easy CX to slm-support, API classify to slm-apiheal, default reasoning to
          general-llm, and escalate to a provider when capability or risk says so —
          with FineForge promoting <code>*-vN</code> after eval gates.
        </DocP>
      </DocSection>

      <DocSection title="Era path (operate)">
        <DocCode>{`Agent task
  → RouteIQ (cheap SLM / general-llm / provider)
  → Inference (owned endpoint or provider)
  → TraceForge + LensAI (model_id labeled)
  → DriftWatch (vs teacher / golden)
  → FineForge (retrain / rollback)
  → RouteIQ rules updated`}</DocCode>
      </DocSection>

      <DocSection title="Register models">
        <DocCode>{`models:
  - name: owned/general-llm
    provider: owned
    endpoint: http://general-llm:8080/v1
    revision: general-llm-v3
    capabilities: [chat, tools]
    timeout_ms: 60000

  - name: owned/slm-support
    provider: owned
    endpoint: http://slm-support:8080/v1
    revision: slm-support-v2
    capabilities: [chat]
    labels: { tier: cheap, domain: cx }

  - name: owned/slm-apiheal
    provider: owned
    endpoint: http://slm-apiheal:8080/v1
    revision: slm-apiheal-v2
    capabilities: [chat]          # no heal tools
    labels: { tier: cheap, domain: apiheal }

  - name: provider/strong
    provider: external
    # credentials via env
    capabilities: [chat, tools]`}</DocCode>
      </DocSection>

      <DocSection title="RouteIQ matrix">
        <DocTable
          headers={["Path", "Model", "Use"]}
          rows={[
            ["Cheap CX", "owned/slm-support", "FAQ, triage, short turns"],
            ["Cheap classify", "owned/slm-apiheal", "Severity / diff narrate only"],
            ["General owned", "owned/general-llm", "Default agent reasoning + tools"],
            ["Hard path", "provider/strong", "Ambiguity, risk, outage, heal propose"],
          ]}
        />
        <DocP>
          Details: <Link href="/docs/routing">Routing policies</Link>,{" "}
          <Link href="/docs/products/routeiq">RouteIQ</Link>.
        </DocP>
      </DocSection>

      <DocSection title="FineForge revisions">
        <DocUl
          items={[
            <>Version as <code>general-llm-vN</code>, <code>slm-support-vN</code>,{" "}
              <code>slm-apiheal-vN</code></>,
            <>Promote only after eval gates + registry pin</>,
            <>Canary → full; rollback restores previous revision</>,
            <>Teacher model critiques failures before LoRA/distill</>,
          ]}
        />
        <DocP>
          <Link href="/docs/products/fineforge">FineForge</Link> ·{" "}
          <Link href="/docs/drift-retrain">Drift & retrain</Link>
        </DocP>
      </DocSection>

      <DocCallout title="Ownership">
        <DocP>
          Model cards, eval gates, and <code>model_id</code> live with the model owners.
          RouteIQ owns cheap/general/hard rules. Agent teams own tools and chaos.
          Inferix improves how you operate models — it is not required to create them.
        </DocP>
      </DocCallout>

      <DocSection title="Repos">
        <DocUl
          items={[
            <a key="s" href={GITHUB.suite} target="_blank" rel="noreferrer">
              Inferix suite
            </a>,
            <a key="f" href={GITHUB.fineforge} target="_blank" rel="noreferrer">
              FineForge
            </a>,
            <a key="r" href={GITHUB.routeiq} target="_blank" rel="noreferrer">
              RouteIQ
            </a>,
          ]}
        />
      </DocSection>

      <DocNext
        href="/docs/guides"
        label="All guides →"
        hint="Back to the guides index."
      />
    </DocsShell>
  );
}
