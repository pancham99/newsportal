"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronRight } from "react-icons/fa";
import { BsChevronLeft } from "react-icons/bs";
import { base_api_url } from "../config/config";


// const API = "https://bakendtopbrefing.vercel.app/api/youtube/getall";
const API = `${base_api_url}/api/youtube/getall`;

export default function BreakingNewsSlider() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const { data } = await axios.get(API);

      if (data.success) {
        setVideos(data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const scrollLeft = () => {
    document
      .getElementById("youtubeSlider")
      .scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    document
      .getElementById("youtubeSlider")
      .scrollBy({ left: 350, behavior: "smooth" });
  };

  if (loading) return null;

  return (
    <section className="bg-gray-100 py-4">

      <div className="mx-auto max-w-[1700px]">

        <div className="mb-4 flex items-center gap-2">

          <div className="h-8 w-1 bg-red-600"></div>

          <h2 className="text-xl font-bold text-gray-800">
            latest videos
          </h2>

        </div>

        <div className="relative">

          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg hover:bg-red-600 hover:text-white"
          >
            <BsChevronLeft size={28} />
          </button>

          <div
            id="youtubeSlider"
            className="scrollbar-hide flex gap-6 overflow-x-auto scroll-smooth px-8"
          >
            {videos.map((item) => {
              const thumb = `https://img.youtube.com/vi/${item.videoUrl.split("/embed/")[1].split("?")[0]
                }/hqdefault.jpg`;

              return (
                <div
                  key={item._id}
                  className="min-w-[330px] rounded-xl bg-white shadow-md transition hover:shadow-xl"
                >
                  <iframe
                    className="h-56 w-full rounded-t-xl"
                    src={item.videoUrl}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />

                  <div className="space-y-2 p-4">

                    <h4 className="font-semibold text-gray-700">
                      YouTube
                    </h4>

                    <p className="text-lg font-bold text-gray-800">
                      {new Date(item.createdAt).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}

                      {" / "}

                      {new Date(item.createdAt).toLocaleDateString("en-GB")}
                    </p>

                    <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
                      {item.title}
                    </h3>

                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full bg-purple-800 p-3 text-white shadow-lg"
          >
            <FaChevronRight size={28} />
          </button>

        </div>

      </div>

    </section>
  );
}