import Breadcrumb from '../../../components/Breadcrumb'
import Category from '../../../components/Category'
import NewsCard from '../../../components/news/items/NewsCard'
import SimpleDetailsNewsCard from '../../../components/news/items/SimpleDetailsNewsCard'
import PopularNews from '../../../components/news/PopularNews'
import Search from '../../../components/Search'
import Title from '../../../components/Title'
import { base_api_url } from "../../../config/config"
// import htmlParser from "react-html-parser"

import parse from 'html-react-parser';
import React from 'react'
import Footer from '../../../components/Footer'
import RelatedNews from '../../../components/news/RelatedNews'
import Image from "next/image";

const details = async ({ params }) => {
    const { slug } = params
    const data = await fetch(`${base_api_url}/api/news/details/${slug}`,{
        next:{
            revalidate:1
        }
    });
    const { news, relatedNews } = await data.json()

    return (
        <div>
            <div className='bg-white shadow-sm py-3'>
                <div className='px-4 md:px-8 w-full'>
                    <Breadcrumb one='category' two='Suport' />
                </div>
            </div>
            <div className='bg-slate-200 w-full'>
                <div className='px-4 md:px-8 w-full py-8'>
                    <div className='flex flex-wrap'>
                        <div className='w-full xl:w-8/12'>
                            <div className='w-full pr-0 xl:pr-4'>
                                <div className='flex flex-col gap-y-5 bg-white'>
                                    {/* <img src={news?.image} alt='' /> */}

                                     <Image src={news?.image} alt="" layout="fill" className="" />
                                    <div className='flex flex-col gap-y-4 px-6 pb-6'>
                                        <h3 className='text-red-700 font-medium text-xl'>{news?.category}</h3>
                                        <h2 className='text-3xl text-gray-700 font-bold'>{news?.title}</h2>
                                        <div className='flex gap-x-2 text-xs font-normal'>
                                            <span>{news?.date} /</span>
                                            <span>{news?.writerName}</span>
                                        </div>
                                        <p>{parse(news?.description)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full xl:w-4/12'>
                            <div className='w-full pl-0 xl:pl-4'>
                                <div className='flex flex-col gap-8'>
                                    <Search />
                                    <div className='w-full flex-col gap-y-[14px] bg-white pt-4'>
                                        <div className='pl-4'>
                                            <Title title='Recent news' />
                                        </div>
                                        <div className='grid grid-cols-1 gap-y-3'>
                                            {
                                                [1, 2, 3, 4, 5, 6].map(() => <NewsCard key={news?.category} item={news}/>)
                                            }
                                        </div>
                                    </div>
                                    <div className='p-4 bg-white'>
                                        <Category titleStyle={'text-gray-700'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='pt-8'>
                        <RelatedNews news={relatedNews} type='Related news'/>
                        {/* <PopularNews type='Related news' /> */}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default details