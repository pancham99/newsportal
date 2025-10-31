import dynamic from 'next/dynamic'

const Footer = dynamic(() => import("../../components/Footer"));
const Headlines = dynamic(() => import("../../components/Headlines"));
const DetailsNews = dynamic(() => import("../../components/news/items/DetailsNews"));
const DetailsNewsCol = dynamic(() => import("../../components/news/items/DetailsNewsCol"));
const DetailsNewsRow = dynamic(() => import("../../components/news/items/DetailsNewsRow"));
const NewsCard = dynamic(() => import("../../components/news/items/NewsCard"));
const SimpleNewsCard = dynamic(() => import("../../components/news/items/SimpleNewsCard"));
const LatestNews = dynamic(() => import("../../components/news/LatestNews"));
const PopularNews = dynamic(() => import("../../components/news/PopularNews"));
const Title = dynamic(() => import("../../components/Title"));
const VideoPlayer = dynamic(() => import("../../components/VideoPlayer"), { ssr: false });
const AddModel = dynamic(() => import("../../components/AddModel"));
const Permostion = dynamic(() => import("../../components/Permostion"));
import RecentNews from "../../components/news/RecentNews";
import Advertisement from "../../components/Advertisement";
import AdvertisementComp from "../../components/AdvertisementComp";
import Stories from "../../components/Stories"
import { base_api_url } from "../../config/config"
import ShortVideos from "../../components/ShortVideos";
import AdvertisementSection from "../../components/AdvertisementSection";





const Page = async () => {
  const news_data = await fetch(`${base_api_url}/api/all/news`, {
    next: {
      revalidate: 300
    },
  });

  const { news } = await news_data?.json()



  return (
    <div>
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
                    <AdvertisementComp one={'0'} advertisement={'advertisement'} />
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
              <AdvertisementSection pageTarget="home" deviceTarget="all" placementKey="top" />
              {/* <AdvertisementSection pageTarget="home" deviceTarget="desktop" placementKey="bottom" /> */}

            </div>
          </div>
        </div>


      </main>
      <Footer news={news['राजनीति']} />
    </div>
  );
}
export default Page









// hey fix complete seo used og tag complete 
// import dynamic from 'next/dynamic'

// const Footer = dynamic(() => import("../components/Footer"));
// const Headlines = dynamic(() => import("../components/Headlines"));
// const DetailsNews = dynamic(() => import("../components/news/items/DetailsNews"));
// const DetailsNewsCol = dynamic(() => import("../components/news/items/DetailsNewsCol"));
// const DetailsNewsRow = dynamic(() => import("../components/news/items/DetailsNewsRow"));
// const NewsCard = dynamic(() => import("../components/news/items/NewsCard"));
// const SimpleNewsCard = dynamic(() => import("../components/news/items/SimpleNewsCard"));
// const LatestNews = dynamic(() => import("../components/news/LatestNews"));
// const PopularNews = dynamic(() => import("../components/news/PopularNews"));
// const Title = dynamic(() => import("../components/Title"));
// const VideoPlayer = dynamic(() => import("../components/VideoPlayer"), { ssr: false });
// const AddModel = dynamic(() => import("../components/AddModel"));
// const Permostion = dynamic(() => import("../components/Permostion"));
// import RecentNews from "../components/news/RecentNews";
// import Advertisement from "../components/Advertisement";
// import AdvertisementComp from "../components/AdvertisementComp";
// import Stories from "../components/Stories"
// import { base_api_url } from "../config/config"
// import ShortVideos from "../components/ShortVideos";
// import AdvertisementSection from "../components/AdvertisementSection";

// const Home = async () => {
//   const news_data = await fetch(`${base_api_url}/api/all/news`, {
//     next: {
//       revalidate: 300
//     },
//   });

//   const { news } = await news_data?.json()

//   return (
//     <div>
//       {/* <AddModel /> */}
//       <main>
//         <Headlines news={news} />
//         <div className="bg-slate-100 ">
//           <div className="px-4 md:px-8 py-8">
//             <div className="flex flex-wrap">
//               <div className="w-full lg:w-6/12">
//                 <LatestNews news={news['राजनीति']} />
//               </div>

//               {/* Technology */}

