"use client";
import Link from "next/link";

export default function Header() {
  return (
    <>
      {/* Navbar */}
      <header className="sticky top-0 left-0 right-0 z-50 bg-white">
       <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-4">
       <Link href="/" className="text-xl font-bold text-gray-800">ExamPortal </Link>
        <nav>
          <Link href="/contact" className="px-4 py-2 text-gray-700 hover:text-[#0d7b74]">
            Contact
          </Link>
          <Link
            href="/login"
            className="ml-4 px-4 py-2 bg-[#0d7b74] text-white rounded-lg hover:bg-[#069f86] transition"
          >
            Login
          </Link>
        </nav>
       </div>
      </header>
    </>
  );
}
