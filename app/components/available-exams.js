"use client";
import { useState, useEffect } from "react";
import { FaClock, FaCalendarAlt, FaPlayCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function AvailableExams() {
  const [exams, setExams] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Replace with your API call to fetch available exams
    const mockExams = {
      "Programming Fundamentals": [
        {
          id: 1,
          name: "C Programming Basics",
          description: "Fundamental C programming concepts.",
          startDate: "2024-04-01T10:00:00Z",
          duration: "1 hour",
        },
        {
          id: 2,
          name: "Java Core Concepts",
          description: "Core Java programming principles.",
          startDate: "2024-04-03T14:00:00Z",
          duration: "1.5 hours",
        },
      ],
      "Data Structures and Algorithms": [
        {
          id: 3,
          name: "Arrays and Linked Lists",
          description: "Basic data structures.",
          startDate: "2024-04-05T10:00:00Z",
          duration: "2 hours",
        },
        {
          id: 4,
          name: "Sorting and Searching",
          description: "Common algorithms.",
          startDate: "2024-04-07T14:00:00Z",
          duration: "1.5 hours",
        },
      ],
      "Web Development": [
        {
          id: 5,
          name: "JavaScript Essentials",
          description: "Basic Javascript knowledge.",
          startDate: "2024-04-08T14:00:00Z",
          duration: "2 hours",
        },
        {
          id: 6,
          name: "React Basics",
          description: "React fundamental concepts.",
          startDate: "2024-04-09T10:00:00Z",
          duration: "1 hour",
        },
      ],
      "Database Management": [
        {
          id: 7,
          name: "SQL Fundamentals",
          description: "Basic SQL queries.",
          startDate: "2024-04-10T10:00:00Z",
          duration: "1 hour",
        },
      ],
      "Aptitude": [
        {
          id: 8,
          name: "Quantitative Aptitude",
          description: "Basic mathematics and problem solving",
          startDate: "2024-04-11T10:00:00Z",
          duration: "1 hour",
        },
        {
          id: 9,
          name: "Logical Reasoning",
          description: "Reasoning and problem solve.",
          startDate: "2024-04-12T10:00:00Z",
          duration: "1 hour",
        },
      ],
    };

    setTimeout(() => {
      setExams(mockExams);
      setLoading(false);
    }, 100); // Simulate API delay
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Available Exams
      </h1>

      {Object.entries(exams).map(([section, examList]) => (
        <div key={section} className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {section}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examList.map((exam) => {
              const startDate = new Date(exam.startDate);
              const now = new Date();
              const timeLeft = startDate - now;
              let status = "Upcoming";
              if (timeLeft < 0) {
                status = "Ongoing";
              }

              return (
                <div
                  key={exam.id}
                  className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {exam.name}
                  </h2>
                  <p className="text-gray-600 mb-4">{exam.description}</p>
                  <div className="flex items-center mb-2">
                    <FaCalendarAlt className="mr-2 text-gray-500" />
                    <p className="text-sm text-gray-800">
                      {startDate.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaClock className="mr-2 text-gray-500" />
                    <p className="text-sm text-gray-800">
                      Duration: {exam.duration}
                    </p>
                  </div>
                  <p className="text-sm text-gray-800 mb-4">Status: {status}</p>
                  {timeLeft > 0 && (
                    <p className="text-sm text-gray-800 mb-4">
                      Time Left: {Math.floor(timeLeft / (1000 * 60 * 60))} hours
                    </p>
                  )}
                  <button
                    onClick={() => router.push(`/exam-instructions/${exam.id}`)} // Navigate to instructions
                    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center gap-2"
                  >
                    <FaPlayCircle /> Start Exam
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}