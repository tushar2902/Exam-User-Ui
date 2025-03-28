"use client";
import { useState, useEffect } from "react";
import { FaClock, FaCalendarAlt, FaPlayCircle, FaSearch, FaFilter } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AvailableExams() {
  const [exams, setExams] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const router = useRouter();

  useEffect(() => {
    // Simulated API call
    const mockExams = {
      "Aptitude": [
        {
          id: 1,
          name: "Quantitative Aptitude",
          description: "Test your mathematical problem-solving skills with this comprehensive exam.",
          duration: "60 minutes",
          totalQuestions: 40,
          category: "Aptitude",
          difficulty: "Medium"
        },
        {
          id: 2,
          name: "Logical Reasoning",
          description: "Evaluate your analytical thinking and pattern recognition abilities.",
          duration: "60 minutes",
          totalQuestions: 35,
          category: "Aptitude",
          difficulty: "Medium"
        },
      ],
      "Programming": [
        {
          id: 4,
          name: "Python Fundamentals",
          description: "Demonstrate your understanding of Python programming basics.",
          duration: "60 minutes",
          totalQuestions: 30,
          category: "Programming",
          difficulty: "Medium"
        },
        {
          id: 5,
          name: "JavaScript Essentials",
          description: "Test your knowledge of JavaScript programming concepts.",
          duration: "90 minutes",
          totalQuestions: 45,
          category: "Programming",
          difficulty: "Hard"
        },
      ],
      "Web Development": [
        {
          id: 10,
          name: "React Basics",
          description: "Assess your React knowledge including components and hooks.",
          duration: "60 minutes",
          totalQuestions: 35,
          category: "Web Development",
          difficulty: "Medium"
        },
      ],
    };

    setTimeout(() => {
      setExams(mockExams);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-gray-700">Loading available exams...</p>
        </div>
      </div>
    );
  }

  const categories = ["All", ...Object.keys(exams)];
  const difficultyColors = {
    "Easy": "bg-green-100 text-green-800",
    "Medium": "bg-yellow-100 text-yellow-800",
    "Hard": "bg-red-100 text-red-800"
  };

  const filteredExams = Object.entries(exams).reduce((acc, [section, examList]) => {
    if (selectedCategory === "All" || section === selectedCategory) {
      const filteredList = examList.filter(
        (exam) =>
          exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exam.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredList.length > 0) {
        acc[section] = filteredList;
      }
    }
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Available Exams
          </h1>
          <p className="text-gray-600">
            Select an exam to begin your test
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search exams by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "All" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Exams List */}
        {Object.keys(filteredExams).length > 0 ? (
          <div className="space-y-10">
            {Object.entries(filteredExams).map(([section, examList]) => (
              <motion.div 
                key={section}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                  {section}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {examList.map((exam) => (
                      <motion.div
                        key={exam.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden"
                      >
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold text-gray-800">
                              {exam.name}
                            </h3>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${difficultyColors[exam.difficulty]}`}>
                              {exam.difficulty}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-4">{exam.description}</p>
                          
                          <div className="space-y-3 mb-6">
                            <div className="flex items-center text-sm">
                              <FaClock className="mr-2 text-gray-500 flex-shrink-0" />
                              <p className="text-gray-800">
                                Duration: {exam.duration} • {exam.totalQuestions} questions
                              </p>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => router.push(`/exam-instructions/${exam.id}`)}
                            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
                          >
                            <FaPlayCircle />
                            Start Exam
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No exams found
            </h3>
            <p className="text-gray-500">
              {searchQuery 
                ? "Try adjusting your search query"
                : selectedCategory !== "All"
                ? "No exams available in this category"
                : "No exams are currently available"}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}