'use client';
import {
  FaUserGraduate,
  FaBookOpen,
  FaCheckCircle,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function Sidebar({ selectedTab, setSelectedTab }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Sidebar Item Component
  function SidebarItem({ icon, title, active, onClick }) {
    return (
      <button
        onClick={onClick}
        className={`flex items-center gap-3 p-3 rounded-md w-full text-left font-medium transition-colors duration-200 ease-in-out shadow-md ${
          active ? 'bg-[#0d7b74] text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
        }`}
      >
        {icon} {title}
      </button>
    );
  }

  return (
    <>
      {/* Mobile Hamburger Menu */}
      <button
        className="md:hidden p-4 fixed top-0 left-0 z-50 text-white bg-gray-800"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <aside
        className={`w-64 bg-gray-900 text-white flex flex-col justify-between fixed top-0 left-0 h-screen overflow-y-auto shadow-lg transition-transform duration-300 transform md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0 z-40" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Logo */}
          <div className="text-3xl font-extrabold text-center mb-8 p-4">ExamPortal</div>

          {/* Navigation */}
          <nav className="flex flex-col space-y-3 p-2">
            <SidebarItem icon={<FaUserGraduate />} title="Dashboard" active={selectedTab === 'dashboard'} onClick={() => setSelectedTab('dashboard')} />
            <SidebarItem icon={<FaBookOpen />} title="Available Exams" active={selectedTab === 'available-exams'} onClick={() => setSelectedTab('available-exams')} />
            <SidebarItem icon={<FaCheckCircle />} title="My Exams" active={selectedTab === 'my-exams'} onClick={() => setSelectedTab('my-exams')} />
            <SidebarItem icon={<FaChartBar />} title="My Results" active={selectedTab === 'results'} onClick={() => setSelectedTab('results')} />
            <SidebarItem icon={<FaCog />} title="Settings" active={selectedTab === 'settings'} onClick={() => setSelectedTab('settings')} />
          </nav>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center border-t border-gray-700 pt-6 p-2">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl font-semibold shadow-md">
            👤
          </div>
          <p className="mt-2 text-lg font-medium">John Doe</p>
          <button
            className="mt-3 flex items-center gap-2 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition shadow-md text-sm"
            onClick={() => router.push('/')}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}