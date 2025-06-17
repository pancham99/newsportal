import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Top Briefing - Latest Breaking News, Headlines & Updates",
  description: "Stay informed with Top Briefing - your trusted source for breaking news, latest headlines, world events, politics, technology, and more.",
  keywords: "top briefing, breaking news, latest headlines, trending news, daily updates, world news, politics, tech news, live updates",
  authors: [{ name: "Top Briefing Team", url: "https://www.topbriefing.in" }],
  creator: "Top Brefing",
  metadataBase: new URL("https://www.topbriefing.in"),
  openGraph: {
    title: "Top Briefing - Trusted News Coverage",
    description: "Get the most relevant and trending news stories daily. Updated regularly with world news, politics, business, and tech.",
    url: "https://www.topbriefing.in",
    siteName: "Top Briefing",
    images: [
      {
        url: "https://www.topbriefing.in/logo.png",
        width: 1200,
        height: 630,
        alt: "Top Briefing - Trusted News",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
