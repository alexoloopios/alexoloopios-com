import type { Metadata } from "next";
import { ProjectList } from "@/components/project-list";
import { software } from "@/content/site";

export const metadata: Metadata = {
  title: "Software",
  description: "Explore my software projects and useful tools.",
};

export default function SoftwarePage() {
  return (
    <div className="inner-page page-shell">
      <p className="eyebrow">02 / Build</p>
      <h1 tabIndex={-1}>Software<span className="heading-dot">.</span></h1>
      <p className="page-lead">Released Windows tools and NVDA add-ons, built with accessibility in mind.</p>
      <ProjectList projects={software} kind="software" />
    </div>
  );
}
