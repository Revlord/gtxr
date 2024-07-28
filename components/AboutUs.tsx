"use client";

import Link from "next/link";
import AboutUsCard from "./ui/about-us-card";
import Stock1 from "@/public/stock1.jpeg";
import Stock2 from "@/public/stock2.jpeg";
import { PinContainer } from "./ui/3d-pin";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import ImmerseGT from "@/public/immersegt.png";

const AboutUs = () => {
    return (
        <div className="relative w-full min-h-[calc(100vh)] h-fit flex bg-black">
            <div className="w-full h-auto flex-grow m-8 relative flex flex-col items-center text-center py-16">
                <p className="text-4xl text-zinc-500 mb-4">01.</p>
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

                <p className="text-4xl text-zinc-500 mb-4 mt-32">02.</p>
                <h2 className="text-5xl text-zinc-400 font-bold max-w-5xl">We <span className="text-zinc-50">collaborate with each other</span> to advance our knowledge of the XR space together.</h2>
                <div className="mt-16 flex gap-8">
                    <img src={Stock1.src} alt="Stock Image 1" className="w-[60%] max-w-7xl h-auto rounded-[3rem]" />
                    <div className="w-full text-center px-8 flex flex-col justify-center items-center max-w-xl">
                        <h3 className="text-zinc-50 font-bold text-3xl mb-12">Open to All, <span className="text-zinc-300 font-normal">Beginners and Experts Alike.</span></h3>
                        <p className="text-zinc-400 text-xl leading-relaxed mb-4">GTXR embraces a growth and learning culture for everyone, from beginners just getting started with XR to experienced practitioners looking to collaborate on innovative projects.</p>
                        <p className="text-zinc-400 text-xl leading-relaxed">Anyone is welcome to drop by, regardless of experience, as we bring the XR revolution to GT.</p>
                    </div>
                </div>
                <div className="mt-16 flex gap-8">
                    <div className="w-full text-center px-8 flex flex-col justify-center items-center max-w-xl">
                        <h3 className="text-zinc-50 font-bold text-3xl mb-12">Free resources <span className="text-zinc-300 font-normal">to get started with the XR space.</span></h3>
                        <p className="text-zinc-400 text-xl leading-relaxed mb-4">We provide <span className="text-zinc-300 font-semibold">the best XR opportunities</span> on campus.</p>
                        <ul className="text-left list-disc pl-10 text-zinc-400 flex flex-col gap-2">
                            <li className="text-xl leading-relaxed">Networking with industry professionals</li>
                            <li className="text-xl leading-relaxed">The latest VR hardware including Vision Pros</li>
                            <li className="text-xl leading-relaxed">Leadership and project pitch opportunities</li>
                            <li className="text-xl leading-relaxed">A collaborative, welcoming atmosphere for all</li>
                            <li className="text-xl leading-relaxed">And so much more!</li>
                        </ul>
                    </div>
                    <img src={Stock2.src} alt="Stock Image 2" className="w-[60%] max-w-7xl h-auto rounded-[3rem]" />
                </div>

                <p className="text-4xl text-zinc-500 mb-4 mt-32">03.</p>
                <h2 className="text-5xl text-zinc-400 font-bold max-w-5xl">We work with <span className="text-zinc-50">experts in the industry</span> to provide real-world opportunities and skills.</h2>
                <div className="w-full flex justify-center gap-16 mt-24">
                    <div className="w-full max-w-xl flex flex-col items-center gap-8">
                        <p className="text-2xl font-bold text-zinc-200">Are you a sponsor looking to advance XR culture on Georgia Tech's campus?</p>
                        <HoverBorderGradient
                            containerClassName="rounded-full"
                            as="button"
                            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 text-xl"
                        >
                            <span>Contact Us</span>
                        </HoverBorderGradient>
                        <p className="text-zinc-400 text-lg mt-8 font-light">We rely on sponsors in the industry to run ImmerseGT. Their generous support allows us to open participation to any student interested in XR, for free. </p>
                    </div>
                    <PinContainer
                        title="immersegt.io"
                        href="https://immersegt.io"
                    >
                        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[30rem] h-fit">
                            <h3 className="!pb-2 !m-0 font-bold  text-2xl text-slate-100">
                                ImmerseGT
                            </h3>
                            <div className="text-base !m-0 !p-0 font-normal">
                                <span className="text-slate-500 ">
                                    The premier XR hackathon held annually at Georgia Tech.
                                </span>
                            </div>
                            <img src={ImmerseGT.src} alt="ImmerseGT" className="w-full h-auto rounded-lg mt-4" />
                        </div>
                    </PinContainer>
                </div>
            </div>
        </div>
    );
};
6
export default AboutUs;