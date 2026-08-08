import { base_api_url } from "../../config/config";
import { SITE_URL } from "../../config/site";

export const revalidate = 900; // 15 mins for Google News

export async function GET() {
  let newsList = [];
  try {
    const res = await fetch(`${base_api_url}/api/latest/news`, {
      next: { revalidate: 900 },
    });
    if (res.ok) {
      const data = await res.json();
      newsList = Array.isArray(data?.latestNews) ? data.latestNews : [];
    }
  } catch (err) {
    console.error("Google News sitemap fetch error:", err);
  }

  const xmlUrls = newsList.slice(0, 1000).map((item) => {
    const pubDate = item?.createdAt ? new Date(item.createdAt).toISOString() : new Date().toISOString();
    const title = (item?.title || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
    const slug = String(item?.slug || "").trim();

    return `
  <url>
    <loc>${SITE_URL}/news/${slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Top Briefing</news:name>
        <news:language>hi</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${title}</news:title>
    </news:news>
  </url>`;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${xmlUrls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=900, stale-while-revalidate=600",
    },
  });
}
