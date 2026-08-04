# Inferix Brand Kit — Lab Light (Look B)

**Status:** Awaiting approval. Marketing site is blocked until this kit is signed off.

**Figma (optional later):** https://www.figma.com/design/xX9I5aIhT8Nnkm7vbGR96Y

## Preview

```bash
cd inferix-web
npm install
npm run dev
# → http://localhost:3000/brand
```

Root `/` redirects to `/brand`. There are **no** landing / product / pricing pages yet.

## Palette summary

LiteLLM-inspired Lab Light: soft lavender canvas (`#F4F3FB`), white surfaces, charcoal ink (`#272B37`), silver borders (`#D3D3D5`), **electric violet** accent (`#5B3FD1`). White-on-accent ~6.8:1. See `colors.md`.

## What’s in the core brand kit

| Layer | Contents |
|-------|----------|
| Logo | Mark, lockups, favicon, clearspace |
| Colour | Tokens, ramp, semantic, chart |
| Type | Fraunces + Geist + mono |
| Space | Spacing, radius, elevation |
| Icons | Stroke rules + product placeholders |
| Voice | Positioning, tone, name lock · **`METRICS.md`** (what numbers may appear on the site) |
| Motion | Principles (150–400ms ease) |

## Product diagram (HIW) — brand component, not marketing site

**Does “How it works” belong in the brand kit?** Yes — as a **reusable product visual / brand component**, not as a homepage section.

- Core brand kit = logo, colour, type, space, icons, voice, motion.
- The Inferix HIW diagram (like LiteLLM’s `llmhiw`) is a **pattern** you approve once, then reuse on the future marketing homepage.
- It lives on `/brand` under **Product diagram** so you can sign off story + motion with the new palette **before** any landing page is built.

See [`diagrams.md`](./diagrams.md) for when to use, aria story, and LiteLLM → Inferix mapping.

## Folder map

| Path | Contents |
|------|----------|
| `tokens.css` | CSS variables (`--inferix-*`) |
| `colors.md` | Palette, contrast notes |
| `typography.md` | Fraunces + Geist + mono ramp |
| `spacing.md` | Space, radius, elevation |
| `iconography.md` | Icon rules + illustration direction |
| `voice.md` | Positioning, tone, name lock |
| `motion.md` | Motion principles |
| `diagrams.md` | Product HIW diagram usage |
| `logo/` | Mark, lockups, inverse |
| `favicon/` | 16, 32, 180 |
| `icons/` | Product icon placeholders |
| `../src/app/brand/` | Live brand board preview |
| `../src/components/brand/InferixHiw.tsx` | HIW diagram component |

## Approval checklist

Sign off these before any marketing site build:

- [ ] **Logo** — mark concept, lockups, favicon, clearspace, do’s/don’ts
- [ ] **Colour** — Lab Light tokens + electric violet family + semantic + chart
- [ ] **Typography** — Fraunces / Geist / mono pairing and type ramp
- [ ] **Space / radius / elevation** — scales feel right for Lab Light
- [ ] **Icons & illustration** — product icons + direction (diagrams > stock)
- [ ] **Product diagram (HIW)** — story, layout, cycling pills, motion
- [ ] **UI primitives** — buttons, pills, badges, code chrome on board
- [ ] **Voice** — one-liner, taglines, words use/avoid, product names
- [ ] **Motion** — brief principles acceptable

When all are approved: ask to build the marketing site from this kit (homepage will reuse `InferixHiw`).
