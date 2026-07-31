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
  title: "DriftWatch — Inferix Docs",
  description:
    "DriftWatch: golden sets, teacher models, slice alerts before users complain.",
};

export default function DriftWatchProductPage() {
  return (
    <DocsShell pathname="/docs/products/driftwatch">
      <DocKicker>Products</DocKicker>
      <DocH1>DriftWatch</DocH1>
      <DocIntro>
        Alert when quality slips — before users complain. DriftWatch scores traffic and
        golden sets by slice, correlates with deploy markers, and opens alerts FineForge
        can act on.
      </DocIntro>

      <DocSection title="When to use">
        <DocUl
          items={[
            <>You ship prompt or model changes and need regression gates</>,
            <>Quality drops on one intent while fleet averages look fine</>,
            <>Schema, retrieval, or provider behavior shifts silently</>,
          ]}
        />
      </DocSection>

      <DocSection title="Inputs">
        <DocTable
          headers={["Input", "Role"]}
          rows={[
            ["Golden set", "Fixed cases; business outcomes"],
            ["Teacher model", "Score / critique owned outputs; freeze judge prompt"],
            ["Live sample", "Stratified by intent — avoid easy-only bias (D12)"],
            ["Deploy markers", "Correlate score drop with prompt/model version"],
            ["Shadow scores", "Candidate vs prod before promote"],
          ]}
        />
      </DocSection>

      <DocSection title="Metrics">
        <DocUl
          items={[
            <>
              <code>driftwatch.score.prod</code> / <code>score.shadow</code>
            </>,
            <>
              <code>driftwatch.delta</code>, <code>cusum</code>
            </>,
            <>
              <code>driftwatch.slice.score</code> — heatmap by intent/locale/segment
            </>,
            <>
              <code>driftwatch.alerts.open</code>
            </>,
          ]}
        />
      </DocSection>

      <DocSection title="Operator failure modes">
        <DocTable
          headers={["ID", "Problem", "Next action"]}
          rows={[
            ["D01", "Prompt regression", "Rollback prompt_version"],
            ["D02", "Partial slice drift", "Intent-specific prompt"],
            ["D03", "Tool schema drift", "Adapter fix"],
            ["D04", "Provider behavior shift", "Pin version; escalate"],
            ["D08", "Cost-cutting quality drop", "Restore hard path"],
            ["D10", "Labeler / judge drift", "Freeze judge prompt"],
            ["D16", "Format / JSON drift", "Structured output gate"],
            ["D22", "Alert fatigue", "Raise thresholds; critical slices"],
            ["D24", "Stale golden set", "Refresh from FineForge failures"],
          ]}
        />
      </DocSection>

      <DocSection title="Config">
        <DocCode>{`drift:
  enabled: true
  window: 24h
  golden_set: /var/lib/inferix/golden/default.jsonl
  teacher: provider/strong
  slices: [intent, locale, tenant_tier]
  alert:
    min_delta: 0.05
    min_samples: 50
  seasonal_baseline: true`}</DocCode>
        <DocP>
          Operate guide: <Link href="/docs/drift-retrain">Drift & retrain</Link>.
        </DocP>
      </DocSection>

      <DocCallout title="Fits the loop">
        <DocP>
          DriftWatch is off the hot path. Alerts feed FineForge jobs; RouteIQ and LensAI
          show whether a quality drop came from model mix or latency-induced incompletes.
        </DocP>
      </DocCallout>

      <DocSection title="Source">
        <DocP>
          <a href={GITHUB.driftwatch} target="_blank" rel="noreferrer">
            {GITHUB.driftwatch}
          </a>
        </DocP>
      </DocSection>

      <DocNext
        href="/docs/products/fineforge"
        label="FineForge →"
        hint="Retrain, promote, rollback, prompt+adapter bundles."
      />
    </DocsShell>
  );
}
