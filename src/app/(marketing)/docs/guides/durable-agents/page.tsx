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
  title: "Durable agents — Inferix Docs",
  description:
    "Persistent agents: checkpoint, resume, sticky routing, memory-poison drift on Inferix.",
};

export default function DurableAgentsGuide() {
  return (
    <DocsShell pathname="/docs/guides/durable-agents">
      <DocKicker>Guides</DocKicker>
      <DocH1>Durable agents</DocH1>
      <DocIntro>
        Long-running goals with checkpoints, memory, HITL stalls, and scheduled wakes.
        Resume after crash or days later. <code>agent_id: persist</code> — showcase for
        durable execution, not a product wedge.
      </DocIntro>

      <DocSection title="Scenario">
        <DocP>
          A multi-day goal crashes mid-checkpoint. On resume, poisoned memory steers the
          agent wrong while sticky routing keeps the same model mid-task. You need resume
          spans, memory-poison drift, and idempotent wakes.
        </DocP>
      </DocSection>

      <DocSection title="What Inferix gives you">
        <DocUl
          items={[
            <>TraceForge long-lived traces, resume spans, HITL/wake stages</>,
            <>LensAI cost over multi-session tasks (not single-shot)</>,
            <>RouteIQ sticky mid-task routing (R14)</>,
            <>DriftWatch memory-poison / stale-memory slices</>,
            <>FineForge memory-policy prompts + checkpoint schema versions</>,
          ]}
        />
      </DocSection>

      <DocSection title="Tools & intents">
        <DocTable
          headers={["Tools", "Intents"]}
          rows={[
            [
              "state.load/save_checkpoint, memory.retrieve/write, workflow.resume, hitl.request_approval, scheduler.wake, domain.act",
              "multi_day_goal, resume_after_crash, hitl_approval_wait, scheduled_wakeup, memory_grounded_continue, checkpoint_replay",
            ],
          ]}
        />
      </DocSection>

      <DocSection title="Setup">
        <DocCode>{`routing:
  sticky:
    mid_task: true
    key: [tenant_id, task_id]
  rules:
    - name: persist-default
      when: { agent: persist }
      model: owned/general-llm
      fallback: provider/strong

observe:
  traces: true
  # resume span must link new session → original trace_id / task_id

drift:
  slices: [memory_poison, stale_memory, post_resume]
  golden_set: /var/lib/inferix/golden/persist.jsonl`}</DocCode>
      </DocSection>

      <DocSection title="Watch & failures">
        <DocUl
          items={[
            <>Orphan spans after resume (T16) — fix baggage propagation</>,
            <>HITL stall mistaken for hang — tag exclusive waits (T20)</>,
            <>poison_memory / stale_memory chaos → DriftWatch</>,
            <>drop_wake — scheduler.wake must be idempotent</>,
            <>crash_mid_checkpoint — no duplicate side effects on resume</>,
          ]}
        />
        <DocCallout title="Glossary">
          <DocP>
            Checkpoint, durable execution, wake, resume span — see{" "}
            <Link href="/docs/concepts">Core concepts</Link>.
          </DocP>
        </DocCallout>
      </DocSection>

      <DocNext
        href="/docs/guides/owned-models"
        label="Owned models →"
        hint="Register SLMs and FineForge revisions."
      />
    </DocsShell>
  );
}
