"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment-timezone';
import { FiChevronDown, FiArrowRight } from 'react-icons/fi';
import { FaCalendarAlt, FaUserEdit, FaFolderOpen } from 'react-icons/fa';

const defaultCategories = [
  {
    name: 'राजनीति',
    badgeIcon: '🏛️',
    count: '12 खबरें',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=80',
    slug: 'राजनीति'
  },
  {
    name: 'खेल',
    badgeIcon: '🏏',
    count: '15 खबरें',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format&fit=crop&q=80',
    slug: 'खेल'
  },
  {
    name: 'बिजनेस',
    badgeIcon: '📈',
    count: '10 खबरें',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80',
    slug: 'बिजनेस'
  },
  {
    name: 'टेक',
    badgeIcon: '💻',
    count: '08 खबरें',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80',
    slug: 'टेक'
  },
  {
    name: 'मनोरंजन',
    badgeIcon: '🎬',
    count: '12 खबरें',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    slug: 'मनोरंजन'
  },
  {
    name: 'लाइफस्टाइल',
    badgeIcon: '✨',
    count: '06 खबरें',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80',
    slug: 'लाइफस्टाइल'
  }
];

const fallbackArticlesByCategory = {
  'राजनीति': [
    {
      title: 'संसद का मानसून सत्र: कई अहम विधेयकों पर चर्चा जारी',
      description: 'संसद भवन में आज राजनीतिक दलों के बीच कई महत्वपूर्ण मुद्दों और विधेयकों पर तीखी बहस हुई...',
      category: 'राजनीति',
      date: '02 Aug 2026',
      writerName: 'Ankit',
      image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=80',
      slug: 'monsoon-session-parliament-debate'
    },
    {
      title: 'चुनाव आयोग का नया निर्देश, पारदर्शिता बढ़ाने पर जोर',
      description: 'मुख्य निर्वाचन आयुक्त ने सभी राज्यों को मतदान प्रक्रिया में आधुनिक तकनीकों के उपयोग का निर्देश दिया...',
      category: 'राजनीति',
      date: '02 Aug 2026',
      writerName: 'Editorial Desk',
      image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&auto=format&fit=crop&q=80',
      slug: 'election-commission-new-guidelines'
    }
  ],
  'खेल': [
    {
      title: 'टीम इंडिया ने जीता रोमांचक टी20 मुकाबला',
      description: 'भारतीय क्रिकेट टीम ने आखिरी ओवर में शानदार प्रदर्शन करते हुए मुकाबला अपने नाम कर लिया...',
      category: 'खेल',
      date: '02 Aug 2026',
      writerName: 'Sports Desk',
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format&fit=crop&q=80',
      slug: 'team-india-t20-thrilling-win'
    },
    {
      title: 'ओलंपिक में भारत के एथलीटों ने रचा नया इतिहास',
      description: 'भारतीय एथलीटों ने अपने प्रदर्शन से सभी का दिल जीत लिया और नया राष्ट्रीय रिकॉर्ड बनाया...',
      category: 'खेल',
      date: '02 Aug 2026',
      writerName: 'Sports Desk',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80',
      slug: 'olympic-indian-athletes-history'
    }
  ],
  'बिजनेस': [
    {
      title: 'शेयर बाजार में रिकॉर्ड तेजी, सेंसेक्स नए शिखर पर',
      description: 'भारतीय शेयर बाजार में आज जबरदस्त उछाल देखने को मिला और निवेशकों की संपत्ति में इजाफा हुआ...',
      category: 'बिजनेस',
      date: '02 Aug 2026',
      writerName: 'Biz Desk',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80',
      slug: 'stock-market-record-high-sensex'
    },
    {
      title: 'आरबीआई ने ब्याज दरों को रखा यथावत, अर्थव्यवस्था मजबूत',
      description: 'रिजर्व बैंक ऑफ इंडिया ने मौद्रिक नीति समिति की बैठक के बाद रेपो रेट में बदलाव न करने का निर्णय लिया...',
      category: 'बिजनेस',
      date: '02 Aug 2026',
      writerName: 'Biz Desk',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80',
      slug: 'rbi-repo-rate-unchanged-update'
    }
  ],
  'टेक': [
    {
      title: 'स्मार्टफोन की दुनिया में क्रांति: नया AI प्रोसेसर लॉन्च',
      description: 'टेक कंपनियों ने अगली पीढ़ी का सुपर-फास्ट AI चिपसेट पेश किया जो फोन की स्पीड को दोगुना करेगा...',
      category: 'टेक',
      date: '02 Aug 2026',
      writerName: 'Tech Desk',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80',
      slug: 'next-gen-ai-chipset-launch'
    },
    {
      title: '5G नेटवर्क का विस्तार, अब हर छोटे शहर में तेज इंटरनेट',
      description: 'दूरसंचार कंपनियों ने देश के 500 से अधिक नए शहरों में अल्ट्रा-फास्ट 5G सेवाएं शुरू कर दी हैं...',
      category: 'टेक',
      date: '02 Aug 2026',
      writerName: 'Tech Desk',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80',
      slug: '5g-network-expansion-india'
    }
  ],
  'मनोरंजन': [
    {
      title: 'बॉलीवुड की बड़ी फिल्म ने पहले दिन बॉक्स ऑफिस पर मचाया धमाल',
      description: 'सिनेमाघरों में दर्शकों की भारी भीड़ देखने को मिली और फिल्म ने बंपर ओपनिंग दर्ज की...',
      category: 'मनोरंजन',
      date: '02 Aug 2026',
      writerName: 'Bollywood Desk',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
      slug: 'bollywood-big-movie-box-office-opening'
    },
    {
      title: 'ओटीटी पर इस वीकेंड रिलीज हो रही हैं ये नई रोमांचक सीरीज',
      description: 'वीकेंड पर मनोरंजन का मज़ा दोगुना करने आ रही हैं कई थ्रिलर और ड्रामा वेब सीरीज...',
      category: 'मनोरंजन',
      date: '02 Aug 2026',
      writerName: 'Bollywood Desk',
      image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&auto=format&fit=crop&q=80',
      slug: 'ott-new-releases-this-weekend'
    }
  ],
  'लाइफस्टाइल': [
    {
      title: 'हेल्दी लाइफस्टाइल के लिए अपनाएं ये 5 आसान आदतें',
      description: 'रोजमर्रा की जिंदगी में इन छोटे बदलावों से आप खुद को फिट और ऊर्जावान बनाए रख सकते हैं...',
      category: 'लाइफस्टाइल',
      date: '02 Aug 2026',
      writerName: 'Lifestyle Desk',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80',
      slug: 'healthy-lifestyle-tips-daily-habits'
    }
  ]
};

