import AddContactFrom from '../../components/AddContactFrom'
import Addcontacthero from '../../components/Addcontacthero'
import React from 'react'

export const metadata = {
  title: 'Contact Us | Top Briefing - Hindi News Portal',
  description: 'Contact the Top Briefing team. Send us your feedback, news tips or advertising inquiries. We are here to help.',
  keywords: 'Contact Top Briefing, News Feedback, Advertising, Hindi News Contact',
  alternates: {
    canonical: 'https://topbriefing.in/contact',
  },
  openGraph: {
    title: 'Contact Us | Top Briefing',
    description: 'Get in touch with the Top Briefing editorial team.',
    url: 'https://topbriefing.in/contact',
    siteName: 'Top Briefing',
    locale: 'hi_IN',
    type: 'website',
    images: [{ url: 'https://topbriefing.in/logo.png', width: 1200, height: 630, alt: 'Contact Top Briefing' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@topbriefing',
    title: 'Contact Us | Top Briefing',
    description: 'Get in touch with the Top Briefing editorial team.',
    images: ['https://topbriefing.in/logo.png'],
  },
}

const page = () => {
  return (
    <main className="bg-white min-h-screen">
      <Addcontacthero />
      <section className="px-4 py-12 max-w-5xl mx-auto">
        <AddContactFrom />
      </section>
    </main>
  )
}

export default page
