'use client'
import { navItems } from '@/data';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getAssetPath } from '@/utils/handleBasePath';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // Mark as spatial via class "__enableXr__" (or use enable-xr attr if you prefer)
    <header className="__enableXr__ xr-nav bg-black/90 shadow-lg sticky top-0 w-full z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="transition duration-300 hover:opacity-80">
          <Image src={getAssetPath('/temp_logo.png')} alt="logo" width={100} height={55} className="rounded-full" />
        </Link>

        {/* Hamburger */}
        <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Desktop nav */}
        <ul className="hidden lg:flex space-x-6 text-white">
          {navItems.map(({ label, href }, i) => (
            <li key={i} className="relative group">
              <Link
                href={href}
                className="text-sm uppercase font-medium tracking-wider hover:text-purple transition duration-300 rounded-xl px-2 py-1 __enableXr__"
                // Per-item material; thin by default, but give hovered anchor a stronger look
                style={{ ['--xr-background-material' as any]: 'transparent' }}
              >
                {label}
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile nav */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black/90">
          <ul className="px-4 py-2 space-y-2 text-white">
            {navItems.map(({ label, href }, i) => (
              <li key={i}>
                <Link
                  href={href}
                  className="block text-sm uppercase font-medium tracking-wider hover:text-purple transition duration-300 rounded-xl px-2 py-2 __enableXr__"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ ['--xr-background-material' as any]: 'thin' }}
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
