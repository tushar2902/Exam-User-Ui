// app/exam/[examId]/page.js
"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";

export default function Exam() {
  const router = useRouter();
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const examContainerRef = useRef(null);

  useEffect(() => {
    if (examId) {
      const mockExam = {
        id: examId,
        name: "Sample Exam",
        questions: [
          {
            id: 1,
            text: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            correctAnswer: "4",
          },
          {
            id: 2,
            text: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            correctAnswer: "Paris",
          },
        ],
        duration: 3600,
      };

      setExam(mockExam);
      setTimeLeft(mockExam.duration);
    }
  }, [examId]);

  useEffect(() => {
    if (timeLeft > 0 && exam) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (exam && timeLeft === 0) {
      submitExam();
    }
  }, [timeLeft, exam]);

  useEffect(() => {
    const enterFullscreen = () => {
      if (examContainerRef.current) {
        const container = examContainerRef.current;
        if (container.requestFullscreen) {
          container.requestFullscreen();
        } else if (container.mozRequestFullScreen) {
          container.mozRequestFullScreen();
        } else if (container.webkitRequestFullscreen) {
          container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) {
          container.msRequestFullscreen();
        }
      }
    };

    enterFullscreen();

    const handleFullscreenChange = () => {
      if (document.fullscreenElement === null && timeLeft > 0) {
        submitExam();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && timeLeft > 0) {
        submitExam();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [timeLeft]);

  useEffect(() => {
    if (examContainerRef.current) {
      examContainerRef.current.style.cursor = "none";
    }

    return () => {
      if (examContainerRef.current) {
        examContainerRef.current.style.cursor = "auto";
      }
    };
  }, []);

  if (!exam) {
    return <div className="p-6 bg-gray-100 min-h-screen">Loading...</div>;
  }

  const currentQuestion = exam.questions[currentQuestionIndex];

  const handleAnswerChange = (answer) => {
    setAnswers({ ...answers, [currentQuestion.id]: answer });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // app/exam/[examId]/page.js
  const submitExam = () => {
    // ... (calculate score and other results)

    const results = {
      score: 85, // Example score
      totalQuestions: 10,
      correctAnswers: 8,
      incorrectAnswers: 2,
      timeTaken: "25:30",
    };

    localStorage.setItem("examResults", JSON.stringify(results)); // Store results

    router.push("/dashboard"); // Redirect to dashboard
  };

  return (
    <div ref={examContainerRef} className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{exam.name}</h1>

      <p className="text-lg text-gray-800 mb-4">
        Time Left: {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, "0")}
      </p>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <p className="text-xl font-semibold mb-4">
          Question {currentQuestionIndex + 1}: {currentQuestion.text}
        </p>
        {currentQuestion.options.map((option) => (
          <label key={option} className="block mb-2">
            <input
              type="radio"
              name={`question-${currentQuestion.id}`}
              value={option}
              onChange={() => handleAnswerChange(option)}
              checked={answers[currentQuestion.id] === option}
            />
            {option}
          </label>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === exam.questions.length - 1}
          className="bg-blue-600 text-white py-2 px-4 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <button
        onClick={submitExam}
        className="mt-6 bg-green-600 text-white py-2 px-4 rounded-md"
      >
        Submit Exam
      </button>
    </div>
  );
}
