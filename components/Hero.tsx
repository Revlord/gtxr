"use client";

import Link from "next/link";
import { navItems } from "@/data";
import { BackgroundBeams } from "./ui/background-beams";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { getAssetPath } from "@/utils/handleBasePath";
import XrWindowLink from "@/components/ui/xr-window-link";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // lightweight 3D tilt for pointer devices
  const handleTilt = (e: React.MouseEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    img.style.transform = `translateZ(60px) rotateX(${(-dy * 8).toFixed(2)}deg) rotateY(${(dx * 8).toFixed(2)}deg)`;
  };
  const resetTilt = (e: React.MouseEvent<HTMLImageElement>) => {
    e.currentTarget.style.transform = "translateZ(60px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div className="relative w-full lg:min-h-[calc(100vh)] h-fit flex bg-black">
      <div className="w-full h-auto flex-grow m-4 sm:m-8 rounded-3xl lg:rounded-[3rem] relative hero-gradient flex flex-col overflow-hidden">
        <header className="nav-gradient shadow-2xl z-50 max-h-16 sm:max-h-20 py-6 flex items-center justify-center rounded-3xl lg:rounded-[3rem] m-8 px-4 sm:px-8 md:mx-auto">
          <nav className="container mx-auto px-4 flex items-center justify-center">
            <ul className="sm:flex gap-x-6 text-white items-center justify-center w-full flex-wrap hidden">
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
            <div>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="relative sm:hidden m-0 p-0 font-semibold bg-transparent border-0 text-lg uppercase tracking-wider hover:text-purple transition duration-300 hover:cursor-pointer flex flex-row items-center gap-1"
              >
                Menu <IconMenu2 className="inline" />
              </button>
            </div>
          </nav>
        </header>

        {/* elevated heading */}
        <h1
          className="font-sans text-center font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl mt-2 __enableXr__"
          style={
            {
              ["--xr-back" as any]: 30,
              ["--xr-background-material" as any]: "transparent",
            } as React.CSSProperties
          }
        >
          The future of XR,<br />at Georgia Tech.
        </h1>

        {/* depthy/tilting hero image (remove pointer-events-none so tilt works) */}
        <img
          src={getAssetPath("/apple-vision-pro.png")}
          alt="Apple Vision Pro"
          className="__enableXr__ w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] mt-8 2xl:mt-12 mx-auto z-10 mb-4"
          onMouseMove={handleTilt}
          onMouseLeave={resetTilt}
          style={
            {
              transform: "translateZ(60px) rotateX(0deg) rotateY(0deg)",
              transformOrigin: "center",
              transition: "transform .35s ease",
              ["--xr-background-material" as any]: "transparent",
              ["--xr-back" as any]: 80,
            } as React.CSSProperties
          }
        />

        {/* spatial CTA row */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <XrWindowLink
            href="/events"
            name="gtxr-events"
            className="__enableXr__ rounded-full px-6 py-3 text-black bg-white/90 hover:bg-white font-semibold"
            style={{ ["--xr-background-material" as any]: "thin", ["--xr-back" as any]: 40 }}
          >
            Open Events (New Window)
          </XrWindowLink>

          <Link
            href="/events"
            className="rounded-full px-6 py-3 text-white border border-white/30 hover:bg-white/10"
          >
            View in this page
          </Link>
        </div>

        {/* backdrop text + beams */}
        <div className="font-sans text-center font-extrabold text-[30vw] xl:text-[400px] opacity-[12%] text-zinc-50 absolute -bottom-4 sm:-bottom-8 md:-bottom-12 w-full leading-none pointer-events-none">
          GTXR
        </div>
        <div className="font-sans text-center font-extrabold text-[30vw] xl:text-[400px] opacity-[3%] text-zinc-50 absolute -bottom-4 sm:-bottom-8 md:-bottom-12 w-full leading-none pointer-events-none z-20">
          GTXR
        </div>
        <BackgroundBeams />
      </div>

      <MobileMenu isOpen={menuOpen} closeMenu={() => { setMenuOpen(false); }} />
    </div>
  );
};

interface MobileMenuProps {
  isOpen: boolean;
  closeMenu: () => void;
}

const MobileMenu = ({ isOpen, closeMenu }: MobileMenuProps) => {
  return (
    <div
      className={`fixed top-0 bottom-0 z-[999] sm:hidden transition-all duration-500 w-full ${
        isOpen ? "left-0 opacity-100" : "-left-full opacity-0"
      }`}
    >
      <ul className="w-full h-full flex flex-col gap-8 text-white items-center justify-center bg-violet-950">
        {navItems.map(({ label, href }, index) => (
          <li key={index} className="relative group">
            <Link
              href={href}
              className="text-3xl uppercase tracking-wider group-hover:text-purple transition duration-300"
            >
              {label}
              <span className="absolute left-0 -bottom-1 w-full h-1 bg-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out">
                <span className="absolute left-0 top-1 w-full h-4 bg-gradient-to-b from-violet-600 to-transparent opacity-60"></span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <button
        className="absolute top-4 right-4 text-zinc-300 hover:text-zinc-400 transition-colors"
        onClick={closeMenu}
      >
        <IconX size={48} />
      </button>
    </div>
  );
};

export default Hero;
