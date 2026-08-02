"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaPlay, FaPaperPlane } from 'react-icons/fa';
import { HiMailOpen } from 'react-icons/hi';

const defaultVideos = [
  {
    title: 'इसरो ने सफलतापूर्वक लॉन्च किया नया रॉकेट',
    duration: '02:45',
    date: '02 Aug 2026',
    image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=600&auto=format&fit=crop&q=80',
    slug: 'isro-rocket-launch'
  },
  {
    title: 'भारी बारिश से कई इलाकों में जलभराव',
    duration: '01:35',
    date: '02 Aug 2026',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&auto=format&fit=crop&q=80',
    slug: 'heavy-rain-waterlogging'
  },
  {
    title: 'भारत की शानदार जीत, देखें मैच हाइलाइट्स',
    duration: '03:10',
    date: '02 Aug 2026',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format&fit=crop&q=80',
    slug: 'india-match-highlights'
  }
];

export default function VideoUpdatesSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <section className="w-full my-8" id="subscribe">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-1 h-6 bg-[#cc0000] rounded-full inline-block"></span>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">वीडियो अपडेट्स</h2>
        </div>
        <Link href="/news/category/videos" className="text-xs font-semibold text-gray-500 hover:text-red-600 transition">
          सभी देखें
        </Link>
      </div>

      {/* Grid: Left 3 Video Cards (~65% width), Right Newsletter (~35% width) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left Side: 3 Video Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {defaultVideos.map((video, index) => (
            <Link
              key={index}
              href={`/news/${video.slug}`}
              className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Video Thumbnail Box with Play Overlay */}
              <div className="relative w-full h-36 overflow-hidden bg-black">
                <Image
                  src={video.image}
                  alt={video.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 25vw, 250px"
                  className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform pl-0.5">
                    <FaPlay className="text-sm" />
                  </div>
                </div>
                {/* Duration Badge */}
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  {video.duration}
                </span>
              </div>

              {/* Title & Date */}
              <div className="p-3 flex flex-col justify-between flex-1">
                <h3 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                  {video.title}
                </h3>
                <span className="text-[11px] font-medium text-gray-400 mt-2 block">
                  {video.date}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Side: Newsletter Subscribe Card */}
        <div className="lg:col-span-4 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between relative overflow-hidden">
          
          {/* Top content & Envelope Graphic */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-extrabold text-base text-gray-900">
                न्यूज़लेटर सब्सक्राइब करें
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                लेटेस्ट खबरें सीधे अपने इनबॉक्स में पाएं
              </p>
            </div>

            {/* Pink Envelope Graphic Icon */}
            <div className="w-12 h-10 bg-pink-100 rounded-lg flex items-center justify-center text-pink-500 shadow-inner shrink-0 ml-2">
              <HiMailOpen className="text-2xl" />
            </div>
          </div>

          {/* Subscribe Form */}
          <form onSubmit={handleSubscribe} className="mt-4 space-y-3">
            <div>
              <input
                type="email"
                required
                placeholder="आपका ईमेल पता"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-lg outline-none focus:border-red-600 bg-white transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#cc0000] hover:bg-red-700 text-white font-bold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all transform active:scale-98"
            >
              <span>सब्सक्राइब करें</span>
              <FaPaperPlane className="text-xs" />
            </button>

            {subscribed && (
              <p className="text-xs font-bold text-green-600 text-center animate-fade-in">
                ✓ धन्यवाद! आप सब्सक्राइब हो गए हैं।
              </p>
            )}
          </form>
        </div>

      </div>
    </section>
  );
}
