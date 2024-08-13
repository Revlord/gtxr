'use client'
import { navItems } from '@/data';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black bg-opacity-90 shadow-lg sticky top-0 w-full z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="transition duration-300 hover:opacity-80">
          <Image src="/temp_logo.png" alt="logo" width={100} height={55} className="rounded-full" />
        </Link>

        {/* Hamburger Menu Icon */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Navigation Menu - Desktop */}
        <ul className="hidden lg:flex space-x-6 text-white">
          {navItems.map(({ label, href }, index) => (
            <li key={index} className="relative group">
              <Link 
                href={href} 
                className="text-sm uppercase font-medium tracking-wider hover:text-purple transition duration-300"
              >
                {label}
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Navigation Menu - Mobile */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black bg-opacity-90">
          <ul className="px-4 py-2 space-y-2 text-white">
            {navItems.map(({ label, href }, index) => (
              <li key={index}>
                <Link 
                  href={href} 
                  className="block text-sm uppercase font-medium tracking-wider hover:text-purple transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}