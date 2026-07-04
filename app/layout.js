import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { AuthProvider } from "../context/AuthContext";
import { base_api_url } from "../config/config";
import Footer from '../components/Footer';
import Script from "next/script";

// display: "swap" prevents invisible text during font load (fixes CLS/FOUT)
const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  metadataBase: new URL("https://topbriefing.in"),
  title: {
    default: "Top Briefing - Latest Hindi News, Breaking News & Live Updates",
    template: "%s | Top Briefing",
  },
  description:
    "Read the latest Hindi News, Breaking News, India News, World News, Politics, Sports, Entertainment, Business, Technology and Live Updates only on Top Briefing.",
  applicationName: "Top Briefing",
  authors: [{ name: "Top Briefing Editorial Team" }],
  creator: "Top Briefing",
  publisher: "Top Briefing",
  category: "News",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({ children }) {
  const news_data = await fetch(`${base_api_url}/api/all/news`, {
    next: {
      revalidate: 300
    },
  });

  const { news } = await news_data?.json()

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: 'Top Briefing',
    url: 'https://topbriefing.in',
    logo: {
      '@type': 'ImageObject',
      url: 'https://topbriefing.in/logo.png',
      width: 600,
      height: 60,
    },
    sameAs: [
      'https://www.facebook.com/people/Top-Briefing/61552965021716/',
      'https://www.instagram.com/topbriefing/',
      'https://www.youtube.com/results?search_query=topbriefing',
    ],
    foundingDate: '2023',
    description: 'Top Briefing is India\'s trusted Hindi news portal covering breaking news, politics, sports, entertainment, technology and more.',
    inLanguage: 'hi',
  }

  return (
    <html lang="hi">
      <body className={inter.className}>
        {/* Organization schema for Google Knowledge Panel */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <AuthProvider>
          <Header />
          <main>
            <div className="container mx-auto">
              {children}
            </div>
          </main>
          <Footer news={news['राजनीति']} />
        </AuthProvider>

        {/* Google AdSense — afterInteractive ensures ads load after hydration without blocking LCP */}
        <Script
          id="adsense-init"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8439565499673815"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

