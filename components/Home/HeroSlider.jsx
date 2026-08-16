"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate as formatCustomDate } from '../../utils/dateFormatter';
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const defaultSlides = [
  {
    category: 'अंतरराष्ट्रीय',
    title: "'छात्रों के साथ अन्याय हुआ, उन्होंने हिंसा नहीं की': GenZ और NEET मुद्दे पर बोले राहुल गांधी, सरकार को घेरा",
    description: 'कास्तिलो राष्ट्रपति डोनाल्ड ट्रंप ने दावा किया है कि अमेरिका और इज़राइल द्वारा ईरान संगठित वह सैन्य हमले के...',
    date: '05 Aug 2026, 06:41 PM',
    writerName: 'Saurav kumar',
    image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1200&auto=format&fit=crop&q=80',
    slug: 'genz-neet-issue-rahul-gandhi'
  },
  {
    category: 'राष्ट्रीय',
    title: 'संसद में हंगामा: विपक्ष ने सरकार से माँगा जवाब',
    description: 'संसद परिसर में विपक्ष के नेताओं ने प्रमुख राष्ट्रीय मुद्दों को लेकर विरोध प्रदर्शन किया...',
    date: '05 Aug 2026, 05:20 PM',
    writerName: 'Ankit',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&auto=format&fit=crop&q=80',
    slug: 'parliament-protest-update'
  },
  {
    category: 'बिजनेस',
    title: 'शेयर बाजार में नया रिकॉर्ड, सेंसेक्स 800 अंक चढ़ा',
    description: 'भारतीय बाजार में चौतरफा खरीदारी से निवेशकों के चेहरे खिले, अर्थव्यवस्था में मजबूती का संकेत...',
    date: '05 Aug 2026, 04:15 PM',
    writerName: 'Biz Desk',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80',
    slug: 'stock-market-rallies-today'
  },
  {
    category: 'खेल',
    title: 'टीम इंडिया का धमाकेदार प्रदर्शन, मैच में बनाई मजबूत पकड़',
    description: 'भारतीय खिलाड़ियों ने शानदार खेल दिखाते हुए प्रतिद्वंद्वी टीम पर दबाव बनाया और बढ़त हासिल की...',
    date: '05 Aug 2026, 03:10 PM',
    writerName: 'Sports Desk',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&auto=format&fit=crop&q=80',
    slug: 'team-india-match-update'
  }
];

export default function HeroSlider({ slides = [] }) {
  const displaySlides = (slides && slides.length > 0)
    ? [...slides, ...defaultSlides].slice(0, 4)
    : defaultSlides;



  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play slider every 5 seconds (pauses on hover)
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

  const currentSlide = displaySlides[currentIndex] || defaultSlides[0];

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
          src={currentSlide.image || defaultSlides[0].image}
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
