"use client";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import React from "react";
import { LampDemo } from './ui/Lamp'
import { ImagesSlider } from "./ui/Slider";

//Replace the <video> src with the path to the actual video

const Hero = () => {

  return (
    //video. translucent-ness can be changed by altering 'opacity' value.
    <div className="relative h-screen flex items-center justify-center bg-black">
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        src="/6615300-uhd_3840_2160_25fps.mp4"
        autoPlay
        loop
        muted
      />

      {/* Hero text*/}

      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-7xl font-bold">Join GTXR</h1>
        <p className="mt-4 text-xl md:text-2xl">Step into the future of XR</p>
        <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-full">
          Contact Us
        </button>
      </div>

    </div>

  );
};

export default Hero;

