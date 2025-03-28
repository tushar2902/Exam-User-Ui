"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaClock, FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ExamInstructions() {
  const router = useRouter();
  const { examId } = useParams();
  const [examDetails, setExamDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        // Enhanced mock exam data with more details
        const mockExams = {
          1: { 
            name: "Quantitative Aptitude", 
            duration: "60 minutes", 
            totalQuestions: 40, 
            passingScore: 70,
            description: "This exam tests your mathematical problem-solving skills including arithmetic, algebra, and geometry concepts.",
            sections: [
              { name: "Arithmetic", questions: 15 },
              { name: "Algebra", questions: 15 },
              { name: "Geometry", questions: 10 }
            ],
            rules: [
              "No calculators allowed",
              "Show all your work for partial credit",
              "Questions must be answered in order"
            ]
          },
          // ... other exam data (keep your existing mock exams)
        };

        setTimeout(() => {
          if (mockExams[examId]) {
            setExamDetails(mockExams[examId]);
            setLoading(false);
          } else {
            setError("Exam not found");
            setLoading(false);
          }
        }, 800);
      } catch (err) {
        setError(err.message || "Failed to fetch exam details");
        setLoading(false);
      }
    };

    fetchExamDetails();
  }, [examId]);

  const handleStartExam = () => {
    router.push(`/exam/${examId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-gray-700">Loading exam details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button 
            onClick={() => router.push('/available-exams')}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            ← Back to available exams
          </button>
        </div>
      </div>
    );
  }

  if (!examDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center max-w-md">
          <h3 className="text-xl font-medium text-gray-700 mb-4">Exam not found</h3>
          <p className="text-gray-500 mb-6">The requested exam could not be found in our system.</p>
          <button 
            onClick={() => router.push('/available-exams')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Browse available exams
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 sm:p-8 text-white">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{examDetails.name}</h1>
            <p className="text-blue-100">{examDetails.description}</p>
          </div>

          {/* Exam Details */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <FaClock className="text-blue-600 mr-2" />
                  <span className="font-medium text-gray-700">Duration</span>
                </div>
                <p className="text-xl font-bold text-gray-900 mt-1">{examDetails.duration}</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <FaInfoCircle className="text-green-600 mr-2" />
                  <span className="font-medium text-gray-700">Questions</span>
                </div>
                <p className="text-xl font-bold text-gray-900 mt-1">{examDetails.totalQuestions}</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <FaCheckCircle className="text-purple-600 mr-2" />
                  <span className="font-medium text-gray-700">Passing Score</span>
                </div>
                <p className="text-xl font-bold text-gray-900 mt-1">{examDetails.passingScore}%</p>
              </div>
            </div>

            {/* Exam Sections */}
            {examDetails.sections && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Exam Sections</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {examDetails.sections.map((section, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -2 }}
                      className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                    >
                      <h3 className="font-medium text-gray-800">{section.name}</h3>
                      <p className="text-sm text-gray-600">{section.questions} questions</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Instructions</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Ensure a stable internet connection throughout the exam</span>
                </li>
                <li className="flex items-start">
                  <FaExclamationTriangle className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Do not refresh or close the browser during the exam</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Answer all questions within the allocated time</span>
                </li>
                <li className="flex items-start">
                  <FaExclamationTriangle className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Navigation between questions may be restricted</span>
                </li>
                {examDetails.rules?.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <FaInfoCircle className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Terms Acceptance */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={acceptedTerms}
                  onChange={() => setAcceptedTerms(!acceptedTerms)}
                  className="mt-1 mr-3"
                />
                <label htmlFor="acceptTerms" className="text-gray-700">
                  I confirm that I have read and understood all the instructions above. 
                  I agree to abide by all exam rules and conditions.
                </label>
              </div>
            </div>

            {/* Start Button */}
            <div className="flex justify-center">
              <motion.button
                onClick={handleStartExam}
                disabled={!acceptedTerms}
                whileHover={acceptedTerms ? { scale: 1.02 } : {}}
                whileTap={acceptedTerms ? { scale: 0.98 } : {}}
                className={`px-8 py-3 rounded-lg text-lg font-semibold flex items-center gap-2 ${
                  acceptedTerms
                    ? "bg-green-600 hover:bg-green-700 text-white shadow-md"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } transition-all duration-200`}
              >
                Start Exam <FaArrowRight />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// // app/exam-instructions/[examId]/page.js
// "use client";
// import { useRouter, useParams } from "next/navigation";
// import { useState, useEffect } from "react";
// import { FaClock, FaInfoCircle, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

// export default function ExamInstructions() {
//   const router = useRouter();
//   const { examId } = useParams();
//   const [examDetails, setExamDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchExamDetails = async () => {
//       try {
//         // Replace with your actual API endpoint to fetch exam details
//         const response = await fetch(`/api/exams/${examId}`); // Example API endpoint
//         if (!response.ok) {
//           throw new Error("Failed to fetch exam details.");
//         }
//         const data = await response.json();
//         setExamDetails(data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message || "Failed to fetch exam details.");
//         setLoading(false);
//       }
//     };

//     fetchExamDetails();
//   }, [examId]);

//   const handleStartExam = () => {
//     router.push(`/exam/${examId}`);
//   };

//   if (loading) {
//     return (
//       <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
//         Error: {error}
//       </div>
//     );
//   }

//   if (!examDetails) {
//     return (
//       <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
//         Exam not found.
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
//       <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
//           {examDetails.name} - Instructions
//         </h1>

//         <div className="mb-6 border-b pb-4">
//           <div className="flex items-center mb-2">
//             <FaClock className="mr-2 text-gray-500" />
//             <p className="text-sm text-gray-800">Duration: {examDetails.duration}</p>
//           </div>
//           <div className="flex items-center mb-2">
//             <FaInfoCircle className="mr-2 text-gray-500" />
//             <p className="text-sm text-gray-800">Total Questions: {examDetails.totalQuestions}</p>
//           </div>
//           <div className="flex items-center mb-2">
//             <FaCheckCircle className="mr-2 text-green-500" />
//             <p className="text-sm text-gray-800">Passing Score: {examDetails.passingScore}%</p>
//           </div>
//         </div>

//         <p className="text-lg text-gray-800 mb-4">
//           Please carefully read the following instructions before starting the exam:
//         </p>

//         <ol className="list-decimal list-inside mb-6 space-y-2">
//           <li className="flex items-start">
//             <FaCheckCircle className="mr-2 text-green-500 mt-1" />
//             <p className="text-gray-800">Ensure a stable internet connection.</p>
//           </li>
//           <li className="flex items-start">
//             <FaCheckCircle className="mr-2 text-green-500 mt-1" />
//             <p className="text-gray-800">Complete the exam within the given time.</p>
//           </li>
//           <li className="flex items-start">
//             <FaExclamationTriangle className="mr-2 text-yellow-500 mt-1" />
//             <p className="text-gray-800">Do not refresh the page during the exam.</p>
//           </li>
//           <li className="flex items-start">
//             <FaCheckCircle className="mr-2 text-green-500 mt-1" />
//             <p className="text-gray-800">Read each question carefully before answering.</p>
//           </li>
//           <li className="flex items-start">
//             <FaCheckCircle className="mr-2 text-green-500 mt-1" />
//             <p className="text-gray-800">Your progress will be automatically saved.</p>
//           </li>
//           {/* Add more instructions here */}
//         </ol>

//         <div className="text-center">
//           <button
//             onClick={handleStartExam}
//             className="bg-green-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-green-700 transition-colors duration-300"
//           >
//             Start Exam
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }