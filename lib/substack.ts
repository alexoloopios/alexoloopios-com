import { substack } from "@/content/site";
import { loadResiliently } from "@/lib/resilient-fetch";

export type SubstackPost = {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  imageUrl?: string;
};

// Substack has no publish webhooks, so the feed is re-fetched in the background
// at most once per hour. New posts appear on the site within about an hour.
const REVALIDATE_SECONDS = 60 * 60;

export async function getRecentSubstackPosts(limit = 3): Promise<SubstackPost[]> {
  return loadResiliently("Substack feed", async () => {
    const response = await fetch(`${substack.url}/feed`, {
      next: { revalidate: REVALIDATE_SECONDS, tags: ["substack"] },
    });
    if (!response.ok) {
      throw new Error(`Substack feed responded with ${response.status}`);
    }
    const posts = parseFeed(await response.text());
    // A feed that parses to nothing is almost certainly an error page, not "no posts".
    if (posts.length === 0) throw new Error("Substack feed contained no posts");
    return posts.slice(0, limit);
  }, []);
}

function parseFeed(xml: string): SubstackPost[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];

  return items
    .map((item) => {
      // Drop the full post body first so its markup can't confuse tag matching.
      const meta = item.replace(/<content:encoded>[\s\S]*?<\/content:encoded>/, "");
      const title = readTag(meta, "title");
      const url = readTag(meta, "link");
      const date = new Date(readTag(meta, "pubDate"));
      const publishedAt = Number.isNaN(date.getTime()) ? "" : date.toISOString();
      const imageUrl = meta.match(/<enclosure[^>]*url="([^"]+)"[^>]*type="image\//)?.[1];

      return {
        title,
        description: readTag(meta, "description"),
        url,
        publishedAt,
        imageUrl: imageUrl ? decodeEntities(imageUrl) : undefined,
      };
    })
    .filter((post) => post.title && post.url.startsWith("https://"));
}

function readTag(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  if (!match) return "";
  const value = match[1].trim();
  const cdata = value.match(/^<!\[CDATA\[([\s\S]*)\]\]>$/);
  return (cdata ? cdata[1] : decodeEntities(value)).trim();
}

function decodeEntities(value: string): string {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&amp;/g, "&");
}
