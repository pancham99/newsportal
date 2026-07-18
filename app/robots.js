import { SITE_URL } from "../config/site";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: SITE_URL.replace(/^https?:\/\//, ""),
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}