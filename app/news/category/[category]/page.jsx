// import { useEffect, useState } from 'react'
import Breadcrumb from '../../../../components/Breadcrumb'
import Category from '../../../../components/Category'
import NewsCard from '../../../../components/news/items/NewsCard'
import SimpleDetailsNewsCard from '../../../../components/news/items/SimpleDetailsNewsCard'
import PopularNews from '../../../../components/news/PopularNews'
import Search from '../../../../components/Search'
import Title from '../../../../components/Title'
import { base_api_url } from '../../../../config/config'

const Page = async ({ params }) => {
    const { category } = params
    const data = await fetch(`${base_api_url}/api/news/category/${category}`, {
        next: {
            revalidate: 1
        }
    });
    const { news, relatedNews } = await data.json()

    const news_data = await fetch(`${base_api_url}/api/all/news`, {
        next: {
            revalidate: 5
        },
    });

    const { news: allnews } = await news_data.json();

    const allnew = allnews[category] || [];

    console.log(allnew, "allnew");

    return (
        <div>
            <div className='bg-white shadow-sm py-3'>
                <div className='px-4 md:px-8 w-full'>
                    <Breadcrumb one='category' two={category} />
                </div>
            </div>
            <div className='bg-slate-200 w-full'>
                <div className='px-4 md:px-8 w-full py-8'>
                    <div className='flex flex-wrap'>
                        <div className='w-full xl:w-8/12'>
                            <div className='w-full pr-0 xl:pr-4'>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                                    {
                                        allnew?.map((tems) => <SimpleDetailsNewsCard news={tems} key={news?.category} type='details-news' height={200} />)
                                    }
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

                                                allnew?.map((tems) => <NewsCard news={tems} key={news?.category} />)

                                                // [1, 2, 3, 4, 5, 6].map(() => <NewsCard key={news?.category} news={news}/>)
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
                        <PopularNews type='Popular news' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page