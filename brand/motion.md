# Motion direction

Lab Light motion is purposeful and quiet — presence, not spectacle.

## Principles

1. **Purposeful** — Animate only to show hierarchy, state change, or continuity (e.g. panel enter, focus, tab switch). No decorative loops on marketing chrome.
2. **Slow ease** — Prefer `--inferix-ease` (`cubic-bezier(0.22, 1, 0.36, 1)`) at 150–400ms. Fast UI feedback at 150ms; section/panel at ~240–400ms.
3. **No neon glow spam** — No pulsing glows, gradient shimmer, or purple aurora. Soft opacity/translate only. Shadows stay within Lab Light elevation tokens.

## Defaults

| Token | Value |
|-------|-------|
| `--inferix-duration-fast` | 150ms |
| `--inferix-duration` | 240ms |
| `--inferix-duration-slow` | 400ms |
| `--inferix-ease` | cubic-bezier(0.22, 1, 0.36, 1) |

## Prefer / avoid

**Prefer:** fade + 4–8px translateY; height/opacity on expand; underline/color on link hover.

**Avoid:** bounce, elastic spring gimmicks, parallax overload, particle fields, glow pulses on CTAs.
