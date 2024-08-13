"use client"
import React from 'react'
import Image from 'next/image'
import ShootingStars from './ui/shooting-stars';
import { StarsBackground } from './ui/stars-background';


const SponsorshipHero = () => {
  
  return (
    <div className='relative w-full min-h-[calc(30vh)] h-fit flex bg-black mt-4'>
      <div className="h-[30vh] sponsor-gradient flex flex-col flex-grow m-8 items-center justify-center relative w-full rounded-[3rem]">
      <h2 className="relative flex-col md:flex-row z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center gap-2 md:gap-8">
        Sponsor us to help cultivate XR talent!
      </h2>
      <ShootingStars minDelay={2500} />
      <StarsBackground starDensity={0.00030} />
      </div>
    </div>
  );
}

export default SponsorshipHero
