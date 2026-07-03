import AboutUs from '../../components/AboutUs'
import React from 'react'

export const metadata = {
  title: 'About Us | Top Briefing - Hindi News Portal',
  description: "Learn about Top Briefing — India's trusted Hindi news portal covering breaking news, politics, sports, entertainment, technology and more.",
  keywords: 'About Top Briefing, Hindi News Portal, Top Briefing Team, News India',
  alternates: {
    canonical: 'https://topbriefing.in/about',
  },
  openGraph: {
    title: 'About Us | Top Briefing',
    description: "Learn about Top Briefing — India's trusted Hindi news portal.",
    url: 'https://topbriefing.in/about',
    siteName: 'Top Briefing',
    locale: 'hi_IN',
    type: 'website',
    images: [{ url: 'https://topbriefing.in/logo.png', width: 1200, height: 630, alt: 'About Top Briefing' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@topbriefing',
    title: 'About Us | Top Briefing',
    description: "Learn about Top Briefing — India's trusted Hindi news portal.",
    images: ['https://topbriefing.in/logo.png'],
  },
}

const Page = () => {
  return (
    <div>
      <AboutUs />
    </div>
  )
}

export default Page
