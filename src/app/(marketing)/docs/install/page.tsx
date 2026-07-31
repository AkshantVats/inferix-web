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
  title: "Install & self-host — Inferix Docs",
  description:
    "Install Inferix with Docker, Compose, or Kubernetes. Env vars, volumes, and upgrades.",
};

export default function InstallPage() {
  return (
    <DocsShell pathname="/docs/install">
      <DocKicker>Get started</DocKicker>
      <DocH1>Install & self-host</DocH1>
      <DocIntro>
        Run the Inferix control plane on your own infrastructure. Same binary and
        config whether you use Docker locally, Compose in staging, or Kubernetes in
        production.
      </DocIntro>

      <DocSection title="Requirements">
        <DocUl
          items={[
            <>Docker 24+ or a Kubernetes cluster (1.27+)</>,
            <>Persistent volume for config and TraceForge span store (optional Postgres)</>,
            <>Network reachability to owned model endpoints and any providers</>,
            <>Outbound HTTPS if you call external providers</>,
          ]}
        />
      </DocSection>

      <DocSection title="Docker (single node)">
        <DocCode>{`docker pull ghcr.io/akshantvats/inferix:latest

docker run -d \\
  --name inferix \\
  --restart unless-stopped \\
  -p 4000:4000 \\
  -e INFERIX_MASTER_KEY=sk-replace-me \\
  -e INFERIX_CONFIG=/etc/inferix/inferix.yaml \\
  -v /opt/inferix/inferix.yaml:/etc/inferix/inferix.yaml:ro \\
  -v /opt/inferix/data:/var/lib/inferix \\
  ghcr.io/akshantvats/inferix:latest`}</DocCode>
        <DocP>
          Health check: <code>GET http://&lt;host&gt;:4000/health</code>. Ready when the
          process has loaded models and can accept completions.
        </DocP>
      </DocSection>

      <DocSection title="Docker Compose">
        <DocCode>{`# docker-compose.yml
services:
  inferix:
    image: ghcr.io/akshantvats/inferix:latest
    ports:
      - "4000:4000"
    environment:
      INFERIX_MASTER_KEY: \${INFERIX_MASTER_KEY}
      INFERIX_CONFIG: /etc/inferix/inferix.yaml
      INFERIX_POSTGRES_URL: postgres://inferix:inferix@db:5432/inferix
    volumes:
      - ./inferix.yaml:/etc/inferix/inferix.yaml:ro
      - inferix-data:/var/lib/inferix
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_USER: inferix
      POSTGRES_PASSWORD: inferix
      POSTGRES_DB: inferix
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  inferix-data:
  pgdata:`}</DocCode>
        <DocCode>{`export INFERIX_MASTER_KEY=sk-replace-me
docker compose up -d
docker compose logs -f inferix`}</DocCode>
      </DocSection>

      <DocSection title="Kubernetes sketch">
        <DocCode>{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: inferix
spec:
  replicas: 2
  selector:
    matchLabels:
      app: inferix
  template:
    metadata:
      labels:
        app: inferix
    spec:
      containers:
        - name: inferix
          image: ghcr.io/akshantvats/inferix:1.0.0
          ports:
            - containerPort: 4000
          env:
            - name: INFERIX_MASTER_KEY
              valueFrom:
                secretKeyRef:
                  name: inferix
                  key: master_key
            - name: INFERIX_CONFIG
              value: /etc/inferix/inferix.yaml
          volumeMounts:
            - name: config
              mountPath: /etc/inferix
              readOnly: true
          readinessProbe:
            httpGet:
              path: /health
              port: 4000
            initialDelaySeconds: 5
            periodSeconds: 10
      volumes:
        - name: config
          configMap:
            name: inferix-config
---
apiVersion: v1
kind: Service
metadata:
  name: inferix
spec:
  selector:
    app: inferix
  ports:
    - port: 4000
      targetPort: 4000`}</DocCode>
        <DocP>
          Put the ConfigMap contents from your{" "}
          <Link href="/docs/configuration">inferix.yaml</Link>. Use a Secret for the
          master key and any provider credentials.
        </DocP>
      </DocSection>

      <DocSection title="Environment variables">
        <DocTable
          headers={["Variable", "Required", "Description"]}
          rows={[
            [
              <code key="k1">INFERIX_MASTER_KEY</code>,
              "Yes",
              "Bearer token for control-plane API and /v1",
            ],
            [
              <code key="k2">INFERIX_CONFIG</code>,
              "No",
              "Path to inferix.yaml (default /etc/inferix/inferix.yaml)",
            ],
            [
              <code key="k3">INFERIX_LISTEN</code>,
              "No",
              "Override listen address (default :4000)",
            ],
            [
              <code key="k4">INFERIX_POSTGRES_URL</code>,
              "No",
              "Postgres for TraceForge + DriftWatch state",
            ],
            [
              <code key="k5">INFERIX_LOG_LEVEL</code>,
              "No",
              "debug | info | warn | error",
            ],
            [
              <code key="k6">INFERIX_OTLP_ENDPOINT</code>,
              "No",
              "Export TraceForge spans to an OTLP collector",
            ],
          ]}
        />
      </DocSection>

      <DocSection title="Volumes and data">
        <DocUl
          items={[
            <>
              <code>/etc/inferix</code> — config (read-only mount recommended)
            </>,
            <>
              <code>/var/lib/inferix</code> — local span/metrics buffer if Postgres is
              unset
            </>,
            <>
              Postgres (optional) — durable TraceForge spans, DriftWatch windows,
              FineForge job history
            </>,
          ]}
        />
      </DocSection>

      <DocSection title="Upgrades">
        <DocP>Pin image tags in production. Rolling upgrade pattern:</DocP>
        <DocCode>{`# Compose
docker compose pull
docker compose up -d

# Kubernetes
kubectl set image deploy/inferix \\
  inferix=ghcr.io/akshantvats/inferix:1.1.0
kubectl rollout status deploy/inferix`}</DocCode>
        <DocCallout title="Config compatibility">
          <DocP>
            Minor versions keep <code>inferix.yaml</code> forward-compatible. Review
            release notes on{" "}
            <a href={GITHUB.suite} target="_blank" rel="noreferrer">
              the suite repo
            </a>{" "}
            before major bumps. Drain in-flight completions before killing pods if you
            disable connection draining at the Service.
          </DocP>
        </DocCallout>
      </DocSection>

      <DocNext
        href="/docs/concepts"
        label="Core concepts →"
        hint="Glossary for control plane, policy, drift, and promote."
      />
    </DocsShell>
  );
}
