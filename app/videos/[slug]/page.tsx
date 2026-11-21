import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VideoCard } from "@/components/video-card";
import { allVideoSeries, youtube } from "@/content/videos";
import { getChannelVideos, groupIntoSeries } from "@/lib/youtube";

type SeriesPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return allVideoSeries.map((series) => ({ slug: series.slug }));
}

export async function generateMetadata({ params }: SeriesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const series = allVideoSeries.find((s) => s.slug === slug);
  return series ? { title: series.title, description: series.description } : {};
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { slug } = await params;
  const config = allVideoSeries.find((s) => s.slug === slug);
  if (!config) notFound();

  const videos = await getChannelVideos();
  const episodes = videos ? groupIntoSeries(videos).get(slug)!.videos : [];

  return (
    <div className="inner-page page-shell">
      <p className="eyebrow">
        <Link className="text-link" href="/videos"><span aria-hidden="true">← </span>All series</Link>
      </p>
      <h1 tabIndex={-1}>{config.title}<span className="heading-dot">.</span></h1>
      <p className="page-lead">{config.description}</p>

      {episodes.length > 0 ? (
        <>
          <h2 className="episodes-heading">
            {episodes.length} {episodes.length === 1 ? "video" : "videos"}, in release order
          </h2>
          <div className="release-grid">
            {episodes.map((video) => (
              <VideoCard video={video} key={video.id} />
            ))}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">✳</span>
          <h2>Episodes are on their way.</h2>
          <p>
            In the meantime, <a className="text-link" href={youtube.channelUrl}>every video is waiting on YouTube</a>.
          </p>
        </div>
      )}
    </div>
  );
}
