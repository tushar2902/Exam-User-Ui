'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react'; // Icon for mobile sidebar toggle
import Sidebar from '../components/sidebar';
import DashboardHome from '../components/dashboard-home';
import AvailableExams from '../components/available-exams';
import MyExams from '../components/my-exams';
import MyResults from '../components/my-results';
import Settings from '../components/settings';

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile sidebar toggle

  // Function to render the selected content
  const renderContent = () => {
    switch (selectedTab) {
      case 'dashboard': return <DashboardHome />;
      case 'available-exams': return <AvailableExams />;
      case 'my-exams': return <MyExams />;
      case 'results': return <MyResults />;
      case 'settings': return <Settings />;
      default: return <DashboardHome />;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>

      {/* Mobile Sidebar Toggle Button */}
      <button 
        className="absolute top-4 left-4 md:hidden z-50 bg-white p-2 rounded-md shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Mobile Sidebar (Hidden by default) */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white shadow-lg transform md:hidden transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0 z-40' : '-translate-x-full'}`}
      >
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>

      {/* Main Content */}
      <main className="flex-grow p-6 min-h-screen bg-gray-100 overflow-hidden md:ml-64">

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
