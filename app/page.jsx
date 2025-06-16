import dynamic from 'next/dynamic'

const Footer = dynamic(() => import("../components/Footer"));
const Headlines = dynamic(() => import("../components/Headlines"));
const DetailsNews = dynamic(() => import("../components/news/items/DetailsNews"));
const DetailsNewsCol = dynamic(() => import("../components/news/items/DetailsNewsCol"));
const DetailsNewsRow = dynamic(() => import("../components/news/items/DetailsNewsRow"));
const NewsCard = dynamic(() => import("../components/news/items/NewsCard"));
const SimpleNewsCard = dynamic(() => import("../components/news/items/SimpleNewsCard"));
const LatestNews = dynamic(() => import("../components/news/LatestNews"));
const PopularNews = dynamic(() => import("../components/news/PopularNews"));
const Title = dynamic(() => import("../components/Title"));
const VideoPlayer = dynamic(() => import("../components/VideoPlayer"));
const AddModel = dynamic(() => import("../components/AddModel"));
const Permostion = dynamic(() => import("../components/Permostion"));
const VideoPermostion = dynamic(() => import("../components/VideoAdvertisement"));
const VideoAdvertisement = dynamic(() => import("../components/VideoAdvertisement"));
import RecentNews from "../components/news/RecentNews";

// import Footer from "../components/Footer";
// import Headlines from "../components/Headlines";
// import DetailsNews from "../components/news/items/DetailsNews";
// import DetailsNewsCol from "../components/news/items/DetailsNewsCol";
// import DetailsNewsRow from "../components/news/items/DetailsNewsRow";
// import NewsCard from "../components/news/items/NewsCard";
// import SimpleNewsCard from "../components/news/items/SimpleNewsCard";
// import LatestNews from "../components/news/LatestNews";
// import PopularNews from "../components/news/PopularNews";
// import Title from "../components/Title";
// import Image from "next/image";
import { base_api_url } from "../config/config"
// import { headers } from "next/headers";
// import VideoPlayer from "../components/VideoPlayer";
// import AddModel from "../components/AddModel";
// import Permostion from "../components/Permostion";
// import VideoPermostion from "../components/VideoAdvertisement";
// import VideoAdvertisement from "../components/VideoAdvertisement";


const Home = async () => {
  const news_data = await fetch(`${base_api_url}/api/all/news`, {
    next: {
      revalidate: 5
    },
  });

  const { news } = await news_data?.json()

  return (
    <div>
      <AddModel />
      <main>
        <Headlines news={news} />
        <div className="bg-slate-100 ">
          <div className="px-4 md:px-8 py-8">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12">
                <LatestNews news={news['राजनीति']} />
              </div>

              {/* Technology */}

              <div className="w-full lg:w-6/12 mt-5 lg:mt-0">
                <div className="flex w-full flex-col  gap-y-[14px] pl-0 lg:pl-2">
                  <Title title="राजनीति" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {
                      news['राजनीति']?.map((item, i) => {
                        if (i < 4) {
                          return <SimpleNewsCard key={i} item={item} />
                        }
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
            <PopularNews />

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

            <div className="w-full">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-4/12">
                  <div className="pr-2">
                    <DetailsNewsCol news={news['मनोरंजन']} category='मनोरंजन' />
                    <div className=" bg-white shadow mt-2 p-4">


                      <VideoPlayer url="https://www.youtube.com/watch?v=pW5GVpFEgOM" />


                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-8/12">
                  <div className="pl-2">
                    <DetailsNewsRow news={news['प्रौद्योगिकी']} category='प्रौद्योगिकी' type='details-news' />
                    <DetailsNews news={news['अंतरराष्ट्रीय']} category='अंतरराष्ट्रीय' />
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
                </div>
                <div className="w-full lg:w-4/12">
                  <div className="pl-2">
                    <Title title="Recent news" />
                    <div className='grid grid-cols-1 gap-y-1 mt-3'>
                      <RecentNews/>
                      {/* {
                        news['खेल']?.map((item, i) => <NewsCard news={item} key={i} />)
                      } */}
                    </div>
                  </div>
                </div>
              </div>
            </div>



            <div className="w-full mt-5">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12">
                  <div className="">
                    {
                      news['अपराध']?.length > 0
                        ? (
                          <DetailsNewsRow
                            news={news['अपराध']}
                            category='अपराध'
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
                    {/* <Title title="Recent news" /> */}
                    <div className='grid grid-cols-1 gap-y-1 mt-3'>
                      {
                        news['लाइफस्टाइल']?.length > 0
                          ? (
                            news['लाइफस्टाइल'].map((item, i) => (
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
          </div>
        </div>

        <div className="">
          {/* <VideoPermostion/> */}

          {/* <VideoAdvertisement/> */}
          {/* <Category titleStyle="text-gray-700" /> */}

          {/* <div className="">

            <VideoPlayer url="https://www.youtube.com/watch?v=pW5GVpFEgOM" />
          </div> */}
        </div>
      </main>
      <Footer news={news['राजनीति']} />
    </div>
  );
}
export default Home
