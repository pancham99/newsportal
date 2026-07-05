import { base_api_url } from "../config/config";

export default async function sitemap() {
    const response = await fetch(`${base_api_url}/api/sitemap/news`, {
        cache: "no-store",
    });

    const { news } = await response.json();

    const urls = [];

    for (const item of news) {
        try {
            const slug = String(item.slug || "").trim();

            // XML में समस्या पैदा करने वाले characters
            if (/[&<>"']/.test(slug)) {
                console.log("❌ Invalid slug:", slug);
                continue;
            }

            urls.push({
                url: `https://www.topbriefing.in/news/${encodeURI(slug)}`,
                lastModified: new Date(item.updatedAt),
                changeFrequency: "hourly",
                priority: 0.9,
            });

        } catch (err) {
            console.log("❌ Bad Record:", item);
        }
    }

    return [
        {
            url: "https://www.topbriefing.in",
            lastModified: new Date(),
        },
        ...urls,
    ];
}


