"use client";

import AboutUsCard from "./ui/about-us-card";
import Club1 from "@/public/club1_upscayl.png";
import Club2 from "@/public/club2_upscayl.png";
import { PinContainer } from "./ui/3d-pin";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import ImmerseGT from "@/public/immersegt.png";

const AboutUs = () => {
    return (
        <div className="relative w-full min-h-[calc(100vh)] h-fit flex bg-black">
            <div className="w-full h-auto flex-grow m-4 my-8 md:m-8 relative flex flex-col items-center text-center py-0 sm:py-16">
                <p className="text-2xl sm:text-3xl lg:text-4xl text-zinc-500 mb-4">01.</p>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl text-zinc-400 font-bold max-w-5xl">We are a <span className="text-purple">passionate group of XR enthusiasts</span> committed to advancing XR technology at Georgia Tech and beyond.</h2>
                <div className="flex flex-wrap max-w-[1440px] gap-5 w-full mt-8 sm:mt-16 lg:mt-24 justify-center">
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
                        title="Research"
                        content="We actively engage in conducting XR research under professors"
                        variant={4}
                    />
                    <AboutUsCard
                        title="Hackathons"
                        content="ImmerseGT, our annual XR hackathon held in the spring semester."
                        variant={5}
                    />
                    
                </div>

                <p className="text-2xl sm:text-3xl lg:text-4xl text-zinc-500 mb-4 mt-12 sm:mt-24 lg:mt-32">02.</p>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl text-zinc-400 font-bold max-w-5xl">We <span className="text-purple">collaborate with each other</span> to advance our knowledge of the XR space together.</h2>
                <div className="mt-8 sm:mt-16 flex gap-8 flex-col lg:flex-row items-center">
                    <img src={Club1.src} alt="Stock Image 1" className="w-full lg:w-[60%] max-w-7xl h-auto rounded-[3rem] transform transition duration-300 hover:scale-[102%]" />
                    <div className="w-full text-center px-4 sm:px-8 flex flex-col justify-center items-center max-w-xl mt-6 md:mt-0">
                        <h3 className="text-purple font-bold text-xl sm:text-3xl mb-4 sm:mb-12">Open to All, <span className="text-zinc-300 font-normal">Beginners and Experts Alike.</span></h3>
                        <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed mb-4">GTXR embraces a <span className="text-purple">growth and learning culture for everyone</span>, from beginners just getting started with XR to experienced practitioners looking to collaborate on innovative projects.</p>
                        <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed"><span className="text-purple">Anyone is welcome to drop by</span>, regardless of experience, as we bring the XR revolution to GT.</p>
                    </div>
                </div>
                <div className="mt-16 flex gap-8 items-center flex-col-reverse lg:flex-row">
                    <div className="w-full text-center px-8 flex flex-col justify-center items-center max-w-xl">
                        <h3 className="text-purple font-bold text-xl sm:text-3xl mb-4 sm:mb-12">Free resources <span className="text-zinc-300 font-normal">to get started with the XR space.</span></h3>
                        <ul className="text-left list-disc pl-10 text-zinc-400 flex flex-col gap-2">
                            <li className="text-lg sm:text-xl leading-relaxed">Networking with industry professionals</li>
                            <li className="text-lg sm:text-xl leading-relaxed">The  <span className="text-purple">latest VR hardware</span> including Vision Pros and Meta Quests</li>
                            <li className="text-lg sm:text-xl leading-relaxed">Club leadership, collaboration, and project pitch opportunities</li>
                            <li className="text-lg sm:text-xl leading-relaxed">A  <span className="text-purple">collaborative, welcoming atmosphere</span> for anyone interested in XR</li>
                            <li className="text-lg sm:text-xl leading-relaxed">And so much more!</li>
                        </ul>
                    </div>
                    <img src={Club2.src} alt="Stock Image 2" className="w-full lg:w-[60%] max-w-7xl h-auto rounded-[3rem] transform transition duration-300 hover:scale-[102%]" />
                </div>

                <p className="text-2xl sm:text-3xl lg:text-4xl text-zinc-500 mb-4 mt-16 sm:mt-24 lg:mt-32">03.</p>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl text-zinc-400 font-bold max-w-5xl">We work with <span className="text-purple">experts in the industry</span> to provide real-world opportunities and skills.</h2>
                <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-4 sm:gap-12 md:gap-16 mt-8 sm:mt-12 lg:mt-16">
                    <div className="w-full lg:max-w-xl flex flex-col items-center gap-8 bg-zinc-900 p-8 sm:p-12 rounded-3xl lg:mt-6">
                        <p className="text-xl sm:text-2xl font-semibold sm:font-bold text-zinc-200">Are you a sponsor looking to <span className="text-purple">advance XR culture</span> on Georgia Tech's campus?</p>
                        <HoverBorderGradient
                            containerClassName="rounded-full"
                            as="button"
                            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 text-lg sm:text-xl"
                        >
                            <a href="mailto:contact@gtxr.club">Contact Us</a>
                        </HoverBorderGradient>
                        <p className="text-zinc-400 text-lg mt-0 sm:mt-8 font-light">We rely on sponsors in the industry to run ImmerseGT. Their generous support allows us to <span className="text-purple">open participation to any student</span> interested in XR, for free. </p>
                    </div>
                    <PinContainer
                        title="immersegt.io"
                        href="https://immersegt.io"
                    >
                        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] sm:w-[30rem] h-fit">
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