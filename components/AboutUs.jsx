"use client";

import Image from 'next/image';
import { useState } from 'react';

const ReadMoreText = ({ text, maxLength = 300 }) => {
    const [expanded, setExpanded] = useState(false);

    const isLong = text.length > maxLength;

    return (
        <div className="">
            <p className="text-gray-700 mt-2 leading-7 whitespace-pre-line">
                {expanded || !isLong
                    ? text
                    : `${text.substring(0, maxLength)}...`}  {isLong && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className=" text-red-600 text-sm font-semibold hover:text-red-700"
                        >
                            {expanded ? "Read Less" : "Read More"}
                        </button>
                    )}
            </p>


        </div>
    );
};


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
                        <div className='flex justify-center '>
                            <Image src="/ceo.jpeg" alt="CEO" width={100} height={100} className="rounded-full mb-4 flex justify-center" />
                        </div>
                        <h3 className="text-xl font-bold text-center">Jagriti Mishra</h3>
                        <h2 className="text-xl font-bold text-center">CEO & Founder</h2>

                        <ReadMoreText
                            maxLength={350}
                            text={`Jagriti Mishra is the Founder and Chief Executive Officer (CEO) of Top Briefing, a digital news platform she established in 2024 with the vision of delivering accurate, timely, and trustworthy news to readers across India. She belongs to Bihar and currently lives in Gurugram, Haryana. Driven by a passion for journalism and digital media, Jagriti founded Top Briefing to create a platform where credibility, transparency, and responsible reporting are the highest priorities. Since its launch, she has led the organization's growth by focusing on factual reporting, innovative digital storytelling, and a reader-first approach. Alongside leading Top Briefing, Jagriti has built a successful career in the aviation and travel industry, where she has gained valuable experience in operations, quality assurance, customer service, and process management. Her corporate background has strengthened her leadership, analytical thinking, and decision-making abilities, which continue to guide the platform's development. As CEO, Jagriti oversees the company's strategic vision, editorial standards, and business growth. She works closely with the editorial, creative, and technology teams to ensure that every story published reflects the values of accuracy, integrity, and professionalism.Her journey from Bihar to building her career in Gurugram and launching Top Briefing in 2024 reflects her determination, resilience, and entrepreneurial spirit. She remains committed to making Top Briefing one of India's most trusted and respected digital news platforms.`}
                        />
                        {/* <p className="text-lg text-blue-600 font-semibold mt-2">B.Com | Delhi University</p> */}
                    </div>

                    {/* Director */}
                    <div className="bg-gray-50 rounded-xl shadow p-6">
                        <div className='flex justify-center '>
                            <Image src="/ceo.jpeg" alt="CEO" width={100} height={100} className="rounded-full mb-4 flex justify-center" />
                        </div>
                        <h3 className="text-xl font-bold text-center">Shruti Mishra</h3>
                        <h2 className="text-xl font-bold text-center text-gray-600">Director of Content & Operations</h2>


                        <ReadMoreText
                            maxLength={350}
                            text={`Shruti Mishra is the Director of Content & Operations at Top Briefing. She belongs to Bihar and currently lives in Noida, Uttar Pradesh. Alongside her role at Top Briefing, she is working with HDFC ERGO General Insurance in the Health Insurance sector.With a strong background in the insurance industry, Shruti has developed expertise in customer service, health insurance operations, and professional communication. Her corporate experience has enhanced her leadership, organizational, and problem-solving skills, enabling her to effectively manage multiple responsibilities.At Top Briefing, Shruti oversees content planning, operational coordination, and quality management. She is dedicated to ensuring that the platform delivers accurate, reliable, and engaging news while maintaining the highest standards of editorial integrity. Her strategic thinking and commitment to excellence play a key role in the organization's growth and success. Shruti believes that responsible journalism is essential to building an informed society. She is passionate about supporting ethical reporting and helping Top Briefing become one of India's most trusted digital news platforms.Originally from Bihar, her journey to building a successful professional career in Noida reflects her dedication, perseverance, and commitment to continuous learning. Through her contributions, she continues to strengthen Top Briefing's vision of delivering credible and impactful journalism.`}
                        />
                        {/* <p className="text-sm text-gray-500 mt-2">MA Journalism, DU | Best Editor Award 2023</p> */}
                    </div>

                    <div className="bg-gray-50 rounded-xl shadow p-6">
                        <div className='flex justify-center '>
                            <Image src="/dir.jpeg" alt="CEO" width={100} height={100} className="rounded-full mb-4 flex justify-center" />
                        </div>
                        <h3 className="text-xl font-bold text-center">Ashwani  Mishra</h3>
                        <h2 className="text-xl font-bold text-center text-gray-600">Managing Director</h2>

                        <ReadMoreText
                            maxLength={350}
                            text={`Ashwani Mishra is the Managing Director and Creative Head of Top Briefing. With over 6 years of professional experience in graphic design and video editing, he brings creativity, innovation, and technical expertise to the platform. His passion for visual storytelling has helped establish Top Briefing's unique digital identity and engaging content style.Ashwani specializes in graphic design, video editing, motion graphics, branding, and digital content creation. He has worked on a wide range of creative projects, producing high-quality visuals that effectively communicate ideas and enhance audience engagement. His ability to combine creativity with modern design trends ensures that every piece of content is visually appealing and impactful.At Top Briefing, Ashwani leads the creative team, overseeing the design and production of graphics, videos, social media content, and brand campaigns. He works closely with the editorial team to transform news stories into compelling visual experiences that are informative, engaging, and easy to understand.Known for his dedication, attention to detail, and commitment to excellence, Ashwani continuously explores new technologies and creative techniques to keep the platform at the forefront of digital media. His leadership and vision play a significant role in the growth and success of Top Briefing.Through his creativity and unwavering commitment to quality, Ashwani Mishra continues to help Top Briefing achieve its mission of delivering trusted news with impactful visual storytelling.`}
                        />
                        {/* <p className="text-sm text-gray-500 mt-2">MA Journalism, DU </p> */}
                    </div>

                    <div className="bg-gray-50 rounded-xl shadow p-6">
                        <div className='flex justify-center '>
                            <Image src="/cto.jpeg" alt="CEO" width={100} height={100} className="rounded-full mb-4 flex justify-center" />
                        </div>
                        <h3 className="text-xl font-bold text-center">Madhusudan</h3>
                        <h2 className="text-xl font-bold text-center text-gray-600"> Chief Technology Officer (CTO)</h2>


                        <ReadMoreText
                            maxLength={350}
                            text={`Madhusudan is a skilled Project Leader in the Information Technology (IT) industry and an integral member of the leadership team at Top Briefing. With extensive experience in leading technology-driven projects, he specializes in project planning, team management, process optimization, and delivering high-quality solutions.Throughout his career, Madhusudan has successfully managed cross-functional teams, coordinated complex projects, and ensured the timely delivery of business objectives. His expertise in project management, stakeholder communication, risk assessment, and strategic planning enables him to lead projects with efficiency and precision.At Top Briefing, Madhusudan contributes to the platform's technological growth and operational excellence. He works closely with development, editorial, and creative teams to improve digital infrastructure, streamline workflows, and support innovation. His leadership helps ensure that the platform remains reliable, scalable, and focused on delivering the best experience for its readers. Known for his analytical thinking, problem-solving abilities, and collaborative leadership style, Madhusudan is passionate about leveraging technology to drive innovation and business growth. He believes that successful projects are built on strong teamwork, effective communication, and a commitment to continuous improvement.With a vision for excellence and a dedication to innovation, Madhusudan continues to play a key role in helping Top Briefing grow into one of India's most trusted and technologically advanced digital news platforms.`}
                        />
                        <p className="text-lg text-blue-600 font-semibold mt-2">B.tech(computer science and engineering)</p>
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
