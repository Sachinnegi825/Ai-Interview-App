"use client";

export default function TestCompletionScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Test Completed</h1>
        <p className="mb-6">
          Thank you for completing the AI Interview. You will receive your
          results shortly.
        </p>
        <button className="bg-purple-600 hover:bg-purple-700">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
