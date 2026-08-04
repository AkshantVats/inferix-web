# Inferix site metrics rules

Numbers on marketing pages are trust assets. Wrong numbers cost more than missing ones.

## Classes (never mix in one unlabeled strip)

| Class | Meaning | Homepage OK? |
|-------|---------|--------------|
| **Proven** | Reproducible today (repo + command) | Yes |
| **Documented** | Chaos / design docs with methodology | Yes |
| **Typical first run** | Timed or README-backed install path | Yes if labeled |
| **Design target** | Engineering goal, not a suite SLA | Yes **only** if labeled |
| **Example UI** | Mock dashboard chrome | Inside mock frames only |
| **Founder scale** | Résumé systems (1.5T/day, etc.) | “Built by” — never “Inferix does” |

## Locked homepage tiles (2026-08)

Product outcomes (LiteLLM-style — what the plane does for operators):

1. **5 products** — one observe → retrain loop  
2. **~15 min** — self-host to first LensAI dashboard  
3. **&lt;100 ms** ingest P99 — labeled **Target**  
4. **tenant × model** — attribution where work runs  

Plus one **Control-plane targets** card (RouteIQ / DriftWatch / attribution policy). No audience labels (“buyers”, “interviewers”). No “checkable for review” sections.

## Forbidden until measured + published

- Trace ingest `&lt;50 ms` as a suite claim  
- RouteIQ `&lt;2 ms` as a measured fact  
- DriftWatch `&lt;5 min` TTD as a measured fact  
- `100%` cost attribution as a fact  
- Vendor bake-off bars (vs Portkey / Langfuse / logs-only with fake minutes)  
- Customer counts, ARR, “used by N companies”  
- Inferix hosting 1.5T events/day (that is Agoda prior work)

## Audience cheat sheet

| Audience | Lead with |
|----------|-----------|
| Interviewer | Founder scale + runnable LensAI + honest targets |
| Investor | Loop thesis + open proof + one hard eng number |
| Client | Time-to-value + attribution dimensions + durability |

## When a number upgrades

1. Record hardware + command + commit SHA in the product repo (`BENCHMARKS.md`).  
2. Update this file and the homepage tile in the same PR.  
3. Keep the `kind` label accurate (Proven vs Design target).
