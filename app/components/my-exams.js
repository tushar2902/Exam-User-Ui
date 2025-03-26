// components/MyExams.js
"use client";
import { useState, useEffect } from "react";

export default function MyExams() {
  const [myExams, setMyExams] = useState([]);

  useEffect(() => {
    // Replace with your logic to fetch the user's exams (e.g., from local storage or API)
    const mockMyExams = [
      {
        id: "1",
        name: "Math Exam",
        date: "2023-11-15",
        status: "Completed",
        score: 85,
      },
      {
        id: "2",
        name: "Science Exam",
        date: "2023-11-20",
        status: "In Progress",
        score: null,
      },
      // ... more exams
    ];

    setMyExams(mockMyExams);
  }, []);

  if (myExams.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <p>No exams found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">My Exams</h2>
      <ul className="space-y-2">
        {myExams.map((exam) => (
          <li key={exam.id} className="border-b pb-2">
            <p className="font-semibold">{exam.name}</p>
            <p>Date: {exam.date}</p>
            <p>Status: {exam.status}</p>
            {exam.score !== null && <p>Score: {exam.score}%</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}