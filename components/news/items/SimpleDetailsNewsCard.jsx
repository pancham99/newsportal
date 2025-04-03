import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
const { convert } = require('html-to-text');

const SimpleDetailsNewsCard = ({ news, type, height }) => {
  return (
    <div className='bg-white shadow'>
      <div className='group relative overflow-hidden'>
        <div style={{height: `${height}px` }} className={`w-full  group-hover:scale-[1.1] transition-all duration-[1s]`}>
          <Image className='' src={news?.image} alt='' layout='fill' />
        </div>

        <div className='w-full h-full block absolute left-0 top-0 invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300'></div>
        <div className='absolute left-5 bottom-4 flex justify-start items-start  gap-x-2 text-white font-semibold gap-y-2'>
          <div className='px-[6px] py-[2px] rounded-sm text-[13px] bg-[#c80000]'>
            {news?.category}
          </div>

          <div className='px-[6px] py-[2px] rounded-sm text-[13px] bg-[#c80000]'>
          {news?.category}
          </div>
        </div>
      </div>

      <div className='p-5'>
        <Link className='text-sm font-semibold text-[#333333] hover:text-[#c80000]' href={`/news/${news?.slug}`}>{news?.title}</Link>

        <div className='flex gap-x-2 text-xs font-normal'>
          <span>{news?.date} /</span>
          <span>{news?.writerName}</span>
        </div>
        {
          type === 'details-news' && (
            <p className='text-sm pt-3 text-slate-600'>
              {
                convert(news?.description).slice(0, 200)

              }

            </p>
          )
        }
      </div>
    </div>
  )
}

export default SimpleDetailsNewsCard