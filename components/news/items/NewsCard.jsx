import Image from "next/image";
import React from "react";
import Link from 'next/link'
import moment from 'moment-timezone';
import NewsDescription from "../NewsDescription";

const NewsCard = ({ news }) => {
    if (!news) return null;



    const formattedDate = moment
        .utc(news?.createdAt)
        .tz("Asia/Kolkata")
        .format("DD MMM YYYY");

    const formattedTime = moment
        .utc(news?.createdAt)
        .tz("Asia/Kolkata")
        .format("hh:mm A");
    return (
        <div className="bg-white shadow flex p-4">
            <div className="relative group overflow-hidden h-full ">

                <div className="group-hover:scale-[1.1] transition-all duration-[1s] w-[100px] md:w-[160px] h-[93px] lg:w-[100px] relative">
                    <Image
                        loading="lazy"
                        quality={85}
                        width={160}
                        height={93}
                        sizes="(max-width: 768px) 100px, (max-width: 1024px) 160px, 100px"
                        src={news?.image}
                        alt={news?.title || "Breaking news headline image"}
                        className="h-full w-full object-cover"
                    />

                    <div className='w-full h-full block absolute left-0 top-0 invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300'></div>
                </div>
            </div>
            <div className="flex flex-col justify-between w-[calc(100%-100px)] md:w-[calc(100%-160px)] lg:w-[calc(100%-100px)] pl-3 py-0.5">
                <div>
                    <Link href={`/news/category/${news?.category}`} className="text-xs font-bold text-[#c80000] uppercase tracking-wider mb-1 block">{news?.category}</Link>
                    <Link href={`/news/${news?.slug}`} className="text-xs sm:text-sm font-bold text-gray-900 leading-snug hover:text-[#c80000] line-clamp-2 block">{news?.title}</Link>
                </div>
            
                <div className='flex items-center gap-x-2 text-[11px] text-gray-400 font-normal mt-1'>
                    <span>{formattedDate} / {formattedTime}</span>
                    {news?.writerName && <span>• {news.writerName}</span>}
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
