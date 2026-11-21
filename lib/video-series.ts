import type { VideoSeries } from "@/content/videos";

const REACTION = /\breaction\b/i;

/** Smooths over curly apostrophes, zero-width characters and stray spacing in titles. */
export function normaliseTitle(title: string): string {
  return title
    .replace(/[‘’‛′`]/g, "'")
    .replace(/[​-‍﻿￼]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function videoBelongsToSeries(title: string, series: VideoSeries): boolean {
  const normalised = normaliseTitle(title);
  if (!series.reactions && REACTION.test(normalised)) return false;
  if (series.exclude?.test(normalised)) return false;
  return series.match.test(normalised);
}
