"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans text-center">
        Our Projects range from XR research to fun VR applications!
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                This is the super cool description of this project. <br></br>
              </span>{" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus fugit, similique, doloremque iure maxime dignissimos debitis commodi libero voluptatem amet molestiae a corrupti vel pariatur voluptatibus quas quasi dolorum magni!
            </p>
            <Image
              src="/apple-vision-pro.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};
const ProjectPitchContent = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-4">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Wanna lead a project under GTXR? <br></br>
              </span>{" "}
              YOU 🫵 can participate in our project pitch competition held every year to pitch your project idea. The Executive Board and mentors will then review your project submissions and select the best ones! There will then be a second round where the selected project pitchers will pitch their project in front of all the members of the club. After voting, the top 2 projects out of the best will then be finalized! Huge buff on your resume and is an exceptional leadership opportunity!
            </p>
            <Image
              src="/apple-vision-pro.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const ExitSuitContent = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-4">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Exit Suit Project <br></br>
              </span>{" "}
              In a unique blend of creativity and technological innovation, the GTXR Club recently embarked on an exciting project—the creation of a custom Exit Suit. The concept behind the Exit Suit is to provide EXIT SUIT is a full-body support that lets you move in amazing ways and has full- body force-feedback potential for Virtual Reality Experiences. Recognizing the potential for cutting-edge advancements, the company behind the Exit Suit saw an opportunity to collaborate with the GTXR Club, a group known for its pioneering work in gaming, virtual reality, and advanced robotics.
            </p>
            <a href='https://exitsuit.com/'>More About the Exit Suit</a>
          </div>
        );
      })}
    </>
  );
};

const MotionIDContent = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-4">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Motion ID Research <br></br>
              </span>{" "}
              Evaluate the feasibility of utilising motion data as a means of
              identification for VR headsets such as the Quest Pro, 2, 3, and
              Apple Vision Pro. This IRB approved study conducts research to
              create models that predict the user in as little as a 2.5 second
              wave or nod across multiple headsets. This serves as both an
              authenthication mechanism as well as highlights the potency of
              motion data raising privacy concerns.
            </p>
          </div>
        );
      })}
    </>
  );
};

const XRMemoryContent = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-4">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                XR Memory Project <br></br>
              </span>{" "}
              An app that implements a Simon Says-like game in VR space to test
              whether memory retention in VR spaces is more effective than
              conventional memory retention.
            </p>
          </div>
        );
      })}
    </>
  );
};

const GraphingCalculatorContent = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-4">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                VR Graphing  Project <br></br>
              </span>{" "}
              The VR Graphing Calculator is an innovative project designed to bring advanced mathematical visualization into the immersive world of virtual reality. This tool allows users to explore complex mathematical concepts in a more intuitive and interactive way, making it particularly valuable for education, research, and engineering applications. One of the standout features of the VR Graphing Calculator is its Plane and Vector Renderer. This specialized component allows users to visualize planes and vectors within the virtual space, making it easier to understand concepts in linear algebra, physics, and geometry.
            </p>
          </div>
        );
      })}
    </>
  );
};

const DrumSimulatorContent = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-4">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Drum Simulator <br></br>
              </span>{" "}
              The WebXR Drumming Game is an innovative virtual reality experience designed to immerse players in the rhythmic world of drumming, all from within a web browser. Published on heyVR, this game is built using the Wonderland Engine, a powerful tool for creating high-performance WebXR experiences. The project is a testament to the potential of the WebXR API, showcasing how developers can efficiently create and deploy immersive content directly on the web. The WebXR Drumming Game was created with the primary goal of exploring the capabilities of the WebXR API. WebXR is a standard that enables web applications to access virtual and augmented reality experiences across different devices, making it a versatile platform for VR development. By utilizing the Wonderland Engine, the development team was able to leverage its optimized 3D engine specifically tailored for WebXR, ensuring smooth performance and high-quality visuals even in a web-based environment.
            </p>
          </div>
        );
      })}
    </>
  );
};

const SpaceSimulationContent = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-4">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Space Simulation <br></br>
              </span>{" "}
              The MR Space Simulation is a cutting-edge application that allows users to experience the wonders of space within a mixed reality environment. By integrating MR technology, the simulation overlays virtual elements onto the real world, creating a seamless blend of physical and digital spaces. Users can explore planets, stars, and galaxies, all generated procedurally, ensuring that no two experiences are the same. At the heart of this simulation is its procedural generation system. This technology allows the creation of vast, complex environments on the fly, without the need for pre-designed content.
            </p>
          </div>
        );
      })}
    </>
  );
};

const XRtisticHabitatContent = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-4">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                XRtistic Habitat <br></br>
              </span>{" "}
              The XRtistic Habitat project is an innovative solution designed to revolutionize how we approach interior design and space planning. By leveraging Extended Reality (XR) technology, this project allows users to create and visualize virtual objects, such as furniture and décor, within a physical room. This immersive experience enables individuals to see how different items would fit and look in their desired space, all without the need for physical objects. XRtistic Habitat was conceived to address the common challenges of interior design—specifically, the difficulty of envisioning how furniture and other objects will fit into a space. Whether you’re redesigning a living room, planning a new office layout, or simply trying to decide on the best furniture arrangement, XRtistic Habitat provides a powerful tool for making informed decisions.
            </p>
          </div>
        );
      })}
    </>
  );
};

//fill content later

const data = [
  {
    category: "Ongoing | XR Application",
    title: "Exit Suit",
    src: "/exitsuit.png",
    content: <ExitSuitContent/>,
  },
  {
    category: "Ongoing | XR Research",
    title: "MotionID",
    src: "/project5.png",
    content: <MotionIDContent/>,
  },
  {
    category: "Completed | Mixed Reality",
    title: "XR Memory",
    src: "/project3.png",
    content: <XRMemoryContent/>,
  },
  {
    category: "Completed | VR",
    title: "Graphing Calculator",
    src: "/project11.png",
    content: <GraphingCalculatorContent/>,
  },
  {
    category: "Completed | VR",
    title: "Drum Simulator",
    src: "/project4.jpg",
    content: <DrumSimulatorContent/>,
  },
  {
    category: "Completed | VR",
    title: "Space Simulation",
    src: "/carousel5.jpg",
    content: <SpaceSimulationContent/>,
  },
  {
    category: "Archived | Mixed Reality",
    title: "XRtistic Habitat",
    src: "/stock1.jpeg",
    content: <XRtisticHabitatContent/>,
  },
  {
    category: "Your 🫵 Project | ?",
    title: "Pitch Competition Winner Project 🏆",
    src: "/stock2.jpeg",
    content: <ProjectPitchContent />,
  },
];
