"use client";
import { words } from "@/data";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import React from "react";
import { FlipWords } from "./ui/flip-words";

const Hero = () => {
  return (
    //video. Adjust the 'opacity' value for tweaking with the video's transparency
    <div className="relative h-screen flex items-center justify-center bg-black">
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        src="/6615300-uhd_3840_2160_25fps.mp4"
        autoPlay
        loop
        muted
      />

      {/* Hero text */}
      <div className="relative z-10 hero-text px-6 sm:px-12 max-w-3xl mx-auto text-center">

        {/* Also, FEEL FREE to tweak with the framermotion values (as well as tailwind)
         and see if you can come up with cooler looking stuff!! */}

        <motion.p 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
        <button className="mb-4 px-6 py-2 bg-white text-black rounded-full hover:scale-110 transition duration-200
        hover:text-purple hover:bg-violet-800 border-2 border-blue-800 hover:border-violet-950">
          → Discover our upcoming XR events and workshops.
        </button>
        </motion.p> {/* Added animation and adjusted styling
        → Discover our upcoming XR events and workshops. */}

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight md:leading-snug mb-8"
        >
          <FlipWords words={words} /> <br /> the world of Extended Reality with GTXR.
        </motion.h1> {/* Adjusted font size and styling, added animation */}

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl leading-relaxed"
        >
          GTXR is Georgia Tech's premier XR club, bringing together enthusiasts and experts to explore and innovate in the fields of virtual and augmented reality. Join us to learn, create, and push the boundaries of what's possible in XR.
        </motion.p> {/* Added animation */}

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.p
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
                    <button className="px-6 py-2 bg-white text-black rounded-full
                     font-semibold hover:bg-gray-200 transition duration-200">
          → Get Connected
        </button>
          </motion.p> {/* Added motion effects for hover and tap */}
        </div>
      </div>
    </div>
  );
};

export default Hero;