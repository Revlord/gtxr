"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

// Enhanced XR CSS helper with better typing
const xr = (styles: Record<string, string | number>) => styles as React.CSSProperties;

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    // Main spatial container with advanced monitoring and scene setup
    <div 
      className="w-full h-full py-20" 
      enable-xr 
      enable-xr-monitor
      style={xr({
        // Create a main scene container
        "--xr-scene": "main-gallery",
        "--xr-background-material": "translucent",
        "--xr-opacity": 0.95
      })}
    >
      {/* Floating spatial header with depth layering */}
      <h2
        className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans text-center mb-8"
        enable-xr
        style={xr({ 
          "--xr-background-material": "thick", 
          "--xr-back": 60,
          "--xr-width": 800,
          "--xr-height": 120,
          // Add subtle hover elevation
          "--xr-hover-back": 80
        })}
      >
        Our Projects range from XR research to fun VR applications!
      </h2>
      
      {/* Spatial carousel with scene containment */}
      <div 
        enable-xr
        style={xr({
          "--xr-scene": "carousel-scene",
          "--xr-background-material": "transparent",
          "--xr-back": 40
        })}
      >
        <Carousel items={cards} />
      </div>
    </div>
  );
}

// Enhanced Panel component with interactive spatial features
const Panel: React.FC<React.PropsWithChildren<{
  depth?: number;
  material?: "thin" | "regular" | "thick" | "chrome" | "translucent";
  interactive?: boolean;
}>> = ({ 
  children, 
  depth = 40, 
  material = "thick", 
  interactive = true 
}) => (
  <div
    enable-xr
    className={`bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4 transition-transform duration-300 ${
      interactive ? 'hover:scale-[1.02] cursor-pointer' : ''
    }`}
    style={xr({ 
      "--xr-background-material": material,
      "--xr-back": depth,
      "--xr-width": 600,
      "--xr-hover-back": interactive ? depth + 20 : depth,
      // Add subtle spatial glow effect
      "--xr-border-glow": "rgba(59, 130, 246, 0.3)",
      "--xr-corner-radius": 24
    })}
  >
    {children}
  </div>
);

// Enhanced content components with varying spatial depths
const DummyContent = () => {
  return (
    <div 
      enable-xr
      style={xr({
        "--xr-scene": "content-scene",
        "--xr-layout": "vertical"
      })}
    >
      {[...new Array(3).fill(1)].map((_, index) => (
        <Panel 
          key={"dummy-content" + index}
          depth={30 + (index * 15)} // Staggered depths
          material="thick"
        >
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
            <span 
              className="font-bold text-neutral-700 dark:text-neutral-200"
              enable-xr
              style={xr({
                "--xr-back": 10,
                "--xr-background-material": "translucent"
              })}
            >
              This is the super cool description of this project. <br />
            </span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus fugit, similique, doloremque iure maxime dignissimos debitis commodi libero voluptatem amet molestiae a corrupti vel pariatur voluptatibus quas quasi dolorum magni!
          </p>
          <div 
            enable-xr
            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto"
            style={xr({
              "--xr-back": 20,
              "--xr-background-material": "regular",
              "--xr-corner-radius": 16
            })}
          >
            <Image
              src="/apple-vision-pro.png"
              alt="Macbook mockup from Aceternity UI"
              height={500}
              width={500}
              className="object-contain w-full h-full"
            />
          </div>
        </Panel>
      ))}
    </div>
  );
};

// Enhanced project pitch with call-to-action spatial button
const ProjectPitchContent = () => {
  return (
    <div
      enable-xr
      style={xr({
        "--xr-scene": "pitch-scene",
        "--xr-background-material": "translucent"
      })}
    >
      <Panel depth={50} material="chrome" interactive={true}>
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-6">
          <span 
            className="font-bold text-neutral-700 dark:text-neutral-200"
            enable-xr
            style={xr({
              "--xr-back": 15,
              "--xr-background-material": "thick",
              "--xr-corner-radius": 8
            })}
          >
            Wanna lead a project under GTXR? <br />
          </span>
          YOU 🫵 can participate in our project pitch competition held every year to pitch your project idea. The Executive Board and mentors will then review your project submissions and select the best ones!
        </p>
        
        {/* Spatial call-to-action button */}
        <button
          enable-xr
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 mb-4"
          style={xr({
            "--xr-back": 30,
            "--xr-background-material": "thick",
            "--xr-hover-back": 45,
            "--xr-corner-radius": 12,
            "--xr-border-glow": "rgba(59, 130, 246, 0.5)"
          })}
        >
          Apply for Project Pitch Competition
        </button>
        
        <div
          enable-xr
          style={xr({
            "--xr-back": 25,
            "--xr-background-material": "regular",
            "--xr-corner-radius": 20
          })}
        >
          <Image
            src="/apple-vision-pro.png"
            alt="Project pitch visualization"
            height={500}
            width={500}
            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
          />
        </div>
      </Panel>
    </div>
  );
};

