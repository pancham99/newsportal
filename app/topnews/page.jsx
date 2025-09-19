import dynamic from 'next/dynamic'
import Head from 'next/head'

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

// Define site metadata
const SITE_METADATA = {
  title: "Top Briefing - Latest Breaking News, Headlines & Updates",
  description: "Get the latest news in Hindi on politics, sports, entertainment, technology, health, and more. Stay updated with breaking news and in-depth coverage.",
  siteUrl: "https://www.topbriefing.in",
  image: "https://www.topbriefing.in/logo.png",
  twitterHandle: "@topbriefing",
  fbAppId: process.env.FB_APP_ID || "your_facebook_app_id"
}

// Generate category URLs for breadcrumb
const generateCategoryUrl = (category) => {
  const categorySlugs = {
    'राजनीति': 'politics',
    'खेल': 'sports',
    'स्वास्थ्य': 'health',
    'शिक्षा': 'education',
    'मनोरंजन': 'entertainment',
    'अंतरराष्ट्रीय': 'international',
    'प्रौद्योगिकी': 'technology',
    'भक्ति': 'devotion',
    'लाइफस्टाइल': 'lifestyle',
    'अपराध': 'crime',
    'मौसम': 'weather',
    'राशि': 'horoscope',
    'राष्ट्रीय': 'national',
    'बाज़ार': 'market'
  };
  
  return `${SITE_METADATA.siteUrl}/category/${categorySlugs[category] || category}`;
};

// Function to format date for schema
const formatSchemaDate = (dateString) => {
  if (!dateString) return new Date().toISOString();
  return new Date(dateString).toISOString();
};

const Page = async () => {
  const news_data = await fetch(`${base_api_url}/api/all/news`, {
    next: {
      revalidate: 300
    },
  });

  const { news } = await news_data?.json()

  // Get the first news item for OG tags
  const firstNewsItem = news['राजनीति'] && news['राजनीति'][0] ? news['राजनीति'][0] : null;

  // Generate news article structured data
  const newsArticlesStructuredData = [];
  Object.keys(news).forEach(category => {
    news[category]?.slice(0, 3).forEach((article, index) => {
      if (article.headline && article.description) {
        newsArticlesStructuredData.push({
          "@type": "NewsArticle",
          "headline": article.headline,
          "description": article.description.substring(0, 160), // Limit description length
          "image": article.image || SITE_METADATA.image,
          "datePublished": formatSchemaDate(article.publishedAt),
          "dateModified": formatSchemaDate(article.updatedAt),
          "author": {
            "@type": "Organization",
            "name": "Top Briefing"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Top Briefing",
            "logo": {
              "@type": "ImageObject",
              "url": SITE_METADATA.image
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${SITE_METADATA.siteUrl}/news/${article.slug || article.id}`
          }
        });
      }
    });
  });

  // Generate breadcrumb structured data
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_METADATA.siteUrl
      }
    ]
  };

  // Generate organization structured data
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": "Top Briefing",
    "url": SITE_METADATA.siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_METADATA.siteUrl}/logo.png`
    },
    "sameAs": [
      "https://twitter.com/topbriefing",
      "https://facebook.com/topbriefing",
      "https://instagram.com/topbriefing"
    ]
  };

  return (
    <div>
      {/* SEO Meta Tags */}
      <Head>
        <title>{SITE_METADATA.title}</title>
        <meta name="description" content={SITE_METADATA.description} />
        <meta name="keywords" content="news, hindi news, breaking news, india news, politics, sports, entertainment, technology, health, education, lifestyle" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={SITE_METADATA.siteUrl} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={SITE_METADATA.title} />
        <meta property="og:description" content={SITE_METADATA.description} />
        <meta property="og:url" content={SITE_METADATA.siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={firstNewsItem?.image || SITE_METADATA.image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="hi_IN" />
        <meta property="og:site_name" content="Top Briefing" />
        {SITE_METADATA.fbAppId && <meta property="fb:app_id" content={SITE_METADATA.fbAppId} />}

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={SITE_METADATA.twitterHandle} />
        <meta name="twitter:creator" content={SITE_METADATA.twitterHandle} />
        <meta name="twitter:title" content={SITE_METADATA.title} />
        <meta name="twitter:description" content={SITE_METADATA.description} />
        <meta name="twitter:image" content={firstNewsItem?.image || SITE_METADATA.image} />

        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="language" content="Hindi" />
        <meta name="author" content="Top Briefing" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
        />

        {/* News Articles Structured Data */}
        {newsArticlesStructuredData.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticlesStructuredData) }}
          />
        )}
      </Head>

      {/* <AddModel /> */}
      <main  itemScope itemType="https://schema.org/WebPage">
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