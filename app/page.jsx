import { base_api_url } from "../config/config";
import HomeSection from "../components/Home/HomeSection";

async function getHomeNews() {
  try {
    const res = await fetch(`${base_api_url}/api/all/news`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error("Failed to fetch news");
    return await res.json();
  } catch (error) {
    console.error("Home News Error:", error);
    return { news: {} };
  }
}

/* ─────────────────────────────────────────────
   SEO: generateMetadata (home page)
   ───────────────────────────────────────────── */
export async function generateMetadata() {
  const { news } = await getHomeNews();

  const latestPolitics = news?.["राजनीति"]?.[0];
  const latestSports   = news?.["खेल"]?.[0];

  // Pull dynamic keywords from top articles
  const dynamicKeywords = [
    ...(latestPolitics?.keywords || []),
    ...(latestSports?.keywords   || []),
  ].slice(0, 10);

  const keywords = [
    "Top Briefing", "TopBriefing", "topbriefing.in",
    "Hindi News", "Latest Hindi News", "Breaking News",
    "Today News", "India News", "World News",
    "National News", "International News",
    "Sports News", "Cricket News",
    "Entertainment News", "Bollywood News",
    "Politics News", "Business News",
    "Technology News", "Education News",
    "Health News", "Automobile News",
    "Live News", "Trending News",
    "Hindi Samachar", "आज की खबर", "ताजा खबर",
    "ब्रेकिंग न्यूज़", "लेटेस्ट न्यूज़",
    "हिंदी न्यूज़", "भारत समाचार",
    ...dynamicKeywords,
  ];

  const ogImage = latestPolitics?.image || latestSports?.image || "https://topbriefing.in/logo.png";
  const ogImageAlt = latestPolitics?.title || "Top Briefing - Hindi News Portal";

  return {
    metadataBase: new URL("https://topbriefing.in"),

    title: {
      default: "Top Briefing - ताजा हिंदी खबरें | Breaking News | Live Updates",
      template: "%s | Top Briefing",
    },

    description:
      "Top Briefing पर पढ़ें ताजा हिंदी खबरें, ब्रेकिंग न्यूज़, भारत, विश्व, राजनीति, खेल, मनोरंजन, व्यापार और तकनीक की लाइव अपडेट।",

    keywords,

    applicationName: "Top Briefing",
    authors: [{ name: "Top Briefing Editorial Team", url: "https://topbriefing.in" }],
    creator: "Top Briefing",
    publisher: "Top Briefing",
    category: "News",

    alternates: {
      canonical: "https://topbriefing.in",
    },

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // ⚠️ Replace with your actual Google Search Console verification code
    verification: {
      google: "YOUR_GOOGLE_VERIFICATION_CODE",
    },

    openGraph: {
      type: "website",
      locale: "hi_IN",
      url: "https://topbriefing.in",
      siteName: "Top Briefing",
      title: "Top Briefing - ताजा हिंदी खबरें | Breaking News | Live Updates",
      description:
        "Top Briefing पर पढ़ें ताजा हिंदी खबरें, ब्रेकिंग न्यूज़, राजनीति, खेल, मनोरंजन, व्यापार और तकनीक की लाइव अपडेट।",
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: ogImageAlt,
      }],
    },

    twitter: {
      card: "summary_large_image",
      site: "@topbriefing",
      creator: "@topbriefing",
      title: "Top Briefing - ताजा हिंदी खबरें",
      description:
        "ताजा हिंदी खबरें, ब्रेकिंग न्यूज़, राजनीति, खेल, मनोरंजन की लाइव अपडेट।",
      images: [ogImage],
    },

    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

/* ─────────────────────────────────────────────
   JSON-LD: WebSite schema with SearchAction
   Enables Google Sitelinks Searchbox
   ───────────────────────────────────────────── */
function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Top Briefing',
    url: 'https://topbriefing.in',
    description: 'भारत का भरोसेमंद हिंदी न्यूज़ पोर्टल — ब्रेकिंग न्यूज़, राजनीति, खेल, मनोरंजन, व्यापार और तकनीक।',
    inLanguage: 'hi',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://topbriefing.in/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─────────────────────────────────────────────
   Page Component
   ───────────────────────────────────────────── */
const Home = async () => {
  const { news } = await getHomeNews();

  return (
    <div className="hidden">

      <WebSiteSchema />
      <HomeSection news={news} />

    </div>
    
  );
};

export default Home;
