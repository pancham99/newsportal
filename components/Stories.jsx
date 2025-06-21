"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from 'react';
import { base_api_url } from "../config/config"
import moment from 'moment-timezone';
import Link from "next/link";




// const storiesData = [
//     {
//         id: 1,
//         username: "Passenger",
//         title: "All The Little Stories",
//         profilePic: "/ceo.jpeg",
//         type: "video",
//         url: "https://www.youtube.com/watch?v=pW5GVpFEgOM",
//     },
//     {
//         id: 2,
//         username: "Passenger",
//         title: "A beautiful memory",
//         profilePic: "",
//         type: "image",
//         url: "/ceo.jpeg",
//     },
//     {
//         id: 2,
//         username: "Passenger",
//         title: "A beautiful memory",
//         profilePic: "/profile.jpg",
//         type: "image",
//         url: "/image.jpg",
//     },
//     {
//         id: 2,
//         username: "Passenger",
//         title: "A beautiful memory",
//         profilePic: "/profile.jpg",
//         type: "image",
//         url: "/image.jpg",
//     },
//     {
//         id: 2,
//         username: "Passenger",
//         title: "A beautiful memory",
//         profilePic: "/profile.jpg",
//         type: "image",
//         url: "/image.jpg",
//     },
//     {
//         id: 2,
//         username: "Passenger",
//         title: "A beautiful memory",
//         profilePic: "/profile.jpg",
//         type: "image",
//         url: "/image.jpg",
//     },
//     {
//         id: 2,
//         username: "Passenger",
//         title: "A beautiful memory",
//         profilePic: "/profile.jpg",
//         type: "image",
//         url: "/image.jpg",
//     },
//     {
//         id: 2,
//         username: "Passenger",
//         title: "A beautiful memory",
//         profilePic: "/profile.jpg",
//         type: "image",
//         url: "/image.jpg",
//     },
//     {
//         id: 2,
//         username: "Passenger",
//         title: "A beautiful memory",
//         profilePic: "/profile.jpg",
//         type: "image",
//         url: "/image.jpg",
//     },
//     {
//         id: 2,
//         username: "Passenger",
//         title: "A beautiful memory",
//         profilePic: "/profile.jpg",
//         type: "image",
//         url: "/image.jpg",
//     },
//     // ... Add more items as needed
// ];

const Stories = () => {

    const [recent, setRecent] = useState([])
    const formattedTime = moment(recent?.createdAt).tz("Asia/Kolkata").format('hh:mm A');

    console.log(recent, "recent")
    const scrollRef = useRef();

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


    const scrollLeft = () => {
        scrollRef.current.scrollBy({
            left: -200,
            behavior: "smooth",
        });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({
            left: 200,
            behavior: "smooth",
        });
    };

    return (
        <div className="relative w-full">
            {/* Left button */}
            <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full z-10"
            >
                ◀
            </button>

            {/* Right button */}
            <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full z-10"
            >
                ▶
            </button>

            <div
                ref={scrollRef}
                className="flex gap-3 overflow-x-auto p-3 hide-scrollbar scrollbar-hide"
            >
                {recent?.map((story, index) => (
                    <div
                        key={index}
                        className="min-w-[180px] max-w-[180px] flex-shrink-0 rounded-lg overflow-hidden hide-scrollbar shadow-md "
                    >
                        <div className="w-full h-40 relative">

                            <Image
                                src={story.image}
                                alt={story.username}
                                fill
                                className="object-cover"
                            />
                            {/* {story.type === "image" ? (
                                <Image
                                    src={story.image}
                                    alt={story.username}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <video
                                    src={story.url}
                                    className="w-full h-full object-cover"
                                    muted
                                    autoPlay
                                    loop
                                    playsInline
                                ></video>
                            )} */}
                        </div>

                        <div className="p-2 h-full bg-white">
                            <div className="flex-cols items-center gap-2">
                                <span className="text-xs text-gray-800 font-medium truncate">
                                    {story.writerName}
                                </span>

                                <div className="text-xs text-gray-800 font-medium truncate">
                                    {story?.date} / {formattedTime}
                                </div>

                                {/* <Image
                                    src={story.profilePic || "/ceo.jpeg"}
                                    alt={story.username}
                                    width={24}
                                    height={24}
                                    className="rounded-full"
                                /> */}

                                {/* <Image
                  src="/facebook-icon.svg"
                  alt="Facebook"
                  width={14}
                  height={14}
                /> */}
                            </div>
                            <div className="lg:text-sm text-xs font-semibold text-[#333333] hover:text-[#c80000]">
                                <Link href={`/news/${story?.slug}`} className="text-xs text-gray-600 hover:text-[#c80000] mt-1 line-clamp-2">

                                    {story?.title?.length > 50 ? story.title.slice(0, 50) + '...' : story.title}
                                    {/* {story.title} */}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stories;
