'use client';

import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import Link from 'next/link';
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import bgimage from '../assets/image.jpeg';
import add from '../assets/add.jpg';
import Image from 'next/image';
import Header_Category from './Header_Category';
import { base_api_url } from '../config/config';

const Header = () => {
    const [Banner, setBanner] = useState([]);
    const [loading, setLoading] = useState(true);  // <-- loading state

    const get_permostion = async () => {
        try {
            const res = await fetch(`${base_api_url}/api/banner/getall`);
            const data = await res.json();
            setBanner(data.banners);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);  // <-- loading complete
        }
    };

    useEffect(() => {
        get_permostion();
    }, []);

    const bannerItem = Banner?.find(
        item => item.bannertype === 'Banner' && item.status !== 'deactive'
    );

    // 👇 Image selection logic
    const bannerImage = bannerItem?.image || bgimage.src;

    return (
        <div>
            {/* Top Header */}
            <div className='px-2 lg:px-8 flex justify-between items-center bg-[#333333] text-[#cccccc]'>
                <span className='text-sm'>{moment().tz("Asia/Kolkata").format('LLLL')}</span>
                <div className='flex gap-2'>
                    <Link className='flex justify-center items-center bg-[#ffffff2b] p-2' target="_blank" href={"https://www.facebook.com/people/Top-Briefing/61552965021716/"}><FaFacebookF className="text-white" /></Link>
                    <Link className='flex justify-center items-center bg-[#ffffff2b] p-2' target="_blank" href={"https://www.instagram.com/topbriefing/"}><FaInstagram className="text-white" /></Link>
                    <Link className="flex justify-center items-center bg-[#ffffff2b] p-2" href="https://www.youtube.com/results?search_query=topbriefing" target="_blank" rel="noopener noreferrer">
                        <IoLogoYoutube className="text-white text-2xl" />
                    </Link>
                </div>
            </div>

            {/* Mobile Video Section */}
            <div className="relative h-[200px] overflow-hidden lg:hidden">
                <video className="absolute top-0 left-0 w-full h-full object-cover" src="/videobg.mp4" autoPlay loop muted playsInline />
                <div className="relative z-10 px-8 py-14">
                    <div className="flex justify-center lg:justify-start items-center flex-wrap">
                        <div className="md:w-4/12 w-full">
                            <div className="flex flex-col justify-center items-center md:items-start">
                                <Image src="/logo.png" alt="bgimage" width={150} height={150} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Banner Section */}
            <div 
                className='h-[360px] w-full hidden lg:block transition-all duration-500 ease-in-out'
                style={{
                    backgroundImage: `url(${loading ? bgimage.src : bannerImage})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="">
                    <div className="flex justify-center lg:justify-start items-center flex-wrap">
                        <div className="">
                            <div className="flex flex-col md:items-start">
                                <Image  src="/logo.png" alt="bgimage" width={150} height={150} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Header_Category />
        </div>
    );
}

export default Header;
