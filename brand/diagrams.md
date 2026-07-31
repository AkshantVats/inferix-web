# Diagrams — product visuals

Reusable brand components for explaining Inferix. Not a marketing page — approve here, reuse later on the homepage.

## Inferix HIW (How it works)

**Component:** `src/components/brand/InferixHiw.tsx`  
**Preview:** http://localhost:3000/brand#diagram

### When to use

- Brand board approval of product story + motion
- Future marketing hero / “how it works” section
- Sales / deck embeds that need the same mental model

### Story (aria)

> Workloads — agents, apps, and owned models — flow into the Inferix control plane (LensAI, TraceForge, RouteIQ, DriftWatch, FineForge), then out to owned models, providers, and agent workflows.

### Mapping vs LiteLLM

| LiteLLM | Inferix |
|---------|---------|
| Humans / Agents / Machines | Agents / Apps · APIs / Models |
| Center: LiteLLM · AI GATEWAY | Center: Inferix · CONTROL PLANE |
| 4 feature pills | 5 products: LensAI · TraceForge · RouteIQ · DriftWatch · FineForge |
| Right: LLMs / MCPs / Agents | Owned models / Providers / Agents · workflows |
| Purple glow on lit features | `--inferix-accent-glow` / soft violet |

Structure and motion feel are intentional; copy, logos, and product story are Inferix-native. Provider tiles use simple letter marks (no third-party CDN assets).

### Motion

- Soft connector “balls” travel source → hub → destination
- Feature pills cycle a lit state with violet glow
- Honours `prefers-reduced-motion: reduce` (static lit state, no ball animation)
