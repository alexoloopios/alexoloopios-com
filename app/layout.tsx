import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { RouteFocus } from "@/components/route-focus";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: site.title, template: `%s · ${site.brand}` },
  description: site.description,
  metadataBase: new URL(`https://${site.domain}`),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to main content</a>
        <SiteHeader />
        <RouteFocus />
        <main id="main" tabIndex={-1}>{children}</main>
        <footer className="site-footer">
          <div className="footer-inner">
            <p>{site.brand} <span aria-hidden="true">∞</span> A home for things made with curiosity.</p>
            <nav aria-label="Footer navigation">
              <Link href="/games">Games</Link>
              <Link href="/software">Software</Link>
              <Link href="/about">About</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
