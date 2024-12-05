"use client";

import { useContext, useEffect, useRef } from "react";
import { VideoContext } from "../context/VideoContext";

const VideoFeed = ({ position = "left" }) => {
  const { videoStream } = useContext(VideoContext);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoStream && videoRef.current) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  const positionClass =
    position === "left"
      ? "absolute top-4 left-4 w-48 h-48"
      : position === "top"
      ? "w-96 h-64 mx-auto"
      : "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96";

  return (
    <div className={`${positionClass} shadow-lg rounded-lg overflow-hidden`}>
      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-full h-full object-cover rounded-lg border-4 border-gray-600"
      ></video>
    </div>
  );
};

export default VideoFeed;
