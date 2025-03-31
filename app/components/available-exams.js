"use client";
import { useState, useEffect } from "react";
import { FaClock, FaCalendarAlt, FaPlayCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AvailableExams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const router = useRouter();

  // useEffect(() => {
  //   // Replace with your API call to fetch available exams
  //   const mockExams = {
  //     "Aptitude": [
  //       {
  //         id: 1,
  //         name: "Quantitative Aptitude",
  //         description: "Basic mathematics and problem solving",
  //         startDate: "2024-04-11T10:00:00Z",
  //         duration: "1 hour",
  //       },
  //       {
  //         id: 2,
  //         name: "Logical Reasoning",
  //         description: "Reasoning and problem solving.",
  //         startDate: "2024-04-12T10:00:00Z",
  //         duration: "1 hour",
  //       },
  //       {
  //         id: 3,
  //         name: "Verbal Ability",
  //         description: "English ability",
  //         startDate: "2024-04-13T10:00:00Z",
  //         duration: "1 hour",
  //       },
  //     ],
  //     "Programming Fundamentals": [
  //       {
  //         id: 4,
  //         name: "C Programming Basics",
  //         description: "Fundamental C programming concepts.",
  //         startDate: "2024-04-01T10:00:00Z",
  //         duration: "1 hour",
  //       },
  //       {
  //         id: 5,
  //         name: "Java Core Concepts",
  //         description: "Core Java programming principles.",
  //         startDate: "2024-04-03T14:00:00Z",
  //         duration: "1.5 hours",
  //       },
  //       {
  //         id: 6,
  //         name: "Python Essentials",
  //         description: "Basic Python programming.",
  //         startDate: "2024-04-04T10:00:00Z",
  //         duration: "1 hour",
  //       },
  //     ],
  //     "Data Structures and Algorithms": [
  //       {
  //         id: 7,
  //         name: "Arrays and Linked Lists",
  //         description: "Basic data structures.",
  //         startDate: "2024-04-05T10:00:00Z",
  //         duration: "2 hours",
  //       },
  //       {
  //         id: 8,
  //         name: "Sorting and Searching",
  //         description: "Common algorithms.",
  //         startDate: "2024-04-07T14:00:00Z",
  //         duration: "1.5 hours",
  //       },
  //       {
  //         id: 9,
  //         name: "Graph Theory",
  //         description: "Graph traversal and shortest path algorithms.",
  //         startDate: "2024-04-09T10:00:00Z",
  //         duration: "1.5 hours",
  //       },
  //     ],
  //     "Web Development": [
  //       {
  //         id: 10,
  //         name: "JavaScript Essentials",
  //         description: "Basic JavaScript knowledge.",
  //         startDate: "2024-04-08T14:00:00Z",
  //         duration: "2 hours",
  //       },
  //       {
  //         id: 11,
  //         name: "React Basics",
  //         description: "React fundamental concepts.",
  //         startDate: "2024-04-09T10:00:00Z",
  //         duration: "1 hour",
  //       },
  //       {
  //         id: 12,
  //         name: "Backend with Node.js",
  //         description: "Building backend applications using Node.js.",
  //         startDate: "2024-04-10T14:00:00Z",
  //         duration: "1.5 hours",
  //       },
  //     ],
  //     "Database Management": [
  //       {
  //         id: 13,
  //         name: "SQL Fundamentals",
  //         description: "Basic SQL queries.",
  //         startDate: "2024-04-10T10:00:00Z",
  //         duration: "1 hour",
  //       },
  //       {
  //         id: 14,
  //         name: "NoSQL Basics",
  //         description: "Introduction to NoSQL databases.",
  //         startDate: "2024-04-11T14:00:00Z",
  //         duration: "1.5 hours",
  //       },
  //       {
  //         id: 15,
  //         name: "Database Optimization",
  //         description: "Indexing, normalization, and query optimization.",
  //         startDate: "2024-04-12T10:00:00Z",
  //         duration: "2 hours",
  //       },
  //     ],
  //   };
  //   setTimeout(() => {
  //     setExams(mockExams);
  //     setLoading(false);
  //   }, 100); // Simulate API delay
  // }, []);

  const getExams = async () =>{
    try {
      const res = await axios.get("http://localhost:2000/api/get-exams")
      console.log(res.data.exams);
      setExams(res.data.exams)
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getExams()
  }, [])
  

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

  // const categories = ["All", ...Object.keys(exams)];

  // const filteredExams = Object.entries(exams).reduce((acc, [section, examList]) => {
  //   if (selectedCategory === "All" || section === selectedCategory) {
  //     const filteredList = examList.filter(
  //       (exam) =>
  //         exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         exam.description.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //     if (filteredList.length > 0) {
  //       acc[section] = filteredList;
  //     }
  //   }
  //   return acc;
  // }, {});

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Available Exams
      </h1>

      {/* Search and Filter */}
      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Search exams..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md w-1/2"
        />
        {/* <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded-md ml-4"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select> */}
      </div>

      {/* {Object.entries(filteredExams).map(([section, examList]) => (
        <div key={section} className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{section}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examList.map((exam) => {
              const startDate = new Date(exam.startDate);
              const now = new Date();
              const timeLeft = startDate - now;
              let status = "Upcoming";
              let statusColor = "bg-blue-200 text-blue-800"; // Default to upcoming
              if (timeLeft < 0) {
                status = "Ongoing";
                statusColor = "bg-green-200 text-green-800";
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
                      {startDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      {startDate.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaClock className="mr-2 text-gray-500" />
                    <p className="text-sm text-gray-800">Duration: {exam.duration}</p>
                  </div>
                  <div className={`text-sm rounded-full px-3 py-1 mb-4 inline-block ${statusColor}`}>
                    Status: {status}
                  </div>

                  {timeLeft > 0 && (
                    <p className="text-sm text-gray-800 mb-4">
                      Time Left: {Math.floor(timeLeft / (1000 * 60 * 60))} hours
                    </p>
                  )}
                  <button
                    onClick={() => router.push(`/exam-instructions/${exam.id}`)}
                    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center gap-2"
                  >
                    <FaPlayCircle /> Start Exam
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))} */}
      {
        exams?.map((exam,index)=>{
          return <div
          key={index}
          className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {exam.name}
          </h2>
          {/* <p className="text-gray-600 mb-4">{exam.description}</p> */}
          <div className="flex items-center mb-2">
            <FaCalendarAlt className="mr-2 text-gray-500" />
            <p className="text-sm text-gray-800">
              {new Date(exam?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}{" "}
              {new Date(exam?.createdAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="flex items-center mb-2">
            <FaClock className="mr-2 text-gray-500" />
            <p className="text-sm text-gray-800">Duration: {exam.duration}</p>
          </div>
          <div className={`text-sm rounded-full px-3 py-1 mb-4 inline-block ${exam.status == 'Active' ? 'text-green-500' : 'text-red-600'}`}>
            Status: {exam.status}
          </div>

          {/* {timeLeft > 0 && ( ${statusColor}
            <p className="text-sm text-gray-800 mb-4">
              Time Left: {Math.floor(timeLeft / (1000 * 60 * 60))} hours
            </p>
          )} */}
          <button
            onClick={() => router.push(`/exam-instructions/${exam._id}`)}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <FaPlayCircle /> Start Exam
          </button>
        </div>
        })
      }
    </div>
  );
}