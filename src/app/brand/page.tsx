import InferixHiw from "@/components/brand/InferixHiw";
import styles from "./brand.module.css";

const SEMANTIC = [
  { name: "bg", hex: "#F4F3FB", varName: "--inferix-bg", swatch: "var(--inferix-bg)" },
  { name: "surface", hex: "#FFFFFF", varName: "--inferix-surface", swatch: "var(--inferix-surface)" },
  { name: "ink", hex: "#272B37", varName: "--inferix-ink", swatch: "var(--inferix-ink)" },
  { name: "muted", hex: "#63666F", varName: "--inferix-muted", swatch: "var(--inferix-muted)" },
  { name: "line", hex: "#D3D3D5", varName: "--inferix-line", swatch: "var(--inferix-line)" },
  { name: "accent", hex: "#5B3FD1", varName: "--inferix-accent", swatch: "var(--inferix-accent)" },
  { name: "accent-hover", hex: "#4A32B0", varName: "--inferix-accent-hover", swatch: "var(--inferix-accent-hover)" },
  { name: "accent-soft", hex: "#E6E6FF", varName: "--inferix-accent-soft", swatch: "var(--inferix-accent-soft)" },
  { name: "success", hex: "#1B7F4E", varName: "--inferix-success", swatch: "var(--inferix-success)" },
  { name: "warn", hex: "#B86E00", varName: "--inferix-warn", swatch: "var(--inferix-warn)" },
  { name: "danger", hex: "#C0392B", varName: "--inferix-danger", swatch: "var(--inferix-danger)" },
  { name: "focus", hex: "#5B3FD1", varName: "--inferix-focus", swatch: "var(--inferix-focus)" },
];

const ACCENT_RAMP = [
  ["50", "#F4F3FB"],
  ["100", "#E6E6FF"],
  ["200", "#C8C4F5"],
  ["300", "#9B8AEB"],
  ["400", "#7C6CF0"],
  ["500", "#5B3FD1"],
  ["600", "#4A32B0"],
  ["700", "#3B2890"],
  ["800", "#2A1D6B"],
  ["900", "#0C0A32"],
];

const CHART = [
  ["1", "#5B3FD1"],
  ["2", "#0C0A32"],
  ["3", "#C4892A"],
  ["4", "#63666F"],
  ["5", "#7C6CF0"],
  ["6", "#B8A8FF"],
];

const PRODUCTS = [
  ["LensAI", "lensai.svg"],
  ["TraceForge", "traceforge.svg"],
  ["RouteIQ", "routeiq.svg"],
  ["DriftWatch", "driftwatch.svg"],
  ["FineForge", "fineforge.svg"],
  ["Gateway", "gateway.svg"],
];

const SPACES = [4, 8, 12, 16, 24, 32, 48, 64];
const RADII = [
  ["sm", 4],
  ["md", 8],
  ["lg", 12],
  ["xl", 16],
];

