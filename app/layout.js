import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { AuthProvider } from "../context/AuthContext";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title:
    "Top Briefing - Latest Breaking News, Hindi News, Headlines & Live Updates",
  description:
    "Stay updated with Top Briefing — India’s trusted news source for breaking news, Hindi headlines, world politics, technology, and entertainment.",
  keywords:
    // 🔥 English Keywords
    "top briefing, breaking news, hindi news, latest headlines, trending news, daily updates, world news, politics, tech news, live updates, bollywood news, cricket updates, business news, india news, viral stories," +
    // 🔥 Hindi Keywords
    " हिंदी न्यूज़, आज की ताजा खबरें, आज की मुख्य खबरें, ताजा समाचार, ब्रेकिंग न्यूज़, हिंदी समाचार, राजनीति समाचार, बॉलीवुड समाचार, क्रिकेट न्यूज़, बिजनेस खबरें, सरकारी नौकरी, शिक्षा समाचार, राशिफल, तकनीकी खबरें, हेल्थ न्यूज़, वायरल न्यूज़, भारत समाचार, आज की बड़ी खबरें, न्यूज़ इन हिंदी, दुनिया की खबरें, लाइव न्यूज़",

  authors: [{ name: "Top Briefing", url: "https://www.topbriefing.in" }],
  creator: "Top Briefing",
  publisher: "Top Briefing Media Pvt. Ltd.",
  metadataBase: new URL("https://www.topbriefing.in"),

  openGraph: {
    title: "Top Briefing - Trusted Hindi & English News Coverage",
    description:
      "Get the latest news updates from India and around the world. Trusted, accurate and fast news coverage in Hindi and English.",
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
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    site: "@Topbriefing",
    title: "Top Briefing - Hindi & English News Updates",
    description:
      "Follow Top Briefing for breaking news, tech, politics, Bollywood, and current affairs in Hindi & English.",
    images: ["https://www.topbriefing.in/logo.png"],
  },

  alternates: {
    canonical: "https://www.topbriefing.in",
    languages: {
      en: "https://www.topbriefing.in/en",
      hi: "https://www.topbriefing.in/hi",
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  themeColor: "#d92323",
  // manifest: "/manifest.json", // Uncomment for PWA
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <head>
        {/* ✅ Schema.org Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              name: "Top Briefing",
              url: "https://www.topbriefing.in",
              logo: "https://www.topbriefing.in/logo.png",
              sameAs: [
                "https://x.com/Topbriefing",
                "https://facebook.com/Topbriefing",
                "https://www.instagram.com/Topbriefing",
              ],
              description:
                "Top Briefing is India’s trusted online news platform delivering daily updates in Hindi and English on politics, technology, sports, and entertainment.",
            }),
          }}
        />
      </head>

      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}



// import { Inter } from "next/font/google";
// import "./globals.css";
// import Header from "../components/Header";
// import { AuthProvider } from "../context/AuthContext";

// const inter = Inter({ subsets: ["latin"] });
// export const metadata = {
//   title: "Top Briefing - Latest Breaking News, Headlines & Updates",
//   description:
//     "Stay informed with Top Briefing - your trusted source for breaking news, latest headlines, world events, politics, technology, and more.",
//   keywords:
//     // 🔥 English Keywords
//     "top briefing, breaking news, hindi news, latest headlines, trending news, daily updates, world news, politics, tech news, live updates," +
//     // 🔥 Hindi Keywords
//     " हिंदी न्यूज़, आज की ताजा खबरें, आज की मुख्य खबरें, ताजा समाचार, ब्रेकिंग न्यूज़, हिंदी समाचार, राजनीति समाचार, बॉलीवुड समाचार, क्रिकेट न्यूज़, करंट अफेयर्स, सरकारी नौकरी, शिक्षा समाचार, राशिफल, तकनीकी खबरें, हेल्थ न्यूज़, वायरल न्यूज़, भारत समाचार, आज की बड़ी खबरें, न्यूज़ इन हिंदी, दुनिया की खबरें, आज की खबर, लाइव न्यूज़",

//   authors: [{ name: "Top Briefing Team", url: "https://www.topbriefing.in" }],
//   creator: "Top Briefing",
//   metadataBase: new URL("https://www.topbriefing.in"),

//   openGraph: {
//     title: "Top Briefing - Trusted News Coverage",
//     description:
//       "Get the most relevant and trending news stories daily. Updated regularly with world news, politics, business, and tech.",
//     url: "https://www.topbriefing.in",
//     siteName: "Top Briefing",
//     images: [
//       {
//         url: "https://www.topbriefing.in/logo.png",
//         width: 1200,
//         height: 630,
//         alt: "Top Briefing - Trusted News",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },

//   x: {
//     card: "summary_large_image",
//     site: "https://x.com/Topbriefing", 
//     title: "Top Briefing - Trusted News Coverage",
//     description:
//       "Get daily breaking news, tech, politics, and entertainment in English and Hindi.",
//     images: ["https://www.topbriefing.in/logo.png"],
//   },

//   themeColor: "#d92323",
//   // manifest: "/manifest.json", // Uncomment if using PWA
// };




// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <AuthProvider>
//           <Header />
//           {children}
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }
