"use client";

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import ReactPlayer from 'react-player';
import useFetch from '../hooks/useFetch';
import { base_api_url } from "../config/config";

const ShortVideos = ({
  width = '100%',
  height = '100%',
  controls = true,
  playing = false,
  loop = false,
  muted = false,
}) => {
  const { data, loading, error } = useFetch(`${base_api_url}/api/video/getall`);
  const scrollRef = useRef();

  const activeVideos = (data?.data || []).filter(
    (item) => item?.status === 'active'
  );
  console.log(activeVideos, "activeVideos");

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  if (loading) return <p className="p-4 text-center">Loading videos...</p>;
  if (error) return <p className="p-4 text-center text-red-500">Error loading videos</p>;
  if (activeVideos.length === 0) return <p className="p-4 text-center">No active videos available</p>;

  return (
    <div className="relative w-full bg-slate-700">
      {/* Left button */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full z-10"
      >
        ◀
      </button>

      {/* Right button */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full z-10"
      >
        ▶
      </button>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto p-3 custom-scrollbar"
      >
        {data?.data?.map((item, index) => (
          <div
            key={item.id || index}
            className="min-w-[220px] h-56 max-w-[220px] flex-shrink-0 rounded-lg overflow-hidden shadow-md border border-white"
          >
            <ReactPlayer
              url={item.videos}
              width={width}
              height={height}
              controls={controls}
              playing={playing}
              loop={loop}
              muted={muted}
              style={{ borderRadius: "12px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(ShortVideos), { ssr: false });
