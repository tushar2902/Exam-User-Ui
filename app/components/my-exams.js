// components/MyExams.js
"use client";
import { useState, useEffect } from "react";
import { FiClock, FiCheckCircle, FiAward, FiCalendar, FiLoader } from "react-icons/fi";

export default function MyExams() {
  const [myExams, setMyExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Replace this with actual API call in production
        const mockMyExams = [
          {
            id: "1",
            name: "Mathematics Final Examination",
            date: "2023-11-15",
            status: "completed",
            score: 85,
            duration: "90 mins",
            subject: "Mathematics"
          },
          {
            id: "2",
            name: "Science Midterm Assessment",
            date: "2023-11-20",
            status: "in-progress",
            score: null,
            duration: "120 mins",
            subject: "Science"
          },
          {
            id: "3",
            name: "History Quiz",
            date: "2023-12-05",
            status: "upcoming",
            score: null,
            duration: "45 mins",
            subject: "History"
          },
        ];

        setMyExams(mockMyExams);
      } catch (err) {
        setError("Failed to load exams. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  const getStatusBadge = (status) => {
    const statusMap = {
      completed: { color: "bg-green-100 text-green-800", icon: <FiCheckCircle className="mr-1" />, text: "Completed" },
      "in-progress": { color: "bg-blue-100 text-blue-800", icon: <FiLoader className="mr-1 animate-spin" />, text: "In Progress" },
      upcoming: { color: "bg-yellow-100 text-yellow-800", icon: <FiClock className="mr-1" />, text: "Upcoming" }
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusMap[status].color}`}>
        {statusMap[status].icon}
        {statusMap[status].text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex justify-center items-center py-8">
          <FiLoader className="animate-spin h-8 w-8 text-blue-500" />
          <span className="ml-2 text-gray-600">Loading your exams...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="text-red-500 p-4 bg-red-50 rounded-md">
          {error}
          <button 
            onClick={() => window.location.reload()} 
            className="ml-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (myExams.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 text-center">
        <div className="p-8">
          <h3 className="text-lg font-medium text-gray-600">No exams found</h3>
          <p className="mt-1 text-gray-500">You don't have any exams scheduled or completed yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">My Exams</h2>
        <p className="text-sm text-gray-500 mt-1">View all your completed and upcoming exams</p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {myExams.map((exam) => (
          <div key={exam.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-800">{exam.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{exam.subject}</p>
              </div>
              {getStatusBadge(exam.status)}
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="flex items-center text-sm text-gray-600">
                <FiCalendar className="mr-2 text-gray-400" />
                <span>{new Date(exam.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <FiClock className="mr-2 text-gray-400" />
                <span>{exam.duration}</span>
              </div>
              
              {exam.score !== null && (
                <div className="flex items-center text-sm text-gray-600">
                  <FiAward className="mr-2 text-gray-400" />
                  <span>Score: <span className="font-semibold">{exam.score}%</span></span>
                </div>
              )}
            </div>
            
            {exam.status === "upcoming" && (
              <button className="mt-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                View Details
              </button>
            )}
            
            {exam.status === "completed" && (
              <button className="mt-4 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                View Results
              </button>
            )}
          </div>
        ))}
      </div>
      
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 text-right">
        <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
          View All Exams →
        </button>
      </div>
    </div>
  );
}