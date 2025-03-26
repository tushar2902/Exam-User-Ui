// app/exam-instructions/[examId]/page.js
"use client";
import { useRouter, useParams } from "next/navigation";

export default function ExamInstructions() {
  const router = useRouter();
  const { examId } = useParams();

  const handleStartExam = () => {
    router.push(`/exam/${examId}`); // Navigate to the exam page
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Exam Instructions</h1>
      <p className="text-lg text-gray-800 mb-4">
        Please read the following instructions carefully:
      </p>
      {/* Add your exam instructions here */}
      <ol className="list-decimal list-inside mb-4">
        <li>Make sure you have a stable internet connection.</li>
        <li>You will have a specific time duration to complete the exam.</li>
        <li>Do not refresh the page during the exam.</li>
        {/* ... more instructions */}
      </ol>
      <button
        onClick={handleStartExam}
        className="bg-green-600 text-white py-2 px-4 rounded-md"
      >
        Start Exam
      </button>
    </div>
  );
}