import Link from 'next/link'
import React from 'react'
import { base_api_url } from "../config/config"

const Category = async ({ titleStyle }) => {

    const res = await fetch(`${base_api_url}/api/category/all`,{
        next:{
            revalidate:5
        }
    })
    const {categories} = await res.json()


    return (
        <div className='w-full flex flex-col gap-y-[14px]'>
            <div className={`text-xl font-bold ${titleStyle} relative before:absolute before:w-[4px] before:bg-[#c80000] before:h-full before:left-0 pl-3`}>
                Category
            </div>
            <div className={`flex flex-col justify-start items-start text-sm gap-y-2 ${titleStyle} pt-2`}>
                {
                   categories && categories.length>0 && categories
                                .filter(c => c.category !== null).map((item, i) => <li className=' list-none' key={i}>
                        <Link href={"#"}>{item.category} ({item.count})</Link>
                    </li>)
                }
            </div>
        </div>
    )
}

export default Category