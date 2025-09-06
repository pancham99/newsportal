/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    // images: {
    //     remotePatterns: [
    //         {
    //             protocol: 'http',
    //             hostname: 'res.cloudinary.com',
    //             pathname: '/**',
    //         },
    //         {
    //             protocol: 'https',
    //             hostname: 'res.cloudinary.com',
    //             pathname: '/**',
    //         }, {
    //             hostname: "www.youtube.com"
    //         },
    //           {
    //             protocol: 'https',
    //             hostname: 'hindi.cdn.zeenews.com',
    //             pathname: '/**',
    //         },
    //         {
    //             protocol: 'https',
    //             hostname: 'www.bollywoodhungama.com',
    //             pathname: '/**',
    //         },
    //         {
    //             protocol: 'https',
    //             hostname: 'avadhnama.com',
    //             pathname: '/**',
    //         },
    //         {
    //             protocol: 'https',
    //             hostname: 'https://newsdata.io/search-news',
    //             pathname: '/**',
    //         },
    //         {
    //             protocol: 'https',
    //             hostname: 'www.indiatoday.in',
    //             pathname: '/**',
    //         },
    //         {
    //             protocol: 'https',
    //             hostname: 'www.amarujala.com',
    //             pathname: '/**',
    //         },
    //     ]


    // },

    // Rewrites for API or other routing needs
    async rewrites() {
        return [
            {
                source: '/sitemap.xml',
                destination: '/api/sitemap',
            },
            {
                source: '/robots.txt',
                destination: '/api/robots',
            },
        ]
    },


};

export default nextConfig;
