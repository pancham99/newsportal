import React from 'react';
import { base_api_url } from "../../../config/config";
import Breadcrumb from '../../../components/Breadcrumb';
import Category from '../../../components/Category';
import NewsCard from '../../../components/news/items/NewsCard';
import Search from '../../../components/Search';
import Title from '../../../components/Title';
import Footer from '../../../components/Footer';
import RelatedNews from '../../../components/news/RelatedNews';
import parse from 'html-react-parser';
import Image from "next/image";
import VideoPlayer from '../../../components/VideoPlayer';
import VideoAdvertisement from '../../../components/VideoAdvertisement';

const Details = async ({ params }) => {
    const { slug } = params;

    const res = await fetch(`${base_api_url}/api/news/details/${slug}`, {
        next: { revalidate: 1 }
    });

    const { news, relatedNews } = await res.json();

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
                                            <span>{news?.date} /</span>
                                            <span>{news?.writerName}</span>
                                        </div>
                                        <div className="prose max-w-none">{parse(news?.description || "")}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full xl:w-4/12">
                            <div className="w-full pl-0 xl:pl-4">
                                <div className="flex flex-col gap-8">
                                    {/* <Search /> */}
                                    <div className="w-full flex-col gap-y-[14px] bg-white pt-4 h-full">
                                        <div className="pl-4">
                                            <Title title="Recent video" />
                                        </div>
                                        <div className="grid grid-cols-1 gap-y-2">


                                            {/* {
                                                [1, 2, 3, 4,].map((_, index) => (
                                                    <NewsCard key={index} news={news} />
                                                ))
                                            } */}

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

                    <div className="pt-8 h-48">
                        {/* <RelatedNews news={relatedNews} type="Related news" /> */}
                    </div>
                </div>
            </div>



            <Footer />
        </div>
    );
};

export default Details;
