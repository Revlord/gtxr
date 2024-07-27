"use client";

import Link from "next/link";
import AboutUsCard from "./ui/about-us-card";

const AboutUs = () => {
    return (
        <div className="relative w-full min-h-[calc(100vh)] h-fit flex bg-black">
            <div className="w-full h-auto flex-grow m-8 relative flex flex-col items-center text-center">
                <p className="text-4xl text-zinc-500 mb-4 mt-16">01.</p>
                <h2 className="text-5xl text-zinc-400 font-bold max-w-5xl">We are a <span className="text-zinc-50">passionate group of XR enthusiasts</span> committed to advancing XR technology at Georgia Tech and beyond.</h2>
                <div className="flex flex-wrap max-w-8xl gap-5 w-full mt-24 justify-center">
                    <AboutUsCard
                        title="Workshops"
                        content="Seminars to learn about the latest tech, tools, and techniques in XR."
                        variant={0}
                    />
                    <AboutUsCard
                        title="Project Teams"
                        content="Shared projects to apply XR knowledge and skills to real-world problems."
                        variant={1}
                    />
                    <AboutUsCard
                        title="Project Pitches"
                        content="Member-driven ideas for collaborative projects to work on with teams."
                        variant={2}
                    />
                    <AboutUsCard
                        title="Social Events"
                        content="Social events and many networking opportunities to connect and socialize." 
                        variant={3}
                        />
                    <AboutUsCard
                        title="Hackathons"
                        content="ImmerseGT, our annual XR hackathon held in the spring semester." 
                        variant={4}
                        />
                </div>
                <p className="text-4xl text-zinc-500 mb-4 mt-24">02.</p>
                <h2 className="text-5xl text-zinc-400 font-bold max-w-5xl">We <span className="text-zinc-50">collaborate with each other</span> to advance our skills and knowledge of the XR space together.</h2>
                <p className="text-center mt-48">(image of project team, description of process)</p>
                <div className="h-64"></div>
            </div>
        </div>
    );
};
6
export default AboutUs;