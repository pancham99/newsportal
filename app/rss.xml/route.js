import { base_api_url } from "../../config/config";
import { SITE_URL } from "../../config/site";

export const revalidate = 900; // 15 mins revalidation

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
    console.error("RSS feed news fetch error:", err);
  }

  const itemsXml = newsList.slice(0, 50).map((item) => {
    const pubDate = item?.createdAt ? new Date(item.createdAt).toUTCString() : new Date().toUTCString();
    const title = (item?.title || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
    
    const rawDesc = item?.shortDescription || item?.description || item?.metaDescription || "";
    const description = rawDesc
      .replace(/<[^>]*>?/gm, "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;")
      .trim();

    const slug = String(item?.slug || "").trim();
    const link = `${SITE_URL}/news/${slug}`;
    const imageUrl = item?.image || `${SITE_URL}/topbrefing-mobile.png`;

    return `
    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
      <category>${item?.category || "न्यूज़"}</category>
      <author>${item?.writerName || "Top Briefing Editorial Team"}</author>
      <media:content url="${imageUrl}" medium="image" />
    </item>`;
  }).join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Top Briefing - Latest Hindi News &amp; Live Updates</title>
    <link>${SITE_URL}</link>
    <description>Top Briefing પર पढ़ें ताजा हिंदी खबरें, ब्रेकिंग न्यूज़, राजनीति, खेल, मनोरंजन, व्यापार और तकनीक की लाइव अपडेट।</description>
    <language>hi</language>
    <copyright>Copyright ${new Date().getFullYear()} Top Briefing</copyright>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=900, stale-while-revalidate=600",
    },
  });
}
