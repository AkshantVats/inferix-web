import Link from "next/link";
import { GITHUB } from "@/lib/github";
import Logo from "./Logo";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Logo size="sm" />
          <p className={styles.tag}>The control plane for platform teams.</p>
        </div>

        <div className={styles.cols}>
          <div>
            <p className={styles.colTitle}>Product</p>
            <ul className={styles.list}>
              <li>
                <Link href="/product">Overview</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/demo">Book demo</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className={styles.colTitle}>Docs</p>
            <ul className={styles.list}>
              <li>
                <Link href="/docs/quickstart">Quick start</Link>
              </li>
              <li>
                <Link href="/docs">Docs home</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className={styles.colTitle}>Open source</p>
            <ul className={styles.list}>
              <li>
                <a href={GITHUB.suite} target="_blank" rel="noreferrer">
                  Inferix suite
                </a>
              </li>
              <li>
                <a href={GITHUB.web} target="_blank" rel="noreferrer">
                  Website repo
                </a>
              </li>
              <li>
                <a href={GITHUB.lensai} target="_blank" rel="noreferrer">
                  LensAI
                </a>
              </li>
              <li>
                <a href={GITHUB.traceforge} target="_blank" rel="noreferrer">
                  TraceForge
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className={styles.colTitle}>Company</p>
            <ul className={styles.list}>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
              <li>
                <Link href="/brand">Brand kit</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <p>© {new Date().getFullYear()} Inferix. All rights reserved.</p>
          <a href={GITHUB.suite} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