// Enhanced project content components with unique spatial characteristics
const ExitSuitContent = () => (
  <Panel depth={45} material="chrome">
    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-4">
      <span 
        className="font-bold text-neutral-700 dark:text-neutral-200"
        enable-xr
        style={xr({
          "--xr-back": 12,
          "--xr-background-material": "translucent"
        })}
      >
        Exit Suit Project <br />
      </span>
      In a unique blend of creativity and technological innovation, the GTXR Club recently embarked on an exciting project—the creation of a custom Exit Suit.
    </p>
    <a 
      href="https://exitsuit.com/"
      enable-xr
      className="text-blue-600 hover:text-blue-800 underline font-semibold"
      style={xr({
        "--xr-back": 20,
        "--xr-background-material": "thin",
        "--xr-hover-back": 35,
        "--xr-corner-radius": 6
      })}
    >
      More About the Exit Suit
    </a>
  </Panel>
);

// Similar enhancements for other content components...
const MotionIDContent = () => (
  <Panel depth={40} material="thick">
    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-4">
      <span className="font-bold text-neutral-700 dark:text-neutral-200">
        Motion ID Research <br />
      </span>
      Evaluate the feasibility of utilising motion data as a means of identification for VR headsets such as the Quest Pro, 2, 3, and Apple Vision Pro.
    </p>
  </Panel>
);

// Continue with other content components using similar spatial enhancements...
const XRMemoryContent = () => (
  <Panel depth={35} material="regular">
    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-4">
      <span className="font-bold text-neutral-700 dark:text-neutral-200">
        XR Memory Project <br />
      </span>
      An app that implements a Simon Says-like game in VR space to test whether memory retention in VR spaces is more effective than conventional memory retention.
    </p>
  </Panel>
);

const GraphingCalculatorContent = () => (
  <Panel depth={42} material="thick">
    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-4">
      <span className="font-bold text-neutral-700 dark:text-neutral-200">
        VR Graphing Project <br />
      </span>
      The VR Graphing Calculator is an innovative project designed to bring advanced mathematical visualization into the immersive world of virtual reality.
    </p>
  </Panel>
);

const DrumSimulatorContent = () => (
  <Panel depth={38} material="translucent">
    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-4">
      <span className="font-bold text-neutral-700 dark:text-neutral-200">
        Drum Simulator <br />
      </span>
      The WebXR Drumming Game is an innovative virtual reality experience designed to immerse players in the rhythmic world of drumming.
    </p>
  </Panel>
);

const SpaceSimulationContent = () => (
  <Panel depth={46} material="chrome">
    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-4">
      <span className="font-bold text-neutral-700 dark:text-neutral-200">
        Space Simulation <br />
      </span>
      The MR Space Simulation is a cutting-edge application that allows users to experience the wonders of space within a mixed reality environment.
    </p>
  </Panel>
);

const XRtisticHabitatContent = () => (
  <Panel depth={33} material="regular">
    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-4">
      <span className="font-bold text-neutral-700 dark:text-neutral-200">
        XRtistic Habitat <br />
      </span>
      The XRtistic Habitat project is an innovative solution designed to revolutionize how we approach interior design and space planning.
    </p>
  </Panel>
);

// Data array remains the same
const data = [
  { category: "Ongoing | XR Application", title: "Exit Suit", src: "/exitsuit.png", content: <ExitSuitContent/> },
  { category: "Ongoing | XR Research", title: "MotionID", src: "/project5.png", content: <MotionIDContent/> },
  { category: "Completed | Mixed Reality", title: "XR Memory", src: "/project3.png", content: <XRMemoryContent/> },
  { category: "Completed | VR", title: "Graphing Calculator", src: "/project11.png", content: <GraphingCalculatorContent/> },
  { category: "Completed | VR", title: "Drum Simulator", src: "/project4.jpg", content: <DrumSimulatorContent/> },
  { category: "Completed | VR", title: "Space Simulation", src: "/carousel5.jpg", content: <SpaceSimulationContent/> },
  { category: "Archived | Mixed Reality", title: "XRtistic Habitat", src: "/stock1.jpeg", content: <XRtisticHabitatContent/> },
  { category: "Your 🫵 Project | ?", title: "Pitch Competition Winner Project 🏆", src: "/stock2.jpeg", content: <ProjectPitchContent /> },
];
