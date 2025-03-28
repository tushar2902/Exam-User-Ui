'use client';
import {
  FaUserGraduate,
  FaBookOpen,
  FaCheckCircle,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

export default function Sidebar({ selectedTab, setSelectedTab }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  // Sidebar Item Component
  function SidebarItem({ icon, title, active, onClick }) {
    return (
      <button
        onClick={() => {
          onClick();
          closeSidebar();
        }}
        className={`flex items-center gap-4 p-3 rounded-lg w-full text-left font-medium transition-all duration-200 ease-in-out ${
          active 
            ? 'bg-emerald-700 text-white shadow-lg transform scale-[1.02]' 
            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
        }`}
        aria-current={active ? "page" : undefined}
      >
        <span className="text-lg">{icon}</span>
        <span>{title}</span>
      </button>
    );
  }

  // Overlay for mobile
  const Overlay = () => (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
      onClick={closeSidebar}
    />
  );

  return (
    <>
      {/* Mobile Hamburger Menu */}
      <button
        className="md:hidden p-4 fixed top-0 left-0 z-20 text-white bg-gray-800 rounded-br-lg"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
        aria-expanded={isSidebarOpen}
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Overlay when sidebar is open on mobile */}
      {isSidebarOpen && isMobile && <Overlay />}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-gray-800 text-white flex flex-col justify-between fixed top-0 left-0 h-screen overflow-y-auto shadow-xl transition-all duration-300 ease-in-out z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar navigation"
      >
        <div>
          {/* Logo */}
          <div className="text-3xl font-extrabold text-center mb-8 p-4">
            ExamPortal
          </div>

          {/* Navigation */}
          <nav className="flex flex-col space-y-2 p-4">
            <SidebarItem 
              icon={<FaUserGraduate />} 
              title="Dashboard" 
              active={selectedTab === 'dashboard'} 
              onClick={() => setSelectedTab('dashboard')} 
            />
            <SidebarItem 
              icon={<FaBookOpen />} 
              title="Available Exams" 
              active={selectedTab === 'available-exams'} 
              onClick={() => setSelectedTab('available-exams')} 
            />
            <SidebarItem 
              icon={<FaCheckCircle />} 
              title="My Exams" 
              active={selectedTab === 'my-exams'} 
              onClick={() => setSelectedTab('my-exams')} 
            />
            <SidebarItem 
              icon={<FaChartBar />} 
              title="My Results" 
              active={selectedTab === 'results'} 
              onClick={() => setSelectedTab('results')} 
            />
            <SidebarItem 
              icon={<FaCog />} 
              title="Settings" 
              active={selectedTab === 'settings'} 
              onClick={() => setSelectedTab('settings')} 
            />
          </nav>
        </div>

        {/* Profile Section */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-lg font-semibold shadow-md">
              JD
            </div>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-xs text-gray-400">Student</p>
            </div>
          </div>
          <button
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200 text-sm font-medium"
            onClick={() => router.push('/')}
            aria-label="Logout"
          >
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}