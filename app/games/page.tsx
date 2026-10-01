import type { Metadata } from "next";
import { ProjectList } from "@/components/project-list";
import { games } from "@/content/site";

export const metadata: Metadata = {
  title: "Games",
  description: "Explore my games and experiments in play.",
};

export default function GamesPage() {
  return (
    <div className="inner-page page-shell">
      <p className="eyebrow">01 / Play</p>
      <h1 tabIndex={-1}>Games<span className="heading-dot">.</span></h1>
      <p className="page-lead">Worlds, stories, and experiments you can step into.</p>
      <ProjectList projects={games} kind="games" />
    </div>
  );
}
