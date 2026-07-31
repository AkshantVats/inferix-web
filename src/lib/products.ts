import { PRODUCT_REPOS, type ProductRepoName } from "./github";

export type Product = {
  name: ProductRepoName;
  slug: string;
  icon: string;
  role: string;
  detail: string;
  repo: string;
};

export const PRODUCTS: Product[] = [
  {
    name: "LensAI",
    slug: "lensai",
    icon: "/brand/icons/lensai.svg",
    role: "See every call",
    detail:
      "Latency, cost, tokens, and errors for agents and models — in one place.",
    repo: PRODUCT_REPOS.LensAI,
  },
  {
    name: "TraceForge",
    slug: "traceforge",
    icon: "/brand/icons/traceforge.svg",
    role: "Trace the whole agent",
    detail:
      "Tools and model steps in one graph, so you can debug a single run end to end.",
    repo: PRODUCT_REPOS.TraceForge,
  },
  {
    name: "RouteIQ",
    slug: "routeiq",
    icon: "/brand/icons/routeiq.svg",
    role: "Route by policy",
    detail:
      "Send easy work to a cheap owned SLM, hard work to a strong path or provider.",
    repo: PRODUCT_REPOS.RouteIQ,
  },
  {
    name: "DriftWatch",
    slug: "driftwatch",
    icon: "/brand/icons/driftwatch.svg",
    role: "Catch quality drift",
    detail:
      "Alert when answers go bad against teacher models or golden tests — before tickets pile up.",
    repo: PRODUCT_REPOS.DriftWatch,
  },
  {
    name: "FineForge",
    slug: "fineforge",
    icon: "/brand/icons/fineforge.svg",
    role: "Improve and retrain",
    detail:
      "Turn drift signal into the next fine-tune. Promote or roll back model versions with confidence.",
    repo: PRODUCT_REPOS.FineForge,
  },
];

export const POSITIONING =
  "Inferix is the control plane for agents and owned models — see every call, route by policy, catch drift, and retrain.";

export const TAGLINE = "The control plane for platform teams";

export const WHY_PILLARS = [
  {
    num: "01",
    title: "See every call",
    body: "Latency, cost, tokens, and errors for agents and models — one dashboard, not five tools.",
    product: "LensAI",
    href: "/docs/products/lensai",
    mock: ["p95 Latency", "Cost per call", "Error rate"],
  },
  {
    num: "02",
    title: "Trace the whole agent",
    body: "Follow tools and model steps in one graph. Debug a bad run without guessing which hop failed.",
    product: "TraceForge",
    href: "/docs/products/traceforge",
    mock: ["Tool call", "Model hop", "Final response"],
  },
  {
    num: "03",
    title: "Route by policy",
    body: "Cheap owned SLM for simple asks. Strong path or provider when you need it. Policy decides — not a spreadsheet.",
    product: "RouteIQ",
    href: "/docs/products/routeiq",
    mock: ["Owned SLM", "Strong path", "Provider fallback"],
  },
  {
    num: "04",
    title: "Catch quality drift",
    body: "Alert when answers go bad versus a teacher or golden set. Know before users file tickets.",
    product: "DriftWatch",
    href: "/docs/products/driftwatch",
    mock: ["Quality drop", "Drift alert", "Golden set"],
  },
  {
    num: "05",
    title: "Improve and retrain",
    body: "Feed FineForge. Ship a better model. Promote or roll back without guessing.",
    product: "FineForge",
    href: "/docs/products/fineforge",
    mock: ["Start retrain", "Promote version", "Safe rollback"],
  },
] as const;