export default function CategoryGridSection({ news = {} }) {
  const [selectedCategory, setSelectedCategory] = useState('सभी');
  const [visibleCount, setVisibleCount] = useState(6);

  // Dynamic extra categories from API news object
  const newsCategoryKeys = Object.keys(news).filter(
    key => Array.isArray(news[key]) && news[key].length > 0
  );

  const extraCategories = newsCategoryKeys
    .filter(key => !defaultCategories.some(cat => cat.name === key))
    .map(key => ({
      name: key,
      badgeIcon: '📰',
      count: `${String(news[key].length).padStart(2, '0')} खबरें`,
      image: news[key][0]?.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop&q=80',
      slug: key
    }));

  const allCategoriesList = [...defaultCategories, ...extraCategories];

  // Helper to compile news items for active selection
  const getArticlesForCategory = (catName) => {
    if (catName === 'सभी') {
      let combined = [];
      Object.keys(news).forEach(k => {
        if (Array.isArray(news[k])) {
          combined = [...combined, ...news[k]];
        }
      });
      // Add fallbacks if empty or small
      if (combined.length < 6) {
        Object.values(fallbackArticlesByCategory).forEach(arr => {
          combined = [...combined, ...arr];
        });
      }
      return combined;
    }

    const fromApi = news[catName] || [];
    const fromFallback = fallbackArticlesByCategory[catName] || [];
    const merged = [...fromApi, ...fromFallback];

    // deduplicate by title or slug
    const unique = merged.filter((item, index, self) =>
      index === self.findIndex((t) => t.slug === item.slug || t.title === item.title)
    );

    return unique.length > 0 ? unique : fromFallback;
  };

  const currentCategoryArticles = getArticlesForCategory(selectedCategory);
  const displayedArticles = currentCategoryArticles.slice(0, visibleCount);
  const hasMore = visibleCount < currentCategoryArticles.length;

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const handleCategorySelect = (catName) => {
    setSelectedCategory(catName);
    setVisibleCount(6);
  };

  return (
    <section className="w-full my-8">
      {/* 1. Section Top Bar */}
      <div className="flex items-center justify-between mb-5 border-b border-gray-200 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-6 bg-[#cc0000] rounded-full inline-block"></span>
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
            कैटेगरी से खबरें
          </h2>
        </div>

        <Link
          href="/news/category/all"
          className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-full transition flex items-center gap-1 shadow-2xs"
        >
          <span>सभी देखें</span>
          <FiArrowRight className="text-xs" />
        </Link>
      </div>

      {/* 2. Top Category Quick Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-6">
        {allCategoriesList.map((cat, index) => {
          const categoryNewsList = news[cat.name];
          const latestCatImage = categoryNewsList && categoryNewsList[0]?.image
            ? categoryNewsList[0].image
            : cat.image;

          const count = categoryNewsList && categoryNewsList.length > 0
            ? `${String(categoryNewsList.length).padStart(2, '0')} खबरें`
            : cat.count;

          const isSelected = selectedCategory === cat.name;

          return (
            <button
              key={index}
              onClick={() => handleCategorySelect(cat.name)}
              className={`group text-left bg-white rounded-xl overflow-hidden border transition-all flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'border-red-600 ring-2 ring-red-500/20 shadow-md'
                  : 'border-gray-200 hover:border-red-300 hover:shadow-md'
              }`}
            >
              {/* Category Pill Tag Header */}
              <div className={`p-2 flex items-center justify-between border-b ${
                isSelected ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'
              }`}>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{cat.badgeIcon}</span>
                  <span className={`font-bold text-xs ${isSelected ? 'text-red-600' : 'text-gray-800 group-hover:text-red-600'}`}>
                    {cat.name}
                  </span>
                </div>
              </div>

              {/* Thumbnail Image */}
              <div className="relative w-full h-28 overflow-hidden bg-gray-100">
                <Image
                  src={latestCatImage}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Footer Count Bar */}
              <div className="p-2 bg-white flex items-center justify-between text-xs font-semibold text-gray-500 border-t border-gray-100">
                <span>{count}</span>
                <span className={`transition-transform ${isSelected ? 'text-red-600 font-bold translate-x-1' : 'text-gray-400 group-hover:translate-x-1'}`}>
                  ›
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Filter Tabs (सभी + Categories) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-5 no-scrollbar scroll-smooth">
        <button
          onClick={() => handleCategorySelect('सभी')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap border shrink-0 ${
            selectedCategory === 'सभी'
              ? 'bg-[#cc0000] text-white border-[#cc0000] shadow-sm'
              : 'bg-white text-gray-700 border-gray-300 hover:border-red-400 hover:text-red-600'
          }`}
        >
          🔥 सभी (All News)
        </button>

        {allCategoriesList.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => handleCategorySelect(cat.name)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap border shrink-0 flex items-center gap-1.5 ${
              selectedCategory === cat.name
                ? 'bg-[#cc0000] text-white border-[#cc0000] shadow-sm'
                : 'bg-white text-gray-700 border-gray-300 hover:border-red-400 hover:text-red-600'
            }`}
          >
            <span>{cat.badgeIcon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* 4. Category News Grid Cards */}
      {displayedArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedArticles.map((item, idx) => (
            <Link
              key={idx}
              href={`/news/${item.slug || 'detail'}`}
              className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative w-full h-44 overflow-hidden bg-gray-100">
                  <Image
                    src={item.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop&q=80'}
                    alt={item.title || 'Category News'}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-[#cc0000] text-white text-[10px] font-extrabold px-2.5 py-1 rounded shadow-sm uppercase tracking-wider">
                    {item.category || selectedCategory}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-extrabold text-base text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-gray-500 font-normal mt-2 line-clamp-2 leading-relaxed">
                      {item.description.replace(/<[^>]*>/g, '')}
                    </p>
                  )}
                </div>
              </div>

              {/* Meta Date & Writer Footer */}
              <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-medium">
                <span className="flex items-center gap-1">
                  <FaCalendarAlt className="text-[10px] text-red-500" />
                  {item.createdAt
                    ? moment.utc(item.createdAt).tz("Asia/Kolkata").format("DD MMM YYYY")
                    : (item.date || '02 Aug 2026')}
                </span>
                <span className="flex items-center gap-1">
                  <FaUserEdit className="text-[10px] text-gray-400" />
                  {item.writerName || 'Ankit'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-xl border border-gray-200 text-center text-gray-500 shadow-xs">
          <FaFolderOpen className="text-3xl text-gray-300 mx-auto mb-2" />
          <p className="font-semibold text-sm">इस श्रेणी में फ़िलहाल कोई समाचार उपलब्ध नहीं है।</p>
        </div>
      )}

      {/* 5. Show More / Category News Link Section */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        {hasMore && (
          <button
            onClick={handleShowMore}
            className="w-full sm:w-auto bg-white border border-gray-300 hover:border-red-600 text-gray-800 hover:text-red-600 font-extrabold text-xs px-6 py-3 rounded-lg shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>और खबरें दिखाएं (Show More)</span>
            <FiChevronDown className="text-sm" />
          </button>
        )}

        <Link
          href={`/news/category/${encodeURIComponent(selectedCategory === 'सभी' ? 'all' : selectedCategory)}`}
          className="w-full sm:w-auto bg-[#cc0000] hover:bg-red-700 text-white font-extrabold text-xs px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
        >
          <span>
            {selectedCategory === 'सभी'
              ? 'सभी कैटेगरी की खबरें देखें'
              : `${selectedCategory} श्रेणी की सभी खबरें देखें`}
          </span>
          <FiArrowRight className="text-sm" />
        </Link>
      </div>
    </section>
  );
}
