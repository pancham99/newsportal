import { MetadataRoute } from 'next'
// 
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
     sitemap: 'https://www.topbriefing.in/sitemap.xml',
  }
}