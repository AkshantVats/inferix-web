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
  title: "Platform operators — Inferix Docs",
  description:
    "Run the Inferix control plane: SLOs, budgets, promote gates, tenant dashboards.",
};

export default function PlatformOperatorsGuide() {
  return (
    <DocsShell pathname="/docs/guides/platform-operators">
      <DocKicker>Guides</DocKicker>
      <DocH1>Platform operators</DocH1>
      <DocIntro>
        You own inference cost, quality, and agent reliability for the org. Inferix is
        the control plane in front of owned models and providers — observe, route,
        detect drift, retrain.
      </DocIntro>

      <DocSection title="Scenario">
        <DocP>
          Multiple agent teams ship prompts weekly. Finance wants $/successful task.
          SRE wants p95 and error budgets. You need one plane that attributes cost,
          enforces routes, and gates promotes — without replacing the gateway or APM.
        </DocP>
      </DocSection>

      <DocSection title="What Inferix gives you">
        <DocUl
          items={[
            <>LensAI fleet SLOs + tenant cost on Grafana :3000</>,
            <>TraceForge RCA next to existing OTel</>,
            <>RouteIQ budgets, cache, cheap/general/hard matrix</>,
            <>DriftWatch slice alerts → FineForge canary promote</>,
          ]}
        />
      </DocSection>

      <DocSection title="Setup">
        <DocP>Bring-up checklist:</DocP>
        <DocCode>{`# 1. Deploy control plane :4000 + Postgres
# 2. Mount inferix.yaml with models + routing + observe + drift
# 3. Point Grafana at ClickHouse (LensAI) — port 3000
# 4. Require tenant_id / agent_id / trace_id at ingest
# 5. Wire FineForge promote to emit deploy markers
# 6. Page on driftwatch.alerts.open for critical agents`}</DocCode>
        <DocP>
          Install: <Link href="/docs/install">Install & self-host</Link>. Config:{" "}
          <Link href="/docs/configuration">Configuration</Link>.
        </DocP>
      </DocSection>

      <DocSection title="Dashboards to watch">
        <DocTable
          headers={["Panel", "Signal", "Action"]}
          rows={[
            ["Fleet p95 / error rate", "LensAI by model_id", "Failover / scale owned pool"],
            ["Cost by tenant", "lensai.cost.usd", "Budget deny or cache-only"],
            ["Route mix", "routeiq.model.mix", "Stop over-escalation"],
            ["Open drift alerts", "driftwatch.alerts.open", "FineForge job"],
            ["Canary score", "shadow vs prod", "Promote or rollback"],
            ["Ingest lag", "lensai.ingest.lag_ms", "Scale consumers"],
          ]}
        />
      </DocSection>

      <DocSection title="Failure modes">
        <DocUl
          items={[
            <>Cardinality blowup (L01) — drop prompt text labels</>,
            <>Unattributed cost (L08) — reject missing tenant_id</>,
            <>Alert fatigue (D22) — critical slices only</>,
            <>Confounded deploys (D19) — change one variable per promote</>,
          ]}
        />
        <DocCallout title="Ownership">
          <DocP>
            Platform owns Inferix + model registry pins. Agent teams own golden sets and
            business-success predicates. FineForge CI gates block bad prompt merges.
          </DocP>
        </DocCallout>
      </DocSection>

      <DocNext
        href="/docs/guides/support-cx"
        label="Support & CX agents →"
        hint="Order, policy, refund reference workload."
      />
    </DocsShell>
  );
}
