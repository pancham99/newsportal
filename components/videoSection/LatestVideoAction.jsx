"use client"

import React, { useEffect } from "react";

import VideoCardNew from "./VideoCardNew";
import GenericSwiper from "./GenericSwiper";

const LatestVideosSection = ({ title, subtitle }) => {
  const videoData = [
    {
      id: 1,
      type: "youtube",

      title: "Dark reality of girl",
      videoUrl: "https://www.youtube.com/embed/7uoHwzEtXWU?si=kzzNOEBuvWxjaU1n",
      date: "2025-02-18T10:30:00",
    },
    {
      id: 2,
      type: "youtube",

      title: "WHY DO SOME PEOPLE NEVER GAIN WEIGHT ?",
      videoUrl: "https://www.youtube.com/embed/auywRBJqU54?si=PcDKNYZuKV_kHeVF",
      date: "2025-02-17",
    },

    {
      id: 3,
      type: "youtube",
      title: "Dollar Reaches ₹100 Soon?",
      videoUrl: "https://www.youtube.com/embed/35_lOHN_x_o?si=_ofcAZ571_nBFxPN",
      date: "2025-02-16",
    },
    {
      id: 4,
      type: "youtube",
      title: "P*RN Additions",
      videoUrl: "https://www.youtube.com/embed/4f2UpTcr2h8?si=M3UjznkVIVIosEPk",
      date: "2025-02-16",
    },
    

    {
      id: 5,
      type: "youtube",
      title: "PLEASE SAVE ARAVALI HILLS",
      videoUrl: "https://www.youtube.com/embed/6gE_FiDONKs?si=-RixY5nx2lZb4cGy",
      date: "2025-02-16",
    }

    
  ];


 




  return (
    <section className="w-full bg-[#F6F7F8] md:py-8 py-4">
      <div className="max-w-7xl mx-auto">
       

        <div className="bg-[#f8f9fa] p-2 ">
        
          <div className="">

            <GenericSwiper
              items={videoData}
              slidesToShow={{ mobile: 1.2, tablet: 3, desktop: 5 }}
              renderCard={(video) => (
                <VideoCardNew key={video.id} {...video} />
              )}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default LatestVideosSection;
