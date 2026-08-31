"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate as formatCustomDate } from '../../utils/dateFormatter';
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getImageUrl } from '../../utils/imageUrl';

export default function HeroSlider({ slides = [] }) {
  const displaySlides = slides || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % displaySlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [displaySlides.length, isHovered]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displaySlides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + displaySlides.length) % displaySlides.length);
  };

  const currentSlide = displaySlides[currentIndex] ;

  const formatDate = (item) => {
    if (item?.createdAt) {
      return formatCustomDate(item.createdAt, "DD MMM YYYY, hh:mm A");
    }
    return item?.date || '05 Aug 2026, 06:41 PM';
  };

  return (
    <div 
      className="lg:col-span-6 bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm flex flex-col justify-between relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slide Item Container */}
      <Link href={`/news/${currentSlide.slug || 'detail'}`} className="relative block w-full aspect-[16/10] sm:h-[320px] md:h-[360px] overflow-hidden bg-gray-900">
        <Image
          key={currentIndex}
          // src={currentSlide.image || defaultSlides[0].image}
          src={getImageUrl(currentSlide?.image)}
          alt={currentSlide.title || 'Hero Main News'}
          fill
          priority={currentIndex === 0}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px"
          className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 animate-fadeIn"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-5 flex flex-col justify-end">
          {/* Red Pill Category Tag */}
          <div>
            <span className="bg-[#cc0000] text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider shadow-sm">
              {currentSlide.category || 'अंतरराष्ट्रीय'}
            </span>
          </div>

          {/* Big Headline */}
          <h1 className="text-lg sm:text-xl font-extrabold text-white mt-2 leading-snug group-hover:text-red-200 transition-colors drop-shadow-md">
            {currentSlide.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xs text-gray-300 font-normal mt-1.5 line-clamp-2 leading-relaxed opacity-90">
            {currentSlide.shortDescription?.replace(/<[^>]*>/g, '') || defaultSlides[0].description}
          </p>

          {/* Meta Date & Writer */}
          <div className="flex items-center gap-3 text-[11px] text-gray-300 font-medium mt-3">
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-[10px] text-red-400" />
              {formatDate(currentSlide)}
            </span>
            <span>|</span>
            <span>{currentSlide.writerName || 'Saurav kumar'}</span>
          </div>
        </div>
      </Link>

      {/* Prev / Next Floating Arrows */}
      <button
        onClick={(e) => { e.preventDefault(); handlePrev(); }}
        aria-label="Previous Hero Slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-red-600 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md cursor-pointer z-10"
      >
        <FaChevronLeft className="text-xs" />
      </button>

      <button
        onClick={(e) => { e.preventDefault(); handleNext(); }}
        aria-label="Next Hero Slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-red-600 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md cursor-pointer z-10"
      >
        <FaChevronRight className="text-xs" />
      </button>

      {/* Pagination Dots Footer */}
      <div className="bg-white py-2.5 flex items-center justify-center gap-2 border-t border-gray-100 z-10">
        {displaySlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 cursor-pointer ${
              currentIndex === idx
                ? 'w-5 h-2 rounded-full bg-red-600'
                : 'w-2 h-2 rounded-full bg-gray-300 hover:bg-red-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
