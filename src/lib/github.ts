/** Canonical GitHub links for Inferix (AkshantVats). Keep site CTAs pointed here. */

export const GITHUB_OWNER = "AkshantVats";

export const GITHUB = {
  /** Suite overview — links every product repo */
  suite: `https://github.com/${GITHUB_OWNER}/inferix`,
  /** Marketing site + brand kit */
  web: `https://github.com/${GITHUB_OWNER}/inferix-web`,
  /** LensAI — observe every call */
  lensai: `https://github.com/${GITHUB_OWNER}/lensai-integration`,
  /** TraceForge — agent / tool / model traces */
  traceforge: `https://github.com/${GITHUB_OWNER}/agent-trace-collector`,
  /** RouteIQ — policy routing (scaffold) */
  routeiq: `https://github.com/${GITHUB_OWNER}/routeiq`,
  /** DriftWatch — quality drift (scaffold) */
  driftwatch: `https://github.com/${GITHUB_OWNER}/driftwatch`,
  /** FineForge — retrain / promote (scaffold) */
  fineforge: `https://github.com/${GITHUB_OWNER}/fineforge`,
  /** LensAI eBPF tracer */
  ebpf: `https://github.com/${GITHUB_OWNER}/ebpf-llm-tracer`,
  /** Shared streaming / ingest stack */
  streaming: `https://github.com/${GITHUB_OWNER}/infra-ai-streaming`,
} as const;

export const PRODUCT_REPOS = {
  LensAI: GITHUB.lensai,
  TraceForge: GITHUB.traceforge,
  RouteIQ: GITHUB.routeiq,
  DriftWatch: GITHUB.driftwatch,
  FineForge: GITHUB.fineforge,
} as const;

export type ProductRepoName = keyof typeof PRODUCT_REPOS;
