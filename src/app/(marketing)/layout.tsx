import SiteFooter from "@/components/site/SiteFooter";
import SiteNav from "@/components/site/SiteNav";
import styles from "./marketing.module.css";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <SiteNav />
      <main className={styles.main}>{children}</main>
      <SiteFooter />
    </div>
  );
}
