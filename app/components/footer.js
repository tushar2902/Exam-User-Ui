'use client';
import Link from 'next/link';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { SiGoogleclassroom } from 'react-icons/si';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Testimonials', href: '/testimonials' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms & Conditions', href: '/terms-conditions' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
    { name: 'GDPR Compliance', href: '/gdpr' }
  ];

  const resources = [
    { name: 'Blog', href: '/blog' },
    { name: 'Help Center', href: '/help' },
    { name: 'Webinars', href: '/webinars' },
    { name: 'API Documentation', href: '/api-docs' }
  ];

  // Only render on client-side to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <SiGoogleclassroom className="text-3xl text-emerald-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                ExamPortal
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Revolutionizing online assessments with cutting-edge technology and unparalleled security for educational institutions worldwide.
            </p>
            <div className="flex items-center gap-3 text-gray-400 text-sm">
              <FaMapMarkerAlt className="text-emerald-500" />
              <span>123 Education Blvd, Tech City, IN 560001</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-5 pb-2 border-b border-gray-700 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-lg font-semibold mb-5 pb-2 border-b border-gray-700 uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold pb-2 border-b border-gray-700 uppercase tracking-wider">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <FaEnvelope className="text-emerald-500" />
                <a href="mailto:support@examportal.com" className="hover:text-emerald-400 transition-colors">
                  support@examportal.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <FaPhone className="text-emerald-500" />
                <a href="tel:+911234567890" className="hover:text-emerald-400 transition-colors">
                  +91 123 456 7890
                </a>
              </div>
            </div>
            
            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3 text-gray-300">Subscribe to our newsletter</h4>
              <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 text-sm bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-r-md text-sm font-medium transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Social Media */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="bg-gray-800 hover:bg-emerald-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <FaFacebookF className="text-gray-300 hover:text-white" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-emerald-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <FaTwitter className="text-gray-300 hover:text-white" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-emerald-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <FaLinkedinIn className="text-gray-300 hover:text-white" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-emerald-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <FaInstagram className="text-gray-300 hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal & Copyright Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm text-center md:text-left">
              &copy; {currentYear} ExamPortal. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              {legalLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className="text-gray-500 hover:text-emerald-400 text-xs uppercase tracking-wider transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="text-gray-500 text-sm">
              v1.0.0
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;