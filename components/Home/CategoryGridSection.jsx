"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const defaultCategories = [
  {
    name: 'राजनीति',
    badgeBg: 'bg-blue-500',
    badgeIcon: '🔵',
    count: '12 खबरें',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=80',
    slug: 'राजनीति'
  },
  {
    name: 'खेल',
    badgeBg: 'bg-green-500',
    badgeIcon: '🟢',
    count: '15 खबरें',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format&fit=crop&q=80',
    slug: 'खेल'
  },
  {
    name: 'बिजनेस',
    badgeBg: 'bg-amber-500',
    badgeIcon: '🟡',
    count: '10 खबरें',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80',
    slug: 'बिजनेस'
  },
  {
    name: 'टेक',
    badgeBg: 'bg-indigo-500',
    badgeIcon: '🟣',
    count: '08 खबरें',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80',
    slug: 'टेक'
  },
  {
    name: 'मनोरंजन',
    badgeBg: 'bg-rose-500',
    badgeIcon: '🔴',
    count: '12 खबरें',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    slug: 'मनोरंजन'
  },
  {
    name: 'लाइफस्टाइल',
    badgeBg: 'bg-pink-500',
    badgeIcon: '🌸',
    count: '06 खबरें',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80',
    slug: 'लाइफस्टाइल'
  }
];

export default function CategoryGridSection({ news = {} }) {
  // Extract all categories from news object if present
  const newsCategoryKeys = Object.keys(news).filter(key => Array.isArray(news[key]) && news[key].length > 0);
  
  // Combine default categories with any dynamic category keys present in news
  const extraCategories = newsCategoryKeys
    .filter(key => !defaultCategories.some(cat => cat.name === key))
    .map(key => ({
      name: key,
      badgeBg: 'bg-red-500',
      badgeIcon: '📰',
      count: `${String(news[key].length).padStart(2, '0')} खबरें`,
      image: news[key][0]?.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop&q=80',
      slug: key
    }));

  const allDisplayCategories = [...defaultCategories, ...extraCategories];

  return (
    <section className="w-full my-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-1 h-6 bg-[#cc0000] rounded-full inline-block"></span>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">कैटेगरी से खबरें</h2>
        </div>
        <Link href="/news/category/all" className="text-xs font-semibold text-gray-500 hover:text-red-600 transition">
          सभी देखें
        </Link>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {allDisplayCategories.map((cat, index) => {
          const categoryNewsList = news[cat.name];
          const latestCatImage = categoryNewsList && categoryNewsList[0]?.image 
            ? categoryNewsList[0].image 
            : cat.image;

          const count = categoryNewsList && categoryNewsList.length > 0 
            ? `${String(categoryNewsList.length).padStart(2, '0')} खबरें` 
            : cat.count;

          return (
            <Link
              key={index}
              href={`/news/category/${cat.slug}`}
              className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Category Pill Tag Header */}
              <div className="p-2 flex items-center gap-1.5 bg-gray-50 border-b border-gray-100">
                <span className="text-sm">{cat.badgeIcon}</span>
                <span className="font-bold text-xs text-gray-800 group-hover:text-red-600 transition-colors">
                  {cat.name}
                </span>
              </div>

              {/* Image */}
              <div className="relative w-full h-32 overflow-hidden bg-gray-100">
                <Image
                  src={latestCatImage}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Footer Bar */}
              <div className="p-2 bg-white flex items-center justify-between text-xs font-semibold text-gray-600 group-hover:text-red-600 transition-colors border-t border-gray-100">
                <span>{count}</span>
                <span className="text-gray-400 group-hover:translate-x-1 transition-transform">›</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
