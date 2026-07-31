# Spacing, radius & elevation

## Space scale

| Token | Value | Variable |
|-------|-------|----------|
| 1 | 4px | `--inferix-space-1` |
| 2 | 8px | `--inferix-space-2` |
| 3 | 12px | `--inferix-space-3` |
| 4 | 16px | `--inferix-space-4` |
| 5 | 24px | `--inferix-space-5` |
| 6 | 32px | `--inferix-space-6` |
| 7 | 48px | `--inferix-space-7` |
| 8 | 64px | `--inferix-space-8` |

Prefer multiples of 4. Default section padding: 64–80px desktop, 32–48px mobile.

## Radius

| Token | Value | Variable | Use |
|-------|-------|----------|-----|
| sm | 4px | `--inferix-radius-sm` | Inputs, small chips |
| md | 8px | `--inferix-radius-md` | Buttons, mark corners |
| lg | 12px | `--inferix-radius-lg` | Panels, code blocks |
| xl | 16px | `--inferix-radius-xl` | Large product stages |
| full | 9999px | `--inferix-radius-full` | Pills only |

## Elevation (Lab Light)

Subtle single-layer shadows — not heavy multi-layer SaaS cards.

| Level | Shadow | Variable |
|-------|--------|----------|
| sm | `0 1px 2px rgba(18,18,18,0.04)` | `--inferix-shadow-sm` |
| md | `0 4px 16px rgba(18,18,18,0.06)` | `--inferix-shadow-md` |
| lg | `0 12px 32px rgba(18,18,18,0.08)` | `--inferix-shadow-lg` |

Elevated surfaces stay white (`--inferix-elevated`) with md shadow. Prefer border (`--inferix-line`) over shadow when possible.
