"use client";
import { useRouter } from "next/navigation";

export default function InstructionScreen() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-gray-900 text-gray-200 flex flex-col items-center justify-center px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-white">
        AI Interview Platform
      </h1>

      <p className="text-lg text-center mb-6 max-w-xl">
        Welcome to the AI Interview Platform. Follow the instructions to begin
        your interview. Ensure your setup is ready!
      </p>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xl mb-6">
        <ul className="list-disc list-inside text-lg text-gray-200 space-y-4">
          <li>Ensure your microphone and camera permissions are enabled.</li>
          <li>Follow the on-screen instructions carefully.</li>
        </ul>
      </div>

      <button
        className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
        onClick={() => {
          router.push("/permissions");
        }}
      >
        Start Interview
      </button>
    </div>
  );
}
