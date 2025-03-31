"use client";
import { useState, useEffect } from "react";
import userAppStore from "@/store/userStore";
import axios from "axios";

export default function Exam() {
  const { currExam } = userAppStore();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(100 * 60);

  useEffect(() => {
    console.log(currExam);
  }, [currExam]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("Time's up!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerChange = (optionIndex) => {
    if (currentQuestion?._id) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestion._id]: optionIndex,
      }));
    }
    console.log(currentQuestion?._id , optionIndex);
    
  };

  const handleNextQuestion = () => {
    const currentSection = currExam?.sections?.[currentSectionIndex];
    if (currentQuestionIndex < currentSection?.questionIds?.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSectionIndex < currExam?.sections?.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      setCurrentQuestionIndex(
        currExam.sections[currentSectionIndex - 1].questionIds.length - 1
      );
    }
  };

  const submitExam = async () => {
    console.log(answers);
    try {
      const res = await axios.post("", {examId: currExam._id, answers, userId:"1"})
      console.log(res);
      
    } catch (error) {
      console.log(error);
      
    }
    // Here you can send the 'answers' object to the backend
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  if (!currExam)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  const currentSection = currExam.sections[currentSectionIndex];
  const currentQuestion = currentSection?.questionIds?.[currentQuestionIndex];

  return (
    <div className="flex h-screen bg-gray-100 p-4">
      <main className="w-3/4 bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {currentSection.title} - Q{currentQuestionIndex + 1}
          </h2>
          <div className="text-red-500 font-bold text-lg">
            ⏳ {formatTime(timeRemaining)}
          </div>
        </div>

        <p className="mb-4">{currentQuestion?.question}</p>
        {currentQuestion?.options?.map((option, idx) => (
          <label
            // key={idx}
            className="flex items-center p-3 border rounded-lg mb-2 cursor-pointer bg-gray-100 hover:bg-gray-200"
          >
            <input
              type="radio"
              name={`question-${currentQuestionIndex}`} // Unique name for each question
              value={idx}
              onChange={() => handleAnswerChange(idx)}
              checked={answers[currentQuestion?._id] === idx}
              className="mr-3"
            />
            {option}
          </label>
        ))}

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0 && currentSectionIndex === 0}
            className="px-4 py-2 rounded-md bg-gray-300 text-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextQuestion}
            className="px-4 py-2 rounded-md bg-green-500 text-white"
          >
            Next
          </button>
        </div>
      </main>

      <aside className="w-1/4 relative p-4 bg-white shadow-md border border-gray-200 rounded-lg ml-4 flex flow-row">
        <div>
          <h3 className="text-lg font-semibold mb-3">Questions</h3>
          {currExam.sections.map((section, sIdx) => (
            <div key={sIdx} className="mb-4">
              <h4 className="text-md font-semibold mb-2 text-blue-600">
                {section.title}
              </h4>
              <div className="grid grid-cols-5 gap-2">
                {section.questionIds.map((qId, qIdx) => {
                  // console.log(qId._id);
                  
                  const isAnswered = answers[qId._id] !== undefined;
                  // console.log(answers[qId]);
                  
                  return (
                    <button
                      key={qIdx}
                      onClick={() => {
                        setCurrentSectionIndex(sIdx);
                        setCurrentQuestionIndex(qIdx);
                      }}
                      className={`p-3 w-12 h-12 rounded-lg font-semibold transition-all ${
                        isAnswered
                          ? " bg-green-500 text-white"
                          : "bg-gray-300 text-black hover:bg-gray-400"
                      }`}
                    >
                      {qIdx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <button
          className="absolute top-5 right-5 bg-green-600 border-green-400 border-2 px-4 py-2 rounded-2xl"
          onClick={submitExam}
        >
          Finish
        </button>
      </aside>
    </div>
  );
}

// "use client";
// import { useState, useEffect } from "react";
// import userAppStore from "@/store/userStore";

// export default function Exam() {
//   const { currExam } = userAppStore();
//   const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [markedForReview, setMarkedForReview] = useState({});
//   const [timeRemaining, setTimeRemaining] = useState(100 * 60);
//   const [selectedOption, setSelectedOption] = useState();

//   useEffect(() => {
//     console.log(currExam);
//   }, [currExam]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeRemaining((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           alert("Time's up!");
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const handleAnswerChange = (answer) => {
//     setAnswers({
//       ...answers,
//       // [`${currentSectionIndex}-${currentQuestionIndex}`]: answer,
//       qId: currentQuestion._id,
//       answer: answer,
//     });
//   };

//   const handleNextQuestion = () => {
//     const currentSection = currExam?.sections?.[currentSectionIndex];
//     if (currentQuestionIndex < currentSection?.questionIds?.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else if (currentSectionIndex < currExam?.sections?.length - 1) {
//       setCurrentSectionIndex(currentSectionIndex + 1);
//       setCurrentQuestionIndex(0);
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     } else if (currentSectionIndex > 0) {
//       setCurrentSectionIndex(currentSectionIndex - 1);
//       setCurrentQuestionIndex(
//         currExam.sections[currentSectionIndex - 1].questionIds.length - 1
//       );
//     }
//   };

//   const handleMarkForReview = () => {
//     // setMarkedForReview({
//     //   ...markedForReview,
//     //   [`${currentSectionIndex}-${currentQuestionIndex}`]: true,
//     // });
//     handleNextQuestion();
//   };

//   const submitExam = () => {
//     console.log(answers);
//   };

//   const formatTime = (seconds) => {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
//       2,
//       "0"
//     )}:${String(secs).padStart(2, "0")}`;
//   };

//   if (!currExam)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         Loading...
//       </div>
//     );

//   const currentSection = currExam.sections[currentSectionIndex];
//   const currentQuestion = currentSection?.questionIds?.[currentQuestionIndex];

//   return (
//     <div className="flex h-screen bg-gray-100 p-4">
//       <main className="w-3/4 bg-white rounded-lg shadow-md p-6 border border-gray-200">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-semibold">
//             {currentSection.title} - Q{currentQuestionIndex + 1}
//           </h2>
//           <div className="text-red-500 font-bold text-lg">
//             ⏳ {formatTime(timeRemaining)}
//           </div>
//         </div>

//         <p className="mb-4">{currentQuestion?.question}</p>
//         {currentQuestion?.options?.map((option, idx) => (
//           <label
//             key={idx}
//             className="flex items-center p-3 border rounded-lg mb-2 cursor-pointer bg-gray-100 hover:bg-gray-200"
//           >
//             <input
//               type="radio"
//               // name={`question-${currentSectionIndex}-${currentQuestionIndex}`}
//               value={option}
//               onChange={() => handleAnswerChange(idx)}
//               // checked={answers[currentQuestion._id] === option}
//               className="mr-3"
//             />
//             {option}
//           </label>
//         ))}

//         <div className="flex justify-between mt-6">
//           <button
//             onClick={handlePreviousQuestion}
//             disabled={currentQuestionIndex === 0 && currentSectionIndex === 0}
//             className="px-4 py-2 rounded-md bg-gray-300 text-gray-700 disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <button
//             onClick={() => {
//               handleMarkForReview();
//             }}
//             className="px-4 py-2 rounded-md bg-green-500 text-white"
//           >
//             Save & Next
//           </button>
//         </div>
//       </main>

//       <aside className="w-1/4 relative p-4 bg-white shadow-md border border-gray-200 rounded-lg ml-4 flex flow-row">
//         <div>
//           <h3 className="text-lg font-semibold mb-3">Questions</h3>
//           {currExam.sections.map((section, sIdx) => (
//             <div key={sIdx} className="mb-4">
//               <h4 className="text-md font-semibold mb-2 text-blue-600">
//                 {section.title}
//               </h4>
//               <div className="grid grid-cols-5 gap-2">
//                 {section.questionIds.map((_, qIdx) => {
//                   const key = `${sIdx}-${qIdx}`;
//                   const isAnswered = answers[key];
//                   const isMarked = markedForReview[key];

//                   return (
//                     <button
//                       key={key}
//                       onClick={() => {
//                         setCurrentSectionIndex(sIdx);
//                         setCurrentQuestionIndex(qIdx);
//                       }}
//                       className={`p-3 w-12 h-12 rounded-lg font-semibold transition-all ${
//                         isMarked
//                           ? " bg-green-500 text-white"
//                           : isAnswered
//                           ? " bg-purple-500 text-white"
//                           : "bg-gray-300 text-black hover:bg-gray-400"
//                       }`}
//                     >
//                       {qIdx + 1}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}
//         </div>
//         <button
//           className="absolute top-5 right-5 bg-green-600 border-green-400 border-2 px-4 py-2 rounded-2xl"
//           onClick={submitExam}
//         >
//           Finish
//         </button>
//       </aside>
//     </div>
//   );
// }

// "use client";
// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import CodingSection from "@/app/components/coding-section";
// import userAppStore from "@/store/userStore"

// export default function Exam() {
//   const router = useRouter();
//   const { examId } = useParams();
//   const [exam, setExam] = useState(null);
//   const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [markedForReview, setMarkedForReview] = useState({});
//   const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes in seconds

//   const { user, currExam } = userAppStore();

//   useEffect(() => {
//     if (examId) {
//       const mockExam = {
//         sections: [
//           {
//             title: "MCQs",
//             questions: [
//               {
//                 id: 1,
//                 text: "Distance between two shafts shall not be less than ______?",
//                 options: ["7 M", "10.5 M", "13.5 M", "15.5 M", "18.5 M"],
//               },
//               {
//                 id: 2,
//                 text: "What is the capital of France?",
//                 options: ["Berlin", "Madrid", "Paris", "Rome"],
//               },
//               {
//                 id: 3,
//                 text: "Who developed the Theory of Relativity?",
//                 options: ["Newton", "Einstein", "Galileo", "Tesla"],
//               },
//             ],
//           },
//           {
//             title: "Coding",
//             questions: [
//               {
//                 id: 4,
//                 text: "Write a function to reverse a string in JavaScript.",
//               },
//               {
//                 id: 5,
//                 text: "Implement a function to find the factorial of a given number in Python.",
//               },
//             ],
//           },
//         ],
//       };
//       setExam(mockExam);
//     }
//   }, [examId]);

//   useEffect(() => {
//     if (timeLeft > 0) {
//       const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
//       return () => clearInterval(timer);
//     } else {
//       submitExam();
//     }
//   }, [timeLeft]);

//   const handleAnswerChange = (answer) => {
//     setAnswers({
//       ...answers,
//       [`${currentSectionIndex}-${currentQuestionIndex}`]: answer,
//     });
//   };

//   const handleNextQuestion = () => {
//     const currentSection = exam.sections[currentSectionIndex];
//     if (currentQuestionIndex < currentSection.questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else if (currentSectionIndex < exam.sections.length - 1) {
//       setCurrentSectionIndex(currentSectionIndex + 1);
//       setCurrentQuestionIndex(0);
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     } else if (currentSectionIndex > 0) {
//       setCurrentSectionIndex(currentSectionIndex - 1);
//       setCurrentQuestionIndex(
//         exam.sections[currentSectionIndex - 1].questions.length - 1
//       );
//     }
//   };

//   const handleMarkForReview = () => {
//     setMarkedForReview({
//       ...markedForReview,
//       [`${currentSectionIndex}-${currentQuestionIndex}`]: true,
//     });
//     handleNextQuestion();
//   };

//   const handleQuestionNavigation = (sectionIdx, questionIdx) => {
//     setCurrentSectionIndex(sectionIdx);
//     setCurrentQuestionIndex(questionIdx);
//   };

//   const submitExam = () => {
//     alert("Exam Submitted");
//     router.push("/dashboard");
//   };

//   if (!exam)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         Loading...
//       </div>
//     );

//   const currentSection = exam.sections[currentSectionIndex];
//   const currentQuestion = currentSection.questions[currentQuestionIndex];

//   return (
//     <div className="flex h-screen bg-gray-100 p-4">
//       {currentSection.title === "MCQs" ? (
//         <>
//           <main className="w-3/4 bg-white rounded-lg shadow-md p-6 border border-gray-200">
//             <div className="flex justify-between items-center mb-6">
//               {/* <h2 className="text-xl font-semibold">
//                 {currentSection.title} - Q{currentQuestionIndex + 1}
//               </h2> */}
//               <p className="text-lg font-semibold">
//                 Time: {Math.floor(timeLeft / 60)}:
//                 {(timeLeft % 60).toString().padStart(2, "0")}
//               </p>
//             </div>
//             <p className="mb-4">{currentQuestion.text}</p>
//             {currentQuestion.options.map((option, idx) => (
//               <label
//                 key={idx}
//                 className="flex items-center p-3 border rounded-lg mb-2 cursor-pointer bg-gray-100 hover:bg-gray-200"
//               >
//                 <input
//                   type="radio"
//                   name={`question-${currentSectionIndex}-${currentQuestionIndex}`}
//                   value={option}
//                   onChange={() => handleAnswerChange(option)}
//                   checked={
//                     answers[
//                       `${currentSectionIndex}-${currentQuestionIndex}`
//                     ] === option
//                   }
//                   className="mr-3"
//                 />
//                 {option}
//               </label>
//             ))}
//             <div className="flex justify-between mt-6">
//               <button
//                 onClick={handlePreviousQuestion}
//                 disabled={
//                   currentQuestionIndex === 0 && currentSectionIndex === 0
//                 }
//                 className="px-4 py-2 rounded-md bg-gray-300 text-gray-700 disabled:opacity-50"
//               >
//                 Previous
//               </button>
//               <button
//                 onClick={handleMarkForReview}
//                 className="px-4 py-2 rounded-md bg-green-500 text-white"
//               >
//                 Save & Next
//               </button>
//             </div>
//           </main>
//           <aside className="w-1/4 p-4 bg-white shadow-md border border-gray-200 rounded-lg ml-4">
//             <h3 className="text-lg font-semibold mb-3">Questions</h3>

//             {exam.sections.map((section, sIdx) => (
//               <div key={sIdx} className="mb-4">
//                 <h4 className="text-md font-semibold mb-2 text-blue-600">
//                   {section.title}
//                 </h4>
//                 <div className="grid grid-cols-5 gap-2">
//                   {section.questions.map((_, qIdx) => {
//                     const key = `${sIdx}-${qIdx}`;
//                     const isAnswered = answers[key];
//                     const isMarked = markedForReview[key];
//                     return (
//                       <button
//                         key={key}
//                         onClick={() => handleQuestionNavigation(sIdx, qIdx)}
//                         className={`p-3 w-12 h-12 rounded-lg font-semibold transition-all
//                 ${
//                   isMarked
//                     ? "bg-purple-500 text-white"
//                     : isAnswered
//                     ? "bg-green-500 text-white"
//                     : "bg-gray-300 text-black hover:bg-gray-400"
//                 }`}
//                       >
//                         {qIdx + 1}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             ))}

//             <p className="mt-4 text-red-500 font-semibold">
//               Unattempted Questions:
//               {exam.sections.reduce(
//                 (acc, sec, sIdx) =>
//                   acc +
//                   sec.questions.filter((_, qIdx) => !answers[`${sIdx}-${qIdx}`])
//                     .length,
//                 0
//               )}
//             </p>
//           </aside>
//         </>
//       ) : (
//         <>
//           {currentSection.title === "Coding" && (
//             <CodingSection
//               question={currentQuestion}
//               onNext={handleNextQuestion}
//               onPrevious={handlePreviousQuestion}
//               answers={answers}
//               setAnswers={setAnswers}
//               questionIndex={currentQuestionIndex}
//               sectionIndex={currentSectionIndex}
//               onFinalSubmit={submitExam} // Pass final submit function
//               isLastQuestion={
//                 currentSectionIndex === exam.sections.length - 1 &&
//                 currentQuestionIndex === currentSection.questions.length - 1
//               }
//             />
//           )}
//         </>
//       )}
//     </div>
//   );
// }
