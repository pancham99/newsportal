
import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import bgimage from '../assets/bgimage.webp';
import add from '../assets/add.jpg';
import Image from 'next/image';
import Header_Category from './Header_Category';



const Header = () => {
    return (
        <div>
            <div className='px-5 lg:px-8 flex justify-between items-center bg-[#333333] text-[#cccccc]'>
                <span className='text-sm'>{moment().format('LLLL')}</span>
                <div className='flex gap-2'>
                    <Link className='flex justify-center items-center bg-[#ffffff2b] p-2'  target="_blank" href={"https://www.facebook.com/people/Top-Briefing/61552965021716/?rdid=GXwcwyboiwHXnvQF&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18trThXJnu%2F"}><FaFacebookF className="text-white flex justify-center items-center " /></Link>
                    <Link className='flex justify-center items-center bg-[#ffffff2b] p-2'  target="_blank"  href={"https://www.instagram.com/topbriefing/?igsh=ZXJ5ZTdrbm9ycTJl#"}><FaInstagram className="text-white flex justify-center items-center " /></Link>
                    <Link
                        className="flex justify-center items-center bg-[#ffffff2b] p-2"
                        href="https://www.youtube.com/results?search_query=topbriefing"
                        target="_blank" 
                        rel="noopener noreferrer" 
                    >
                        <IoLogoYoutube className="text-white text-2xl" />
                    </Link>

                </div>
                
            </div>

            <div className='h-[200px] ' style={{ backgroundImage: `url(${bgimage.src})`, backgroundSize: "cover" }}>
                <div className='px-8 py-14'>
                    <div className='flex justify-center items-center flex-wrap'>
                        <div className='md:w-4/12 w-full'>
                            <div className='flex flex-col justify-center items-center md:items-start'>
                                <Image src="/logo.png" alt="bgimage" width={150} height={150} />
                                {/* <div className='text-xl text-red-600 font-extrabold'>TopBriefing</div> */}
                            </div>
                        </div>

                        <div className='md:w-8/12 w-full hidden md:block'>
                            <div className='w-full flex justify-end'>
                                <Image className='w-[400px] h-[100px]' src={add.src} alt="bgimage" width={200} height={100} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Header_Category />
        </div>
    )
}

export default Header