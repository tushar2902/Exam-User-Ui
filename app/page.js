"use client";

import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <Head>
        <title>Exam Portal - Home</title>
      </Head>

      {/* Hero Section with Background Image */}
      <section
        className="relative flex flex-col items-center justify-center text-center h-screen text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/exam-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h2 className="text-4xl font-bold mb-4">
            Take Your Exams Online with Ease
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            A seamless and secure platform for conducting online exams.
          </p>
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Get Started
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 text-center bg-gray-100">
        <h3 className="text-3xl font-bold text-gray-800 mb-8">Why Choose Us?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-6 bg-white shadow-md rounded-lg"
          >
            <h4 className="text-xl font-bold text-gray-800">Secure Exams</h4>
            <p className="text-gray-600 mt-2">
              Proctored exams with AI monitoring to prevent cheating.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-6 bg-white shadow-md rounded-lg"
          >
            <h4 className="text-xl font-bold text-gray-800">Instant Results</h4>
            <p className="text-gray-600 mt-2">
              Get immediate score reports with detailed analytics.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-6 bg-white shadow-md rounded-lg"
          >
            <h4 className="text-xl font-bold text-gray-800">Flexible Exams</h4>
            <p className="text-gray-600 mt-2">
              Take exams from anywhere with easy scheduling.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-8">What Our Users Say</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-6 bg-blue-50 shadow-md rounded-lg"
          >
            <p className="text-gray-700">
              "This platform made my online exams stress-free! The interface is smooth and easy to use."
            </p>
            <h4 className="text-blue-500 font-bold mt-2">- Rahul S.</h4>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-6 bg-blue-50 shadow-md rounded-lg"
          >
            <p className="text-gray-700">
              "The security features are top-notch. I feel confident taking my exams online now."
            </p>
            <h4 className="text-blue-500 font-bold mt-2">- Priya M.</h4>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white py-4 text-center">
        <p className="text-sm">© 2025 Exam Portal. All rights reserved.</p>
      </footer>
    </>
  );
}
