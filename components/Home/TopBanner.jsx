"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import bgimage from '../../assets/image.jpeg';
import { base_api_url } from "../../config/config";
import AdBanner from "../AdBanner";

export default function TopBanner() {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  const get_permostion = async () => {
    try {
      const res = await fetch(`${base_api_url}/api/banner/getall`);
      const data = await res.json();
      const banners = data?.banners || [];
      const activeBanner = banners.find(
        item => (item.status === 'active' || item.status === 'Approved') && item.status !== 'deactive' && item.status !== 'pending' && item.image
      );
      setBanner(activeBanner || null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    get_permostion();
  }, []);

  return (
    <div className="w-full mb-6">
      <div className="bg-white rounded-xl border border-gray-200 p-2 shadow-xs flex flex-col items-center justify-center overflow-hidden">
        <span className="text-[10px] font-extrabold tracking-widest text-gray-400 uppercase mb-1.5">
          ADVERTISEMENT
        </span>
        
        {loading ? (
          <div className="w-full h-24 sm:h-28 md:h-32 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-xs text-gray-400">
            Loading Banner...
          </div>
        ) : (banner?.image || bgimage) ? (
          banner?.link || banner?.url ? (
            <a
              href={banner.link || banner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full h-24 sm:h-32 md:h-40 rounded-lg overflow-hidden block group"
            >
              <Image
                src={banner?.image || bgimage?.src || bgimage}
                alt={banner?.title || "Top Advertisement Banner"}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-contain group-hover:scale-102 transition-transform duration-300"
              />
            </a>
          ) : (
            <div className="relative w-full h-24 sm:h-32 md:h-40 rounded-lg overflow-hidden">
              <Image
                src={banner?.image || bgimage?.src || bgimage}
                alt={banner?.title || "Top Advertisement Banner"}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-contain"
              />
            </div>
          )
        ) : (
          <AdBanner adSlot="8002892607" adFormat="horizontal" className="w-full min-h-[90px]" />
        )}
      </div>
    </div>
  );
}
