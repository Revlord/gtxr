'use client'
import { navItems } from '@/data';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface NavbarProps {
  spatialMode?: boolean;
}

export default function Navbar({ spatialMode = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header 
      className="bg-black bg-opacity-90 shadow-lg sticky top-0 w-full z-50"
      enable-xr={spatialMode ? true : undefined}
      style={spatialMode ? {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        '--xr-back': '100',
        '--xr-background-material': 'thick',
        borderRadius: '0 0 20px 20px',
        zIndex: 1000
      } : {}}
    >
      <nav 
        className="container mx-auto px-4 py-4 flex justify-between items-center"
        enable-xr-monitor={spatialMode ? true : undefined}
      >
        {/* Logo with spatial enhancement */}
        <div
          enable-xr={spatialMode ? true : undefined}
          style={spatialMode ? {
            position: 'relative',
            '--xr-back': '20',
            '--xr-background-material': 'translucent',
            borderRadius: '50%',
            padding: '8px',
            cursor: 'pointer'
          } : {}}
        >
          <Link href="/" className="transition duration-300 hover:opacity-80">
            <Image 
              src="/temp_logo.png" 
              alt="GTXR Logo" 
              width={100} 
              height={55} 
              className="rounded-full" 
            />
          </Link>
        </div>

        {/* Hamburger Menu Icon with spatial styling */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          enable-xr={spatialMode ? true : undefined}
          style={spatialMode ? {
            position: 'relative',
            '--xr-back': '15',
            '--xr-background-material': 'thin',
            borderRadius: '12px',
            padding: '12px',
            cursor: 'pointer'
          } : {}}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </button>

        {/* Navigation Menu - Desktop with spatial enhancements */}
        <ul 
          className="hidden lg:flex space-x-6 text-white"
          enable-xr={spatialMode ? true : undefined}
          style={spatialMode ? {
            position: 'relative',
            '--xr-back': '30',
            '--xr-background-material': 'regular',
            borderRadius: '25px',
            padding: '12px 24px',
          } : {}}
        >
          {navItems.map(({ label, href }, index) => (
            <li 
              key={index} 
              className="relative group"
              enable-xr={spatialMode ? true : undefined}
              style={spatialMode ? {
                position: 'relative',
                '--xr-back': `${5 + index * 2}`,
                '--xr-background-material': 'transparent',
                borderRadius: '12px',
                padding: '8px 16px',
                cursor: 'pointer',
                transform: `rotateY(${index % 2 === 0 ? '2deg' : '-2deg'}) rotateX(1deg)`,
                transformOrigin: 'center',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              } : {}}
            >
              <Link 
                href={href} 
                className="text-sm uppercase font-medium tracking-wider hover:text-purple transition duration-300"
              >
                {label}
                <span 
                  className="absolute left-0 bottom-0 w-full h-0.5 bg-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"
                  enable-xr={spatialMode ? true : undefined}
                  style={spatialMode ? {
                    '--xr-back': '3',
                    '--xr-background-material': 'translucent'
                  } : {}}
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Navigation Menu - Mobile with spatial styling */}
      {isMenuOpen && (
        <div 
          className="lg:hidden bg-black bg-opacity-90"
          enable-xr={spatialMode ? true : undefined}
          style={spatialMode ? {
            position: 'relative',
            '--xr-back': '50',
            '--xr-background-material': 'thick',
            borderRadius: '0 0 20px 20px',
            margin: '0 10px 10px 10px'
          } : {}}
        >
          <ul 
            className="px-4 py-2 space-y-2 text-white"
            enable-xr-monitor={spatialMode ? true : undefined}
          >
            {navItems.map(({ label, href }, index) => (
              <li 
                key={index}
                enable-xr={spatialMode ? true : undefined}
                style={spatialMode ? {
                  position: 'relative',
                  '--xr-back': `${10 + index * 3}`,
                  '--xr-background-material': 'thin',
                  borderRadius: '8px',
                  margin: '4px 0',
                  padding: '8px',
                  cursor: 'pointer',
                  transform: `translateX(${index * 2}px) rotateY(${index % 2 === 0 ? '1deg' : '-1deg'})`
                } : {}}
              >
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