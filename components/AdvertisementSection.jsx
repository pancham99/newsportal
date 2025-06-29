"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const AdvertisementSection = ({ pageTarget, deviceTarget, placementKey }) => {
  const [banner, setBanner] = useState(null);
  console.log("pageTarget", pageTarget);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/advertisement/bases/input", {
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

  if (!banner) return <p className="text-center py-4">No ad available</p>;

  return (
    <div className="w-full p-4">
      <div className="border rounded shadow-md overflow-hidden relative group">
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
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </a>
          ) : (
            <Image
              src={banner.image}
              alt={banner.title || "Advertisement"}
              width={800}
              height={400}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No media available</span>
          </div>
        )}

        <div className="p-2">
          <h3 className="font-semibold text-lg">{banner.title}</h3>
          {banner.description && (
            <p className="text-sm text-gray-600">{banner.description}</p>
          )}
          <p className="text-xs text-gray-400">Priority: {banner.priority}</p>
          <p className="text-xs text-gray-400">Amount: ₹{banner.amount}</p>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementSection;
