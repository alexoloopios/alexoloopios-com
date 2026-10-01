import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${site.name} and the ideas that keep him building, exploring and playing.`,
};

export default function AboutPage() {
  return (
    <div className="inner-page page-shell about-page">
      <p className="eyebrow">03 / Connect</p>
      <h1 tabIndex={-1}>Hi, I&apos;m <span>{site.name}</span><span className="heading-dot">.</span></h1>
      <p className="page-lead">I build software with accessibility and screen reader users at the core, make entertaining videos and occasionally play various games.</p>
      <div className="about-panels">
        <section className="about-panel" aria-labelledby="about-info-heading">
          <span className="about-symbol" aria-hidden="true">✦</span>
          <div>
            <h2 id="about-info-heading">A little about me</h2>
            <p>{site.intro}</p>
            <p>I work on desktop and mobile tools, NVDA add-ons and entertaining videos like funny errors and signs, bloopers on intros/logos and sometimes the odd random video like a game or a tech tidbit out of the blue. Games may be developed by yours truely in the future.</p>
          </div>
        </section>
        <section className="social-panel" aria-labelledby="social-heading">
          <h2 id="social-heading">Keep up with me on the following platforms:</h2>
          <ul className="social-links">
            <li><a className="text-link" href="https://github.com/alexoloopios">GitHub</a></li>
            <li><a className="text-link" href="https://www.youtube.com/channel/UCRzlB1rsyYl66j9fTlLUH8Q/videos">YouTube</a></li>
            <li><a className="text-link" href="https://x.com/alexoloopios">X / Twitter</a></li>
            <li><a className="text-link" href="https://facebook.com/alexoloopios">Facebook</a></li>
            <li><a className="text-link" href="https://vee.seedy.cc/@alexchapman" rel="me">Mastodon</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
}
