"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import bgimage from '../assets/image.jpeg';
import { base_api_url } from "../config/config"

const AdvertisementComp = ({advertisement, one}) => {

   const [permostion, setPermostion] = useState([]);
  console.log('Permostion component rendered', permostion);

  const get_permostion = async () => {
    try {
      const res = await fetch(`${base_api_url}/api/banner/getall`);
      const data = await res.json();
      setPermostion(data.banners);
    } catch (error) {
      console.log(error);
    }
  };

  // ⬇️ Find banner that is promotion type AND active
  const bannerItem = permostion?.filter(
    item => item.bannertype === advertisement && item.status !== 'deactive' && item.status !== 'pending'
  );
  console.log('Banner Item:', bannerItem);


  // If no active promotion, fallback to local image
  const bannerImage = bannerItem[one]?.image || bgimage;

  useEffect(() => {
    get_permostion();
  }, []);
  return (
    <div className="group relative overflow-hidden mr-2  rounded-md ">
      <div className="w-full  group-hover:scale-[1.1] transition-all duration-[1s]">
        <Image
          src={bannerImage}
          alt="Car Sale Promo"
          width={700}
          height={400}
          className="w-full h-36"
        />
  
      </div>
    </div>
  );
};

export default AdvertisementComp;
