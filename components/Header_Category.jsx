"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { BsList } from "react-icons/bs";
import { base_api_url } from "../config/config"
import { useRouter } from 'next/navigation';
import useFetch from '../hooks/useFetch'; 

const Header_Category = () => {
    const path = usePathname()
    const router = useRouter();
    const { data, loading, error } = useFetch(`${base_api_url}/api/category/all`);
    const categories = data?.categories || [];


    const decodedCategory = decodeURIComponent(path.split('/')[3] || '');
    const [state, setState] = useState('')

    const handleStateChange = (e) => {
        const selectedState = e.target.value;
        setState(selectedState);
        if (selectedState) {
            router.push(`/news/state/${selectedState}`);
        }
    };

    const [show, setShow] = React.useState(false)
    const [cast_show, setCast_show] = React.useState(false)

    return (
        <div className='w-full'>
            <div className='bg-[#c80000] w-full text-white uppercase font-semibold relative'>
                <div className='px-8 flex justify-between items-center relative h-[42px]'>
                    <div onClick={() => setCast_show(!cast_show)} className={`text-3xl flex lg:hidden font-bold h-full w-[48px] cursor-pointer justify-center items-center ${cast_show ? 'bg-[#00000026]' : ''} hover:bg-[#00000026]`}>
                        <BsList />
                    </div>

                    <div className='flex-wrap hidden lg:flex'>
                        <Link className={`px-4 text-sm font-semibold py-[10px] ${path === '/' ? 'bg-[#00000026] border-b-4 border-blue-800' : ''}`} href={"/"} >होम</Link>


                        {
                            categories?.length > 0 &&
                            categories
                                .filter(c => c.category !== null)
                                .map((c, i) => (
                                    <Link
                                        key={i}
                                        className={`px-4 text-sm font-semibold py-[10px] ${decodedCategory === c.category
                                            ? 'bg-[#00000026] text-white border-b-4 border-blue-800'
                                            : ''
                                            }`}
                                        href={`/news/category/${c.category}`}
                                    >
                                        {c.category}
                                    </Link>
                                ))
                        }


                        {/* {
                            categories?.length > 0 && categories.map((c, i) => <Link key={i} className={`px-4 text-sm font-semibold py-[10px] ${decodedCategory === c.category ? 'bg-[#00000026] text-white border-b-4 border-blue-800' : ''
                                }`} href={`/news/category/${c.category}`} >{c.category}</Link>)
                        } */}
                    </div>

                    <div className='flex flex-col text-black h-full'>
                        {/* <label className='text-md font-medium text-gray-600' htmlFor='राज्य'>राज्य</label> */}
                        <select
                            name="state"
                            value={state}
                            onChange={handleStateChange}
                            className=' rounded-md outline-0 border border-gray-300 h-full focus:border-red-500 '
                            required
                        >
                            <option value="">---राज्य चुनें---</option>
                            <option value="बिहार">बिहार</option>
                            <option value="उत्तर प्रदेश">उत्तर प्रदेश</option>
                            <option value="दिल्ली">दिल्ली</option>
                            <option value="मध्य प्रदेश">मध्य प्रदेश</option>
                            <option value="राजस्थान">राजस्थान</option>
                            <option value="महाराष्ट्र">महाराष्ट्र</option>
                            <option value="गुजरात">गुजरात</option>
                            <option value="कर्नाटक">कर्नाटक</option>
                            <option value="तमिलनाडु">तमिलनाडु</option>
                            <option value="पश्चिम बंगाल">पश्चिम बंगाल</option>
                        </select>


                    </div>

                    <div className='h-full w-[48px]'>
                        <div onClick={() => { setShow(!show) }} className={`text-xl ${show ? 'bg-[#00000026]' : ''} font-bold h-full w-full cursor-pointer  py-[10px] justify-center flex items-center hover:bg-[#00000026]`}>

                            {
                                show ? <IoClose /> : <IoSearch />
                            }

                        </div>

                        <div className={` absolute lg:block transition-all text-slate-700 shadow-lg lg:right-10 z-20 top-[50px] w-full lg:w-[300px]  right-0  ${show ? 'visible' : 'invisible'}`}>
                            <div className='p-2 bg-white'>
                                <div className='flex'>
                                    <div className='w-[calc(100%-45px)] h-[35px]'>
                                        <input type='text' placeholder='Search' className='h-full w-full border border-slate-300 outline-none bg-slate-100 ' />
                                    </div>
                                    <div className='w-[45px] hover:bg-red-700 cursor-pointer h-[35px] flex justify-center items-center bg-red-600 text-white'>
                                        <IoSearch />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                cast_show && <div className='flex flex-wrap lg:hidden py-2 px-8'>
                    <Link className={`px-4 text-sm font-semibold py-[5px] ${path === '/' ? 'bg-[#00000026] border-b-4 border-red-800' : ''}`} href={"/"} >होम</Link>

                    {
                        categories?.length > 0 && categories
                            .filter(c => c.category !== null).map((c, i) => <Link key={i} className={`px-4 text-sm font-semibold py-[10px] ${decodedCategory === c.category ? 'bg-[#00000026] border-b-4 border-red-800' : ''}`} href={`/news/category/${c.category}`} >{c.category}</Link>)
                        // categories.map((c, i) => <Link key={c.id} className={`px-4 text-sm font-semibold py-[5px] ${path === c.name ? 'bg-[#00000026]' : ''}`} href={"/"} >{c.name}</Link>)
                    }

                </div>
            }

        </div>
    )
}

export default Header_Category