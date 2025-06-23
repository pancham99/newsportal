"use client";
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
const Carousel = dynamic(() => import('react-multi-carousel'), { ssr: false });
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
        <div className="w-full">
          <div className="flex gap-4 overflow-hidden border">
            {[1, 2, 3].map((_, i) => (
              <div key={i} role="status" className="max-w-sm p-4 border border-gray-200 rounded-sm shadow-sm animate-pulse md:p-6 dark:border-gray-700">
                <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700">
                  <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                  </svg>
                </div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                <div className="flex items-center mt-4">
                  <svg className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                  <div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2" />
                    <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                  </div>
                </div>
                <span className="sr-only">Loading...</span>
              </div>
            ))}
          </div>
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
