import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Top Brefing - Latest Breaking News, Headlines & Updates",
  description: "Stay informed with Top Brefing - your trusted source for breaking news, latest headlines, world events, politics, technology, and more.",
  keywords: "top brefing, breaking news, latest headlines, trending news, daily updates, world news, politics, tech news, live updates",
  authors: [{ name: "Top Brefing Team", url: "https://newsportal-seven.vercel.app" }],
  creator: "Top Brefing",
  metadataBase: new URL("https://newsportal-seven.vercel.app"),
  openGraph: {
    title: "Top Brefing - Trusted News Coverage",
    description: "Get the most relevant and trending news stories daily. Updated regularly with world news, politics, business, and tech.",
    url: "https://newsportal-seven.vercel.app",
    siteName: "Top Brefing",
    images: [
      {
        url: "logo.png",
        width: 1200,
        height: 630,
        alt: "Top Brefing - Trusted News",
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
