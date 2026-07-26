'use client';

import React, { useEffect, useState } from 'react';
import bgimage from '../assets/image.jpeg';
import { base_api_url } from "../config/config"
import ReactPlayer from "react-player";
import Title from './Title';

const VideoAdvertisement = ({
    width = '50%',
    height = '10%',
    controls = true,
    playing = false,
    loop = false,
    muted = false,
}) => {
    const [permostion, setPermostion] = useState([]);
    const [hasMounted, setHasMounted] = useState(false);

    const advertisement = permostion?.filter(
        item => item?.videotype === 'advertisement' && item?.status !== 'deactive'
    );

    const get_permostion = async () => {
        try {
            const res = await fetch(`${base_api_url}/api/video/getall`);
            const data = await res.json();

            setPermostion(data?.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setHasMounted(true);
        get_permostion();
    }, []);

    if (!hasMounted) return null;
    if (!advertisement) return null;

    return (
        <div className="">
            <div className='gap-2'>
                {advertisement?.length > 0 ? (
                    <div className='space-y-5 '>
                        {
                            advertisement?.slice(0, 3).map((item, index) => (
                                <div key={index} className='flex flex-col w-full h-full rounded-md gap-4 p-4' >
                                    <ReactPlayer
                                        url={item?.videos}
                                        width={width}
                                        height={height}
                                        controls={controls}
                                        playing={playing}
                                        loop={loop}
                                        muted={muted}
                                        style={{ borderRadius: "12px", overflow: "hidden" }}
                                    />
                                </div>
                            ))
                        }
                    </div>

                ) : (
                    <div className='flex justify-center items-center h-full'>
                        <p>No advertisement available</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default VideoAdvertisement;
