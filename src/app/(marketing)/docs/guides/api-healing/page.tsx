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
  title: "API healing agents — Inferix Docs",
  description:
    "Self-maintainable API agents: schema drift, adapters, canary, error budget on Inferix.",
};

export default function ApiHealingGuide() {
  return (
    <DocsShell pathname="/docs/guides/api-healing">
      <DocKicker>Guides</DocKicker>
      <DocH1>API healing agents</DocH1>
      <DocIntro>
        Detect contract breaks — schema drift, consumer breakage, stale fixtures, bad
        canaries — and safely remediate with adapters, fixture refresh, and canary
        rollback. Flagship product wedge on Inferix (<code>agent_id: apiheal</code>).
      </DocIntro>

      <DocSection title="Scenario">
        <DocP>
          Producer renames a field overnight. Consumers 4xx. OpenAPI goes red. Golden
          fixtures rot. Canaries burn error budget before humans notice. Manual Pact and
          gateway canaries each cover a slice — Inferix closes detect → classify → patch
          → validate → promote.
        </DocP>
      </DocSection>

      <DocSection title="What Inferix gives you">
        <DocUl
          items={[
            <>
              RouteIQ: <code>owned/slm-apiheal</code> cheap classify; hard path for heal
              proposals (capability matrix denies heal tools on classify-only SLM)
            </>,
            <>TraceForge: OpenAPI diff → adapter → contract test → canary spans</>,
            <>DriftWatch: schema drift (D03), format drift, authz drift</>,
            <>FineForge: adapter patches, fixture updates, canary promote/rollback</>,
            <>LensAI: cost and latency of classify vs hard heal path</>,
          ]}
        />
      </DocSection>

      <DocSection title="Owned model roles">
        <DocTable
          headers={["Piece", "Role"]}
          rows={[
            [
              "owned/slm-apiheal (slm-apiheal-v*)",
              "Cheap classifier / route assist — severity, diff narrate, fixture hints",
            ],
            [
              "Provider hard path",
              "Hard diffs, heal proposals, HITL rationales",
            ],
            [
              "FineForge",
              "Version adapters + fixtures; gate on contract tests + error budget",
            ],
          ]}
        />
      </DocSection>

      <DocSection title="Setup">
        <DocCode>{`routing:
  rules:
    - name: apiheal-classify
      when: { agent: apiheal, intent: [severity_classify, fixture_hint] }
      model: owned/slm-apiheal
      capabilities: { tools: deny }   # classify only
    - name: apiheal-remediate
      when: { agent: apiheal, intent: [adapter_patch, canary_rollback] }
      model: provider/strong
      capabilities: { tools: allow }

drift:
  golden_set: /var/lib/inferix/golden/apiheal.jsonl
  slices: [breaking_vs_additive, consumer]

# Error budget burn gates auto-promote (FineForge F14)
# Emit deploy markers on adapter_version + openapi_hash`}</DocCode>
        <DocP>
          Models: <Link href="/docs/guides/owned-models">Owned models</Link>. Loop:{" "}
          <Link href="/docs/drift-retrain">Drift & retrain</Link>.
        </DocP>
      </DocSection>

      <DocSection title="Watch">
        <DocUl
          items={[
            <>Tool 4xx schema rate (T03) and contract test CI</>,
            <>Canary error-budget burn before full promote</>,
            <>Route mix: classify on SLM vs hard path share</>,
            <>DriftWatch slice: breaking vs additive OpenAPI diffs</>,
          ]}
        />
      </DocSection>

      <DocSection title="Failure modes">
        <DocCallout title="Safe remediation only">
          <DocUl
            items={[
              <>Never auto-promote breaking producer changes without HITL</>,
              <>Adapter patch restores consumers — prefer over silent producer revert</>,
              <>Shadow tools must not hit prod systems (T21)</>,
              <>D19 — do not ship OpenAPI + adapter + route in one unbundled change</>,
            ]}
          />
        </DocCallout>
      </DocSection>

      <DocNext
        href="/docs/guides/durable-agents"
        label="Durable agents →"
        hint="Checkpoint, resume, memory poison drift."
      />
    </DocsShell>
  );
}
