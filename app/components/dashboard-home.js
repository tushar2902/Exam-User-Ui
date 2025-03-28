"use client";
import { Bar, Line } from "react-chartjs-2";
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
} from "chart.js";
import { FaEdit, FaClock, FaChartBar, FaBullhorn, FaTrophy } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { motion } from "framer-motion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

export default function StudentDashboard() {
  // Replace with actual student data fetching
  const studentName = "John Doe";
  const examsTaken = 5;
  const upcomingExams = 2;
  const avgScore = 88;
  const nextExamDate = "April 5, 2024";
  const recentAnnouncements = [
    { 
      id: 1, 
      text: "New exam schedule released for Spring semester", 
      date: "Mar 28, 2024",
      important: true
    },
    { 
      id: 2, 
      text: "Results for Mathematics Final Exam are now available", 
      date: "Mar 25, 2024",
      important: false
    },
    { 
      id: 3, 
      text: "Office hours changed for Professor Smith", 
      date: "Mar 22, 2024",
      important: false
    },
  ];

  const performanceData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Your Performance (%)",
        data: [80, 85, 78, 90, 88, 92],
        backgroundColor: "rgba(13, 123, 116, 0.7)",
        borderColor: "#0d7b74",
        borderWidth: 2,
        borderRadius: 4,
        tension: 0.3,
      },
    ],
  };

  const comparisonData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Your Score",
        data: [80, 85, 78, 90, 88, 92],
        borderColor: "#0d7b74",
        backgroundColor: "transparent",
        borderWidth: 3,
        tension: 0.4,
      },
      {
        label: "Class Average",
        data: [75, 78, 82, 85, 80, 88],
        borderColor: "#6c757d",
        backgroundColor: "transparent",
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          padding: 20,
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        backgroundColor: "#1e293b",
        titleFont: {
          size: 16
        },
        bodyFont: {
          size: 14
        },
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 50,
        max: 100,
        grid: {
          color: "rgba(0, 0, 0, 0.05)"
        },
        title: {
          display: true,
          text: "Score (%)",
          font: {
            size: 14
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        title: {
          display: true,
          text: "Month",
          font: {
            size: 14
          }
        }
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      {/* Header with Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Welcome back, <span className="text-emerald-600">{studentName}</span>!
        </h1>
        <p className="text-gray-600">Here's your academic overview</p>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          icon={<FaEdit className="text-white" />} 
          title="Exams Completed" 
          value={examsTaken} 
          trend="+2 from last term"
          color="bg-emerald-500"
          delay={0.1}
        />
        <StatCard 
          icon={<FaClock className="text-white" />} 
          title="Upcoming Exams" 
          value={upcomingExams} 
          detail={`Next: ${nextExamDate}`}
          color="bg-blue-500"
          delay={0.2}
        />
        <StatCard 
          icon={<FaChartBar className="text-white" />} 
          title="Average Score" 
          value={`${avgScore}%`} 
          trend="Top 20% of class"
          color="bg-purple-500"
          delay={0.3}
        />
        <StatCard 
          icon={<FaTrophy className="text-white" />} 
          title="Current Rank" 
          value="#12" 
          trend="↑3 from last month"
          color="bg-amber-500"
          delay={0.4}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Performance Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaChartBar className="mr-2 text-emerald-600" />
            Your Performance Trend
          </h2>
          <div className="h-64 sm:h-80">
            <Bar data={performanceData} options={chartOptions} />
          </div>
        </div>

        {/* Comparison Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Class Comparison
          </h2>
          <div className="h-64 sm:h-80">
            <Line data={comparisonData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Recent Announcements */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <FaBullhorn className="mr-2 text-emerald-600" />
          Recent Announcements
        </h2>
        <ul className="space-y-3">
          {recentAnnouncements.map((announcement, index) => (
            <motion.li
              key={announcement.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`p-3 rounded-lg ${announcement.important ? 'bg-amber-50 border-l-4 border-amber-500' : 'bg-gray-50'}`}
            >
              <div className="flex items-start">
                {announcement.important && (
                  <FiAlertCircle className="text-amber-500 mt-1 mr-2 flex-shrink-0" />
                )}
                <div>
                  <p className="text-gray-800">{announcement.text}</p>
                  <p className="text-sm text-gray-500 mt-1">{announcement.date}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
        <button className="mt-4 text-emerald-600 hover:text-emerald-800 font-medium">
          View all announcements →
        </button>
      </div>
    </div>
  );
}

// Enhanced StatCard Component
function StatCard({ icon, title, value, detail, trend, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`p-5 rounded-xl shadow-sm border border-gray-200 bg-white hover:shadow-md transition-all`}
    >
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-lg ${color} shadow-md`}>
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {detail && <p className="text-sm text-gray-500 mt-1">{detail}</p>}
        {trend && <p className="text-xs text-emerald-600 mt-2">{trend}</p>}
      </div>
    </motion.div>
  );
}