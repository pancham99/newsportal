import { base_api_url } from "../../config/config";

export async function GET() {
  const baseUrl = "https://www.topbriefing.in";

  // 1. Fetch all slugs for news articles
  const res = await fetch(`${base_api_url}/api/news/all`, {
    cache: "no-store",
  });
  const data = await res.json();
  const articles = data?.news || [];

  // 2. Generate static + dynamic routes
  const staticPages = [
    "",
    "/about",
    "/news",
    "/news/category",
    "/news/state",
  ];

  const staticUrls = staticPages.map(
    (path) => `
    <url>
      <loc>${baseUrl}${path}</loc>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>
  `
  );

  const dynamicUrls = articles.map((item) => {
    return `
    <url>
      <loc>${baseUrl}/news/${item.slug}</loc>
      <lastmod>${new Date(item.updatedAt).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>
    `;
  });

  // 3. Final XML response
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
  ${staticUrls.join("")}
  ${dynamicUrls.join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
