// app/exam-instructions/[examId]/page.js
"use client";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaClock, FaInfoCircle, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import userAppStore from "@/store/userStore"

export default function ExamInstructions() {
  const router = useRouter();
  const { examId } = useParams();
  const [examDetails, setExamDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { setUser, setExam } = userAppStore();


  const fetchExamDetails = async () => {
    // try {
    //   // Replace with your API call to fetch exam details based on examId
    //   // For demonstration, use a mock fetch with a timeout:
    //   const mockExams = {
    //     1: { name: "Quantitative Aptitude", duration: "1 hour", totalQuestions: 20, passingScore: 70 },
    //     2: { name: "Logical Reasoning", duration: "1 hour", totalQuestions: 25, passingScore: 75 },
    //     3: { name: "Verbal Ability", duration: "1 hour", totalQuestions: 30, passingScore: 80 },
    //     4: { name: "C Programming Basics", duration: "1 hour", totalQuestions: 15, passingScore: 60 },
    //     5: { name: "Java Core Concepts", duration: "1.5 hours", totalQuestions: 20, passingScore: 70 },
    //     6: { name: "Python Essentials", duration: "1 hour", totalQuestions: 18, passingScore: 65 },
    //     7: { name: "Arrays and Linked Lists", duration: "2 hours", totalQuestions: 22, passingScore: 72 },
    //     8: { name: "Sorting and Searching", duration: "1.5 hours", totalQuestions: 25, passingScore: 78 },
    //     9: { name: "Graph Theory", duration: "1.5 hours", totalQuestions: 20, passingScore: 75 },
    //     10: { name: "JavaScript Essentials", duration: "2 hours", totalQuestions: 28, passingScore: 80 },
    //     11: { name: "React Basics", duration: "1 hour", totalQuestions: 16, passingScore: 68 },
    //     12: { name: "Backend with Node.js", duration: "1.5 hours", totalQuestions: 22, passingScore: 76 },
    //     13: { name: "SQL Fundamentals", duration: "1 hour", totalQuestions: 18, passingScore: 70 },
    //     14: { name: "NoSQL Basics", duration: "1.5 hours", totalQuestions: 20, passingScore: 72 },
    //     15: { name: "Database Optimization", duration: "2 hours", totalQuestions: 24, passingScore: 78 },
    //   };
    //   setTimeout(() => {
    //     if (mockExams[examId]) {
    //       setExamDetails(mockExams[examId]);
    //       setLoading(false);
    //     } else {
    //       setError("Exam not found.");
    //       setLoading(false);
    //     }
    //   }, 500);
    // } catch (err) {
    //   setError(err.message || "Failed to fetch exam details.");
    //   setLoading(false);
    // }
    try {
      const res = await axios.post("http://localhost:2000/api/user/get-exam", {examId})
      console.log(res);
      if(res.status == 200){
        setLoading(false)
        setExamDetails(res.data.exam)
        setExam(res.data.exam)
      }
      
    } catch (error) {
      console.log(error);
      
    }
  };
  useEffect(() => {
    fetchExamDetails();
  }, [examId]);

  const handleStartExam = () => {
    router.push(`/exam/${examId}`);
  };

  // if (loading) {
  //   return (
  //     <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
  //       Loading...
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
  //       Error: {error}
  //     </div>
  //   );
  // }

  // if (!examDetails) {
  //   return (
  //     <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
  //       Exam not found.
  //     </div>
  //   );
  // }

  return (
    <>
    {
      loading &&  <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
           Loading...
         </div>
    }
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          {examDetails?.name} - Instructions
        </h1>

        <div className="mb-6 border-b pb-4">
          <div className="flex items-center mb-2">
            <FaClock className="mr-2 text-gray-500" />
            <p className="text-sm text-gray-800">Duration: {examDetails?.duration}</p>
          </div>
          <div className="flex items-center mb-2">
            <FaInfoCircle className="mr-2 text-gray-500" />
            <p className="text-sm text-gray-800">Total Questions: {examDetails?.totalQuestions}</p>
          </div>
          <div className="flex items-center mb-2">
            <FaCheckCircle className="mr-2 text-green-500" />
            <p className="text-sm text-gray-800">Passing Score: {examDetails?.passingMarks } %</p>
          </div>
        </div>

        <p className="text-lg text-gray-800 mb-4">
          Please carefully read the following instructions before starting the exam:
        </p>

        <ol className="list-decimal list-inside mb-6 space-y-2">
          <li className="flex items-start">
            <FaCheckCircle className="mr-2 text-green-500 mt-1" />
            <p className="text-gray-800">Ensure a stable internet connection.</p>
          </li>
          <li className="flex items-start">
            <FaCheckCircle className="mr-2 text-green-500 mt-1" />
            <p className="text-gray-800">Complete the exam within the given time.</p>
          </li>
          <li className="flex items-start">
            <FaExclamationTriangle className="mr-2 text-yellow-500 mt-1" />
            <p className="text-gray-800">Do not refresh the page during the exam.</p>
          </li>
          <li className="flex items-start">
            <FaCheckCircle className="mr-2 text-green-500 mt-1" />
            <p className="text-gray-800">Read each question carefully before answering.</p>
          </li>
          <li className="flex items-start">
            <FaCheckCircle className="mr-2 text-green-500 mt-1" />
            <p className="text-gray-800">Your progress will be automatically saved.</p>
          </li>
          {/* Add more instructions here */}
        </ol>

        <div className="text-center">
          <button
            onClick={handleStartExam}
            className="bg-green-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-green-700 transition-colors duration-300"
          >
            Start Exam
          </button>
        </div>
      </div>
    </div>
    </>
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