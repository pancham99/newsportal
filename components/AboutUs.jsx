import Image from 'next/image';

const AboutUs = () => {
    return (
        <div className="bg-white text-gray-800 px-6 py-12 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-5xl font-bold text-red-600">About Top Brefing News</h1>
                <p className="mt-4 text-md md:text-lg text-gray-600 max-w-2xl mx-auto">
                    {`India's trusted source for fast, reliable, and ethical digital journalism.`}
                </p>
            </div>

            {/* Mission */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold text-red-600 mb-4">Our Vision</h2>
                <p className="text-gray-700 leading-relaxed">
                    To be the most trusted and innovative digital news platform in India, empowering citizens with credible journalism and real-time reporting.
                </p>
            </div>

            {/* Leadership */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold text-red-600 mb-8">Meet Our Leadership</h2>

                <div className="grid md:grid-cols-2 gap-10">
                    {/* CEO */}
                    <div className="bg-gray-50 rounded-xl shadow p-6">
                        <Image src="/ceo.jpeg" alt="CEO" width={100} height={100} className="rounded-full mb-4" />
                        <h3 className="text-xl font-bold">Jagriti Mishra — CEO</h3>
                        <p className="text-gray-700 mt-2">
                            {`Jagriti brings over 15 years of media strategy experience. Former leader at top Indian news channels, he now builds India's most credible news platform.`}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">MBA, IIM Bangalore | Digital Excellence Award 2022</p>
                    </div>

                    {/* Director */}
                    <div className="bg-gray-50 rounded-xl shadow p-6">
                        <Image src="/ceo.jpeg" alt="Director" width={100} height={100} className="rounded-full mb-4" />
                        <h3 className="text-xl font-bold">Shruti Mishra — Director of Content & Operations</h3>
                        <p className="text-gray-700 mt-2">
                            With over 10 years in journalism, Anita ensures every piece of news meets the highest editorial standards.
                        </p>
                        <p className="text-sm text-gray-500 mt-2">MA Journalism, DU | Best Editor Award 2023</p>
                    </div>
                </div>
            </div>

            {/* Highlights */}
            <div>
                <h2 className="text-2xl font-semibold text-red-600 mb-4">Why Choose Us</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Multilingual Content – News in Hindi and English</li>
                    <li>Mobile-First Experience – Optimized for speed and ease</li>
                    <li>AI-Powered Insights – Smart summaries and trend analysis</li>
                    <li>Fact-Checked Reporting – Verified, no misinformation</li>
                    <li>Ethical Journalism – People-first, bias-free coverage</li>
                </ul>
            </div>
        </div>
    );
};

export default AboutUs;
