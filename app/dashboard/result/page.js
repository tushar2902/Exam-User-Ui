// components/MyResults.js
"use client";
import { useState, useEffect } from "react";
import { FiAward, FiCheck, FiX, FiClock, FiBarChart2, FiDownload } from "react-icons/fi";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function MyResults() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Simulate API/loading delay
      setTimeout(() => {
        const storedResults = localStorage.getItem("examResults");
        if (storedResults) {
          setResults(JSON.parse(storedResults));
        }
        setLoading(false);
      }, 800);
    } catch (err) {
      setError("Failed to load results. Data may be corrupted.");
      setLoading(false);
      console.error(err);
    }
  }, []);

  const calculatePercentage = () => {
    if (!results) return 0;
    return Math.round((results.correctAnswers / results.totalQuestions) * 100);
  };

  const getPerformanceMessage = () => {
    const percentage = calculatePercentage();
    if (percentage >= 90) return "Outstanding performance!";
    if (percentage >= 75) return "Great job!";
    if (percentage >= 50) return "Good effort!";
    return "Keep practicing!";
  };

  const handleDownload = () => {
    // In a real app, this would generate a PDF or download the results
    alert("Download functionality would be implemented here");
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Loading your results...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="text-red-500 p-4 bg-red-50 rounded-md flex items-center">
          <FiX className="mr-2" />
          <div>
            {error}
            <button 
              onClick={() => window.location.reload()} 
              className="ml-2 text-blue-600 hover:text-blue-800 font-medium"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 text-center">
        <div className="p-6">
          <FiBarChart2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-800">No results available</h3>
          <p className="mt-1 text-gray-500">Complete an exam to see your results here.</p>
          <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Take an Exam
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Exam Results</h2>
            <p className="text-sm text-gray-600 mt-1">{results.examName || "Recent Exam"}</p>
          </div>
          <button 
            onClick={handleDownload}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiDownload className="mr-2" />
            Download
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-48 h-48">
            <CircularProgressbar
              value={calculatePercentage()}
              text={`${calculatePercentage()}%`}
              styles={buildStyles({
                pathColor: calculatePercentage() >= 70 ? '#4f46e5' : calculatePercentage() >= 50 ? '#f59e0b' : '#ef4444',
                textColor: '#111827',
                trailColor: '#e5e7eb',
                textSize: '24px',
              })}
            />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-800">{getPerformanceMessage()}</h3>
              <p className="text-sm text-gray-500 mt-1">Completed on {new Date(results.completionDate || Date.now()).toLocaleDateString()}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-600" />
                  <span className="ml-2 text-sm font-medium text-gray-700">Correct</span>
                </div>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {results.correctAnswers} <span className="text-sm font-normal text-gray-500">/ {results.totalQuestions}</span>
                </p>
              </div>

              <div className="bg-red-50 p-3 rounded-lg">
                <div className="flex items-center">
                  <FiX className="h-5 w-5 text-red-600" />
                  <span className="ml-2 text-sm font-medium text-gray-700">Incorrect</span>
                </div>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {results.incorrectAnswers} <span className="text-sm font-normal text-gray-500">/ {results.totalQuestions}</span>
                </p>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center">
                  <FiAward className="h-5 w-5 text-blue-600" />
                  <span className="ml-2 text-sm font-medium text-gray-700">Score</span>
                </div>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {results.score}%
                </p>
              </div>

              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="flex items-center">
                  <FiClock className="h-5 w-5 text-purple-600" />
                  <span className="ml-2 text-sm font-medium text-gray-700">Time Taken</span>
                </div>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {results.timeTaken || '--:--'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {results.answers && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Question Breakdown</h3>
            <div className="space-y-3">
              {results.answers.map((answer, index) => (
                <div key={index} className={`p-3 rounded-lg border ${answer.correct ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">Q{index + 1}: {answer.question}</p>
                      <p className={`text-sm ${answer.correct ? 'text-green-600' : 'text-red-600'}`}>
                        Your answer: {answer.userAnswer} {!answer.correct && `(Correct: ${answer.correctAnswer})`}
                      </p>
                    </div>
                    {answer.correct ? (
                      <FiCheck className="h-5 w-5 text-green-500" />
                    ) : (
                      <FiX className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Review Exam
        </button>
        <button className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Take Another Exam
        </button>
      </div>
    </div>
  );
}