"use client"
import React from 'react'
import Image from 'next/image'
import { projects } from '@/data';
import ShootingStars from './ui/shooting-stars';
import { StarsBackground } from './ui/stars-background';


const ProjHero = () => {
  
  return (
    <div className='relative w-full min-h-[calc(30vh)] h-fit flex bg-black mt-4'>
      <div className="h-[30vh] hero-gradient flex flex-col flex-grow m-8 items-center justify-center relative w-full rounded-[3rem]">
      <h2 className="relative flex-col md:flex-row z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
        Project Pitch Competion Countdown : --/--/--
      </h2>
      <ShootingStars />
      <StarsBackground />
    </div>
    </div>
  );
}

export default ProjHero
'w-full h-auto flex-grow m-8 rounded-[3rem] relative hero-gradient flex flex-col overflow-hidden'