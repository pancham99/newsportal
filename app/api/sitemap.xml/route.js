import { NextResponse } from 'next/server';

const baseUrl = 'https://www.topbriefing.in';

// Define categories as above
const categories = [
  // ... same categories as above
];

export async function GET() {
  const currentDate = new Date().toISOString();
  
  // Generate XML content
  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">';

  // Add homepage
  xml += `
    <url>
      <loc>${baseUrl}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>hourly</changefreq>
      <priority>1.0</priority>
    </url>`;

  // Add static pages
  const staticPages = [
    { path: '/about', priority: 0.5, changefreq: 'monthly' },
    { path: '/contact', priority: 0.5, changefreq: 'monthly' },
    { path: '/privacy', priority: 0.3, changefreq: 'yearly' },
    { path: '/terms', priority: 0.3, changefreq: 'yearly' },
  ];

  staticPages.forEach(page => {
    xml += `
    <url>
      <loc>${baseUrl}${page.path}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>`;
  });

  // Add category pages
  categories.forEach(category => {
    xml += `
    <url>
      <loc>${baseUrl}/category/${category.slug}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>${category.changeFrequency}</changefreq>
      <priority>${category.priority}</priority>
    </url>`;
  });

  // In a real application, you would fetch and add actual articles here
  // const articles = await fetchArticlesForSitemap();
  // articles.forEach(article => { ... });

  xml += '</urlset>';

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}