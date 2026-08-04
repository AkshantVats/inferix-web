# Voice & messaging

## Positioning (one-liner)

**Inferix is the control plane for AI inference and agents** — observe traffic, route by policy, detect drift, and retrain.

## Taglines (approved tone)

1. **The control plane for platform teams** ← primary (homepage H1)
2. **Control plane for agents and inference.**
3. **Next to your gateway and your traces — not instead of them.**
4. **Observe · route · drift · retrain** (product strip)

## Competitive framing (internal)

Adjacent comps only — do **not** frame Last9 (or general infra observability) as a competitor.

| vs | They are… | Inferix is… |
|----|-----------|-------------|
| LiteLLM / Portkey | AI gateway / access layer (one key, many providers) | Control plane *around* that layer: observe, route, drift, FineForge |
| Langfuse / Helicone | LLM app observability / traces | Traces *plus* operator routing, drift detection, and retrain |

Do **not** define Inferix as a thin OpenAI facade or LiteLLM-style gateway. Compatibility is a connect detail, not the product.

## Tone

Clear. Infra-credible. Operator-facing. Competitor-quality clarity (LiteLLM / Langfuse / Portkey bar).

- Concrete verbs: observe, route, detect, retrain, ship.
- One job per section: one headline, one short supporting sentence.
- Say what it is, who it’s for, what you get — in plain English.
- Short sentences. Docs-adjacent. No buzzword salad.
- Lead with control-plane value (observe · route · drift · retrain). Never lead with “OpenAI-compatible.”
- **Numbers:** follow `brand/METRICS.md`. Never put unmeasured SLOs next to proven facts without a label.

## Words to use

control plane · inference · agents · observe · route · trace · drift · retrain · policy · signal · loop · operators · owned models · providers · platform teams

## Words to avoid

revolutionary · magical · 10x · unlock · leverage · synergies · disrupt · “AI-native” without meaning · purple-marketing adjectives · fake urgency · Last9-as-competitor · “thin OpenAI” · leading with OpenAI-compatible as the product definition

## Docs-only connect detail

OpenAI-compatible / drop-in `base_url` may appear **once** in Docs quick start as a how-to-connect note for developers. Never on hero, product definition, or positioning one-liners.

## Locked product names

| Name | One-line benefit |
|------|------------------|
| **Inferix** | Control plane for inference & agents |
| **LensAI** | See latency, cost, errors, and volume across models and agents |
| **TraceForge** | Follow one request across tools, models, and agent steps |
| **RouteIQ** | Send each call to the right owned model or provider by policy |
| **DriftWatch** | Alert when quality slips — before users complain |
| **FineForge** | Turn drift signal into a fine-tune / retrain job you can ship |

Spelling: camel/Pascal as above. Never “InferIX”, “Trace Forge”, “Route IQ”, etc.
