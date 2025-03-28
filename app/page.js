"use client";

import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiCheckCircle, FiClock, FiShield, FiBarChart2, FiAward, FiUser } from "react-icons/fi";

export default function Home() {
  const features = [
    {
      icon: <FiShield size={32} className="text-[#0d7b74]" />,
      title: "Secure Exams",
      description: "Advanced proctoring with AI monitoring to ensure exam integrity."
    },
    {
      icon: <FiClock size={32} className="text-[#0d7b74]" />,
      title: "Flexible Scheduling",
      description: "Take exams anytime with our 24/7 available platform."
    },
    {
      icon: <FiBarChart2 size={32} className="text-[#0d7b74]" />,
      title: "Real-time Analytics",
      description: "Get instant results with detailed performance breakdowns."
    },
    {
      icon: <FiAward size={32} className="text-[#0d7b74]" />,
      title: "Certification Ready",
      description: "Generate professional certificates upon exam completion."
    },
    {
      icon: <FiUser size={32} className="text-[#0d7b74]" />,
      title: "User-Friendly",
      description: "Intuitive interface designed for all technical levels."
    },
    {
      icon: <FiCheckCircle size={32} className="text-[#0d7b74]" />,
      title: "Comprehensive Testing",
      description: "Support for multiple question types and exam formats."
    }
  ];

  const testimonials = [
    {
      quote: "This platform revolutionized our testing process. The analytics help us identify student weaknesses effectively.",
      author: "Dr. Sarah Johnson",
      role: "Head of Computer Science, Stanford University"
    },
    {
      quote: "As a student, I appreciate the seamless experience. No technical glitches during my important exams!",
      author: "Michael Chen",
      role: "Computer Science Student"
    },
    {
      quote: "Implementation was smooth and the support team was excellent. Our faculty adoption rate was 100%.",
      author: "Prof. Robert Williams",
      role: "Dean of Academics, MIT"
    }
  ];

  return (
    <>
      <Head>
        <title>ExamPortal - Secure Online Examination Platform</title>
        <meta name="description" content="Professional online examination platform with AI proctoring, instant results, and comprehensive analytics." />
      </Head>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-[#0d7b74] to-[#069f86] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat"></div>
        </div>
        
        <div className="container mx-auto px-6 py-24 z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 mb-12 lg:mb-0"
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                The Future of <span className="text-yellow-300">Online Examinations</span>
              </h1>
              <p className="text-xl mb-8 text-gray-100">
                Secure, scalable, and sophisticated examination platform trusted by leading educational institutions worldwide.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/dashboard"
                  className="px-8 py-4 bg-white text-[#0d7b74] rounded-lg font-bold text-lg shadow-lg hover:bg-gray-100 transition-all text-center"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/demo"
                  className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-[#0d7b74] transition-all text-center"
                >
                  Request Demo
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 flex justify-center"
            >
              <div className="relative w-full max-w-lg">
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#069f86] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="relative">
                  <img 
                    src="/hero-img.png" 
                    alt="ExamPortal Dashboard Preview" 
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      {/* <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-500 mb-8">TRUSTED BY LEADING INSTITUTIONS WORLDWIDE</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
            <img src="/stanford-logo.png" alt="Stanford" className="h-12" />
            <img src="/mit-logo.png" alt="MIT" className="h-10" />
            <img src="/harvard-logo.png" alt="Harvard" className="h-12" />
            <img src="/iit-logo.png" alt="IIT" className="h-10" />
            <img src="/cambridge-logo.png" alt="Cambridge" className="h-10" />
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Comprehensive Examination Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to conduct secure, reliable, and insightful online assessments.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all"
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Simple Yet Powerful</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes with our intuitive platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-md">
                <span className="text-3xl font-bold text-[#0d7b74]">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Create Your Exam</h3>
              <p className="text-gray-600">
                Easily set up exams with our question bank or upload your own questions.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-md">
                <span className="text-3xl font-bold text-[#0d7b74]">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Invite Participants</h3>
              <p className="text-gray-600">
                Share exam links via email or integrate with your LMS.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-md">
                <span className="text-3xl font-bold text-[#0d7b74]">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Analyze Results</h3>
              <p className="text-gray-600">
                Get detailed analytics and reports to measure performance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Trusted by Educators Worldwide</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of institutions transforming their assessment processes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-xl"
              >
                <div className="mb-6 text-gray-600 italic">
                  "{testimonial.quote}"
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-bold text-gray-800">{testimonial.author}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 bg-gradient-to-r from-[#0d7b74] to-[#069f86] text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Examinations?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join thousands of educators who trust ExamPortal for secure, reliable online assessments.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/signup"
                className="px-8 py-4 bg-white text-[#0d7b74] rounded-lg font-bold text-lg shadow-lg hover:bg-gray-100 transition-all"
              >
                Start Free Trial
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}