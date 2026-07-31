# Inferix Web

Marketing site + brand kit for **Inferix** — route inference, catch drift, retrain. Control plane for AI inference and agents.

- Suite map: https://github.com/AkshantVats/inferix
- This repo: https://github.com/AkshantVats/inferix-web

## Look

**Lab Light** — soft lavender canvas, Fraunces brand wordmark, Geist UI, electric violet accent (`#5B3FD1`).

## Run

```bash
cd inferix-web
npm install
npm run dev
```

Open **http://localhost:3000**

```bash
npm run build   # production build
npm start       # serve production build
```

## Routes

| Route | What |
|-------|------|
| `/` | Landing — hero + HIW diagram, product strip, how it works, CTA |
| `/product` | Full product narrative (LensAI, TraceForge, RouteIQ, DriftWatch, FineForge) |
| `/docs` | Redirects to quick start |
| `/docs/quickstart` | Docker-style quick start (placeholder commands) |
| `/pricing` | Free / Pro / Enterprise skeleton (Pro & Enterprise coming soon) |
| `/brand` | Brand kit board (logo, colour, type, HIW, primitives) — reference |

## Brand source of truth

| Path | What |
|------|------|
| `brand/tokens.css` | `--inferix-*` CSS variables |
| `brand/logo/` | Mark + lockups |
| `brand/voice.md` | Positioning & product names |
| `src/components/brand/InferixHiw.tsx` | How-it-works diagram (homepage hero) |

Do not invent a second palette — use brand tokens only.
