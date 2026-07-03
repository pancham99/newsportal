// import { useEffect, useState } from 'react'
import Breadcrumb from '../../../../components/Breadcrumb'
import Category from '../../../../components/Category'
import NewsCard from '../../../../components/news/items/NewsCard'
import SimpleDetailsNewsCard from '../../../../components/news/items/SimpleDetailsNewsCard'
import PopularNews from '../../../../components/news/PopularNews'
import Search from '../../../../components/Search'
import Title from '../../../../components/Title'
import { base_api_url } from '../../../../config/config'
import VideoPlayer from '../../../../components/VideoPlayer'
import AdvertisementSection from '../../../../components/AdvertisementSection'

export async function generateMetadata({ params }) {
    const decodedCategory = decodeURIComponent(params.category)
    const canonicalUrl = `https://topbriefing.in/news/category/${params.category}`

    return {
        title: `${decodedCategory} समाचार - ताजा हिंदी खबरें | Top Briefing`,
        description: `Top Briefing पर पढ़ें ${decodedCategory} की ताजा खबरें, ब्रेकिंग न्यूज़ और लाइव अपडेट। ${decodedCategory} से जुड़ी सभी बड़ी खबरें हिंदी में।`,
        keywords: [
            decodedCategory,
            `${decodedCategory} news`,
            `${decodedCategory} समाचार`,
            `${decodedCategory} खबर`,
            `${decodedCategory} ताजा खबर`,
            'Hindi News', 'Breaking News', 'Top Briefing',
            'ब्रेकिंग न्यूज़', 'ताजा हिंदी खबरें',
        ].join(', '),
        alternates: { canonical: canonicalUrl },
        robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
        },
        openGraph: {
            title: `${decodedCategory} समाचार - ताजा हिंदी खबरें | Top Briefing`,
            description: `${decodedCategory} की ताजा खबरें, ब्रेकिंग न्यूज़ और लाइव अपडेट — Top Briefing पर।`,
            url: canonicalUrl,
            siteName: 'Top Briefing',
            locale: 'hi_IN',
            type: 'website',
            images: [{ url: 'https://topbriefing.in/logo.png', width: 1200, height: 630, alt: `${decodedCategory} News - Top Briefing` }],
        },
        twitter: {
            card: 'summary_large_image',
            site: '@topbriefing',
            creator: '@topbriefing',
            title: `${decodedCategory} समाचार | Top Briefing`,
            description: `${decodedCategory} की ताजा खबरें और लाइव अपडेट — Top Briefing पर।`,
            images: ['https://topbriefing.in/logo.png'],
        },
    }
}

const Page = async ({ params }) => {
    const { category } = params
    const decodedCategory = decodeURIComponent(category)

    const data = await fetch(`${base_api_url}/api/news/category/${decodedCategory}`, {
        next: { revalidate: 60 }
    });
    const { news, relatedNews } = await data.json()
    const news_data = await fetch(`${base_api_url}/api/all/news`, {
        next: { revalidate: 300 },
    });
    const { news: allnews } = await news_data.json();
    const allnew = allnews[decodedCategory] || [];

    // BreadcrumbList JSON-LD
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://topbriefing.in' },
            { '@type': 'ListItem', position: 2, name: decodedCategory, item: `https://topbriefing.in/news/category/${category}` },
        ],
    };

    return (
        <div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <div className='bg-white shadow-sm py-3'>
                <div className='px-4 md:px-8 w-full'>
                    <Breadcrumb one='Category' two={decodedCategory} />
                </div>
            </div>
            <div className='bg-slate-200 w-full'>
                <div className='px-4 md:px-8 w-full py-8'>

                    {/* Page heading for SEO — visible h1 */}
                    <h1 className='text-xl font-bold text-gray-800 mb-4'>
                        {decodedCategory} - ताजा हिंदी खबरें
                    </h1>

                    <div className='flex flex-wrap'>
                        <div className='w-full xl:w-8/12'>
                            <div className='w-full pr-0 xl:pr-4'>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                                    {allnew?.map((tems, i) => (
                                        <SimpleDetailsNewsCard news={tems} key={i} type='details-news' height={200} />
                                    ))}
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
                                            {allnew?.map((tems, i) => (
                                                <NewsCard news={tems} key={i} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className='p-4 bg-white'>
                                        <div className="p-4">
                                            <div className='w-full'>
                                                <AdvertisementSection pageTarget="ctegorypage" deviceTarget="desktop" />
                                            </div>
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
        </div>
    )
}

export default Page