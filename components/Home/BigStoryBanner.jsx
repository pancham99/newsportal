"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiArrowDown } from 'react-icons/fi';

const defaultStories = [
  {
    category: 'BIG STORY',
    title: 'भारत की GDP ग्रोथ दर में सुधार, दुनिया की बड़ी अर्थव्यवस्थाओं में शामिल',
    description: 'वैश्विक चुनौतियों के बावजूद भारत की अर्थव्यवस्था ने दिखाई मजबूती, जानें पूरी रिपोर्ट।',
    date: '02 Aug 2026',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&auto=format&fit=crop&q=80',
    slug: 'india-gdp-growth-rate-improvement'
  },
  {
    category: 'BIG STORY',
    title: 'अमेरिका ने दागा ईरान पर हमला... ट्रंप बोले ईरान की अपील पर किया हमला',
    description: 'कास्तिलो राष्ट्रपति डोनाल्ड ट्रंप ने दावा किया है कि अमेरिका और इज़राइल द्वारा ईरान संगठित सैन्य हमले की घोषणा...',
    date: '02 Aug 2026',
    image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1600&auto=format&fit=crop&q=80',
    slug: 'us-iran-strike-trump-statement'
  },
  {
    category: 'BIG STORY',
    title: 'अंतरिक्ष में नया मुकाम: भारत का नया ISRO मिशन हुआ सफल',
    description: 'भारतीय अंतरिक्ष अनुसंधान संगठन ने एक साथ 12 उपग्रहों को कक्षा में स्थापित कर इतिहास रचा...',
    date: '02 Aug 2026',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80',
    slug: 'isro-satellite-launch-success'
  },
  {
    category: 'BIG STORY',
    title: 'टेक क्रांति: एआई और सेमीकंडक्टर निर्माण में भारत का बड़ा कदम',
    description: 'देश में नए सेमीकंडक्टर प्लांट की शुरुआत के साथ ही हजारों नौकरियों के नए अवसर पैदा होंगे...',
    date: '02 Aug 2026',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&auto=format&fit=crop&q=80',
    slug: 'tech-ai-semiconductor-revolution'
  },
  {
    category: 'BIG STORY',
    title: 'ओलंपिक 2026: भारतीय दल ने जीता ऐतिहासिक स्वर्ण पदक',
    description: 'फाइनल मुकाबले में शानदार प्रदर्शन के साथ भारत के खाते में आया साल का पहला स्वर्ण पदक...',
    date: '02 Aug 2026',
    image: 'https://images.unsplash.com/photo-1569517282132-25d22f4573e6?w=1600&auto=format&fit=crop&q=80',
    slug: 'olympics-india-gold-medal-victory'
  }
];

export default function BigStoryBanner({ news = [] }) {
  const stories = (news && news.length > 0)
    ? news.slice(0, 5)
    : defaultStories;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (stories.length <= 1) return;
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % stories.length);
        setFade(true);
      }, 250);
    }, 6000);
    return () => clearInterval(timer);
  }, [stories.length]);

  const handleManualSelect = (index) => {
    if (index === currentIndex) return;
    setFade(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setFade(true);
    }, 200);
  };

  const activeItem = stories[currentIndex] || defaultStories[0];

  return (
    <section className="w-full bg-[#08080a] text-white relative overflow-hidden border-b border-zinc-800/70 shadow-lg">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[280px] sm:min-h-[300px] lg:min-h-[320px] items-stretch">
          
          {/* Left Text Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between py-4 lg:py-5 pr-0 lg:pr-6 z-20 relative">
            
            {/* Tag & Title Container */}
            <div className={`transition-all duration-300 transform ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
              
              {/* Category Tag Line */}
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-[2px] bg-[#cc0000] inline-block"></span>
                <span className="text-[#cc0000] font-black text-[11px] tracking-[0.2em] uppercase">
                  BIG STORY
                </span>
              </div>

              {/* Editorial Headline */}
              <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
                {activeItem.title}
              </h1>

              {/* Subtitle / Excerpt */}
              <p className="text-xs text-zinc-300 font-normal mt-2 line-clamp-2 leading-relaxed max-w-lg">
                {activeItem.description || activeItem.details || defaultStories[0].description}
              </p>
            </div>

            {/* Read Story Link & Pagination Controls */}
            <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-3">
              
              {/* Read Full Story Button */}
              <Link
                href={`/news/${activeItem.slug || 'detail'}`}
                className="inline-flex items-center gap-2 text-[11px] font-black tracking-widest text-white hover:text-red-400 transition-colors uppercase group border-b-2 border-[#cc0000] pb-1"
              >
                <span>READ FULL STORY</span>
                <FiArrowRight className="text-xs text-red-500 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              {/* Pagination Numbers & Progress Lines */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[11px] font-bold tracking-wider text-zinc-400 font-mono">
                  <span className="text-red-500 font-extrabold">0{currentIndex + 1}</span> / 0{stories.length}
                </span>

                <div className="flex items-center gap-1">
                  {stories.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleManualSelect(idx)}
                      className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                        currentIndex === idx ? 'w-5 bg-[#cc0000]' : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                      }`}
                      aria-label={`Go to story ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Right Image Banner Column (6 Cols) */}
          <div className="lg:col-span-6 relative w-full h-[200px] sm:h-[240px] lg:h-full overflow-hidden">
            <div className={`w-full h-full relative transition-all duration-500 ${fade ? 'opacity-100 scale-100' : 'opacity-30 scale-102'}`}>
              <Image
                src={activeItem.image || defaultStories[0].image}
                alt={activeItem.title || 'Big Story News'}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />

              {/* Smooth Editorial Fade Mask onto background */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent lg:hidden" />
              <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#08080a] via-[#08080a]/40 to-transparent" />
            </div>
          </div>

          {/* Far Right Scroll Sidebar Indicator (1 Col - Desktop) */}
          <div className="hidden lg:flex lg:col-span-1 items-center justify-center border-l border-zinc-800/60 py-4 text-zinc-500 text-[9px] font-bold tracking-widest uppercase">
            <div className="flex flex-col items-center gap-3">
              <span style={{ writingMode: 'vertical-rl' }} className="rotate-180 tracking-[0.2em] text-zinc-400 font-semibold">
                SCROLL TO DISCOVER
              </span>
              <div className="w-6 h-6 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-300 animate-bounce shadow-md">
                <FiArrowDown className="text-[10px]" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
