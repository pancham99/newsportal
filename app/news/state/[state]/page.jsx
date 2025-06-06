// REMOVE 'use client'

import React from 'react'
import { base_api_url } from '../../../../config/config'
import SimpleDetailsNewsCard from '../../../../components/news/items/SimpleDetailsNewsCard'
import Search from '../../../../components/Search'
import Title from '../../../../components/Title'
import NewsCard from '../../../../components/news/items/NewsCard'
import PopularNews from '../../../../components/news/PopularNews'
import VideoPlayer from '../../../../components/VideoPlayer'

async function getNewsByState(stateName) {
    const res = await fetch(`${base_api_url}/api/news/state/${stateName}`, {
        cache: 'no-store',
    });
    const data = await res.json();
    return data.news || [];
}

const Page = async ({ params }) => {
    const decodedCategory = decodeURIComponent(params.state);
    const news = await getNewsByState(decodedCategory);

    return (
        <div className='bg-slate-200 w-full'>
            <div className='px-4 md:px-8 w-full py-8'>
                <div className='flex flex-wrap'>

                    {/* Left Section */}
                    <div className='w-full xl:w-8/12'>
                        <div className='w-full pr-0 xl:pr-4'>

                            {
                                news?.length === 0 ? (
                                    <div className='text-center text-gray-600 text-lg py-10'>
                                        📰 कोई न्यूज़ उपलब्ध नहीं है।
                                    </div>
                                ) : (
                                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                                        {
                                            news?.map((tems, i) => (
                                                <SimpleDetailsNewsCard news={tems} key={i} type='details-news' height={200} />
                                            ))
                                        }
                                    </div>
                                )
                            }

                        </div>
                    </div>

                    {/* Right Section */}
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
                                            news?.length === 0 ? (
                                                <div className='text-center text-gray-500 py-6'>कोई न्यूज़ उपलब्ध नहीं है।</div>
                                            ) : (
                                                news?.map((tems, i) => <NewsCard news={tems} key={i} />)
                                            )
                                        }
                                    </div>
                                </div>

                                <div className='p-4 bg-white'>
                                    <div className="p-6">
                                        <h1 className="text-2xl font-bold mb-4">Top Briefing</h1>
                                        <VideoPlayer url="https://www.youtube.com/shorts/FSuGjn4MKDY" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

                <div className='pt-8'>
                    <PopularNews type='Popular news' />
                </div>
            </div>
        </div>

    )
}

export default Page;
