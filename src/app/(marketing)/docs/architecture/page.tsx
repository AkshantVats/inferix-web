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
  title: "Architecture — Inferix Docs",
  description:
    "Inferix request path, product roles in the control plane, and high-level data stores.",
};

export default function ArchitecturePage() {
  return (
    <DocsShell pathname="/docs/architecture">
      <DocKicker>Get started</DocKicker>
      <DocH1>Architecture</DocH1>
      <DocIntro>
        Agents and apps send inference through Inferix. The control plane records
        metrics and spans, applies RouteIQ policy, forwards to an owned model or
        provider, then feeds DriftWatch and FineForge.
      </DocIntro>

      <DocSection title="Request path">
        <DocCode>{`  Agent / app / SDK
           |
           |  POST /v1/chat/completions
           v
  +---------------------+
  |  Inferix :4000      |
  |  auth (master key)  |
  |  LensAI sample      |
  |  TraceForge root    |
  |  RouteIQ decide     |
  +----------+----------+
             |
             |  invoke chosen model
             v
  +----------+-----------+
  | owned/* endpoints    |
  | provider APIs        |
  +----------+-----------+
             |
             |  response + usage
             v
  LensAI metrics  ·  TraceForge spans
             |
             v
  DriftWatch windows  →  FineForge jobs
                         (promote / rollback)`}</DocCode>
        <DocP>
          Inferix sits next to gateways and existing traces. Point clients at{" "}
          <code>:4000</code>; keep your gateway for auth federation or rate limits if you
          already have one.
        </DocP>
      </DocSection>

      <DocSection title="Product roles">
        <DocTable
          headers={["Product", "Where it sits", "Operator output"]}
          rows={[
            [
              "LensAI",
              "On every call ingress/egress",
              "Latency, cost, errors, volume by model/agent/tenant",
            ],
            [
              "TraceForge",
              "Around route + tool + model spans",
              "Debuggable traces for a single user request",
            ],
            [
              "RouteIQ",
              "Before model invoke",
              "Policy decision: model name + fallback chain",
            ],
            [
              "DriftWatch",
              "Async over golden / live windows",
              "Alerts when quality score drops",
            ],
            [
              "FineForge",
              "Job runner after drift (or schedule)",
              "Train → evaluate → promote or rollback",
            ],
          ]}
        />
      </DocSection>

      <DocSection title="Data stores (high level)">
        <DocUl
          items={[
            <>
              <strong>Config</strong> — <code>inferix.yaml</code> (models, routing,
              observe, drift). Hot-reload where supported; see{" "}
              <Link href="/docs/configuration">Configuration</Link>.
            </>,
            <>
              <strong>Metrics buffer</strong> — LensAI time series (in-process + optional
              remote write).
            </>,
            <>
              <strong>Span store</strong> — TraceForge traces in local volume or Postgres;
              optional OTLP export.
            </>,
            <>
              <strong>Drift state</strong> — golden sets, window scores, alert history.
            </>,
            <>
              <strong>FineForge artifacts</strong> — job logs, candidate revisions, promote
              history.
            </>,
          ]}
        />
      </DocSection>

      <DocSection title="Failure domains">
        <DocCallout title="Design for partial failure">
          <DocUl
            items={[
              <>
                If an owned model is down, RouteIQ walks the fallback chain and LensAI
                records the error class.
              </>,
              <>
                If TraceForge storage is slow, spans buffer locally; completions still
                return.
              </>,
              <>
                DriftWatch and FineForge are off the hot path — a stuck job does not block
                inference.
              </>,
            ]}
          />
        </DocCallout>
      </DocSection>

      <DocNext
        href="/docs/configuration"
        label="Configuration →"
        hint="Full inferix.yaml reference."
      />
    </DocsShell>
  );
}
