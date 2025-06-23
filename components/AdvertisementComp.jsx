"use client";

import Image from "next/image";
import React from "react";
import bgimage from '../assets/image.jpeg';
import { base_api_url } from "../config/config";
import useFetch from '../hooks/useFetch';

const AdvertisementComp = ({ advertisement, one }) => {
  const { data } = useFetch(`${base_api_url}/api/banner/getall`);
  const permostion = data?.banners || [];

  const bannerItem = permostion?.filter(
    item => item.bannertype === advertisement && item.status !== 'deactive' && item.status !== 'pending'
  );

  // Banner image मिलेगा तो वही वरना null रखेंगे
  const bannerImage = bannerItem[one]?.image || null;

  return (
    <div className="relative w-full max-w-[900px] h-64 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
      {bannerImage ? (
        <Image
          src={bannerImage}
          alt="Advertisement Banner"
          fill
          className="object-contain"
        />
      ) : (
        <span className="text-gray-500 text-lg font-semibold">ADVERTISEMENT</span>
      )}
    </div>
  );
};

export default AdvertisementComp;
