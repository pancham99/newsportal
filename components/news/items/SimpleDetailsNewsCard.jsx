import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
const { convert } = require('html-to-text');
import moment from 'moment-timezone';
import NewsDescription from '../NewsDescription';

const SimpleDetailsNewsCard = ({ news, type, height, priority = false }) => {
  if (!news) return null;
  const plainText = news?.description ? news?.description.replace(/<[^>]*>/g, '') : '';
  const shortText = plainText.slice(0, 300);


  const formattedDate = moment
    .utc(news?.createdAt)
    .tz("Asia/Kolkata")
    .format("DD MMM YYYY");

  const formattedTime = moment
    .utc(news?.createdAt)
    .tz("Asia/Kolkata")
    .format("hh:mm A");

  return (
    <div className='bg-white shadow'>
      <div className='group relative overflow-hidden'>
        <div style={{ height: `${height}px` }} className={`w-full  group-hover:scale-[1.1] transition-all duration-[1s]`}>
          <Image
            {...(priority ? { priority: true } : { loading: "lazy" })}
            quality={85}
            width={400}
            height={height || 200}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className='h-full w-full object-cover'
            src={news?.image}
            alt={news?.title || "Breaking news headline image"}
          />
        </div>

        <div className='w-full h-full block absolute left-0 top-0 invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300'></div>
        <div className='absolute left-5 bottom-4 flex justify-start items-start  gap-x-2 text-white font-semibold gap-y-2'>

          {news?.category &&
            <div className='px-[6px] py-[2px] rounded-sm text-[13px] bg-[#c80000]'>
              <span>{news.category}</span>
            </div>
          }
          {/* <div className='px-[6px] py-[2px] rounded-sm text-[13px] bg-[#c80000]'>
            {news?.category && <span>{news.category}</span>}
          </div> */}
        </div>
      </div>

      <div className='p-4 sm:p-5 flex flex-col justify-between'>
        <div>
          <Link href={`/news/${news?.slug}`} className='text-base sm:text-lg font-bold text-gray-900 hover:text-[#c80000] leading-snug block mb-2 transition-colors duration-200'>
            <h2 className='line-clamp-2'>{news?.title}</h2>
          </Link>
          {news?.shortDescription && (
            <p className='text-xs sm:text-sm text-gray-600 font-normal leading-relaxed line-clamp-2 mb-3 mt-1'>
              {news.shortDescription.replace(/<[^>]*>/g, '')}
            </p>
          )}
        </div>

        <div className='flex items-center gap-x-2 text-xs text-gray-400 font-medium pt-2 border-t border-gray-100 mt-2'>
          <span>{formattedDate} / {formattedTime}</span>
          {news?.writerName && <span>• {news.writerName}</span>}
        </div>
      </div>
    </div>
  )
}

export default SimpleDetailsNewsCard