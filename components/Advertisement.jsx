"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import bgimage from '../assets/image.jpeg';
import { base_api_url } from "../config/config"

const Advertisement = ({ advertisement, one }) => {

  const [permostion, setPermostion] = useState([]);
  console.log('Permostion component rendered', permostion);

  const get_permostion = async () => {
    try {
      const res = await fetch(`${base_api_url}/api/banner/getall`);
      const data = await res.json();
      // console.log('Fetched banners:', data);
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
    <div className="flex justify-center items-center min-h-[400px] bg-gradient-to-br from-yellow-400 via-white to-gray-300 py-10 px-4 rounded-lg shadow-xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md w-full transform hover:scale-105 transition-transform duration-500">
        <Image
          src={bannerImage}
          alt="Car Sale Promo"
          width={400}
          height={411}
          className="object-cover w-full h-auto"
        />
        {/* <div className="p-4 bg-gradient-to-r from-black to-gray-900 text-white">
          <h2 className="text-2xl font-bold mb-2">Limited Time Offer!</h2>
          <p className="text-lg mb-3">Starting at <span className="font-extrabold text-yellow-400">$49,099</span></p>
          <button className="bg-yellow-400 text-black px-5 py-2 rounded-md font-semibold hover:bg-yellow-500 transition duration-300">
            Contact Now
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Advertisement;
