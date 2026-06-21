import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { AuthProvider } from "../context/AuthContext";
import { base_api_url } from "../config/config";
import Footer from '../components/Footer';

const inter = Inter({ subsets: ["latin"] });

export default async function  RootLayout({ children }) {

  const news_data = await fetch(`${base_api_url}/api/all/news`, {
    next: {
      revalidate: 300
    },
  });

  const { news } = await news_data?.json()
  return (
    <html lang="hi">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main>

            <div className="container mx-auto">
            {children}

            </div>
            
            </main>
            <Footer news={news['राजनीति']} />
        </AuthProvider>

        {/* ✅ Plain script — NOT next/script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8439565499673815"
          crossOrigin="anonymous"
        ></script>
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
