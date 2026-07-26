import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import moment from 'moment-timezone';
import NewsDescription from '../NewsDescription';

const SimpleNewsCard = ({ item, type, priority = false }) => {
    console.log('SimpleNewsCard item:', item);

    const formattedDate = moment
        .utc(item?.createdAt)
        .tz("Asia/Kolkata")
        .format("DD MMM YYYY");

    const formattedTime = moment
        .utc(item?.createdAt)
        .tz("Asia/Kolkata")
        .format("hh:mm A");

    return (
        <div className='group relative'>
            <div className='overflow-hidden'>
                <div className={`${type ? 'h-[270px] sm:h-[470px]' : 'h-[228px]'} w-full group-hover:scale-[1.1] transition-all duration-[1s]`}>
                    <Image
                        {...(priority ? { priority: true } : { loading: "lazy" })}
                        quality={85}
                        width={600}
                        height={470}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                        className='h-full w-full object-cover'
                        src={item?.image}
                        alt={item?.title || "Breaking news headline image"}
                    />
                </div>
            </div>
            <div className='w-full h-full block absolute left-0 top-0 invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300' ></div>
            <div className='absolute inset-x-0 bottom-0 p-4 sm:p-5 flex justify-end items-start flex-col text-white gap-y-2 bg-gradient-to-t from-black/90 via-black/60 to-transparent rounded-b-md'>
                <div className='px-2 py-0.5 rounded-sm text-xs font-bold bg-[#c80000] text-white uppercase tracking-wide'>
                    {item.category}
                </div>

                <Link href={`/news/${item.slug}`} className='text-base sm:text-lg font-bold text-white leading-snug hover:text-red-300 drop-shadow-sm line-clamp-2'>
                    {item?.title}
                </Link>

                {item?.shortDescription && (
                    <p className='text-xs sm:text-sm text-gray-200 font-normal leading-relaxed line-clamp-2 drop-shadow-sm opacity-90'>
                        {item.shortDescription.replace(/<[^>]*>/g, '')}
                    </p>
                )}

                <div className='flex items-center gap-x-2 text-[11px] text-gray-300 font-medium pt-1'>
                    <span>{formattedDate} / {formattedTime}</span>
                    {item?.writerName && <span>• {item.writerName}</span>}
                </div>
            </div>
        </div>
    )
}

export default SimpleNewsCard