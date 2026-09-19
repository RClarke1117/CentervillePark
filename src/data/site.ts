/** Site origin for absolute URLs (JSON-LD, sitemap). Override at build time if needed. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://centerville-park.pages.dev";
