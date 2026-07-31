import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Inferix — Control agents and inference in one place",
    template: "%s",
  },
  description:
    "Inferix helps platform teams see every agent and model call, route by policy, catch quality drift, and retrain — for owned models and providers.",
  icons: {
    icon: [
      { url: "/brand/favicon/favicon-16.svg", sizes: "16x16", type: "image/svg+xml" },
      { url: "/brand/favicon/favicon-32.svg", sizes: "32x32", type: "image/svg+xml" },
    ],
    apple: "/brand/favicon/apple-touch-180.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${fraunces.variable} ${GeistMono.variable}`}
    >
      <body
        style={
          {
            "--inferix-font-brand": "var(--font-fraunces), Georgia, serif",
            "--inferix-font-ui": "var(--font-plus-jakarta), system-ui, sans-serif",
            "--inferix-font-display": "var(--font-plus-jakarta), system-ui, sans-serif",
            "--inferix-font-mono": "var(--font-geist-mono), ui-monospace, monospace",
          } as React.CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
