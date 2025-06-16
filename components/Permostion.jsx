'use client';

import React, { useEffect, useState } from 'react';
import bgimage from '../assets/image.jpeg';
import { base_api_url } from "../config/config"

const Permostion = () => {
    const [permostion, setPermostion] = useState([]);
    // console.log('Permostion component rendered', permostion);

    const get_permostion = async () => {
        try {
            const res = await fetch(`${base_api_url}/api/banner/getall`);
            const data = await res.json();
            // console.log('Fetched banners:', data);
            setPermostion(data.banners);
        } catch (error) {
            console.log(error);
        }
    };

    // ⬇️ Find banner that is promotion type AND active
    const bannerItem = permostion?.find(
        item => item.bannertype === 'promotion' && item.status !== 'deactive'
    );

 
    // If no active promotion, fallback to local image
    const bannerImage = bannerItem?.image || bgimage;

    useEffect(() => {
        get_permostion();
    }, []);

    // ⛔ If banner is not found (deactive or not exist), don't render the div
    if (!bannerItem) return null;

    return (
        <div
            className='h-[350px] w-full hidden lg:block py-4 mb-4'
            style={{
                backgroundImage: `url(${bannerImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className='relative z-10 px-8 py-14'>
                <div className='flex justify-center lg:justify-start items-center flex-wrap'>
                    {/* Banner content here */}
                </div>
            </div>
        </div>
    );
};

export default Permostion;
