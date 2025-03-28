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
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from "react";
import Link from 'next/link';

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarOpen]);

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  function SidebarItem({ icon, title, href }) {
    const isActive = pathname === href;
    
    return (
      <Link
        href={href}
        onClick={closeSidebar}
        className={`flex items-center gap-4 p-3 rounded-lg w-full text-left font-medium transition-all duration-200 ease-in-out ${
          isActive 
            ? 'bg-emerald-700 text-white shadow-lg transform scale-[1.02]' 
            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
        }`}
        aria-current={isActive ? "page" : undefined}
      >
        <span className="text-lg">{icon}</span>
        <span>{title}</span>
      </Link>
    );
  }

  return (
    <aside
      className={`w-64 bg-gray-800 text-white flex flex-col justify-between fixed top-0 left-0 h-screen overflow-y-auto shadow-xl transition-all duration-300 ease-in-out z-40 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      aria-label="Sidebar navigation"
    >
      <div>
        {/* Logo */}
        <Link href="/dashboard"><div className="text-3xl font-extrabold text-center mb-8 p-4">
          ExamPortal
        </div></Link>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2 p-4">
          <SidebarItem 
            icon={<FaUserGraduate />} 
            title="Dashboard" 
            href="/dashboard" 
          />
          <SidebarItem 
            icon={<FaBookOpen />} 
            title="Available Exams" 
            href="/dashboard/available-exams" 
          />
          <SidebarItem 
            icon={<FaCheckCircle />} 
            title="My Exams" 
            href="/dashboard/my-exams" 
          />
          <SidebarItem 
            icon={<FaChartBar />} 
            title="My Results" 
            href="/dashboard/result" 
          />
          <SidebarItem 
            icon={<FaCog />} 
            title="Settings" 
            href="/dashboard/settings" 
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
  );
}