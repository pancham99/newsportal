
import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
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
                    <Link className='flex justify-center items-center bg-[#ffffff2b] p-2' href={"#"}><FaFacebookF className="text-white flex justify-center items-center " /></Link>
                    <Link className='flex justify-center items-center bg-[#ffffff2b] p-2' href={"#"}><FaXTwitter className="text-white flex justify-center items-center " /></Link>
                    <Link className='flex justify-center items-center bg-[#ffffff2b] p-2' href={"#"}><IoLogoYoutube className="text-white flex justify-center items-center " /></Link>

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