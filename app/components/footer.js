'use client';
import Link from 'next/link';
import Image from 'next/image';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column - Branding & About */}
        <div>
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/#" alt="TestLab Logo" width={150} height={60}/>
          </Link>
          <p className="mt-4 text-gray-400 text-sm">
            Your trusted online exam platform, making assessments secure, scalable, and efficient.
          </p>
          <p className="mt-3 text-gray-400 text-sm">
            <i className="fas fa-map-marker-alt mr-2"></i>
            TestLab HQ, XYZ Street, City, India
          </p>
        </div>

        {/* Center Column - Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b pb-2 uppercase">Quick Links</h3>
          <ul className="text-gray-400 space-y-2">
            <li><Link href="/#about" className="hover:text-white">About</Link></li>
            <li><Link href="/#features" className="hover:text-white">Features</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms-conditions" className="hover:text-white">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Right Column - Contact & Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b pb-2 uppercase">Get in Touch</h3>
          <p className="text-gray-400 text-sm">
            <i className="fas fa-envelope mr-2"></i>
            support@testlab.com
          </p>
          <p className="text-gray-400 text-sm mt-2">
            <i className="fas fa-phone mr-2"></i>
            +91 123 456 7890
          </p>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-linkedin text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* Copyright - No Link */}
      <div className="text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} TestLab. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
