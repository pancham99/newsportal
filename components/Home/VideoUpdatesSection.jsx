"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment-timezone';
import { FaPlay, FaPaperPlane, FaTimes } from 'react-icons/fa';
import { HiMailOpen } from 'react-icons/hi';
import { base_api_url } from "../../config/config";

const defaultVideos = [
  {
    title: 'इसरो ने सफलतापूर्वक लॉन्च किया नया रॉकेट',
    duration: '02:45',
    date: '02 Aug 2026',
    image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=600&auto=format&fit=crop&q=80',
    videos: 'https://www.youtube.com/watch?v=7uoHwzEtXWU',
    slug: 'isro-rocket-launch'
  },
  {
    title: 'भारी बारिश से कई इलाकों में जलभराव',
    duration: '01:35',
    date: '02 Aug 2026',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&auto=format&fit=crop&q=80',
    videos: 'https://www.youtube.com/watch?v=auywRBJqU54',
    slug: 'heavy-rain-waterlogging'
  },
  {
    title: 'भारत की शानदार जीत, देखें मैच हाइलाइट्स',
    duration: '03:10',
    date: '02 Aug 2026',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format&fit=crop&q=80',
    videos: 'https://www.youtube.com/watch?v=35_lOHN_x_o',
    slug: 'india-match-highlights'
  }
];

function getYouTubeInfo(url, fallbackImg) {
  if (!url) return { videoId: null, thumbnail: fallbackImg, embedUrl: null };
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  const videoId = (match && match[2] && match[2].length === 11) ? match[2] : null;

  return {
    videoId,
    thumbnail: videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : fallbackImg,
    embedUrl: videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url,
  };
}

export default function VideoUpdatesSection() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeModalVideo, setActiveModalVideo] = useState(null);

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/video/getall`);
        if (res.ok) {
          const data = await res.json();
          const fetchedList = data?.data || data?.videos || [];
          const activeList = fetchedList.filter(item => item?.status !== 'deactive');
          if (activeList.length > 0) {
            setVideos(activeList);
          } else {
            setVideos(defaultVideos);
          }
        } else {
          setVideos(defaultVideos);
        }
      } catch (err) {
        console.error("Video API fetch error:", err);
        setVideos(defaultVideos);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const displayVideos = (videos && videos.length > 0 ? videos : defaultVideos).slice(0, 3);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleOpenVideo = (video, info) => {
    if (info.embedUrl) {
      setActiveModalVideo({
        title: video.title,
        embedUrl: info.embedUrl
      });
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
        
        {/* Left Side: 3 Dynamic YouTube Video Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {displayVideos.map((video, index) => {
            const rawUrl = video.videos || video.videoUrl || video.url || '';
            const defaultImg = video.image || defaultVideos[index % 3].image;
            const ytInfo = getYouTubeInfo(rawUrl, defaultImg);

            const displayDate = video.createdAt
              ? moment.utc(video.createdAt).tz("Asia/Kolkata").format("DD MMM YYYY")
              : (video.date || defaultVideos[index % 3].date);

            const displayDuration = video.duration || (index === 0 ? '02:45' : index === 1 ? '01:35' : '03:10');

            return (
              <div
                key={video.id || index}
                onClick={() => handleOpenVideo(video, ytInfo)}
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
              >
                {/* Video Thumbnail Box with Play Overlay */}
                <div className="relative w-full h-36 overflow-hidden bg-black">
                  <Image
                    src={ytInfo.thumbnail || defaultImg}
                    alt={video.title || "Video thumbnail"}
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
                    {displayDuration}
                  </span>
                </div>

                {/* Title & Date */}
                <div className="p-3 flex flex-col justify-between flex-1">
                  <h3 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                    {video.title}
                  </h3>
                  <span className="text-[11px] font-medium text-gray-400 mt-2 block">
                    {displayDate}
                  </span>
                </div>
              </div>
            );
          })}
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

      {/* YouTube Video Player Modal Popup */}
      {activeModalVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800">
            {/* Modal Top Header */}
            <div className="flex items-center justify-between p-3 bg-gray-900 border-b border-gray-800 text-white">
              <h3 className="font-bold text-sm truncate max-w-xl">
                {activeModalVideo.title}
              </h3>
              <button
                onClick={() => setActiveModalVideo(null)}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition"
              >
                <FaTimes className="text-base" />
              </button>
            </div>

            {/* Responsive Iframe Container */}
            <div className="relative w-full aspect-video">
              <iframe
                src={activeModalVideo.embedUrl}
                title={activeModalVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-none"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
