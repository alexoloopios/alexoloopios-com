import "server-only";
import { allVideoSeries, youtube, type VideoSeries } from "@/content/videos";
import { loadResiliently } from "@/lib/resilient-fetch";
import { videoBelongsToSeries } from "@/lib/video-series";

export type Video = {
  id: string;
  title: string;
  publishedAt: string;
  url: string;
  thumbnailUrl: string;
};

export type SeriesWithVideos = VideoSeries & {
  /** Oldest first, so episodes read in release order. */
  videos: Video[];
};

const REVALIDATE_SECONDS = 60 * 60;
// Every channel has an automatic "uploads" playlist: the channel ID with UC swapped for UU.
const UPLOADS_PLAYLIST_ID = youtube.channelId.replace(/^UC/, "UU");
const MAX_PAGES = 20; // 1,000 videos; each page costs 1 unit of the 10,000 daily free quota.

type PlaylistItemsResponse = {
  nextPageToken?: string;
  items?: {
    snippet?: { title?: string; resourceId?: { videoId?: string } };
    contentDetails?: { videoPublishedAt?: string };
  }[];
};

/**
 * Every public upload on the channel, newest first.
 * Returns `null` when no API key is configured, so pages can show a friendly fallback.
 */
export async function getChannelVideos(): Promise<Video[] | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return null;

  return loadResiliently("YouTube Data API", () => fetchUploads(apiKey), null);
}

async function fetchUploads(apiKey: string): Promise<Video[]> {
  const videos: Video[] = [];
  let pageToken: string | undefined;

  for (let page = 0; page < MAX_PAGES; page++) {
    const params = new URLSearchParams({
      part: "snippet,contentDetails",
      playlistId: UPLOADS_PLAYLIST_ID,
      maxResults: "50",
      fields: "nextPageToken,items(snippet(title,resourceId/videoId),contentDetails/videoPublishedAt)",
      key: apiKey,
    });
    if (pageToken) params.set("pageToken", pageToken);

    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?${params}`, {
      next: { revalidate: REVALIDATE_SECONDS, tags: ["youtube"] },
    });
    if (!response.ok) {
      throw new Error(`YouTube API responded with ${response.status}: ${await response.text()}`);
    }

    const data = (await response.json()) as PlaylistItemsResponse;
    for (const item of data.items ?? []) {
      const id = item.snippet?.resourceId?.videoId;
      const title = item.snippet?.title;
      const publishedAt = item.contentDetails?.videoPublishedAt;
      // Private and deleted videos come back without a publish date.
      if (!id || !title || !publishedAt) continue;
      videos.push({
        id,
        title,
        publishedAt,
        url: `https://www.youtube.com/watch?v=${id}`,
        // hqdefault always exists; CSS crops its letterboxing to 16:9.
        thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      });
    }

    pageToken = data.nextPageToken;
    if (!pageToken) break;
  }

  if (videos.length === 0) throw new Error("YouTube API returned no videos");
  return videos.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function groupIntoSeries(videos: Video[]): Map<string, SeriesWithVideos> {
  const grouped = new Map<string, SeriesWithVideos>();
  for (const series of allVideoSeries) {
    const episodes = videos
      .filter((video) => videoBelongsToSeries(video.title, series))
      .reverse();
    grouped.set(series.slug, { ...series, videos: episodes });
  }
  return grouped;
}
