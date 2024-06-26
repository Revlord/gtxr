import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-black py-5 shadow-md"> {/* Adjust background, padding, shadow */}
      <nav className="container mx-auto flex justify-between items-center">
        <div>
          <Image src="/GTXR_logo.png" alt="logo" width={50} height={50} />
        </div>
        <ul className="flex space-x-8"> {/* Style for menu items */}
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/projects">Projects</Link>
          </li>
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <Link href="/hackathon">Hackathon</Link>
          </li>
          {/* ... more menu items */}
        </ul>
      </nav>
    </header>
  );
}
