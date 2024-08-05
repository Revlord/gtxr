"use client"
import React from 'react'
import Image from 'next/image'
import ShootingStars from './ui/shooting-stars';
import { StarsBackground } from './ui/stars-background';


const EventsHeaderHero = () => {
  
  return (
    <div className='relative w-full min-h-[calc(30vh)] h-fit flex mt-4'>
      <div className="h-[30vh] event-gradient flex flex-col flex-grow m-8 items-center justify-center relative w-full rounded-[3rem]">
      <h2 className="relative flex-col md:flex-row z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
        Social Events
      </h2>
      <ShootingStars />
      <StarsBackground starDensity={0.00030} />
      </div>
    </div>
  );
}

export default EventsHeaderHero
