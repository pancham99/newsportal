"use client";
import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SimpleNewsCard from './items/SimpleNewsCard';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { base_api_url } from "../../config/config";
import { getCachedNews, setCachedNews } from "../../utils/NewsCache";

const LatestNews = () => {
  // Start with cached data if available
  const [news, setNews] = useState(() => getCachedNews() || []);
  const [loading, setLoading] = useState(!getCachedNews());

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const latest_news_get = async () => {
    try {
      const res = await fetch(`${base_api_url}/api/latest/news`);
      const data = await res.json();
      setNews(data?.latestNews || []);
      setCachedNews(data?.latestNews || []);
    } catch (error) {
      console.error("Error fetching latest news", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!getCachedNews()) {
      latest_news_get();
    }
  }, []);

  const ButtonGroup = ({ next, previous }) => (
    <div className='flex justify-between items-center'>
      <div className='text-xl font-bold text-[#333333] relative before:absolute before:w-[4px] before:bg-[#c80000] before:h-full before:-left-0 pl-3'>
        लेटेस्ट न्यूज़
      </div>
      <div className='flex justify-center items-center gap-x-3'>
        <button onClick={previous} className='w-[30px] h-[30px] flex justify-center items-center bg-white border-slate-200'>
          <FiChevronLeft />
        </button>
        <button onClick={next} className='w-[30px] h-[30px] flex justify-center items-center bg-white border-slate-200'>
          <FiChevronRight />
        </button>
      </div>
    </div>
  );

  return (
    <div className='w-full flex flex-col-reverse gap-3 pr-0 lg:pr-2'>
      {loading && (
        <div className="w-full flex gap-2">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="w-full h-full bg-slate-200 animate-pulse rounded"></div>
          ))}
        </div>
      )}

      {!loading && news?.length > 0 && (
        <Carousel
          autoPlay={true}
          arrows={false}
          renderButtonGroupOutside={true}
          customButtonGroup={<ButtonGroup />}
          responsive={responsive}
          infinite={true}
          transitionDuration={500}
        >
          {news.map((item, i) => (
            <SimpleNewsCard item={item} key={i} type='latest' />
          ))}
        </Carousel>
      )}

      {!loading && news?.length === 0 && (
        <div className="text-center py-5">कोई लेटेस्ट न्यूज़ उपलब्ध नहीं है।</div>
      )}
    </div>
  );
};

export default LatestNews;
