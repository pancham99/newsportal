"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const GenericSwiper = ({
  items,
  renderCard,
  slidesToShow = { mobile: 1.2, tablet: 2.2, desktop: 3 },
  uniqueId = "swiper"
}) => {
  return (
    <div className="relative group w-full px-3">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={slidesToShow.mobile}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: `.next-${uniqueId}`,
          prevEl: `.prev-${uniqueId}`,
        }}
        observer={true}
        observeParents={true}
        breakpoints={{
          640: { slidesPerView: slidesToShow.tablet },
          1024: { slidesPerView: slidesToShow.desktop },
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            {renderCard(item)}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons - Fixed class names */}
      <button 
        className={`prev-${uniqueId} absolute left-0 top-5/12 -translate-y-1/2 z-10 bg-black/50 hover:bg-black text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100`}
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button 
        className={`next-${uniqueId} absolute right-0 top-5/12 -translate-y-1/2 z-10 bg-black/50 hover:bg-black text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100`}
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default GenericSwiper;