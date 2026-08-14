"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment-timezone';
import { FiArrowRight, FiArrowDown } from 'react-icons/fi';

const defaultStory = {
  category: 'BIG STORY',
  title: 'भारत की GDP ग्रोथ दर में सुधार, दुनिया की बड़ी अर्थव्यवस्थाओं में शामिल',
  description: 'वैश्विक चुनौतियों के बावजूद भारत की अर्थव्यवस्था ने दिखाई मजबूती, जानें पूरी रिपोर्ट।',
  date: '02 Aug 2026',
  writerName: 'Top Briefing',
  image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&auto=format&fit=crop&q=80',
  slug: 'india-gdp-growth-rate-improvement'
};

export default function BigStoryBanner({ news = [] }) {

  // console.log("BigStoryBanner news:", news);
  // Show ONLY ONE single top news item
  const activeItem = (news && Array.isArray(news) && news.length > 0)
    ? news[0]
    : defaultStory;

  // Format date cleanly
  const formatDate = (dateVal) => {
    if (!dateVal) return '02 Aug 2026';
    try {
      const d = moment(dateVal);
      if (d.isValid()) {
        return d.format('DD MMM YYYY');
      }
    } catch (e) { }
    return dateVal;
  };

  // Helper to extract clean full description text
  const getCleanDescription = (item) => {
    const rawText = item?.description || item?.details || item?.summary || item?.content;
    if (rawText) {
      const stripped = rawText.replace(/<[^>]*>/g, '').trim();
      if (stripped.length > 0) return stripped;
    }
    if (!news || news.length === 0) {
      return defaultStory.description;
    }
    return '';
  };

  const activeDescription = getCleanDescription(activeItem);
  const formattedDate = formatDate(activeItem?.date || activeItem?.createdAt);
  const activeImage = activeItem?.image || activeItem?.img || activeItem?.image_url || defaultStory.image;

  return (
    <section className="w-full mt-1 bg-[linear-gradient(180deg,#FF9933_0%,#FF9933_28%,#FFFFFF_38%,#FFFFFF_62%,#138808_72%,#138808_100%)] text-slate-900 relative overflow-hidden border-b border-emerald-700/20 shadow-xl py-2 lg:py-0">

      {/* Ashoka Chakra Background Watermark in Center White Stripe */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.07] z-0">
        <svg width="360" height="360" viewBox="0 0 100 100" className="text-[#000080] fill-current">
          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="7" fill="currentColor" />
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={50 + 46 * Math.cos((i * 15 * Math.PI) / 180)}
              y2={50 + 46 * Math.sin((i * 15 * Math.PI) / 180)}
              stroke="currentColor"
              strokeWidth="1.2"
            />
          ))}
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-3 sm:px-4 md:px-8 relative z-10">

        {/* ========================================================
            MOBILE & TABLET CARD DESIGN (< lg) - Single News Only
           ======================================================== */}
        <div className="block lg:hidden my-2">
          <Link
            href={`/news/${activeItem.slug || 'detail'}`}
            className="relative block w-full h-[280px] sm:h-[340px] rounded-2xl overflow-hidden shadow-2xl border border-amber-500/40 group"
          >
            {/* Background Image */}
            <Image
              src={activeImage}
              alt={activeItem.title || 'Big Story'}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/50 to-transparent p-4 sm:p-5 flex flex-col justify-between z-10">

              {/* Top Left Badge */}
              <div className="flex items-center justify-between">
                <span className="bg-[#FF9933] text-slate-950 text-[10px] sm:text-xs font-black px-3 py-1 rounded uppercase tracking-wider shadow-md border border-amber-300/50">
                  {activeItem.category || activeItem.categoryName || 'BIG STORY'}
                </span>
              </div>

              {/* Bottom Overlay Content */}
              <div className="flex flex-col gap-1.5">
                {/* Headline */}
                <h2 className="text-base sm:text-xl font-extrabold text-white leading-snug drop-shadow-md group-hover:text-amber-300 text-bottom transition-colors line-clamp-2">
                  {activeItem.title}
                </h2>

                {/* Date & Read Time */}
                <div className="flex items-center gap-2 text-[11px] sm:text-xs text-zinc-200 font-medium opacity-90">
                  <span>{formattedDate}</span>
                  <span>•</span>
                  <span>3 min read</span>
                </div>
              </div>

            </div>
          </Link>
        </div>

        {/* ========================================================
            DESKTOP EDITORIAL LAYOUT (lg:) - Single News Only
           ======================================================== */}
        <div className="hidden lg:grid grid-cols-12 min-h-[360px] lg:min-h-[400px] items-stretch">

          {/* Left Text Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between py-6 pr-0 lg:pr-8 z-20 relative">

            {/* Tag & Title Container */}
            <div className="flex flex-col gap-4">

              {/* Category Tag Line & Clean Date */}
              <div className="flex items-center gap-2 pt-1">
                <span className="w-8 h-[4px] bg-[#000080] inline-block rounded-full"></span>
                <span className="text-[#000080] font-black text-xs tracking-[0.15em] uppercase">
                  {activeItem.category || activeItem.categoryName || 'BIG STORY'}
                </span>
                {formattedDate && (
                  <span className="text-[11px] text-slate-800 font-mono font-bold bg-white/80 backdrop-blur-sm px-3 py-1 rounded-md border border-slate-300/80 shadow-sm ml-auto">
                    {formattedDate}
                  </span>
                )}
              </div>

              {/* Headline */}
              <h1 className="text-xl mt-4 sm:text-2xl lg:text-3xl font-extrabold text-slate-950 leading-snug tracking-tight drop-shadow-sm">
                {activeItem.title}
              </h1>

              {/* Subtitle / Excerpt */}
              {(activeItem?.shortDescription || activeDescription) && (
                <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                  {activeItem?.shortDescription || activeDescription}
                </p>
              )}
            </div>

            {/* Read Story Link */}
            <div className="mt-6 pt-4 border-t border-slate-900/10 flex items-center justify-between gap-4 pb-1">
              <Link
                href={`/news/${activeItem.slug || 'detail'}`}
                className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#000080] hover:text-[#FF671F] transition-colors uppercase group border-b-2 border-[#000080] pb-1"
              >
                <span>READ FULL STORY</span>
                <FiArrowRight className="text-sm text-[#000080] group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </div>

          </div>

          {/* Right Image Column (6 Cols) - Complete Image without cropping */}
          <div className="lg:col-span-6 relative w-full min-h-[260px] sm:min-h-[320px] lg:min-h-[380px] flex items-center justify-center p-3 sm:p-5 overflow-hidden">

            {/* Ambient Soft Blur Backdrop */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <Image
                src={activeImage}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-0 blur-3xl scale-125 pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Main Foreground Image */}
            <div className="relative w-full h-full min-h-[240px] max-h-[360px] flex items-center justify-center z-10">
              <img
                src={activeImage}
                alt={activeItem.title || 'Big Story News'}
                className="max-w-full max-h-[360px] w-auto h-auto object-contain rounded-xl shadow-2xl border-2 border-white/80 transition-all duration-300 hover:scale-[1.02]"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

