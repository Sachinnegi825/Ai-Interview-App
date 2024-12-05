"use client";

import React, { createContext, useState, useEffect } from "react";

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videoStream, setVideoStream] = useState(null);

  useEffect(() => {
    const initializeVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setVideoStream(stream);
      } catch (error) {
        console.error("Error accessing camera:", error);
        alert("Please allow camera and microphone access to proceed.");
      }
    };

    initializeVideo();
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <VideoContext.Provider value={{ videoStream }}>
      {children}
    </VideoContext.Provider>
  );
};
