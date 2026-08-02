"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import moment from 'moment-timezone';

const defaultLatest = [
  {
    title: 'नई शिक्षा नीति 2026 को कैबिनेट की मंजूरी',
    category: 'राष्ट्रीय',
    date: '02 Aug 2026 | 08:15 AM',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
    slug: 'new-education-policy-2026'
  },
  {
    title: 'दिल्ली में प्रदूषण का स्तर फिर गंभीर श्रेणी में',
    category: 'राज्य',
    date: '02 Aug 2026 | 07:50 AM',
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&auto=format&fit=crop&q=80',
    slug: 'delhi-pollution-update'
  },
  {
    title: 'रुपया मजबूत, डॉलर के मुकाबले 15 पैसे चढ़ा',
    category: 'बिजनेस',
    date: '02 Aug 2026 | 07:30 AM',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80',
    slug: 'rupee-vs-dollar-rate'
  },
  {
    title: 'भारत ने लॉन्च किया अपना स्वदेशी AI मॉडल',
    category: 'टेक',
    date: '02 Aug 2026 | 06:55 AM',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=80',
    slug: 'indias-own-ai-model-launch'
  }
];

export default function LatestNewsGrid({ news = [] }) {
  const displayItems = (news && news.length > 0)
    ? [...news, ...defaultLatest].slice(0, 4)
    : defaultLatest;

  const formatDate = (item, defaultStr) => {
    if (item?.date) return item.date;
    if (item?.createdAt) {
      return moment.utc(item.createdAt).tz("Asia/Kolkata").format("DD MMM YYYY | hh:mm A");
    }
    return defaultStr;
  };

  return (
    <section className="w-full my-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-1 h-6 bg-[#cc0000] rounded-full inline-block"></span>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">लेटेस्ट न्यूज़</h2>
        </div>
        <Link href="/news/category/latest" className="text-xs font-semibold text-gray-500 hover:text-red-600 transition">
          सभी देखें
        </Link>
      </div>

      {/* Main Grid: Left 4 Cards (3/4 width on desktop), Right Ad Box (1/4 width) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Cards Container (3 columns grid inside) */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {displayItems.map((item, index) => (
            <Link 
              key={index}
              href={`/news/${item.slug || 'detail'}`} 
              className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              {/* Image Box */}
              <div className="relative w-full h-36 overflow-hidden bg-gray-100">
                <Image
                  src={item.image || defaultLatest[index % 4].image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 25vw, 250px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 bg-[#cc0000] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm uppercase">
                  {item.category || 'न्यूज़'}
                </span>
              </div>

              {/* Text Body */}
              <div className="p-3 flex flex-col justify-between flex-1">
                <h3 className="font-bold text-sm text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                <span className="text-[11px] font-medium text-gray-400 mt-2 block">
                  {formatDate(item, '02 Aug 2026 | 08:15 AM')}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Side: ADVERTISEMENT Card */}
        <div className="lg:col-span-1 bg-[#f8f9fa] border border-dashed border-gray-300 rounded-xl p-5 flex flex-col items-center justify-center text-center shadow-xs min-h-[220px]">
          <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">
            ADVERTISEMENT
          </span>
          <p className="text-sm font-semibold text-gray-700 mb-1">
            विज्ञापन देने के लिए
          </p>
          <p className="text-sm font-semibold text-gray-700 mb-3">
            संपर्क करें
          </p>
          <a 
            href="mailto:ads@topbriefing.in" 
            className="text-xs font-bold text-red-600 hover:underline bg-red-50 px-3 py-1.5 rounded-full border border-red-100"
          >
            ads@topbriefing.in
          </a>
        </div>
      </div>
    </section>
  );
}
