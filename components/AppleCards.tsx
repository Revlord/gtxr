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

const data = [
  {
    category: "Ongoing | XR Application",
    title: "Exit Suit",
    src: "/carousel1.jpg",
    content: <DummyContent />,
  },
  {
    category: "Ongoing | XR Research",
    title: "MotionID",
    src: "/carousel2.jpg",
    content: <DummyContent />,
  },
  {
    category: "Completed | Mixed Reality",
    title: "XR Memory",
    src: "/carousel3.jpg",
    content: <DummyContent />,
  },

  {
    category: "Completed | VR",
    title: "Graphing Calculator",
    src: "/carousel4.jpg",
    content: <DummyContent />,
  },
  {
    category: "Completed | VR",
    title: "Planet Simulator",
    src: "/carousel5.jpg",
    content: <DummyContent />,
  },
  {
    category: "Archived | Mixed Reality",
    title: "XRtistic Habitat",
    src: "/stock1.jpeg",
    content: <DummyContent />,
  },
  {
    category: "Your 🫵 Project | ?",
    title: "Pitch Competition Winner Project 🏆",
    src: "/stock2.jpeg",
    content: <ProjectPitchContent />,
  },
];
