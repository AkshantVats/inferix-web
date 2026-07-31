import Link from "next/link";
import { DOCS_NAV } from "@/lib/docs/nav";
import styles from "@/app/(marketing)/docs/docs.module.css";

export default function DocsShell({
  pathname,
  children,
}: {
  pathname: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.docs}>
      <aside className={styles.side} aria-label="Docs navigation">
        {DOCS_NAV.map((group) => (
          <div key={group.title} className={styles.sideGroup}>
            <p className={styles.sideTitle}>{group.title}</p>
            <ul>
              {group.items.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/docs" && pathname.startsWith(`${item.href}/`));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={active ? styles.sideActive : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </aside>
      <article className={styles.article}>{children}</article>
    </div>
  );
}
