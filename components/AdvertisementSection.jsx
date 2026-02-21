"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { base_api_url } from "../config/config"
import AdBanner from "../components/AdBanner";

const AdvertisementSection = ({ pageTarget, deviceTarget, placementKey }) => {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const { data } = await axios.get(`${base_api_url}/api/advertisement/bases/input`, {
          params: { pageTarget, deviceTarget, placementKey }
        });
        if (data.success) {
          setBanner(data.banner);
        } else {
          setBanner(null);
        }
      } catch (error) {
        console.error("Error fetching advertisement:", error);
        setBanner(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, [pageTarget, deviceTarget, placementKey]);

  if (loading) return <p className="text-center py-4">Loading advertisement...</p>;

  if (!banner) return <p className="w-full h-48 border border-gray-300 bg-gray-200 flex items-center justify-center">Advertisement</p>;

  return (
    <div className="w-full ">
      <h3 className="text-xs text-gray-600 text-center ">Advertisement</h3>
      <div className="border rounded shadow-md overflow-hidden relative group p-2">



        {/* Video priority over image */}
        {banner.video ? (
          <video
            src={banner.video}
            controls
            className="w-full h-48 object-cover"
          ></video>
        ) : banner.image ? (
          banner.link ? (
            <a href={banner.link} target="_blank" rel="noopener noreferrer">
              <Image
                src={banner.image}
                alt={banner.title || "Advertisement"}
                width={800}
                height={400}
                loading="lazy"
                 quality={80}
                className="w-full h-[230px] object-contain bg-contain group-hover:scale-105 transition-transform duration-500"
              />
            </a>
          ) : (
            <Image
              src={banner.image}
              alt={banner.title || "Advertisement"}
              width={800}
              height={400}
              loading="lazy"
               quality={80}
              className="w-full h-[230px] object-contain bg-contain group-hover:scale-105 transition-transform duration-500"
            />
          )
        ) : (
          <div className="w-full h-48 border border-gray-300 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No media available</span>
             <AdBanner adSlot="8002892607" />
          </div>
        )}

        <div className="p-2 flex justify-center">
          <div>
            {/* <h3 className="font-semibold text-lg">{banner.title}</h3>
          {banner.description && (
            <p className="text-sm text-gray-600">{banner.description}</p>
          )} */}
          {/* <p className="text-xs text-gray-400">Priority: {banner.priority}</p> */}
          {/* <p className="text-xs text-gray-400">Amount: ₹{banner.amount}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementSection;
