// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         unoptimized: true,
//     },
//     // images: {
//     //     remotePatterns: [
//     //         {
//     //             protocol: 'http',
//     //             hostname: 'res.cloudinary.com',
//     //             pathname: '/**',
//     //         },
//     //         {
//     //             protocol: 'https',
//     //             hostname: 'res.cloudinary.com',
//     //             pathname: '/**',
//     //         }, {
//     //             hostname: "www.youtube.com"
//     //         },
//     //           {
//     //             protocol: 'https',
//     //             hostname: 'hindi.cdn.zeenews.com',
//     //             pathname: '/**',
//     //         },
//     //         {
//     //             protocol: 'https',
//     //             hostname: 'www.bollywoodhungama.com',
//     //             pathname: '/**',
//     //         },
//     //         {
//     //             protocol: 'https',
//     //             hostname: 'avadhnama.com',
//     //             pathname: '/**',
//     //         },
//     //         {
//     //             protocol: 'https',
//     //             hostname: 'https://newsdata.io/search-news',
//     //             pathname: '/**',
//     //         },
//     //         {
//     //             protocol: 'https',
//     //             hostname: 'www.indiatoday.in',
//     //             pathname: '/**',
//     //         },
//     //         {
//     //             protocol: 'https',
//     //             hostname: 'www.amarujala.com',
//     //             pathname: '/**',
//     //         },
//     //     ]


//     // },

//     // Rewrites for API or other routing needs
//     async rewrites() {
//         return [
//             {
//                 source: '/sitemap.xml',
//                 destination: '/api/sitemap',
//             },
//             {
//                 source: '/robots.txt',
//                 destination: '/api/robots',
//             },
//         ]
//     },


// };

// export default nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ]
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
    ]
  },
  env: {
    SITE_URL: process.env.SITE_URL || 'https://www.topbriefing.in',
  },
}

export default nextConfig
