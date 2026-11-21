import { PHASE_PRODUCTION_BUILD } from "next/constants";

/**
 * Loads external data without letting an outage damage the live site.
 *
 * - During a background refresh in production, errors are re-thrown. Next.js then
 *   keeps serving the last successfully generated page and retries on a later request.
 * - During `next build` (and in local development), the fallback is used instead,
 *   so a third-party outage can never block a deploy.
 */
export async function loadResiliently<T>(label: string, load: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await load();
  } catch (error) {
    const isBuild = process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD;
    const isDev = process.env.NODE_ENV === "development";
    if (isBuild || isDev) {
      console.warn(`${label} is unavailable, using fallback content:`, error);
      return fallback;
    }
    throw error;
  }
}
