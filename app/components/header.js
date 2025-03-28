"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-8xl mx-auto flex justify-between items-center h-20 px-6">
        <Link 
          href="/" 
          className="text-2xl font-bold text-gray-800 flex items-center"
        >
          <span className="bg-[#0d7b74] text-white px-2 py-1 rounded mr-2">EP</span>
          ExamPortal
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            href="/#features" 
            className="text-gray-600 hover:text-[#0d7b74] transition-colors font-medium"
          >
            Features
          </Link>
          <Link 
            href="/#cta" 
            className="text-gray-600 hover:text-[#0d7b74] transition-colors font-medium"
          >
            Contact
          </Link>
          <Link
            href="/login"
            className="ml-6 px-5 py-2 bg-[#0d7b74] text-white rounded-lg hover:bg-[#069f86] transition-all font-medium shadow-md hover:shadow-lg"
          >
            Login
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="px-6 py-4 flex flex-col space-y-4">
            <Link 
              href="/#features" 
              className="text-gray-600 hover:text-[#0d7b74] transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="/#cta" 
              className="text-gray-600 hover:text-[#0d7b74] transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/login"
              className="mt-4 px-5 py-2 bg-[#0d7b74] text-white rounded-lg hover:bg-[#069f86] transition-all font-medium text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}