import { base_api_url } from "../config/config";
import { SITE_URL, STATIC_SITEMAP_PAGES, STATE_PAGES } from "../config/site";
import { buildAbsoluteUrl, isValidSitemapSlug } from "../utils/sitemapHelpers";

export const revalidate = 3600;

async function fetchSitemapNews() {
  try {
    const response = await fetch(`${base_api_url}/api/sitemap/news`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error("Sitemap news fetch failed:", response.status);
      return [];
    }

    const data = await response.json();
    return Array.isArray(data?.news) ? data.news : [];
  } catch (error) {
    console.error("Sitemap news fetch error:", error);
    return [];
  }
}

async function fetchCategories() {
  try {
    const response = await fetch(`${base_api_url}/api/category/all`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) return [];

    const data = await response.json();
    return (data?.categories || [])
      .map((item) => item?.category)
      .filter(Boolean);
  } catch (error) {
    console.error("Sitemap category fetch error:", error);
    return [];
  }
}

export default async function sitemap() {
  const now = new Date();
  const [news, categories] = await Promise.all([fetchSitemapNews(), fetchCategories()]);

  const staticEntries = STATIC_SITEMAP_PAGES.map(({ path, changeFrequency, priority }) => ({
    url: buildAbsoluteUrl(SITE_URL, path),
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const categoryEntries = categories.map((category) => ({
    url: buildAbsoluteUrl(SITE_URL, `/news/category/${encodeURIComponent(category)}`),
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const stateEntries = STATE_PAGES.map((state) => ({
    url: buildAbsoluteUrl(SITE_URL, `/news/state/${encodeURIComponent(state)}`),
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const newsEntries = [];
  for (const item of news) {
    const slug = String(item?.slug || "").trim();
    if (!isValidSitemapSlug(slug)) continue;

    newsEntries.push({
      url: buildAbsoluteUrl(SITE_URL, `/news/${slug}`),
      lastModified: item?.updatedAt ? new Date(item.updatedAt) : now,
      changeFrequency: "hourly",
      priority: 0.9,
    });
  }

  return [...staticEntries, ...categoryEntries, ...stateEntries, ...newsEntries];
}
