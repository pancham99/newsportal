"use client";

import { useState, useEffect } from 'react';
import { base_api_url } from "../../config/config"
import NewsCard from './items/NewsCard';

const RecentNews = () => {

    const [recent, setRecent] = useState([])

    const get_recent = async () => {
        try {
            const res = await fetch(`${base_api_url}/api/news/recent/news`)
            const data = await res.json()
            setRecent(data.recentNews)  // <-- यहाँ पर fix किया है
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        get_recent()
    }, [])

    return (
        <div className="w-full">
            <div className="pl-2">
                <div className='grid grid-cols-1 gap-y-1 mt-3'>
                    {
                        recent?.map((item, i) => <NewsCard news={item} key={i} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default RecentNews
