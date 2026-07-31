"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GITHUB } from "@/lib/github";
import Logo from "./Logo";
import styles from "./SiteNav.module.css";

const LINKS = [
  { href: "/product", label: "Product" },
  { href: "/docs/quickstart", label: "Docs" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
] as const;

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.banner}>
        <a href={GITHUB.suite} className={styles.bannerLink} target="_blank" rel="noreferrer">
          Open source on GitHub — LensAI, TraceForge, and the Inferix suite{" "}
          <span aria-hidden>→</span>
        </a>
      </div>

      <div className={styles.inner}>
        <div className={styles.brandBlock}>
          <Logo />
        </div>

        <nav className={styles.desktop} aria-label="Primary">
          {LINKS.map((link) => {
            const base = link.href.replace(/\/quickstart$/, "");
            const active =
              pathname === link.href ||
              pathname.startsWith(`${base}/`) ||
              pathname === base;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.link} ${active ? styles.active : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <a
            href={GITHUB.suite}
            className={styles.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <Link
            href="/pricing"
            className={`${styles.pricing} ${pathname.startsWith("/pricing") ? styles.active : ""}`}
          >
            Pricing
          </Link>
          <Link href="/demo" className={styles.outline}>
            Book demo
          </Link>
          <Link href="/docs/quickstart" className={styles.cta}>
            Start free
          </Link>
          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className={styles.mobile} aria-label="Mobile">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={GITHUB.suite}
            className={styles.mobileLink}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            GitHub
          </a>
          <Link href="/pricing" className={styles.mobileLink} onClick={() => setOpen(false)}>
            Pricing
          </Link>
          <Link href="/demo" className={styles.mobileOutline} onClick={() => setOpen(false)}>
            Book demo
          </Link>
          <Link
            href="/docs/quickstart"
            className={styles.mobileCta}
            onClick={() => setOpen(false)}
          >
            Start free
          </Link>
        </nav>
      )}
    </header>
  );
}
