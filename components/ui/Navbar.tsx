import { navItems } from '@/data';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-black bg-opacity-90 py-4 shadow-lg fixed w-full z-50">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="transition duration-300 hover:opacity-80">
          <Image src="/temp_logo.png" alt="logo" width={50} height={50} className="rounded-full" />
        </Link>

        {/* Navigation Menu */}
        <ul className="flex space-x-6 text-white">
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
    </header>
  );
}