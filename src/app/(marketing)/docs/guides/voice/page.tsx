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
  title: "Voice agents — Inferix Docs",
  description:
    "Voice appointment agents: STT/LLM/TTS stage latency, failover, RouteIQ.",
};

export default function VoiceGuide() {
  return (
    <DocsShell pathname="/docs/guides/voice">
      <DocKicker>Guides</DocKicker>
      <DocH1>Voice agents</DocH1>
      <DocIntro>
        STT → dialog agent → book/reschedule → TTS. <code>agent_id: voice</code>. Stage
        tags matter: p99 often is STT, not the LLM.
      </DocIntro>

      <DocSection title="Scenario">
        <DocP>
          P99 blew up and it was the STT stub — not the model. LensAI component labels
          (<code>model_id</code> for stt / llm / tts) made the difference. RouteIQ
          failover on LLM timeout kept calls alive.
        </DocP>
      </DocSection>

      <DocSection title="What Inferix gives you">
        <DocUl
          items={[
            <>LensAI latency by stage (tag stt / llm / tts as separate model_id)</>,
            <>RouteIQ timeout failover (R09) and max cascade 2</>,
            <>TraceForge calendar tool graph + transfer_human HITL</>,
            <>DriftWatch on booking confirmation quality</>,
          ]}
        />
      </DocSection>

      <DocSection title="Tools & intents">
        <DocTable
          headers={["Tools", "Intents"]}
          rows={[
            [
              "stt.transcribe, calendar.availability, calendar.book, calendar.reschedule, crm.update_appointment, tts.synthesize",
              "book_new, reschedule, cancel, confirm, hours_faq, transfer_human",
            ],
          ]}
        />
      </DocSection>

      <DocSection title="Setup">
        <DocCode>{`models:
  - name: owned/stt-fast
    provider: owned
    endpoint: http://stt:8080
    labels: { component: stt }
  - name: owned/general-llm
    provider: owned
    endpoint: http://llm:8080
    labels: { component: llm }
  - name: owned/tts-fast
    provider: owned
    endpoint: http://tts:8080
    labels: { component: tts }

routing:
  max_cascade: 2
  rules:
    - name: voice-faq
      when: { agent: voice, intent: hours_faq }
      model: owned/slm-support
    - name: voice-dialog
      when: { agent: voice }
      model: owned/general-llm
      fallback: provider/strong
      on_timeout_ms: 800`}</DocCode>
      </DocSection>

      <DocSection title="Watch & failures">
        <DocUl
          items={[
            <>L21 cold start — keep-warm or exclude from SLO</>,
            <>L11 provider timeout storms — circuit breaker + failover</>,
            <>R20 streaming passthrough — do not buffer full TTS/LLM stream in router</>,
            <>T02 tool timeout on calendar.availability — retry with budget</>,
          ]}
        />
        <DocCallout title="Realtime note">
          <DocP>
            Keep RouteIQ overhead low (<code>routeiq.overhead_ms</code>). Rules stay
            in-process. See <Link href="/docs/products/lensai">LensAI</Link> for stage
            cost tags (L22).
          </DocP>
        </DocCallout>
      </DocSection>

      <DocNext
        href="/docs/guides/api-healing"
        label="API healing →"
        hint="Flagship wedge: schema drift, adapters, canary."
      />
    </DocsShell>
  );
}
