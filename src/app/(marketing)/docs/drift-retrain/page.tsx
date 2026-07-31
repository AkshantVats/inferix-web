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
  title: "Drift & retrain — Inferix Docs",
  description:
    "DriftWatch golden sets, slice alerts, teacher models; FineForge retrain, promote, and rollback.",
};

export default function DriftRetrainPage() {
  return (
    <DocsShell pathname="/docs/drift-retrain">
      <DocKicker>Operate</DocKicker>
      <DocH1>Drift & retrain</DocH1>
      <DocIntro>
        DriftWatch watches quality against golden sets and live slices. FineForge turns
        an alert into a versioned fix — prompt patch, adapter, or LoRA — then promote or
        roll back with deploy markers on the same dashboards.
      </DocIntro>

      <DocSection title="Loop">
        <DocCode>{`LensAI + TraceForge  →  live traffic + traces
         ↓
DriftWatch          →  score vs golden / teacher / slices
         ↓  alert
FineForge           →  patch | train | eval gate
         ↓
promote (canary→full)  or  rollback
         ↓
RouteIQ + prompt_version / model_id updated`}</DocCode>
      </DocSection>

      <DocSection title="DriftWatch signals">
        <DocTable
          headers={["Signal", "Symptom", "Operator action"]}
          rows={[
            ["Prompt regression", "Score drop + deploy marker", "Rollback prompt_version"],
            ["Slice drift", "One intent hurts; others fine", "Intent-specific prompt or route"],
            ["Tool schema drift", "Tool errors↑ + score↓", "Adapter fix via FineForge"],
            ["Provider shift", "Score drop without your deploy", "Pin provider version; escalate"],
            ["Cost-cutting drift", "Quality↓ after budget force-cheap", "Restore hard path"],
            ["Latency-induced", "P99↑ with incomplete answers", "RouteIQ failover"],
            ["Golden set stale", "Eval–prod gap widens", "Refresh cases from failures"],
            ["Alert fatigue", "Ack rate collapses", "Raise thresholds; critical slices only"],
          ]}
        />
        <DocP>
          Key metrics: <code>driftwatch.score.prod</code>,{" "}
          <code>driftwatch.slice.score</code>, <code>driftwatch.delta</code>,{" "}
          <code>driftwatch.alerts.open</code>. Details:{" "}
          <Link href="/docs/products/driftwatch">DriftWatch</Link>.
        </DocP>
      </DocSection>

      <DocSection title="Golden sets and teachers">
        <DocUl
          items={[
            <>
              <strong>Golden set</strong> — fixed prompts + expected outcomes (business
              success, not HTTP 200). Stratify by intent.
            </>,
            <>
              <strong>Teacher model</strong> — stronger model scores or critiques owned
              SLM outputs; freeze the judge prompt to avoid labeler drift.
            </>,
            <>
              <strong>Shadow</strong> — send % traffic to a candidate; compare{" "}
              <code>driftwatch.score.shadow</code> vs prod before promote.
            </>,
          ]}
        />
        <DocCode>{`drift:
  enabled: true
  window: 24h
  golden_set: /var/lib/inferix/golden/support.jsonl
  teacher: provider/strong
  slices:
    - intent
    - locale
    - tenant_tier
  alert:
    min_delta: 0.05
    min_samples: 50`}</DocCode>
      </DocSection>

      <DocSection title="FineForge jobs">
        <DocTable
          headers={["Job type", "When", "Artifact"]}
          rows={[
            ["Prompt patch", "Surgical regression", "prompt_version bump"],
            ["Adapter fix", "Schema / tool 4xx", "tool_schema_version + fixtures"],
            ["Teacher critique", "Failure cluster", "Repair suggestions → patch"],
            ["Distill / LoRA", "Cheap path specialization", "owned model revision"],
            ["Eval harness expand", "New failure mode", "Cases from DriftWatch samples"],
            ["Bundle promote", "Prompt+adapter+route", "Atomic multi-artifact version"],
          ]}
        />
        <DocCode>{`# Start a FineForge job from an alert
curl -X POST http://localhost:4000/v1/fineforge/jobs \\
  -H "Authorization: Bearer $INFERIX_MASTER_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "alert_id": "dw_alert_8f2a",
    "kind": "prompt_patch",
    "model": "owned/slm-support",
    "shadow_pct": 5
  }'`}</DocCode>
      </DocSection>

      <DocSection title="Promote and rollback">
        <DocUl
          items={[
            <>
              <strong>Canary</strong> — 1% traffic; auto-promote if{" "}
              <code>driftwatch.delta</code> &gt; ε and error budget holds.
            </>,
            <>
              <strong>Full promote</strong> — pin new <code>model_id</code> /{" "}
              <code>prompt_version</code>; emit deploy marker for LensAI dashboards.
            </>,
            <>
              <strong>Rollback</strong> — instant previous revision; FineForge keeps the
              bad candidate for postmortem → new eval case.
            </>,
          ]}
        />
        <DocCallout title="Change one variable">
          <DocP>
            Cascade interaction drift (D19) confounds RCA when route and prompt change
            together. Promote prompt, adapter, or route rule in separate steps unless you
            ship an explicit FineForge bundle.
          </DocP>
        </DocCallout>
      </DocSection>

      <DocNext
        href="/docs/api"
        label="API reference →"
        hint="Chat completions, traces, policies, drift alerts, FineForge jobs."
      />
    </DocsShell>
  );
}
