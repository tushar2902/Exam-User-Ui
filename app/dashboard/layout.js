'use client';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from '../components/sidebar';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Mobile Sidebar Toggle Button */}
      <button 
        className="absolute top-4 left-4 md:hidden z-50 bg-white p-2 rounded-md shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white shadow-lg transform md:hidden transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0 z-40' : '-translate-x-full'}`}
      >
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Main Content */}
      <main className="flex-grow p-6 min-h-screen bg-gray-100 overflow-hidden md:ml-64">
        {children}
      </main>
    </div>
  );
}