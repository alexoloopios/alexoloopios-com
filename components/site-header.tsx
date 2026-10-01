import Link from "next/link";
import { site } from "@/content/site";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Games" },
  { href: "/software", label: "Software" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label={`${site.brand}, home`}>
          <span className="brand-mark" aria-hidden="true">∞</span>
          <span>{site.brand}</span>
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          {navigation.map(({ href, label }) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
