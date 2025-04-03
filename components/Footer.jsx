import Image from "next/image";
import React from "react";
import Link from 'next/link'
import Category from "./Category";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";

const Footer = () => {
    return (
        <div className='w-full'>
            <div className='bg-[#1e1919]'>
                <div className='px-4 md:px-8 py-10 w-full gap-12 grid grid-cols-1 lg:grid-cols-4'>
                    <div className='w-full'>
                        <div className='w-full flex flex-col gap-y-[14px]'>
                            {/* <Image src="" alt='' /> */}
                            <div className='text-xl text-red-600 font-extrabold'>TopBriefing</div>
                            <h2 className='text-slate-300'>{`Today's news: Get latest and Breaking News on Politics, Business, Lifestyle, Entertainment and Sports along with News updates from around`}</h2>

                            <h2 className='text-slate-300'>{`Today's news: Get latest and Breaking News on Politics, Business, Lifestyle, Entertainment and Sports along with News updates from around`}</h2>
                        </div>
                    </div>

                    <div className='w-full flex flex-col gap-y-[14px]'>
                        <div className='text-xl font-bold text-white relative before:absolute before:w-[4px] before:bg-[#c80000] before:h-full before:left-0 pl-3'>Gallery</div>

                        <div className='grid grid-cols-3 gap-2'>
                            {
                                [1, 2, 3, 4, 5, 6, 7, 8, 9].map((image, i) => <div key={i}>
                                    <Image src={"/image.jpg"} alt="" width={100} height={100} className="" />
                                </div>)
                            }


                            {/*  */}
                        </div>
                    </div>

                    <div>
                        <Category category={[]} titleStyle='text-white' />
                    </div>

                    <div className='w-full flex flex-col gap-y-[14px]'>
                        <div className='text-xl font-bold text-white relative before:absolute before:w-[4px] before:bg-[#c80000] before:h-full before:left-0 pl-3'>Recent news</div>

                        <div className='grid grid-cols-1 gap-y-2 pt-3'>
                            {
                                [1, 2, 3, 4].map((r, i) => <Link href={"#"} key={i} className="flex gap-x-2 ">
                                    <div className="group relative overflow-hidden w-[90px] h-[75px]">
                                        <div className="w-[90px] h-[85px] block group-hover:scale-[1.1] transition-all duration-[1s] ">
                                            <Image src={"/image.jpg"} alt="" className="" layout="fill" />

                                            <div className='w-full h-full block absolute left-0 top-0 invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300'></div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-y-1">
                                        <h2 className="text-sm font-semibold text-white hover:text-[#c80000]">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`}</h2>
                                        <div className='flex gap-x-2 text-xs font-normal text-white'>
                                            <span> {`August 25, 2024`} /</span>
                                            <span>madhusudan</span>
                                        </div>
                                    </div>
                                </Link>)
                            }
                        </div>
                    </div>


                </div>
            </div>
            <div className="bg-[#262323]">
                <div className="px-4 md:px-8 py-5 flex flex-col md:flex-row gap-3 justify-between items-center">
                    <div className="flex gap-y-2 text-gray-400 justify-start items-center">
                        <span>Copright @ 2024</span> {''}
                        <Link href='https://www.youtube.com/results?search_query=top+briefing' className=' text-xs'> TopBriefing</Link>
                    </div>

                    <div className='flex gap-2'>
                        <Link className='flex justify-center items-center bg-[#ffffff2b] p-2' href={"#"}><FaFacebookF className="text-white flex justify-center items-center " /></Link>
                        <Link className='flex justify-center items-center bg-[#ffffff2b] p-2' href={"#"}><FaXTwitter className="text-white flex justify-center items-center " /></Link>
                        <Link className='flex justify-center items-center bg-[#ffffff2b] p-2' href={"#"}><IoLogoYoutube className="text-white flex justify-center items-center " /></Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer