import dynamic from 'next/dynamic'

const Headlines = dynamic(() => import("../Headlines"));
const DetailsNews = dynamic(() => import("../news/items/DetailsNews"));
const DetailsNewsCol = dynamic(() => import("../news/items/DetailsNewsCol"));
const DetailsNewsRow = dynamic(() => import("../news/items/DetailsNewsRow"));
const NewsCard = dynamic(() => import("../news/items/NewsCard"));
const SimpleNewsCard = dynamic(() => import("../news/items/SimpleNewsCard"));
const LatestNews = dynamic(() => import("../news/LatestNews"));
const PopularNews = dynamic(() => import("../news/PopularNews"));
const Title = dynamic(() => import("../Title"));
import SimpleTypeCard from '../news/items/SimpleTypeCard';

const Permostion = dynamic(() => import("../Permostion"));
import RecentNews from "../news/RecentNews";
import Stories from "../Stories"

import ShortVideos from "../ShortVideos";
import AdvertisementSection from "../AdvertisementSection";
import LatestVideosSection from "../videoSection/LatestVideoAction";
import Footer from '../Footer';
import { base_api_url } from '../../config/config';


const Home = async ({ news }) => {
  
  const latestRes = await fetch(`${base_api_url}/api/latest/news`, {
    next: { revalidate: 300 }
  });

  const { latestNews } = await latestRes.json();



  const breakingRes = await fetch(
    `${base_api_url}/api/breaking`,
    {
      next: { revalidate: 300 }
    }
  );

  if (!breakingRes.ok) {
    console.error("Breaking API failed");
  }

  const breakingData = await breakingRes.json();

  const breakingNews = breakingData?.news ?? [];

 const trendingRes = await fetch(
    `${base_api_url}/api/trending`,
    {
      next: { revalidate: 300 }
    }
  );

  if (!trendingRes.ok) {
    console.error("Trending API failed");
  }

  const trendingData = await trendingRes.json();
  const trendingNews = trendingData?.news ?? [];

  
  

  return (


    <div>

      <main>
        <Headlines news={news} />
        <div className="bg-slate-100 ">
          <div className="px-4 md:px-8 py-8">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12">
                <LatestNews news={latestNews} />
              </div>
              <div className="w-full lg:w-6/12 mt-5 lg:mt-0">
                <div className="flex w-full flex-col  gap-y-[14px] pl-0 lg:pl-2">
                  <Title title="Breaking News" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                     {
                      breakingNews?.map((item, i) => {
                        if (i < 4) {
                          return <SimpleNewsCard key={i} item={item} />
                        }
                      })
                    }
                    {/* {
                    
                      breakingNews.slice(0, 4).map((item, i) => (
                        <SimpleTypeCard key={i} item={item} type={"Breaking News"} />
                      ))
                    } */}
                  </div>
                </div>
              </div>
            </div>

            <div>

            </div>

            {/* <LatestVideosSection
              title={"topbreaking videos"}
              subtitle={"देखें ताज़ा वीडियो"}

            /> */}
            <PopularNews items={trendingNews} />

            {/* first section */}

            <div className="w-full">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12">
                  <DetailsNewsRow news={news['खेल']} category='खेल' type='details-news' />
                  <DetailsNews news={news['स्वास्थ्य']} category='स्वास्थ्य' />
                </div>
                <div className="w-full lg:w-4/12">
                  <DetailsNewsCol news={news['शिक्षा']} category='शिक्षा' />

                </div>
              </div>
            </div>

            {/* second section */}

            <div className='lg:mt-0 mt-6 '>
              <Title title="बड़ी ख़बरें" />
              <div className='p-1 py-2 bg-white'>
                <Stories />
              </div>
            </div>

            <div className="w-full lg:mt-2 mt-6">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-4/12 h-full">
                  <div className="pr-2">
                    <DetailsNewsCol news={news['मनोरंजन']} category='मनोरंजन' />
                    <div className=" bg-white shadow mt-2 p-4">
                      <div className='py-1'>
                        <Title title="शॉर्ट वीडियो" />
                      </div>
                      <ShortVideos />
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-8/12 lg:mt-0 mt-4">
                  <div className="pl-2">
                    <DetailsNewsRow news={news['अंतरराष्ट्रीय']} category='अंतरराष्ट्रीय' type='details-news' />
                    <DetailsNews news={news['प्रौद्योगिकी']} category='प्रौद्योगिकी' />
                  </div>
                </div>

              </div>
            </div>



            <Permostion />



            {/* 3rd section */}

            <div className="w-full">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12">
                  <div className="">
                    <DetailsNewsRow news={news['भक्ति']} category='भक्ति' type='details-news' />
                  </div>
                  <div className='mt-2 bg-white w-full rounded-md lg:mr-4 p-2'>
                    {/* <AdvertisementComp one={'0'} advertisement={'advertisement'} /> */}
                    <AdvertisementSection pageTarget="home" deviceTarget="all" placementKey="top" />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 lg:mt-0 mt-4">
                  <div className="pl-2">
                    <Title title="ताजा खबरें" />
                    <div className='grid grid-cols-1 gap-y-1 mt-3'>
                      <RecentNews />
                      {/* {
                        news['खेल']?.map((item, i) => <NewsCard news={item} key={i} />)
                      } */}
                    </div>
                  </div>
                </div>
              </div>
            </div>



            <div className="w-full mt-2">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12">
                  <div className="">
                    {
                      news['लाइफस्टाइल']?.length > 0
                        ? (
                          <DetailsNewsRow
                            news={news['लाइफस्टाइल']}
                            category='लाइफस्टाइल'
                            type='details-news'
                          />
                        )
                        : (
                          <p className="text-gray-500 p-4"></p>
                        )
                    }
                  </div>
                </div>
                <div className="w-full lg:w-4/12">
                  <div className="pl-2">
                    <Title title="अपराध" />
                    <div className='grid grid-cols-1 gap-y-1 mt-3'>
                      {
                        news['अपराध']?.length > 0
                          ? (
                            news['अपराध'].map((item, i) => {
                              if (i < 4) {
                                return <NewsCard news={item} key={i} />
                              }
                            })
                          )
                          : (
                            <p className="text-gray-500 p-4"></p>
                          )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full mt-2">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12">
                  <div className="">
                    {
                      news['मौसम']?.length > 0
                        ? (
                          <DetailsNewsRow
                            news={news['मौसम']}
                            category='मौसम'
                            type='details-news'
                          />
                        )
                        : (
                          <p className="text-gray-500 p-4"></p>
                        )
                    }
                  </div>
                </div>
                <div className="w-full lg:w-4/12 lg:mt-0 mt-4">
                  <div className="pl-2">

                    {/* <Advertisement one={'1'} advertisement={'advertisement'} /> */}
                    {/* <Title title="राशि" /> */}
                    {news['राशि']?.length > 0 && <Title title="राशि" />}
                    <div className='grid grid-cols-1 gap-y-1 mt-3'>
                      {
                        news['राशि']?.length > 0
                          ? (
                            news['राशि']?.map((item, i) => {
                              if (i < 4) {
                                return <NewsCard news={item} key={i} />
                              }
                              // <NewsCard news={item} key={i} />
                            })
                          )
                          : (
                            <p className="text-gray-500 p-4"></p>
                          )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="w-full mt-2">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12">
                  <div className="">
                    {
                      news['राष्ट्रीय']?.length > 0
                        ? (
                          <DetailsNewsRow
                            news={news['राष्ट्रीय']}
                            category='राष्ट्रीय'
                            type='details-news'
                          />
                        )
                        : (
                          <p className="text-gray-500 p-4"></p>
                        )
                    }
                  </div>
                </div>
                <div className="w-full lg:w-4/12 lg:mt-0 mt-4">
                  <div className="pl-2">

                    {news['बाज़ार']?.length > 0 && <Title title="बाज़ार" />}

                    {/* <Title title="बाज़ार" /> */}
                    <div className='grid grid-cols-1 gap-y-1 mt-3'>
                      {
                        news['बाज़ार']?.length > 0
                          ? (
                            news['बाज़ार'].map((item, i) => (
                              <NewsCard news={item} key={i} />
                            ))
                          )
                          : (
                            <p className="text-gray-500 p-4"></p>
                          )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-white  rounded-md">

              <AdvertisementSection pageTarget="home" deviceTarget="all" placementKey="bottom" />
              {/* <AdvertisementSection pageTarget="home" deviceTarget="desktop" placementKey="bottom" /> */}

            </div>
          </div>
        </div>


      </main>
      <Footer news={news['राजनीति']} />
    </div>
  );
}
export default Home









