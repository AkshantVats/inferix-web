"use client";

import { useEffect, useState } from "react";
import styles from "./InferixHiw.module.css";

const PRODUCTS = ["LensAI", "TraceForge", "RouteIQ", "DriftWatch", "FineForge"] as const;

const SOURCES = [
  { id: "humans", label: "Humans", icon: "H" },
  { id: "agents", label: "Agents", icon: "A" },
  { id: "machines", label: "Machines", icon: "M" },
] as const;

type LogoTile = { name: string; src: string };

const DESTINATIONS: {
  id: string;
  title: string;
  logos: LogoTile[];
}[] = [
  {
    id: "owned",
    title: "Owned models",
    logos: [
      { name: "Inferix model", src: "/brand/logos/inferix-model.svg" },
      { name: "General LLM", src: "/brand/logos/model.svg" },
      { name: "Support SLM", src: "/brand/logos/slm.svg" },
      { name: "API-heal SLM", src: "/brand/logos/slm.svg" },
      { name: "Custom weights", src: "/brand/logos/model.svg" },
      { name: "Fine-tuned", src: "/brand/logos/inferix-model.svg" },
    ],
  },
  {
    id: "providers",
    title: "Providers",
    logos: [
      { name: "OpenAI", src: "/brand/logos/openai.svg" },
      { name: "Anthropic", src: "/brand/logos/anthropic.svg" },
      { name: "Google", src: "/brand/logos/google.svg" },
      { name: "Azure", src: "/brand/logos/azure.svg" },
      { name: "Bedrock", src: "/brand/logos/bedrock.svg" },
      { name: "Mistral", src: "/brand/logos/mistral.svg" },
    ],
  },
  {
    id: "agents",
    title: "Agents",
    logos: [
      { name: "Cursor", src: "/brand/logos/cursor.svg" },
      { name: "LangChain", src: "/brand/logos/langchain.svg" },
      { name: "CrewAI", src: "/brand/logos/crewai.svg" },
      { name: "AutoGen", src: "/brand/logos/autogen.svg" },
      { name: "Custom agent", src: "/brand/logos/model.svg" },
    ],
  },
];

/** Wire paths in SVG viewBox units (120×280). Y = centers of 3 equal rails. */
const IN_WIRES = [
  "M0 47 C55 47, 55 140, 120 140",
  "M0 140 C55 140, 55 140, 120 140",
  "M0 233 C55 233, 55 140, 120 140",
] as const;

const OUT_WIRES = [
  "M0 140 C55 140, 55 47, 120 47",
  "M0 140 C55 140, 55 140, 120 140",
  "M0 140 C55 140, 55 233, 120 233",
] as const;

/**
 * Ball paths in CSS px for the 48×280 connector column.
 * Kept separate from SVG wires so dots stay circular (SVG preserveAspectRatio="none" squashes shapes).
 */
const IN_BALLS = [
  "M0 47 C22 47, 22 140, 48 140",
  "M0 140 C22 140, 22 140, 48 140",
  "M0 233 C22 233, 22 140, 48 140",
] as const;

const OUT_BALLS = [
  "M0 140 C22 140, 22 47, 48 47",
  "M0 140 C22 140, 22 140, 48 140",
  "M0 140 C22 140, 22 233, 48 233",
] as const;

/** Same phase on both sides — evenly spaced over one 2.8s loop. */
const BALL_DELAYS = ["0s", "0.933s", "1.867s"] as const;
const BALL_OUT_DELAYS = ["0s", "0.933s", "1.867s"] as const;

const ARIA =
  "Workloads — humans, agents, and machines — flow into the Inferix control plane spanning LensAI, TraceForge, RouteIQ, DriftWatch, and FineForge, then out to owned models, providers, and agents.";

export default function InferixHiw() {
  const [lit, setLit] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setLit((i) => (i + 1) % PRODUCTS.length);
    }, 1600);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <div className={styles.root} role="img" aria-label={ARIA}>
      <div className={styles.col}>
        <p className={styles.colLabel}>Your AI stack</p>
        <ul className={styles.sourceList}>
          {SOURCES.map((s) => (
            <li key={s.id} className={styles.sourceCard}>
              <span className={styles.sourceIcon} aria-hidden>
                {s.icon}
              </span>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`${styles.connectors} ${styles.connectorsIn}`} aria-hidden>
        <svg className={styles.connectorSvg} viewBox="0 0 120 280" preserveAspectRatio="none">
          {IN_WIRES.map((d) => (
            <path key={d} className={styles.wire} d={d} />
          ))}
        </svg>
        {!reduced &&
          IN_BALLS.map((d, i) => (
            <span
              key={`in-${i}`}
              className={styles.ball}
              style={{
                offsetPath: `path("${d}")`,
                animationDelay: BALL_DELAYS[i],
              }}
            />
          ))}
      </div>

      <div className={styles.hub}>
        <div className={styles.hubCard}>
          <div className={styles.hubBrand}>
            <img src="/brand/logo/mark.svg" alt="" width={36} height={36} />
            <div>
              <p className={styles.hubName}>Inferix</p>
              <p className={styles.hubTag}>CONTROL PLANE</p>
            </div>
          </div>
          <ul className={styles.pills}>
            {PRODUCTS.map((name, i) => (
              <li
                key={name}
                className={`${styles.pill} ${i === lit || reduced ? styles.pillLit : ""}`}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`${styles.connectors} ${styles.connectorsOut}`} aria-hidden>
        <svg className={styles.connectorSvg} viewBox="0 0 120 280" preserveAspectRatio="none">
          {OUT_WIRES.map((d) => (
            <path key={d} className={styles.wire} d={d} />
          ))}
        </svg>
        {!reduced &&
          OUT_BALLS.map((d, i) => (
            <span
              key={`out-${i}`}
              className={styles.ball}
              style={{
                offsetPath: `path("${d}")`,
                animationDelay: BALL_OUT_DELAYS[i],
              }}
            />
          ))}
      </div>

      <div className={styles.col}>
        <p className={styles.colLabel}>Destinations</p>
        <div className={styles.destStack}>
          {DESTINATIONS.map((group) => (
            <div key={group.id} className={styles.destCard}>
              <p className={styles.destTitle}>{group.title}</p>
              <ul className={styles.logoGrid}>
                {group.logos.map((logo) => (
                  <li key={`${group.id}-${logo.name}`} className={styles.logoCell} title={logo.name}>
                    <img src={logo.src} alt="" width={18} height={18} />
                    <span className={styles.logoName}>{logo.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
