import Link from "next/link";
import { games, site, software } from "@/content/site";

export default function Home() {
  const projectCount = games.length + software.length;

  return (
    <>
      <section className="hero page-shell" aria-labelledby="home-heading">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" aria-hidden="true" /> Welcome to my corner of the web</p>
          <h1 id="home-heading" tabIndex={-1}>Ideas worth <span>making.</span></h1>
          <p className="hero-lead">Games, software, and the interesting things in between.</p>
          <p className="hero-description">{site.intro}</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/games">Explore games <span aria-hidden="true">↗</span></Link>
            <Link className="button button-secondary" href="/software">See software <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <div className="art-core">✦</div>
          <div className="art-chip chip-game">GAMES <span>◇</span></div>
          <div className="art-chip chip-software">SOFTWARE <span>⌘</span></div>
          <div className="art-chip chip-more">& MORE <span>✳</span></div>
        </div>
      </section>

      <section className="content-section page-shell" aria-labelledby="explore-heading">
        <div className="section-intro">
          <p className="eyebrow">Explore</p>
          <h2 id="explore-heading">A little bit of everything.</h2>
          <p>Follow the work from first idea to finished release, one project at a time.</p>
        </div>
        <div className="category-grid">
          <Link className="category-card game-card" href="/games">
            <span className="category-symbol" aria-hidden="true">◇</span>
            <span className="category-number">01 / PLAY</span>
            <strong>Games</strong>
            <span>Worlds to explore, challenges to try, and experiments in play.</span>
            <span className="card-link">Discover games <span aria-hidden="true">↗</span></span>
          </Link>
          <Link className="category-card software-card" href="/software">
            <span className="category-symbol" aria-hidden="true">⌘</span>
            <span className="category-number">02 / BUILD</span>
            <strong>Software</strong>
            <span>Useful tools and ideas turned into something you can use.</span>
            <span className="card-link">Discover software <span aria-hidden="true">↗</span></span>
          </Link>
          <Link className="category-card about-card" href="/about">
            <span className="category-symbol" aria-hidden="true">✳</span>
            <span className="category-number">03 / CONNECT</span>
            <strong>About</strong>
            <span>The person behind the projects and the things that inspire them.</span>
            <span className="card-link">Get to know me <span aria-hidden="true">↗</span></span>
          </Link>
        </div>
      </section>

      <section className="featured-section page-shell" aria-labelledby="releases-heading">
        <div className="featured-heading">
          <div>
            <p className="eyebrow">Recent releases</p>
            <h2 id="releases-heading">Out in the world.</h2>
          </div>
          <Link className="text-link" href="/software">All software <span aria-hidden="true">→</span></Link>
        </div>
        <div className="release-grid">
          {software.slice(0, 3).map((project) => (
            <article className="release-card" key={project.repoUrl}>
              <p className="eyebrow">{project.category} · {project.version}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <Link className="text-link" href={project.releaseUrl}>
                View release <span className="visually-hidden">of {project.title}</span><span aria-hidden="true"> ↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="closing-section" aria-labelledby="latest-heading">
        <div className="page-shell closing-inner">
          <div>
            <p className="eyebrow">The workbench</p>
            <h2 id="latest-heading">What&apos;s taking shape?</h2>
            <p>
              {projectCount > 0
                ? `There ${projectCount === 1 ? "is" : "are"} ${projectCount} ${projectCount === 1 ? "project" : "projects"} to explore so far.`
                : "This space is ready for the first project. Check back as it grows."}
            </p>
          </div>
          <Link className="button button-secondary" href="/about">More about me <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </>
  );
}
