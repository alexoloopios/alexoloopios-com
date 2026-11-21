import type { Video } from "@/lib/youtube";

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function formatVideoDate(iso: string): string {
  return dateFormat.format(new Date(iso));
}

type VideoCardProps = {
  video: Video;
  headingLevel?: "h3" | "h4";
};

export function VideoCard({ video, headingLevel: Heading = "h3" }: VideoCardProps) {
  return (
    <article className="release-card media-card">
      {/* eslint-disable-next-line @next/next/no-img-element -- YouTube's CDN serves thumbnails directly. */}
      <img className="media-image" src={video.thumbnailUrl} alt="" loading="lazy" decoding="async" />
      <p className="eyebrow">
        <time dateTime={video.publishedAt}>{formatVideoDate(video.publishedAt)}</time>
      </p>
      <Heading>{video.title}</Heading>
      <a className="text-link" href={video.url}>
        Watch on YouTube<span className="visually-hidden">: {video.title}</span><span aria-hidden="true"> ↗</span>
      </a>
    </article>
  );
}
