'use client';

import React, { useEffect, useState } from 'react';
import bgimage from '../assets/image.jpeg';
import { base_api_url } from "../config/config"

const VideoPermostion = () => {
    const [permostion, setPermostion] = useState([]);

    const get_permostion = async () => {
        try {
            const res = await fetch(`${base_api_url}/api/banner/getall`);
            const data = await res.json();
            setPermostion(data.banners);
        } catch (error) {
            console.log(error);
        }
    };



    const advertisement = permostion.find(
        item => item.bannertype === 'advertisement' && item.status !== 'deactive'
    );

    const addvideo = advertisement?.videos || bgimage;

    console.log(addvideo, 'addvideo');



    useEffect(() => {
        get_permostion();
    }, []);

    // ⛔ If banner is not found (deactive or not exist), don't render the div
    if (!advertisement) return null;

    return (
        <div className='h-[350px] w-full mb-8 p-4'>
        
            <video
                className="h-[350px] w-full object-cover"
                src={addvideo}
                autoPlay
                loop
                muted
                playsInline
            />
        </div>
    );
};

export default VideoPermostion;