//               <div className="w-full lg:w-6/12 mt-5 lg:mt-0">
//                 <div className="flex w-full flex-col  gap-y-[14px] pl-0 lg:pl-2">
//                   <Title title="राजनीति" />
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                     {
//                       news['राजनीति']?.map((item, i) => {
//                         if (i < 4) {
//                           return <SimpleNewsCard key={i} item={item} />
//                         }
//                       })
//                     }
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <PopularNews />

//             {/* first section */}

//             <div className="w-full">
//               <div className="flex flex-wrap">
//                 <div className="w-full lg:w-8/12">
//                   <DetailsNewsRow news={news['खेल']} category='खेल' type='details-news' />
//                   <DetailsNews news={news['स्वास्थ्य']} category='स्वास्थ्य' />
//                 </div>
//                 <div className="w-full lg:w-4/12">
//                   <DetailsNewsCol news={news['शिक्षा']} category='शिक्षा' />

//                 </div>
//               </div>
//             </div>

//             {/* second section */}

//             <div className='lg:mt-0 mt-6 '>
//               <Title title="बड़ी ख़बरें" />
//               <div className='p-1 py-2 bg-white'>
//                 <Stories />
//               </div>
//             </div>

//             <div className="w-full lg:mt-2 mt-6">
//               <div className="flex flex-wrap">
//                 <div className="w-full lg:w-4/12 h-full">
//                   <div className="pr-2">
//                     <DetailsNewsCol news={news['मनोरंजन']} category='मनोरंजन' />
//                     <div className=" bg-white shadow mt-2 p-4">
//                       <div className='py-1'>
//                         <Title title="शॉर्ट वीडियो" />
//                       </div>
//                       <ShortVideos />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="w-full lg:w-8/12 lg:mt-0 mt-4">
//                   <div className="pl-2">
//                     <DetailsNewsRow news={news['अंतरराष्ट्रीय']} category='अंतरराष्ट्रीय' type='details-news' />
//                     <DetailsNews news={news['प्रौद्योगिकी']} category='प्रौद्योगिकी' />
//                   </div>
//                 </div>

//               </div>
//             </div>



//             <Permostion />



//             {/* 3rd section */}

//             <div className="w-full">
//               <div className="flex flex-wrap">
//                 <div className="w-full lg:w-8/12">
//                   <div className="">
//                     <DetailsNewsRow news={news['भक्ति']} category='भक्ति' type='details-news' />
//                   </div>
//                   <div className='mt-2 bg-white w-full rounded-md lg:mr-4 p-2'>
//                     <AdvertisementComp one={'0'} advertisement={'advertisement'} />
//                   </div>
//                 </div>
//                 <div className="w-full lg:w-4/12 lg:mt-0 mt-4">
//                   <div className="pl-2">
//                     <Title title="ताजा खबरें" />
//                     <div className='grid grid-cols-1 gap-y-1 mt-3'>
//                       <RecentNews />
//                       {/* {
//                         news['खेल']?.map((item, i) => <NewsCard news={item} key={i} />)
//                       } */}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>



//             <div className="w-full mt-2">
//               <div className="flex flex-wrap">
//                 <div className="w-full lg:w-8/12">
//                   <div className="">
//                     {
//                       news['लाइफस्टाइल']?.length > 0
//                         ? (
//                           <DetailsNewsRow
//                             news={news['लाइफस्टाइल']}
//                             category='लाइफस्टाइल'
//                             type='details-news'
//                           />
//                         )
//                         : (
//                           <p className="text-gray-500 p-4"></p>
//                         )
//                     }
//                   </div>
//                 </div>
//                 <div className="w-full lg:w-4/12">
//                   <div className="pl-2">
//                     <Title title="अपराध" />
//                     <div className='grid grid-cols-1 gap-y-1 mt-3'>
//                       {
//                         news['अपराध']?.length > 0
//                           ? (
//                             news['अपराध'].map((item, i) => {
//                               if (i < 4) {
//                                 return <NewsCard news={item} key={i} />
//                               }
//                             })
//                           )
//                           : (
//                             <p className="text-gray-500 p-4"></p>
//                           )
//                       }
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="w-full mt-2">
//               <div className="flex flex-wrap">
//                 <div className="w-full lg:w-8/12">
//                   <div className="">
//                     {
//                       news['मौसम']?.length > 0
//                         ? (
//                           <DetailsNewsRow
//                             news={news['मौसम']}
//                             category='मौसम'
//                             type='details-news'
//                           />
//                         )
//                         : (
//                           <p className="text-gray-500 p-4"></p>
//                         )
//                     }
//                   </div>
//                 </div>
//                 <div className="w-full lg:w-4/12 lg:mt-0 mt-4">
//                   <div className="pl-2">

//                     {/* <Advertisement one={'1'} advertisement={'advertisement'} /> */}
//                     {/* <Title title="राशि" /> */}
//                     {news['राशि']?.length > 0 && <Title title="राशि" />}
//                     <div className='grid grid-cols-1 gap-y-1 mt-3'>
//                       {
//                         news['राशि']?.length > 0
//                           ? (
//                             news['राशि']?.map((item, i) => {
//                               if (i < 4) {
//                                 return <NewsCard news={item} key={i} />
//                               }
//                               // <NewsCard news={item} key={i} />
//                             })
//                           )
//                           : (
//                             <p className="text-gray-500 p-4"></p>
//                           )
//                       }
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>


//             <div className="w-full mt-2">
//               <div className="flex flex-wrap">
//                 <div className="w-full lg:w-8/12">
//                   <div className="">
//                     {
//                       news['राष्ट्रीय']?.length > 0
//                         ? (
//                           <DetailsNewsRow
//                             news={news['राष्ट्रीय']}
//                             category='राष्ट्रीय'
//                             type='details-news'
//                           />
//                         )
//                         : (
//                           <p className="text-gray-500 p-4"></p>
//                         )
//                     }
//                   </div>
//                 </div>
//                 <div className="w-full lg:w-4/12 lg:mt-0 mt-4">
//                   <div className="pl-2">

//                     {news['बाज़ार']?.length > 0 && <Title title="बाज़ार" />}

//                     {/* <Title title="बाज़ार" /> */}
//                     <div className='grid grid-cols-1 gap-y-1 mt-3'>
//                       {
//                         news['बाज़ार']?.length > 0
//                           ? (
//                             news['बाज़ार'].map((item, i) => (
//                               <NewsCard news={item} key={i} />
//                             ))
//                           )
//                           : (
//                             <p className="text-gray-500 p-4"></p>
//                           )
//                       }
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-4 bg-white  rounded-md">
//               <AdvertisementSection pageTarget="home" deviceTarget="all" placementKey="top" />
//               {/* <AdvertisementSection pageTarget="home" deviceTarget="desktop" placementKey="bottom" /> */}

//             </div>
//           </div>
//         </div>


//       </main>
//       <Footer news={news['राजनीति']} />
//     </div>
//   );
// }
// export default Home