/**
 * Reject malformed slugs (character-by-character dash segments, spaces, XML/URL unsafe chars).
 * Matches canonical news URLs used across the site.
 */
export function isValidSitemapSlug(slug) {
  const trimmed = String(slug || "").trim();
  if (!trimmed) return false;

  if (/[&<>"'\s]/.test(trimmed)) return false;
  if (/[;:!?]/.test(trimmed)) return false;

  const segments = trimmed.split("-").filter(Boolean);
  if (segments.length >= 10) {
    const singleCharSegments = segments.filter((segment) => [...segment].length === 1).length;
    if (singleCharSegments / segments.length > 0.6) return false;
  }

  return true;
}

export function buildAbsoluteUrl(siteUrl, path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl.replace(/\/$/, "")}${normalizedPath}`;
}
