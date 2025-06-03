// components/VideoPlayer.tsx
"use client";
import React from "react";
import ReactPlayer from "react-player";
import dynamic from "next/dynamic";



const VideoPlayer = ({
  url,
  width = "100%",
  height = "100%",
  controls = true,
  playing = false,
  loop = false,
  muted = false,
}) => {
  return (
    <div className="aspect-video w-full max-w-3xl mx-auto">
      <ReactPlayer
        url={url}
        width={width}
        height={height}
        controls={controls}
        playing={playing}
        loop={loop}
        muted={muted}
        style={{ borderRadius: "12px", overflow: "hidden" }}
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(VideoPlayer), { ssr: false });
