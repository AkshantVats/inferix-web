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
  title: "FineForge — Inferix Docs",
  description:
    "FineForge: retrain, canary promote, rollback, prompt+adapter bundles, teacher loops.",
};

export default function FineForgeProductPage() {
  return (
    <DocsShell pathname="/docs/products/fineforge">
      <DocKicker>Products</DocKicker>
      <DocH1>FineForge</DocH1>
      <DocIntro>
        Turn drift signal into a fine-tune or prompt/adapter job you can ship. FineForge
        owns eval gates, canary promote, rollback, and atomic prompt+adapter+route
        bundles.
      </DocIntro>

      <DocSection title="When to use">
        <DocUl
          items={[
            <>DriftWatch opened an alert and you need a versioned fix</>,
            <>Cheap SLM needs distillation from a teacher</>,
            <>Tool schema broke and adapters + fixtures must ship together</>,
          ]}
        />
      </DocSection>

      <DocSection title="Job kinds">
        <DocTable
          headers={["Kind", "Artifact", "Gate"]}
          rows={[
            ["prompt_patch", "prompt_version", "Golden pass rate"],
            ["adapter_fix", "tool_schema_version + fixtures", "Contract tests"],
            ["teacher_critique", "Repair suggestions → patch", "Judge agreement"],
            ["lora_train", "owned model revision", "Eval + cost gap accept"],
            ["bundle", "prompt + adapter + route rules", "Atomic promote"],
            ["eval_expand", "New cases from incidents", "Coverage↑"],
          ]}
        />
      </DocSection>

      <DocSection title="Promote path">
        <DocCode>{`1. Job from DriftWatch alert or schedule
2. Scrub dataset (PII block — F11)
3. Eval harness (CI gate — F06)
4. Shadow / canary 1–5% (F14)
5. Full promote + deploy marker (F15)
6. On miss: rollback to previous revision (F02)`}</DocCode>
        <DocUl
          items={[
            <>
              Metrics: <code>fineforge.jobs.*</code>, canary score, eval pass rate
            </>,
            <>
              Register new <code>model_id</code> (<code>*-vN</code>) in the model registry
              before RouteIQ points traffic
            </>,
            <>
              Postmortem → eval case (F24) so the failure never returns silently
            </>,
          ]}
        />
      </DocSection>

      <DocSection title="Operator failure modes">
        <DocTable
          headers={["ID", "Problem", "Next action"]}
          rows={[
            ["F02", "Bad prompt deploy", "Instant previous version"],
            ["F07", "Noisy LLM-as-judge", "Rubric + few-shot; freeze"],
            ["F11", "PII in train set", "Block train until scrubbed"],
            ["F12", "Noisy prod traces", "MinHash + score filter"],
            ["F14", "Canary unclear", "Hold until delta > ε"],
            ["F16", "Partial bundle ship", "Atomic multi-artifact only"],
            ["F20", "Distill quality gap", "Accept gap for cost; document"],
            ["F23", "Optimize $ without quality", "Quality-weighted cost objective"],
          ]}
        />
      </DocSection>

      <DocSection title="API">
        <DocCode>{`POST /v1/fineforge/jobs
POST /v1/fineforge/jobs/{id}/promote
POST /v1/fineforge/jobs/{id}/rollback`}</DocCode>
        <DocP>
          See <Link href="/docs/api">API reference</Link> and{" "}
          <Link href="/docs/drift-retrain">Drift & retrain</Link>.
        </DocP>
      </DocSection>

      <DocCallout title="Fits the loop">
        <DocP>
          FineForge closes observe → route → drift → retrain. Owned models (
          <Link href="/docs/guides/owned-models">guide</Link>) are clients of Inferix —
          FineForge promotes revisions; RouteIQ selects them.
        </DocP>
      </DocCallout>

      <DocSection title="Source">
        <DocP>
          <a href={GITHUB.fineforge} target="_blank" rel="noreferrer">
            {GITHUB.fineforge}
          </a>
        </DocP>
      </DocSection>

      <DocNext
        href="/docs/guides"
        label="Guides →"
        hint="Operator and agent playbooks."
      />
    </DocsShell>
  );
}
