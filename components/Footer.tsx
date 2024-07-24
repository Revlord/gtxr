import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-gray-300 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-gray-300 transition-colors">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-gray-300 transition-colors">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services/web-development" className="hover:text-gray-300 transition-colors">Web Development</Link></li>
              <li><Link href="/services/mobile-apps" className="hover:text-gray-300 transition-colors">Mobile Apps</Link></li>
              <li><Link href="/services/consulting" className="hover:text-gray-300 transition-colors">Consulting</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="https://twitter.com/yourcompany" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Twitter</a></li>
              <li><a href="https://facebook.com/yourcompany" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Facebook</a></li>
              <li><a href="https://linkedin.com/company/yourcompany" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400">&copy; 2024 Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;