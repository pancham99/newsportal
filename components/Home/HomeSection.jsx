import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaFire, FaBell, FaCalendarAlt, FaPlay } from 'react-icons/fa';
import moment from 'moment-timezone';
import LatestNewsGrid from './LatestNewsGrid';
import CategoryGridSection from './CategoryGridSection';
import VideoUpdatesSection from './VideoUpdatesSection';
import TopBanner from './TopBanner';
import HeroSlider from './HeroSlider';
import { base_api_url } from '../../config/config';

// Fallback data matching reference image exact text
const defaultHeroMain = {
  category: 'अंतरराष्ट्रीय',
  title: 'अमेरिका ने दागा ईरान पर हमला... ट्रंप बोले ईरान की अपील पर किया हमला',
  description: 'कास्तिलो राष्ट्रपति डोनाल्ड ट्रंप ने दावा किया है कि अमेरिका और इज़राइल द्वारा ईरान संगठित वह सैन्य हमले के...',
  date: '02 Aug 2026, 09:01 AM',
  writerName: 'Ankit',
  image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1200&auto=format&fit=crop&q=80',
  slug: 'us-iran-strike-trump-statement'
};

const defaultMiddleList = [
  {
    title: 'भारत और रूस के बीच नई ऊर्जा डील पर सहमति',
    date: '02 Aug 2026 | 08:20 AM',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400&auto=format&fit=crop&q=80',
    slug: 'india-russia-energy-deal'
  },
  {
    title: 'शेयर बाजार में आई बड़ी गिरावट, निवेशकों की बढ़ी चिंता',
    date: '02 Aug 2026 | 07:10 AM',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&auto=format&fit=crop&q=80',
    slug: 'stock-market-crash-update'
  },
  {
    title: 'चीन की नई तकनीक से दुनिया में हलचल',
    date: '02 Aug 2026 | 07:45 AM',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=80',
    slug: 'china-new-technology'
  },
  {
    title: 'ओलंपिक 2026: भारत को मिला एक और मेडल',
    date: '02 Aug 2026 | 06:40 AM',
    image: 'https://images.unsplash.com/photo-1569517282132-25d22f4573e6?w=400&auto=format&fit=crop&q=80',
    slug: 'olympics-2026-india-medal'
  }
];

const defaultTrendingList = [
  {
    id: 1,
    title: 'मानसून ने पकड़ी रफ्तार, कई राज्यों में भारी बारिश का अलर्ट',
    time: '45 मिनट पहले',
    slug: 'monsoon-alert-heavy-rain'
  },
  {
    id: 2,
    title: 'सुप्रीम कोर्ट का बड़ा फैसला, सरकार को लगा झटका',
    time: '1 घंटा पहले',
    slug: 'supreme-court-decision'
  },
  {
    id: 3,
    title: 'सोने की कीमतों में गिरावट, जानें ताजा रेट',
    time: '2 घंटे पहले',
    slug: 'gold-price-drop'
  },
  {
    id: 4,
    title: 'शेयर बाजार में तेजी, सेंसेक्स 500 अंक चढ़ा',
    time: '3 घंटे पहले',
    slug: 'sensex-rallies-500-points'
  },
  {
    id: 5,
    title: 'टीम इंडिया की शानदार जीत, फैंस में खुशी की लहर',
    time: '4 घंटे पहले',
    slug: 'team-india-victory'
  }
];

