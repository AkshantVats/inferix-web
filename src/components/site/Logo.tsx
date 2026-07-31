import Link from "next/link";
import styles from "./Logo.module.css";

type LogoProps = {
  href?: string;
  size?: "sm" | "md";
  inverse?: boolean;
};

export default function Logo({ href = "/", size = "sm", inverse = false }: LogoProps) {
  const mark = inverse ? "/brand/logo/mark-inverse.svg" : "/brand/logo/mark.svg";
  const dim = size === "md" ? 36 : 28;

  const inner = (
    <>
      <img src={mark} alt="" width={dim} height={dim} />
      <span className={styles.wordmark}>Inferix</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${styles.lockup} ${styles[size]}`} aria-label="Inferix home">
        {inner}
      </Link>
    );
  }

  return <span className={`${styles.lockup} ${styles[size]}`}>{inner}</span>;
}
