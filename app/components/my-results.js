// components/MyResults.js
"use client";
import { useState, useEffect } from "react";

export default function MyResults() {
  const [results, setResults] = useState(null);

  useEffect(() => {
    const storedResults = localStorage.getItem("examResults");
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
  }, []);

  if (!results) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <p>No results available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <h2 className="text-lg font-semibold mb-2">My Exam Results</h2>
      <p>Score: {results.score}%</p>
      <p>Total: {results.totalQuestions}</p>
      <p>Correct: {results.correctAnswers}</p>
      <p>Incorrect: {results.incorrectAnswers}</p>
      <p>Time: {results.timeTaken}</p>
    </div>
  );
}