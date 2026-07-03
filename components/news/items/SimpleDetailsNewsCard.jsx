import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
const { convert } = require('html-to-text');
import moment from 'moment-timezone';
import NewsDescription from '../NewsDescription';

const SimpleDetailsNewsCard = ({ news, type, height }) => {
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
            loading="lazy"
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

      <div className='p-5'>
        <Link className='text-sm font-semibold text-[#333333] hover:text-[#c80000]' href={`/news/${news?.slug}`}><h2>{news?.title}</h2></Link>
        {news?.shortDescription && (
          <p className='prose max-w-none text-sm'>{news.shortDescription}</p>
          // <NewsDescription description={news.shortDescription} />
        )}


        <div className='flex gap-x-2 text-xs font-normal'>
          <span className='flex gap-x-2 text-xs font-normal'>{formattedDate} / {formattedTime}</span>
          <span>{news?.writerName}</span>
        </div>

      </div>
    </div>
  )
}

export default SimpleDetailsNewsCard