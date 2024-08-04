"use client";

import Link from "next/link";
import { navItems } from '@/data';
import appleVisionPro from '@/public/apple-vision-pro.png';
import { BackgroundBeams } from "./ui/background-beams";

const Hero = () => {
  return (
    <div className="relative w-full lg:min-h-[calc(100vh)] h-fit flex bg-black">
      <div className="w-full h-auto flex-grow m-4 sm:m-8 rounded-3xl lg:rounded-[3rem] relative hero-gradient flex flex-col overflow-hidden">

        <header className="nav-gradient shadow-2xl z-50 max-h-20 py-6 flex items-center justify-center rounded-3xl lg:rounded-[3rem] m-8 px-4 sm:px-8 md:mx-auto">
          <nav className="container mx-auto px-4 flex justify-between items-center gap-8">
            <ul className="flex gap-x-6 text-white flex-wrap items-center justify-center">
              {navItems.map(({ label, href }, index) => (
                <li key={index} className="relative group">
                  <Link
                    href={href}
                    className="text-sm uppercase font-medium tracking-wider group-hover:text-purple transition duration-300"
                  >
                    {label}
                    <span className="absolute left-0 -bottom-1 w-full h-1 bg-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out">
                      <span className="absolute left-0 top-1 w-full h-4 bg-gradient-to-b from-violet-600 to-transparent opacity-60"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        
        <h1 className="font-sans text-center font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl mt-2">The future of XR,<br />at Georgia Tech.</h1>
        <img src={appleVisionPro.src} alt="Apple Vision Pro" className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] mt-8 2xl:mt-12 mx-auto z-10 float pointer-events-none mb-4" />
        <div className="font-sans text-center font-extrabold text-[30vw] xl:text-[400px] opacity-[12%] text-zinc-50 absolute -bottom-4 sm:-bottom-8 md:-bottom-12 w-full leading-none pointer-events-none">GTXR</div>
        <div className="font-sans text-center font-extrabold text-[30vw] xl:text-[400px] opacity-[3%] text-zinc-50 absolute -bottom-4 sm:-bottom-8 md:-bottom-12 w-full leading-none pointer-events-none z-20">GTXR</div>
        <BackgroundBeams />
      </div>
    </div>
  );
};
6
export default Hero;