import React from 'react';
import { base_api_url } from "../../../config/config";
import Breadcrumb from '../../../components/Breadcrumb';
import Category from '../../../components/Category';
import NewsCard from '../../../components/news/items/NewsCard';
import Title from '../../../components/Title';
import Footer from '../../../components/Footer';
import RelatedNews from '../../../components/news/RelatedNews';
import parse from 'html-react-parser';
import Image from "next/image";
import VideoPlayer from '../../../components/VideoPlayer';
import VideoAdvertisement from '../../../components/VideoAdvertisement';
import moment from 'moment-timezone';
import dynamic from 'next/dynamic';
import AdvertisementSection from '../../../components/AdvertisementSection';

const NewsDescription = dynamic(() => import('../../../components/news/NewsDescription'), { ssr: false });


export async function generateMetadata({ params }) {
    const { slug } = params;

    const res = await fetch(`${base_api_url}/api/news/details/${slug}`, {
        cache: 'no-store',
    });

    const { news } = await res.json();

    const cleanDescription = news?.description?.replace(/<[^>]*>?/gm, '') || '';

    return {
        title: `${news?.title} | Top Briefing`,
        description: cleanDescription.slice(0, 150),
        keywords: `${news?.category}, ${news?.writerName}, Top Briefing`,
        openGraph: {
            title: `${news?.title} | Top Briefing`,
            description: cleanDescription.slice(0, 150),
            images: [
                {
                    url: news?.image,
                    width: 1200,
                    height: 630,
                    alt: news?.title,
                },
            ],
            type: 'article',
            publishedTime: news?.createdAt,
        },
    };
}



const Details = async ({ params }) => {
    const { slug } = params;

    const res = await fetch(`${base_api_url}/api/news/details/${slug}`, {
        next: { revalidate: 1 }
    });

    const { news, relatedNews } = await res.json();

    // const formattedTime = moment(news?.createdAt).tz("Asia/Kolkata").format('hh:mm A');
    const formattedTime = moment.utc(news?.createdAt).tz("Asia/Kolkata").format('hh:mm A');
    console.log(formattedTime, "formattedTime");

    return (
        <div>
            <div className="bg-white shadow-sm py-3">
                <div className="px-4 md:px-8 w-full">
                    <Breadcrumb one={news?.category} two={news?.category} />
                </div>
            </div>

            <div className="bg-slate-200 w-full">
                <div className="px-4 md:px-8 w-full py-8">
                    <div className="flex flex-wrap">
                        <div className="w-full xl:w-8/12 overflow-y-scroll hide-scrollbar h-[800px]">
                            <div className="w-full pr-0 xl:pr-4">
                                <div className="flex flex-col gap-y-5 bg-white relative  h-[400px] ">
                                    <div className='h-full max-h-full w-full relative'>
                                        {news?.image && (
                                            <Image
                                                src={news.image}
                                                alt="News Image"
                                                fill
                                                className=" w-fit h-full"
                                            />
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-y-4 px-6 pb-6 bg-white z-10 absolute top-96 left-0 right-0">
                                        <h3 className="text-red-700 font-medium text-xl">{news?.category}</h3>
                                        <h2 className="text-3xl text-gray-700 font-bold">{news?.title}</h2>
                                        <div className="flex gap-x-2 text-xs font-normal">
                                            <span>{news?.date} / {formattedTime}</span>
                                            <span>{news?.writerName}</span>
                                        </div>
                                        <NewsDescription description={news?.description} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full xl:w-4/12">
                            <div className="w-full pl-0 xl:pl-4">
                                <div className="flex flex-col gap-8">
                                    <div className="w-full flex-col gap-y-[14px] bg-white pt-4 h-full">
                                        <div className="pl-4">
                                            <Title title="Recent video" />
                                        </div>
                                        <div className="grid grid-cols-1 gap-y-2">
                                            <div className="p-2 bg-white gap-2">
                                                <VideoAdvertisement />
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="p-4 bg-white">
                                        <Category titleStyle="text-gray-700" />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="pt-8 h-48">
                        <RelatedNews news={relatedNews} type="Related news" />
                    </div> */}
                    <div className="mt-4 bg-white  rounded-md">
                        <AdvertisementSection pageTarget="news" deviceTarget="desktop" placementKey="sidebar" />
                        {/* <AdvertisementSection pageTarget="home" deviceTarget="desktop" placementKey="bottom" /> */}

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Details;
