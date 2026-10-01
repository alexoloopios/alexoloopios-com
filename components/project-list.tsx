import Link from "next/link";
import type { Project } from "@/content/site";

type ProjectListProps = {
  projects: Project[];
  kind: "games" | "software";
};

export function ProjectList({ projects, kind }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">✳</span>
        <h2>There is room to grow here.</h2>
        <p>
          {kind === "games"
            ? "Game pages will appear here when the first titles are ready to share."
            : "Software pages will appear here when the first projects are ready to share."}
        </p>
      </div>
    );
  }

  return (
    <div className="project-grid">
      {projects.map((project) => (
        <article className="project-card" key={project.repoUrl}>
          <p className="eyebrow">{project.category}{project.prerelease ? " · Prerelease" : ""}</p>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <p className="release-version">Latest release: {project.version}</p>
          <div className="project-links">
            <Link className="text-link" href={project.releaseUrl}>
              View latest release<span className="visually-hidden"> of {project.title}</span> <span aria-hidden="true">↗</span>
            </Link>
            <Link className="text-link secondary-link" href={project.repoUrl}>
              Source code <span className="visually-hidden">for {project.title}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
