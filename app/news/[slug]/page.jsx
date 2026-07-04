import Image from "next/image";
import VideoAdvertisement from '../../../components/VideoAdvertisement';
import moment from 'moment-timezone';
import dynamic from 'next/dynamic';
import { getNews } from '../../../utils/getNews';
import Breadcrumb from '../../../components/Breadcrumb';
import Title from '../../../components/Title';
import AdBanner from '../../../components/AdBanner';
import CommentForm from '../../../components/CommentForm';

const NewsDescription = dynamic(() => import('../../../components/news/NewsDescription'), { ssr: false });

/* ─────────────────────────────────────────────
   SEO: generateMetadata
   ───────────────────────────────────────────── */
export async function generateMetadata({ params }) {
    const { news } = await getNews(params?.slug);
    const cleanDescription = (news?.description || '').replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim();
    const shortDesc = cleanDescription.slice(0, 155) || 'Top Briefing पर पढ़ें ताजा हिंदी खबरें।';
    const canonicalUrl = `https://topbriefing.in/news/${params?.slug}`;
    const newsImage = news?.image || 'https://topbriefing.in/logo.png';
    const articleTitle = news?.title || 'Top Briefing - Hindi News';

    // Build rich keyword list from article data
    const keywords = [
        news?.category,
        news?.writerName,
        ...(Array.isArray(news?.keywords) ? news.keywords : []),
        'Top Briefing',
        'Hindi News',
        'Breaking News',
        'ताजा खबर',
        news?.category ? `${news.category} समाचार` : null,
        news?.category ? `${news.category} news` : null,
    ].filter(Boolean).join(', ');

    return {
        title: `${articleTitle} | Top Briefing`,
        description: shortDesc,
        keywords,
        authors: [{ name: news?.writerName || 'Top Briefing Editorial Team' }],
        alternates: {
            canonical: canonicalUrl,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-image-preview': 'large',
                'max-snippet': -1,
                'max-video-preview': -1,
            },
        },
        openGraph: {
            title: `${articleTitle} | Top Briefing`,
            description: shortDesc,
            url: canonicalUrl,
            siteName: 'Top Briefing',
            locale: 'hi_IN',
            type: 'article',
            publishedTime: news?.createdAt,
            modifiedTime: news?.updatedAt || news?.createdAt,
            authors: [news?.writerName || 'Top Briefing Editorial Team'],
            section: news?.category,
            tags: Array.isArray(news?.keywords) ? news.keywords : [],
            images: [{
                url: newsImage,
                width: 1200,
                height: 630,
                alt: articleTitle,
            }],
        },
        twitter: {
            card: 'summary_large_image',
            site: '@topbriefing',
            creator: '@topbriefing',
            title: `${articleTitle} | Top Briefing`,
            description: shortDesc,
            images: [newsImage],
        },
    };
}

/* ─────────────────────────────────────────────
   JSON-LD: NewsArticle schema
   Required for Google News / Discover indexing
   ───────────────────────────────────────────── */
function NewsArticleSchema({ news, slug }) {
    const cleanDescription = (news?.description || '').replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim().slice(0, 155);
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: news?.title,
        description: cleanDescription,
        image: {
            '@type': 'ImageObject',
            url: news?.image || 'https://topbriefing.in/logo.png',
            width: 1200,
            height: 630,
        },
        datePublished: news?.createdAt,
        dateModified: news?.updatedAt || news?.createdAt,
        author: {
            '@type': 'Person',
            name: news?.writerName || 'Top Briefing Editorial Team',
            url: 'https://topbriefing.in',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Top Briefing',
            logo: {
                '@type': 'ImageObject',
                url: 'https://topbriefing.in/logo.png',
                width: 600,
                height: 60,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://topbriefing.in/news/${slug}`,
        },
        articleSection: news?.category,
        keywords: Array.isArray(news?.keywords) ? news.keywords.join(', ') : (news?.category || ''),
        inLanguage: 'hi',
        isAccessibleForFree: true,
    };
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

/* ─────────────────────────────────────────────
   JSON-LD: BreadcrumbList schema
   ───────────────────────────────────────────── */
function BreadcrumbSchema({ category, title, slug }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://topbriefing.in' },
            { '@type': 'ListItem', position: 2, name: category, item: `https://topbriefing.in/news/category/${encodeURIComponent(category)}` },
            { '@type': 'ListItem', position: 3, name: title, item: `https://topbriefing.in/news/${slug}` },
        ],
    };
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

