import React from 'react'
import { IoSearch } from "react-icons/io5";

const Search = () => {
    return (
        <div className='p-4 bg-white'>
            <div className='flex '>
                <div className='w-[calc(100%-45px)]'>
                    <input type='text' className='w-full h-full p-2 border-slate-300 outline-none bg-slate-100' />
                </div>
                <div className='w-[45px] h-[35px] flex justify-center items-center bg-red-600 hover:bg-red-100 text-white text-xl'>
                    <IoSearch />
                </div>
            </div>
        </div>
    )
}

export default Search