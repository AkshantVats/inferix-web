# Colour — Lab Light

Clean light canvas with a soft lavender wash. Near-black charcoal ink. Electric violet brand signal (LiteLLM-inspired). No teal accent, no cream+terracotta.

## Semantic tokens

| Token | Hex | CSS variable | Role |
|-------|-----|--------------|------|
| bg | `#F4F3FB` | `--inferix-bg` | Page canvas (soft lavender) |
| surface | `#FFFFFF` | `--inferix-surface` | Panels, cards |
| elevated | `#FFFFFF` | `--inferix-elevated` | Raised surfaces (+ shadow) |
| ink | `#272B37` | `--inferix-ink` | Primary text (graphite) |
| muted | `#63666F` | `--inferix-muted` | Secondary text |
| line | `#D3D3D5` | `--inferix-line` | Borders, dividers (silver mist) |
| ink-inverse | `#FFFFFF` | `--inferix-ink-inverse` | Text on dark / accent |
| accent | `#5B3FD1` | `--inferix-accent` | CTA, brand, focus (electric violet) |
| accent-hover | `#4A32B0` | `--inferix-accent-hover` | Hover on accent |
| accent-pressed | `#3B2890` | `--inferix-accent-pressed` | Active press |
| accent-soft | `#E6E6FF` | `--inferix-accent-soft` | Soft fills, chips |
| accent-muted | `#7C6CF0` | `--inferix-accent-muted` | Secondary accent |
| accent-glow | `rgba(68,58,253,0.28)` | `--inferix-accent-glow` | Soft violet glow (diagrams) |
| success | `#1B7F4E` | `--inferix-success` | OK / healthy |
| success-soft | `#E8F6EE` | `--inferix-success-soft` | Success fill |
| warn | `#B86E00` | `--inferix-warn` | Caution / drift |
| warn-soft | `#FFF4E0` | `--inferix-warn-soft` | Warn fill |
| danger | `#C0392B` | `--inferix-danger` | Error / destructive |
| danger-soft | `#FDECEA` | `--inferix-danger-soft` | Danger fill |
| focus | `#5B3FD1` | `--inferix-focus` | Focus ring (matches accent) |

## Accent ramp

| Step | Hex | Variable |
|------|-----|----------|
| 50 | `#F4F3FB` | `--inferix-accent-50` |
| 100 | `#E6E6FF` | `--inferix-accent-100` |
| 200 | `#C8C4F5` | `--inferix-accent-200` |
| 300 | `#9B8AEB` | `--inferix-accent-300` |
| 400 | `#7C6CF0` | `--inferix-accent-400` |
| 500 | `#5B3FD1` | `--inferix-accent-500` |
| 600 | `#4A32B0` | `--inferix-accent-600` |
| 700 | `#3B2890` | `--inferix-accent-700` |
| 800 | `#2A1D6B` | `--inferix-accent-800` |
| 900 | `#0C0A32` | `--inferix-accent-900` |

## Chart series

| Series | Hex | Variable |
|--------|-----|----------|
| 1 | `#5B3FD1` | `--inferix-chart-1` |
| 2 | `#0C0A32` | `--inferix-chart-2` |
| 3 | `#C4892A` | `--inferix-chart-3` |
| 4 | `#63666F` | `--inferix-chart-4` |
| 5 | `#7C6CF0` | `--inferix-chart-5` |
| 6 | `#B8A8FF` | `--inferix-chart-6` |

## Accessibility

| Pairing | Approx contrast | Notes |
|---------|-----------------|-------|
| ink `#272B37` on bg `#F4F3FB` | ~12.5:1 | Body text — pass AAA |
| ink on surface `#FFFFFF` | ~14:1 | Pass AAA |
| white on accent `#5B3FD1` | ~6.8:1 | Pass AA for normal text |
| muted `#63666F` on bg | ~5.2:1 | Pass AA for body |
| accent on bg | ~6.1:1 | Links / emphasis — pass AA |

**Rules:** Prefer ink for long-form text. Use white on accent for primary buttons. Never use muted text on accent-soft for critical info without checking contrast. Focus rings use `--inferix-focus` at 2px outline with offset.

## Source notes

Mapped from LiteLLM marketing CSS primitives (`electric-violet`, `ghost-white` / soft lavender fills, `graphite-vault`, `silver-mist`, `light-purple`) — not a 1:1 clone; Inferix Lab Light structure retained.
