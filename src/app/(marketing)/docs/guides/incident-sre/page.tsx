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
  title: "Incident & SRE agents — Inferix Docs",
  description:
    "Incident investigator agents: metrics, logs, deploys, RCA on Inferix.",
};

export default function IncidentSreGuide() {
  return (
    <DocsShell pathname="/docs/guides/incident-sre">
      <DocKicker>Guides</DocKicker>
      <DocH1>Incident & SRE agents</DocH1>
      <DocIntro>
        On alert → query metrics/logs/deploys → hypothesize RCA → draft PR stub.{" "}
        <code>agent_id: incident</code>.
      </DocIntro>

      <DocSection title="Scenario">
        <DocP>
          Two agents on the same Kafka-lag page: one blamed CPU, one found consumer lag.
          TraceForge side-by-side plus FineForge eval cases teach which tool graph is
          correct.
        </DocP>
      </DocSection>

      <DocSection title="What Inferix gives you">
        <DocUl
          items={[
            <>TraceForge tool graphs for metrics → logs → deploys → draft PR</>,
            <>LensAI cost/latency of long investigation traces</>,
            <>RouteIQ: classify intent cheaply, escalate ambiguous RCA to general-llm</>,
            <>DriftWatch when retrieval/poisoned runbooks hurt RCA quality</>,
          ]}
        />
      </DocSection>

      <DocSection title="Tools & intents">
        <DocTable
          headers={["Tools", "Intents"]}
          rows={[
            [
              "pager.get_alert, metrics.query, logs.search, git.recent_deploys, k8s.get_events, github.open_draft_pr",
              "latency_regression, error_budget_burn, kafka_lag, oom_kill, bad_deploy, dependency_outage",
            ],
          ]}
        />
      </DocSection>

      <DocSection title="Setup">
        <DocCode>{`routing:
  rules:
    - name: incident-triage
      when: { agent: incident, intent: [oom_kill, kafka_lag] }
      model: owned/general-llm
    - name: incident-ambiguous
      when: { agent: incident, confidence: low }
      model: provider/strong

# Require git.recent_deploys before blaming infra-only causes
# Golden: kafka_lag cases must include consumer lag tool span`}</DocCode>
      </DocSection>

      <DocSection title="Watch">
        <DocUl
          items={[
            <>N+1 metrics.query loops (T06)</>,
            <>Missing deploy tool on bad_deploy intents (T01)</>,
            <>Exclusive time on logs.search (bottleneck)</>,
            <>Poison retrieval chaos → DriftWatch score</>,
          ]}
        />
        <DocCallout title="Failure modes">
          <DocP>
            Drop deploy tool → wrong RCA. Inject latency on logs.search → incomplete
            hypotheses. Force expensive model → LensAI cost spike without quality gain.
            See <Link href="/docs/products/traceforge">TraceForge</Link>.
          </DocP>
        </DocCallout>
      </DocSection>

      <DocNext
        href="/docs/guides/finance"
        label="Finance agents →"
        hint="Invoice reconciliation and ERP schema drift."
      />
    </DocsShell>
  );
}