/* ─────────────────────────────────────────────
   Page Component
   ───────────────────────────────────────────── */
const Details = async ({ params }) => {
    const { news } = await getNews(params?.slug);

    const formattedDate = moment.utc(news?.createdAt).tz("Asia/Kolkata").format("DD MMM YYYY");
    const formattedTime = moment.utc(news?.createdAt).tz("Asia/Kolkata").format("hh:mm A");

    return (
        <article>
            {/* Structured Data */}
            <NewsArticleSchema news={news} slug={params?.slug} />
            <BreadcrumbSchema category={news?.category} title={news?.title} slug={params?.slug} />

            {/* Breadcrumb Nav */}
            <div className="bg-white shadow-sm py-3">
                <div className="px-4 md:px-8 w-full">
                    <Breadcrumb one={news?.category} two={news?.title?.slice(0, 40)} />
                </div>
            </div>

            <div className="bg-slate-200 w-full">
                <div className="px-4 md:px-8 w-full py-8">
                    <div className="flex flex-wrap">

                        {/* ── Main Article Column ── */}
                        <div className="w-full xl:w-8/12">
                            <div className="w-full pr-0 xl:pr-4">
                                <div className="bg-white rounded-sm overflow-hidden">

                                    {/* Hero Image — LCP element: priority load, explicit dimensions */}
                                    {news?.image && (
                                        <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                                            <Image
                                                src={news.image}
                                                alt={news?.title || 'News Image'}
                                                fill
                                                priority
                                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 800px"
                                                className="object-cover"
                                            />
                                        </div>
                                    )}

                                    {/* Article Content */}
                                    <div className="flex flex-col gap-y-4 px-4 md:px-6 py-6">
                                        {/* Category tag */}
                                        <div>
                                            <span className="inline-block bg-red-700 text-white text-xs font-semibold px-3 py-1 rounded-sm">
                                                {news?.category}
                                            </span>
                                        </div>

                                        {/* Headline — h1 for SEO */}
                                        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold leading-snug">
                                            {news?.title}
                                        </h1>

                                        {/* Author / Date meta */}
                                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 border-b border-gray-100 pb-4">
                                            {news?.writerName && (
                                                <span className="font-medium text-gray-700">✍️ {news.writerName}</span>
                                            )}
                                            <time dateTime={news?.createdAt}>
                                                🕐 {formattedDate} · {formattedTime}
                                            </time>
                                        </div>

                                          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                                            <NewsDescription description={news?.description} />
                                        </div>


                                          {/* ── Like & Comments ── */}
                                        <CommentForm news={news} />

                                        {/* ── In-article ad (shows between meta and body) ── */}
                                        <AdBanner
                                            adSlot="8002892607"
                                            adFormat="fluid"
                                            className="my-2"
                                        />

                                        {/* Article body */}
                                      

                                        {/* ── Below-article ad ── */}
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <p className="text-xs text-gray-400 text-center mb-1">Advertisement</p>
                                            <AdBanner
                                                adSlot="8002892607"
                                                adFormat="auto"
                                                className="w-full"
                                            />
                                        </div>

                                      
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Sidebar Column ── */}
                        <div className="w-full xl:w-4/12 mt-6 xl:mt-0">
                            <div className="w-full pl-0 xl:pl-4">
                                <div className="flex flex-col gap-6">
                                    <div className="w-full bg-white pt-4 rounded-sm">
                                        <div className="pl-4">
                                            <Title title="Recent Videos" />
                                        </div>
                                        <div className="p-3">
                                            <VideoAdvertisement />
                                        </div>
                                    </div>

                                    {/* ── Sidebar sticky ad ── */}
                                    <div className="bg-white p-3 rounded-sm">
                                        <p className="text-xs text-gray-400 text-center mb-1">Advertisement</p>
                                        <AdBanner
                                            adSlot="8002892607"
                                            adFormat="vertical"
                                            style={{ minHeight: 250 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </article>
    );
};

export default Details;