export default function BrandBoardPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerBrand}>
          <img src="/brand/logo/mark.svg" alt="" width={32} height={32} />
          <span className={styles.wordmark}>Inferix</span>
        </div>
        <p className={styles.headerMeta}>
          Brand kit · Lab Light ·{" "}
          <a href="/" style={{ color: "var(--inferix-accent)" }}>
            ← Marketing site
          </a>
        </p>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.kicker}>Approved brand kit</p>
          <h1 className={styles.heroTitle}>Lab Light</h1>
          <p className={styles.heroSupport}>
            Full end-to-end brand kit for Inferix — logo, colour, type, space, icons, product
            diagram, UI primitives, voice, and motion. Marketing pages live at{" "}
            <a href="/">/</a>, <a href="/product">/product</a>,{" "}
            <a href="/docs/quickstart">/docs</a>, and <a href="/pricing">/pricing</a>.
          </p>
        </section>

        {/* Logo */}
        <section className={styles.section} id="logo">
          <h2 className={styles.sectionTitle}>1 · Logo</h2>
          <p className={styles.sectionLead}>
            Telemetry bars in a rounded square — control-plane signal for inference activity and
            watchfulness. Wordmark: Fraunces Bold.
          </p>

          <div className={styles.logoGrid}>
            <figure className={styles.logoCard}>
              <div className={styles.logoStage}>
                <img src="/brand/logo/mark.svg" alt="Mark" width={64} height={64} />
              </div>
              <figcaption>Mark</figcaption>
            </figure>
            <figure className={styles.logoCard}>
              <div className={`${styles.logoStage} ${styles.logoStageDark}`}>
                <img src="/brand/logo/mark-inverse.svg" alt="Mark inverse" width={64} height={64} />
              </div>
              <figcaption>Mark inverse</figcaption>
            </figure>
            <figure className={styles.logoCard}>
              <div className={styles.logoStage}>
                <div className={styles.lockupH}>
                  <img src="/brand/logo/mark.svg" alt="" width={32} height={32} />
                  <span className={styles.wordmark}>Inferix</span>
                </div>
              </div>
              <figcaption>Horizontal lockup</figcaption>
            </figure>
            <figure className={styles.logoCard}>
              <div className={`${styles.logoStage} ${styles.logoStageDark}`}>
                <div className={styles.lockupH}>
                  <img src="/brand/logo/mark-inverse.svg" alt="" width={32} height={32} />
                  <span className={styles.wordmarkInverse}>Inferix</span>
                </div>
              </div>
              <figcaption>Horizontal inverse</figcaption>
            </figure>
            <figure className={styles.logoCard}>
              <div className={styles.logoStage}>
                <div className={styles.lockupStack}>
                  <img src="/brand/logo/mark.svg" alt="" width={40} height={40} />
                  <span className={styles.wordmark}>Inferix</span>
                </div>
              </div>
              <figcaption>Stacked</figcaption>
            </figure>
            <figure className={styles.logoCard}>
              <div className={`${styles.logoStage} ${styles.logoStageDark}`}>
                <div className={styles.lockupStack}>
                  <img src="/brand/logo/mark-inverse.svg" alt="" width={40} height={40} />
                  <span className={styles.wordmarkInverse}>Inferix</span>
                </div>
              </div>
              <figcaption>Stacked inverse</figcaption>
            </figure>
          </div>

          <h3 className={styles.subhead}>Favicons</h3>
          <div className={styles.faviconRow}>
            <div className={styles.faviconItem}>
              <img src="/brand/favicon/favicon-16.svg" alt="" width={16} height={16} />
              <span>16</span>
            </div>
            <div className={styles.faviconItem}>
              <img src="/brand/favicon/favicon-32.svg" alt="" width={32} height={32} />
              <span>32</span>
            </div>
            <div className={styles.faviconItem}>
              <img src="/brand/favicon/apple-touch-180.svg" alt="" width={48} height={48} />
              <span>180 apple</span>
            </div>
          </div>

          <h3 className={styles.subhead}>Clearspace · min size</h3>
          <p className={styles.bodyText}>
            Clearspace ≥ <strong>0.5× mark height</strong>. Digital mark min <strong>16px</strong>;
            horizontal lockup min ~<strong>120px</strong> wide.
          </p>

          <h3 className={styles.subhead}>Do’s &amp; don’ts</h3>
          <div className={styles.dosGrid}>
            <div className={styles.doCard}>
              <p className={styles.doLabel}>Do</p>
              <div className={styles.logoStage}>
                <div className={styles.lockupH}>
                  <img src="/brand/logo/mark.svg" alt="" width={28} height={28} />
                  <span className={styles.wordmark} style={{ fontSize: 20 }}>
                    Inferix
                  </span>
                </div>
              </div>
              <p className={styles.caption}>Correct proportions, violet mark, Fraunces wordmark</p>
            </div>
            <div className={styles.dontCard}>
              <p className={styles.dontLabel}>Don’t stretch</p>
              <div className={styles.logoStage}>
                <img
                  src="/brand/logo/mark.svg"
                  alt=""
                  width={96}
                  height={40}
                  style={{ width: 96, height: 40, objectFit: "fill" }}
                />
              </div>
              <p className={styles.caption}>Distorted aspect</p>
            </div>
            <div className={styles.dontCard}>
              <p className={styles.dontLabel}>Don’t recolor</p>
              <div className={styles.logoStage}>
                <div className={styles.fakeOffMark} aria-hidden />
              </div>
              <p className={styles.caption}>Off-palette teal (retired)</p>
            </div>
            <div className={styles.dontCard}>
              <p className={styles.dontLabel}>Don’t glow / shadow</p>
              <div className={styles.logoStage}>
                <img
                  src="/brand/logo/mark.svg"
                  alt=""
                  width={48}
                  height={48}
                  className={styles.glowBad}
                />
              </div>
              <p className={styles.caption}>Drop shadow / neon glow</p>
            </div>
          </div>
        </section>

        {/* Colour */}
        <section className={styles.section} id="colour">
          <h2 className={styles.sectionTitle}>2 · Colour</h2>
          <p className={styles.sectionLead}>
            Soft lavender canvas + charcoal ink + electric violet accent (LiteLLM-inspired). Ink on
            bg ~12.5:1; white on accent ~6.8:1 (AA).
          </p>
          <div className={styles.swatchGrid}>
            {SEMANTIC.map((c) => (
              <div key={c.name} className={styles.swatch}>
                <div
                  className={styles.swatchChip}
                  style={{
                    background: c.swatch,
                    border: c.name === "surface" || c.name === "bg" || c.name === "accent-soft" || c.name === "line"
                      ? "1px solid var(--inferix-line)"
                      : undefined,
                  }}
                />
                <strong>{c.name}</strong>
                <code>{c.hex}</code>
                <span className={styles.caption}>{c.varName}</span>
              </div>
            ))}
          </div>
          <h3 className={styles.subhead}>Accent ramp</h3>
          <div className={styles.ramp}>
            {ACCENT_RAMP.map(([step, hex]) => (
              <div key={step} className={styles.rampItem}>
                <div className={styles.rampChip} style={{ background: hex }} />
                <span>{step}</span>
                <code>{hex}</code>
              </div>
            ))}
          </div>
          <h3 className={styles.subhead}>Chart series</h3>
          <div className={styles.chartRow}>
            {CHART.map(([n, hex]) => (
              <div key={n} className={styles.chartItem}>
                <div className={styles.chartBar} style={{ background: hex }} />
                <span>{n}</span>
                <code>{hex}</code>
              </div>
            ))}
          </div>
        </section>

        {/* Type */}
        <section className={styles.section} id="type">
          <h2 className={styles.sectionTitle}>3 · Typography</h2>
          <p className={styles.sectionLead}>Fraunces (brand) · Geist (UI) · Geist Mono (code). Not Inter.</p>
          <div className={styles.typeSpecimens}>
            <div>
              <span className={styles.typeMeta}>Brand · Fraunces 48</span>
              <p className={styles.typeBrand}>Inferix</p>
            </div>
            <div>
              <span className={styles.typeMeta}>Display · Fraunces 40</span>
              <p className={styles.typeDisplay}>The control plane for platform teams</p>
            </div>
            <div>
              <span className={styles.typeMeta}>H1 · Geist 32</span>
              <p className={styles.typeH1}>Route, trace, detect drift</p>
            </div>
            <div>
              <span className={styles.typeMeta}>H2 · Geist 24</span>
              <p className={styles.typeH2}>From gateway to retrain</p>
            </div>
            <div>
              <span className={styles.typeMeta}>H3 · Geist 18</span>
              <p className={styles.typeH3}>TraceForge spans across runs</p>
            </div>
            <div>
              <span className={styles.typeMeta}>Body · Geist 16</span>
              <p className={styles.typeBody}>
                Inferix is the control plane for AI inference and agents — clear, infra-credible,
                operator-facing. Prefer concrete verbs over hype.
              </p>
            </div>
            <div>
              <span className={styles.typeMeta}>Body SM · Caption · Label</span>
              <p className={styles.typeBodySm}>Secondary copy at 14px for dense UI.</p>
              <p className={styles.typeCaption}>Caption 12px — timestamps, hints</p>
              <p className={styles.typeLabel}>Label · Status</p>
            </div>
            <div>
              <span className={styles.typeMeta}>Code · Geist Mono 13</span>
              <pre className={styles.typeCode}>docker run -p 4000:4000 inferix/gateway</pre>
            </div>
          </div>
        </section>

        {/* Space */}
        <section className={styles.section} id="space">
          <h2 className={styles.sectionTitle}>4 · Spacing, radius, elevation</h2>
          <div className={styles.spaceRow}>
            {SPACES.map((n) => (
              <div key={n} className={styles.spaceItem}>
                <div className={styles.spaceBar} style={{ height: n, width: Math.max(n, 8) }} />
                <span>{n}</span>
              </div>
            ))}
          </div>
          <div className={styles.radiusRow}>
            {RADII.map(([name, r]) => (
              <div key={name} className={styles.radiusItem}>
                <div className={styles.radiusDemo} style={{ borderRadius: r as number }} />
                <span>
                  {name} · {r}px
                </span>
              </div>
            ))}
          </div>
          <div className={styles.elevationRow}>
            <div className={`${styles.elevCard} ${styles.elevSm}`}>shadow-sm</div>
            <div className={`${styles.elevCard} ${styles.elevMd}`}>shadow-md</div>
            <div className={`${styles.elevCard} ${styles.elevLg}`}>shadow-lg</div>
          </div>
        </section>

        {/* Icons */}
        <section className={styles.section} id="icons">
          <h2 className={styles.sectionTitle}>5 · Icons &amp; illustration</h2>
          <p className={styles.sectionLead}>
            1.5px stroke, round caps, 16/20/24. Diagrams &amp; product UI &gt; stock photos.
          </p>
          <div className={styles.iconGrid}>
            {PRODUCTS.map(([name, file]) => (
              <div key={name} className={styles.iconCard}>
                <div className={styles.iconTile}>
                  <img src={`/brand/icons/${file}`} alt="" width={24} height={24} />
                </div>
                <strong>{name}</strong>
              </div>
            ))}
          </div>
        </section>

        {/* Product diagram */}
        <section className={styles.section} id="diagram">
          <h2 className={styles.sectionTitle}>5b · Product diagram</h2>
          <p className={styles.sectionLead}>
            Reusable HIW visual (brand component) — approve story + motion here; marketing homepage
            reuses it later. Not a landing page.
          </p>
          <InferixHiw />
          <p className={styles.bodyText} style={{ marginTop: 16 }}>
            Docs: <code>brand/diagrams.md</code>. Left = workloads → center = Inferix control plane
            (5 products) → right = owned models / providers / agent workflows.
          </p>
        </section>

        {/* UI primitives */}
        <section className={styles.section} id="ui">
          <h2 className={styles.sectionTitle}>6 · UI primitives</h2>
          <p className={styles.sectionLead}>Brand-level only — shown here, not as a product site.</p>
          <div className={styles.uiRow}>
            <button type="button" className={styles.btnPrimary}>
              Primary
            </button>
            <button type="button" className={styles.btnGhost}>
              Ghost
            </button>
            <button type="button" className={styles.btnDanger}>
              Destructive
            </button>
            <a href="#voice" className={styles.linkSample}>
              Text link
            </a>
          </div>
          <div className={styles.uiRow}>
            <span className={styles.pill}>Pill / chip</span>
            <span className={styles.pillAccent}>Accent chip</span>
            <span className={styles.badgeOk}>Healthy</span>
            <span className={styles.badgeWarn}>Drift</span>
            <span className={styles.badgeDanger}>Error</span>
          </div>
          <hr className={styles.divider} />
          <div className={styles.terminal}>
            <div className={styles.terminalChrome}>
              <span />
              <span />
              <span />
              <em>inferix · quick start</em>
            </div>
            <pre>
              <code>{`# design-only placeholder
docker run --rm -p 4000:4000 \\
  -e INFERIX_KEY=sk-demo \\
  inferix/gateway:latest`}</code>
            </pre>
          </div>
        </section>

        {/* Voice */}
        <section className={styles.section} id="voice">
          <h2 className={styles.sectionTitle}>7 · Voice</h2>
          <blockquote className={styles.oneLiner}>
            Inferix is the control plane for AI inference and agents — observe traffic, route by
            policy, detect drift, and retrain.
          </blockquote>
          <ul className={styles.taglines}>
            <li>The control plane for platform teams</li>
            <li>Control plane for agents and inference.</li>
            <li>Next to your gateway and your traces — not instead of them.</li>
          </ul>
          <p className={styles.bodyText}>
            <strong>Tone:</strong> clear, infra-credible, competitor-quality clarity.{" "}
            <strong>Use:</strong> control plane, observe, route, drift, retrain.{" "}
            <strong>Avoid:</strong> buzzwords, Last9-as-competitor, leading with OpenAI as the
            product. Comps: LiteLLM / Portkey (gateway) · Langfuse / Helicone (LLM obs) · Inferix
            (control plane).
          </p>
          <p className={styles.bodyText}>
            <strong>Names locked:</strong> Inferix · LensAI · TraceForge · RouteIQ · DriftWatch ·
            FineForge
          </p>
        </section>

        {/* Motion */}
        <section className={styles.section} id="motion">
          <h2 className={styles.sectionTitle}>8 · Motion</h2>
          <ol className={styles.motionList}>
            <li>
              <strong>Purposeful</strong> — hierarchy and state only; no decorative loops.
            </li>
            <li>
              <strong>Slow ease</strong> — 150–400ms with soft cubic ease.
            </li>
            <li>
              <strong>No neon glow spam</strong> — opacity/translate; Lab Light shadows only.
            </li>
          </ol>
          <button type="button" className={`${styles.btnPrimary} ${styles.motionDemo}`}>
            Hover me (240ms ease)
          </button>
        </section>

        <section className={styles.approval}>
          <h2 className={styles.sectionTitle}>Approve before website</h2>
          <ol className={styles.checklist}>
            <li>Logo system (mark, lockups, favicon, clearspace, do’s/don’ts)</li>
            <li>Colour tokens + accent ramp + chart</li>
            <li>Typography pairing &amp; ramp</li>
            <li>Spacing / radius / elevation</li>
            <li>Icons &amp; illustration direction</li>
            <li>Product diagram (HIW) story + motion</li>
            <li>UI primitives on this board</li>
            <li>Voice &amp; product names</li>
            <li>Motion principles</li>
          </ol>
          <p className={styles.bodyText}>
            Marketing site waits until you approve this kit <strong>and</strong> the product
            diagram. Docs: <code>brand/README.md</code>, <code>brand/diagrams.md</code>. Optional
            Figma:{" "}
            <a href="https://www.figma.com/design/xX9I5aIhT8Nnkm7vbGR96Y" target="_blank" rel="noreferrer">
              design file
            </a>
            .
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        <span className={styles.wordmarkSmall}>Inferix</span>
        <span>Brand kit preview · not the marketing site</span>
      </footer>
    </div>
  );
}
