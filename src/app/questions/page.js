"use client";

import { useState, useEffect, useContext } from "react";
import { VideoContext } from "../context/VideoContext";
import VideoFeed from "../components/VideoFeed";
import { useRouter } from "next/navigation";

export default function QuestionScreen() {
  const { videoStream } = useContext(VideoContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const router = useRouter();

  const questions = [
    "What are your strengths?",
    "Why should we hire you?",
    "Describe a challenge you faced and how you overcame it.",
  ];

  const playQuestion = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setFeedback("Listening...");
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscription(result);
      setFeedback("Transcription completed.");
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      setFeedback(`Error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const validateAnswer = (answer) => {
    const isCorrect = true;
    return isCorrect;
  };

  const handleSubmit = () => {
    if (!transcription) {
      setFeedback("Please answer the question first.");
      return;
    }

    const isCorrect = validateAnswer(transcription);

    if (isCorrect) {
      setFeedback("Correct answer!");
      setIsAnswerCorrect(true);
    } else {
      setFeedback("Incorrect answer. Try again.");
      setIsAnswerCorrect(false);
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setTranscription("");
      setFeedback("");
      setIsAnswerCorrect(false);
      playQuestion(questions[currentQuestion + 1]);
    } else {
      router.push("/completion");
    }
  };

  useEffect(() => {
    playQuestion(questions[currentQuestion]);
  }, [currentQuestion]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-gray-900 text-gray-200 flex flex-col items-center justify-center px-6 py-10 relative">
      <div className="absolute top-10 left-10 w-60 h-60 rounded-xl border-2 border-gray-300 overflow-hidden shadow-lg">
        <VideoFeed position="top" />
      </div>

      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-lg mt-20 flex flex-col items-center z-10">
        <h1 className="text-3xl font-extrabold mb-6 text-white">
          AI Interview Questions
        </h1>
        <p className="text-lg mb-4 text-center text-gray-300 max-w-xs">
          {questions[currentQuestion]}
        </p>

        {transcription && (
          <p className="text-sm italic bg-gray-100 p-2 rounded mb-4 text-gray-900">
            <strong>Your Answer:</strong> {transcription}
          </p>
        )}

        {feedback && <p className="text-sm mb-4 text-gray-400">{feedback}</p>}

        {!isListening ? (
          <button
            className="bg-teal-600 text-white px-6 py-3 rounded-full transition-transform transform hover:scale-105 focus:outline-none text-lg font-semibold shadow-lg mb-4"
            onClick={startListening}
          >
            Start Listening
          </button>
        ) : (
          <p className="text-sm text-teal-600 mb-4">Listening...</p>
        )}

        <button
          className="bg-green-600 text-white px-6 py-3 rounded-full transition-transform transform hover:scale-105 focus:outline-none text-lg font-semibold shadow-lg mb-4"
          onClick={handleSubmit}
          disabled={!transcription}
        >
          Submit Answer
        </button>

        {isAnswerCorrect && (
          <button
            className="bg-purple-600 text-white px-6 py-3 rounded-full transition-transform transform hover:scale-105 focus:outline-none text-lg font-semibold shadow-lg mt-4"
            onClick={handleNext}
          >
            {currentQuestion + 1 < questions.length
              ? "Next Question"
              : "Finish Interview"}
          </button>
        )}
      </div>
    </div>
  );
}
