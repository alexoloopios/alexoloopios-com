import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${site.name} and the ideas behind this site.`,
};

export default function AboutPage() {
  return (
    <div className="inner-page page-shell about-page">
      <p className="eyebrow">03 / Connect</p>
      <h1 tabIndex={-1}>Hi, I&apos;m <span>{site.name}</span><span className="heading-dot">.</span></h1>
      <p className="page-lead">I build software with accessibility and screen reader users in mind.</p>
      <div className="about-panel">
        <span className="about-symbol" aria-hidden="true">✦</span>
        <div>
          <h2>A little about me</h2>
          <p>{site.intro}</p>
          <p>I work on Windows tools, speech technology, and NVDA add-ons. Games may join the loop in the future.</p>
          <p><Link className="text-link" href="https://github.com/alexoloopios">Explore my work on GitHub <span aria-hidden="true">↗</span></Link></p>
        </div>
      </div>
    </div>
  );
}
