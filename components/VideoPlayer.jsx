"use client";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({
  url,
  width = "100%",
  height = "100%",
  controls = true,
  playing = false,
  loop = false,
  muted = false,
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <div className="aspect-video w-full max-w-3xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />;
  }

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

export default VideoPlayer;
