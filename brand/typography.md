# Typography — Lab Light

## Pairing

| Role | Family | CSS variable | Use |
|------|--------|--------------|-----|
| Brand / display | **Fraunces** | `--inferix-font-brand` | Wordmark, hero display, section display |
| UI | **Geist** | `--inferix-font-ui` | Body, nav, buttons, labels, H1–H3 in product UI |
| Code | **Geist Mono** | `--inferix-font-mono` | Commands, traces, IDs, docs snippets |

**Avoid:** Inter (or system-default sans) as the primary brand font. Geist is the UI workhorse; Fraunces carries brand personality.

## Type ramp

| Style | Family | Size / LH | Weight | CSS hint |
|-------|--------|-----------|--------|----------|
| Brand | Fraunces | 48px / 1.1 | 700 | `--inferix-text-brand` |
| Display | Fraunces | 40px / 1.15 | 600–700 | `--inferix-text-display` |
| H1 | Geist | 32px / 1.2 | 600 | `--inferix-text-h1` |
| H2 | Geist | 24px / 1.25 | 600 | `--inferix-text-h2` |
| H3 | Geist | 18px / 1.35 | 600 | `--inferix-text-h3` |
| Body | Geist | 16px / 1.55 | 400 | `--inferix-text-body` |
| Body SM | Geist | 14px / 1.5 | 400 | `--inferix-text-body-sm` |
| Caption | Geist | 12px / 1.4 | 400 | `--inferix-text-caption` |
| Label | Geist | 12px / 1.3 | 500 | `--inferix-text-label` · tracking +0.02em · uppercase optional |
| Code | Geist Mono | 13px / 1.5 | 400 | `--inferix-text-code` |

## Loading (preview / Next)

- Fraunces via `next/font/google`
- Geist + Geist Mono via `geist` package (`GeistSans`, `GeistMono`)

## Usage notes

- Wordmark “Inferix” always Fraunces Bold; letter-spacing slightly tight (~−0.02em).
- Marketing headlines may use Fraunces Display; product chrome stays Geist.
- Code blocks: mono on soft surface with line border — see brand board terminal chrome.
