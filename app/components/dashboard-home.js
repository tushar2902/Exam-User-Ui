"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LineController,
} from "chart.js";
import { FaEdit, FaClock, FaChartBar, FaBullhorn } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LineController
);

export default function StudentDashboard() {
  // Replace with actual student data fetching
  const studentName = "John Doe";
  const examsTaken = 5;
  const upcomingExams = 2;
  const avgScore = 88;
  const nextExamDate = "2024-04-05";
  const recentAnnouncements = [
    { id: 1, text: "New exam schedule released!" },
    { id: 2, text: "Results for Math Exam are out!" },
  ];

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Performance (%)",
        data: [80, 85, 78, 90, 88, 92],
        backgroundColor: "#0d7b74",
        borderColor: "#0d7b74",
        borderWidth: 2,
      },
      {
        label: "Average Performance",
        data: [avgScore, avgScore, avgScore, avgScore, avgScore, avgScore],
        borderColor: "gray",
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Percentage",
        },
      },
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom", // Adjust legend position for smaller screens
      },
      title: {
        display: true,
        text: "Performance Over Time",
      },
    },
    maintainAspectRatio: false, // Allow chart to adjust its aspect ratio
    responsive: true, // Make the chart responsive
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
        🎓 Welcome, {studentName}!
      </h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <StatCard icon={<FaEdit />} title="Completed Exams" value={examsTaken} color="bg-green-600" />
        <StatCard icon={<FaClock />} title="Upcoming Exams" value={upcomingExams} detail={`Next: ${nextExamDate}`} color="bg-blue-600" />
        <StatCard icon={<FaChartBar />} title="Avg. Score" value={`${avgScore}%`} color="bg-yellow-600" />
      </div>

      {/* Performance Chart */}
      <div className="bg-white p-4 sm:p-6 border border-gray-300 rounded-lg mb-6">
        <Bar data={data} options={options} />
      </div>

      {/* Recent Activity/Announcements */}
      <div className="bg-white p-4 sm:p-6 border border-gray-300 rounded-lg">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
          <FaBullhorn className="inline mr-2" /> Recent Announcements
        </h2>
        <ul>
          {recentAnnouncements.map((announcement) => (
            <li key={announcement.id} className="mb-2">
              {announcement.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Reusable StatCard Component
function StatCard({ icon, title, value, detail, color }) {
  return (
    <div className="p-4 sm:p-6 flex items-center gap-4 border border-gray-300 bg-white rounded-lg hover:bg-gray-200 transition-all duration-300">
      <div className={`text-white text-3xl p-4 rounded-lg ${color}`}>{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-xl sm:text-2xl font-bold text-gray-800">{value}</p>
        {detail && <p className="text-sm text-gray-600">{detail}</p>}
      </div>
    </div>
  );
}