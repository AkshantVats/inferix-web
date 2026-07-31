export type DocNavItem = {
  href: string;
  label: string;
};

export type DocNavGroup = {
  title: string;
  items: DocNavItem[];
};

/** Canonical docs sidebar — keep in sync with pages under /docs. */
export const DOCS_NAV: DocNavGroup[] = [
  {
    title: "Get started",
    items: [
      { href: "/docs", label: "Overview" },
      { href: "/docs/quickstart", label: "Quick start" },
      { href: "/docs/install", label: "Install & self-host" },
      { href: "/docs/concepts", label: "Core concepts" },
      { href: "/docs/architecture", label: "Architecture" },
    ],
  },
  {
    title: "Operate",
    items: [
      { href: "/docs/configuration", label: "Configuration" },
      { href: "/docs/observability", label: "Observability" },
      { href: "/docs/routing", label: "Routing policies" },
      { href: "/docs/drift-retrain", label: "Drift & retrain" },
      { href: "/docs/api", label: "API reference" },
      { href: "/docs/sdk", label: "SDKs & clients" },
    ],
  },
  {
    title: "Products",
    items: [
      { href: "/docs/products/lensai", label: "LensAI" },
      { href: "/docs/products/traceforge", label: "TraceForge" },
      { href: "/docs/products/routeiq", label: "RouteIQ" },
      { href: "/docs/products/driftwatch", label: "DriftWatch" },
      { href: "/docs/products/fineforge", label: "FineForge" },
    ],
  },
  {
    title: "Guides",
    items: [
      { href: "/docs/guides", label: "All guides" },
      { href: "/docs/guides/platform-operators", label: "Platform operators" },
      { href: "/docs/guides/support-cx", label: "Support & CX agents" },
      { href: "/docs/guides/incident-sre", label: "Incident & SRE agents" },
      { href: "/docs/guides/finance", label: "Finance agents" },
      { href: "/docs/guides/gtm-outbound", label: "GTM & outbound agents" },
      { href: "/docs/guides/voice", label: "Voice agents" },
      { href: "/docs/guides/api-healing", label: "API healing agents" },
      { href: "/docs/guides/durable-agents", label: "Durable agents" },
      { href: "/docs/guides/owned-models", label: "Owned models" },
    ],
  },
];
