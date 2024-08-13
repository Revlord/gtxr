"use client"
import React from 'react'
import Image from 'next/image'
import ShootingStars from './ui/shooting-stars';
import { StarsBackground } from './ui/stars-background';
import Link from 'next/link';


const ProjHero = () => {
  
  return (
    <div className='relative w-full min-h-[calc(30vh)] h-fit flex bg-black mt-4'>
      <div className="h-[30vh] hero-gradient flex flex-col flex-grow m-8 items-center justify-center relative w-full rounded-[3rem]">
      <h2 className="relative flex-col md:flex-row z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center gap-2 md:gap-8">
        Join our <a href={'https://discord.gg/GGBEuSHZHX'}>Discord</a> to register for the <br></br> Project Pitch Competition 🏆
      </h2>
      <ShootingStars />
      <StarsBackground />
      </div>
    </div>
  );
}

export default ProjHero