const Home = async ({ news = {} }) => {
  // Fetch latest, breaking, and trending API data safely
  let latestNews = [];
  let breakingNews = [];
  let trendingNews = [];

  try {
    const latestRes = await fetch(`${base_api_url}/api/latest/news`, { next: { revalidate: 300 } });
    if (latestRes.ok) {
      const data = await latestRes.json();
      latestNews = data?.latestNews || [];
    }
  } catch (err) {
    console.error("Latest API fetch error", err);
  }

  try {
    const breakingRes = await fetch(`${base_api_url}/api/breaking`, { next: { revalidate: 300 } });
    if (breakingRes.ok) {
      const data = await breakingRes.json();
      breakingNews = data?.news || [];
    }
  } catch (err) {
    console.error("Breaking API fetch error", err);
  }

  try {
    const trendingRes = await fetch(`${base_api_url}/api/trending`, { next: { revalidate: 300 } });
    if (trendingRes.ok) {
      const data = await trendingRes.json();
      trendingNews = data?.news || [];
    }
  } catch (err) {
    console.error("Trending API fetch error", err);
  }

  // Format data with fallbacks matching reference screenshot
  const heroMainItem = latestNews[0] || defaultHeroMain;
  const middleItems = latestNews.length >= 5 ? latestNews.slice(1, 5) : defaultMiddleList;
  const trendingItemsList = trendingNews.length >= 5 ? trendingNews.slice(0, 5) : defaultTrendingList;

  const breakingTickerText = breakingNews.length > 0
    ? breakingNews.map(item => item.title).join(" • ")
    : "भारत और रूस के बीच नई ऊर्जा डील पर सहमति, व्यापार और निवेश बढ़ेगा";

  return (
    <div className="bg-[#f8f9fa] min-h-screen text-gray-800 font-sans relative">

      {/* Floating Sticky Right Subscribe Banner (Desktop/Tablet) */}
      <a 
        href="#subscribe"
        className="hidden sm:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-[#cc0000] text-white py-3 px-1.5 rounded-l-lg font-bold text-xs shadow-xl hover:bg-red-700 transition-all flex-col items-center gap-2 cursor-pointer group"
        style={{ writingMode: 'vertical-rl' }}
      >
        <div className="flex items-center gap-1">
          <span className="rotate-90 inline-block font-extrabold text-sm">›</span>
          <span className="tracking-widest uppercase text-[11px]">SUBSCRIBE</span>
          <FaBell className="text-xs rotate-90 group-hover:scale-110 transition-transform" />
        </div>
      </a>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">

        {/* 0. Top Advertisement Banner */}
        <TopBanner />

        {/* 1. Breaking News Marquee Ticker */}
        <div className="bg-white rounded-lg border border-gray-200 p-1.5 mb-6 shadow-xs flex items-center gap-2">
          {/* Red Pill Badge */}
          <div className="bg-[#cc0000] text-white text-xs font-black px-3 py-1.5 rounded flex items-center gap-1 shrink-0 uppercase tracking-wide">
            <span className="text-amber-300">⚡</span>
            <span>BREAKING NEWS</span>
          </div>

          {/* Marquee Scrolling Ticker */}
          <div className="flex-1 overflow-hidden text-xs md:text-sm font-semibold text-gray-800">
            <Marquee speed={45} pauseOnHover={true} gradient={false}>
              <span className="pr-12">⚡ {breakingTickerText}</span>
            </Marquee>
          </div>

          {/* Nav Control Arrows */}
          <div className="hidden sm:flex items-center gap-1 shrink-0 px-1">
            <button className="w-6 h-6 rounded border border-gray-200 text-gray-500 hover:text-red-600 flex items-center justify-center bg-gray-50">
              <FiChevronLeft className="text-xs" />
            </button>
            <button className="w-6 h-6 rounded border border-gray-200 text-gray-500 hover:text-red-600 flex items-center justify-center bg-gray-50">
              <FiChevronRight className="text-xs" />
            </button>
          </div>
        </div>

        {/* 2. Top Hero & Trending Grid (3 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
          
          {/* Column 1: Main Big Hero Card Slider (~50% width / 6 cols) */}
          <HeroSlider slides={latestNews} />

          {/* Column 2: Middle Sub-List (4 Stacked Cards ~ 25% width / 3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            {middleItems.map((item, idx) => (
              <Link
                key={idx}
                href={`/news/${item.slug || 'detail'}`}
                className="group bg-white rounded-xl p-2.5 border border-gray-200 shadow-sm hover:shadow-md transition-all flex items-center gap-3"
              >
                {/* Thumbnail Image */}
                <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                  <Image
                    src={item.image || defaultMiddleList[idx % 4].image}
                    alt={item.title}
                    fill
                    sizes="80px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Title & Date */}
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <h3 className="font-bold text-xs text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-medium text-gray-400 mt-1 block">
                    {item.createdAt ? moment.utc(item.createdAt).tz("Asia/Kolkata").format("DD MMM YYYY | hh:mm A") : (item.date || defaultMiddleList[idx % 4].date)}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Column 3: Trending News Card (~ 25% width / 3 cols) */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-gray-100">
                <FaFire className="text-red-600 text-base" />
                <h2 className="font-extrabold text-base text-gray-900 tracking-tight">
                  ट्रेंडिंग न्यूज़
                </h2>
              </div>

              {/* Numbered List (1 to 5) */}
              <div className="space-y-3.5">
                {trendingItemsList.map((item, index) => (
                  <Link
                    key={index}
                    href={`/news/${item.slug || 'trending'}`}
                    className="group flex items-start gap-3"
                  >
                    {/* Circle Number Badge */}
                    <div className="w-5 h-5 rounded-full bg-[#cc0000] text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5 shadow-xs">
                      {index + 1}
                    </div>

                    {/* Headline & Relative Time */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-xs text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h3>
                      <span className="text-[10px] font-medium text-gray-400 mt-0.5 block">
                        {item.time || `${index + 1} घंटे पहले`}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* 3. Section 1: Latest News Grid & Ad Card */}
        <LatestNewsGrid news={latestNews} />

        {/* 4. Section 2: News By Category Grid */}
        <CategoryGridSection news={news} />

        {/* 5. Section 3: Video Updates & Newsletter Subscription */}
        <VideoUpdatesSection />

      </div>
    </div>
  );
};

export default Home;










