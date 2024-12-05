"use client";

import { useState, useContext, useEffect } from "react";
import { VideoContext } from "../context/VideoContext";
import VideoFeed from "../components/VideoFeed";

export default function PermissionPage() {
  const { videoStream, setVideoStream } = useContext(VideoContext);
  const [isMicGranted, setIsMicGranted] = useState(false);
  const [isScreenGranted, setIsScreenGranted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!videoStream) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => setVideoStream(stream))
        .catch((err) =>
          setErrorMessage("Unable to access camera: " + err.message)
        );
    }
  }, [videoStream, setVideoStream]);

  const checkMicPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setIsMicGranted(true);
    } catch (err) {
      setErrorMessage("Unable to access microphone: " + err.message);
    }
  };

  const checkScreenPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      stream.getTracks().forEach((track) => track.stop());
      setIsScreenGranted(true);
    } catch (err) {
      setErrorMessage("Unable to access screen sharing: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 flex flex-col items-center justify-center px-6 relative text-white">
      <VideoFeed position="left" />

      <div className="bg-gray-800 bg-opacity-75 p-6 rounded-lg shadow-lg z-10 max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Check Permissions
        </h1>

        {errorMessage && (
          <p className="text-red-400 mb-4 text-center">
            <strong>Error:</strong> {errorMessage}
          </p>
        )}

        <button
          className={`w-full px-6 py-2 rounded text-white mb-4 transition-all duration-200 ease-in-out ${
            isMicGranted
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={checkMicPermission}
        >
          {isMicGranted
            ? "Microphone Access Granted"
            : "Check Microphone Permission"}
        </button>

        <button
          className={`w-full px-6 py-2 rounded text-white mb-4 transition-all duration-200 ease-in-out ${
            isScreenGranted
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={checkScreenPermission}
        >
          {isScreenGranted
            ? "Screen Sharing Access Granted"
            : "Check Screen Sharing Permission"}
        </button>

        <button
          className="w-full px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition-all duration-200 ease-in-out"
          onClick={() => window.location.assign("/questions")}
          disabled={!isMicGranted || !isScreenGranted}
        >
          {isMicGranted && isScreenGranted
            ? "Proceed to Questions"
            : "Grant All Permissions"}
        </button>
      </div>
    </div>
  );
}
