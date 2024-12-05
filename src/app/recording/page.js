"use client";

import { useState } from "react";
import VideoFeed from "../components/VideoFeed";

export default function AnswerRecordingScreen() {
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-gray-900 text-gray-200 flex flex-col items-center justify-center px-6 py-10 relative">
      <div className="absolute top-10 left-10 w-60 h-60 rounded-xl border-2 border-gray-300 overflow-hidden shadow-lg">
        <VideoFeed position="middle" />
      </div>

      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-lg mt-20 flex flex-col items-center z-10">
        <h1 className="text-3xl font-extrabold mb-6 text-white">
          Answer Recording
        </h1>
        <p className="text-lg mb-4 text-center text-gray-300 max-w-xs">
          Click &quot;Start Recording&quot; to begin. Answer the questions
          aloud, and once finished, stop the recording.
        </p>

        <button
          className={`px-8 py-4 rounded-full transition-transform transform hover:scale-105 focus:outline-none text-lg font-semibold ${
            isRecording
              ? "bg-red-600 hover:bg-red-700"
              : "bg-teal-600 hover:bg-teal-700"
          } text-white shadow-lg`}
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
      </div>
    </div>
  );
}
