import type { Metadata } from "next";
import Link from "next/link";
import { formatVideoDate } from "@/components/video-card";
import { videoCategories, youtube } from "@/content/videos";
import { getChannelVideos, groupIntoSeries } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Videos",
  description: "Comedy, tech, accessibility, gaming and more from my YouTube channel, organised by series.",
};

export default async function VideosPage() {
  const videos = await getChannelVideos();
  const series = videos ? groupIntoSeries(videos) : null;

  return (
    <div className="inner-page page-shell">
      <p className="eyebrow">03 / Watch</p>
      <h1 tabIndex={-1}>Videos<span className="heading-dot">.</span></h1>
      <p className="page-lead">Bloopers, funny signs, tech reviews, accessibility guides and more, organised by series.</p>
      <p>
        <a className="button button-secondary" href={youtube.channelUrl}>View all on YouTube <span aria-hidden="true">↗</span></a>
      </p>

      {!series ? (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">✳</span>
          <h2>Series are on their way.</h2>
          <p>In the meantime, every video is waiting on YouTube.</p>
        </div>
      ) : (
        videoCategories.map((category) => {
          const subgroups = category.subgroups
            .map((subgroup) => ({
              ...subgroup,
              series: subgroup.series.map((s) => series.get(s.slug)!).filter((s) => s.videos.length > 0),
            }))
            .filter((subgroup) => subgroup.series.length > 0);
          if (subgroups.length === 0) return null;

          return (
            <section className="video-category" key={category.slug} aria-labelledby={`category-${category.slug}`}>
              <h2 id={`category-${category.slug}`}>{category.title}</h2>
              <p className="category-description">{category.description}</p>
              {subgroups.map((subgroup) => {
                const SeriesHeading = subgroup.title ? "h4" : "h3";
                return (
                  <div className="video-subgroup" key={subgroup.title ?? category.slug}>
                    {subgroup.title ? <h3>{subgroup.title}</h3> : null}
                    <div className="project-grid">
                      {subgroup.series.map((s) => {
                        const latest = s.videos[s.videos.length - 1];
                        return (
                          <article className="project-card series-card" key={s.slug}>
                            {/* eslint-disable-next-line @next/next/no-img-element -- YouTube's CDN serves thumbnails directly. */}
                            <img className="media-image" src={latest.thumbnailUrl} alt="" loading="lazy" decoding="async" />
                            <SeriesHeading>{s.title}</SeriesHeading>
                            <p>{s.description}</p>
                            <p className="release-version">
                              {s.videos.length} {s.videos.length === 1 ? "video" : "videos"} · Latest{" "}
                              <time dateTime={latest.publishedAt}>{formatVideoDate(latest.publishedAt)}</time>
                            </p>
                            <Link className="text-link" href={`/videos/${s.slug}`}>
                              View episodes<span className="visually-hidden"> of {s.title}</span> <span aria-hidden="true">→</span>
                            </Link>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </section>
          );
        })
      )}
    </div>
  );
}
