export const SITE_URL =
  process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://topbriefing.in";

export const STATIC_SITEMAP_PAGES = [
  { path: "", changeFrequency: "hourly", priority: 1 },
  { path: "/topnews", changeFrequency: "hourly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

export const STATE_PAGES = [
  "बिहार",
  "उत्तर प्रदेश",
  "दिल्ली",
  "मध्य प्रदेश",
  "राजस्थान",
  "महाराष्ट्र",
  "गुजरात",
  "कर्नाटक",
  "तमिलनाडु",
  "पश्चिम बंगाल",
];
