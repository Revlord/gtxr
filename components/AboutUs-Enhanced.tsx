"use client";

import AboutUsCard from "./ui/about-us-card";
import Club1 from "@/public/club1_upscayl.png";
import Club2 from "@/public/club2_upscayl.png";
import { PinContainer } from "./ui/3d-pin";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import ImmerseGT from "@/public/immersegt.png";

const AboutUs = () => {
    // Detect if we're in spatial mode (you might want to pass this as a prop)
    const spatialMode = typeof window !== 'undefined' && document.documentElement.classList.contains('is-spatial');
    
    return (
        <div className="relative w-full min-h-[calc(100vh)] h-fit flex bg-black">
            <div className="w-full h-auto flex-grow m-4 my-8 md:m-8 relative flex flex-col items-center text-center py-0 sm:py-16" enable-xr-monitor={true}>
                
                {/* Section 01 - Introduction with spatial background */}
                <div 
                    className="section-intro" 
                    enable-xr={true}
                    style={{
                        position: 'relative',
                        '--xr-background-material': 'translucent',
                        borderRadius: '20px',
                        padding: '2rem',
                        marginBottom: '2rem'
                    }}
                >
                    <p className="text-2xl sm:text-3xl lg:text-4xl text-zinc-500 mb-4">01.</p>
                    <h2 className="text-2xl sm:text-4xl lg:text-5xl text-zinc-400 font-bold max-w-5xl">
                        We are a <span className="text-purple">passionate group of XR enthusiasts</span> committed to advancing XR technology at Georgia Tech and beyond.
                    </h2>
                </div>

                {/* Cards Grid with spatial enhancement */}
                <div className="flex flex-wrap max-w-[1440px] gap-5 w-full mt-8 sm:mt-16 lg:mt-24 justify-center" enable-xr-monitor={true}>
                    <div 
                        className="card-container workshops"
                        enable-xr={true}
                        style={{
                            position: 'relative',
                            '--xr-back': '30',
                            '--xr-background-material': 'thin'
                        }}
                    >
                        <AboutUsCard
                            title="Workshops"
                            content="Seminars to learn about the latest tech, tools, and techniques in XR."
                            variant={0}
                        />
                    </div>
                    
                    <div 
                        className="card-container project-teams"
                        enable-xr={true}
                        style={{
                            position: 'relative',
                            '--xr-back': '50',
                            '--xr-background-material': 'translucent',
                            transform: 'rotateY(-5deg) rotateX(2deg)'
                        }}
                    >
                        <AboutUsCard
                            title="Project Teams"
                            content="Shared projects to apply XR knowledge and skills to real-world problems."
                            variant={1}
                        />
                    </div>
                    
                    <div 
                        className="card-container project-pitches"
                        enable-xr={true}
                        style={{
                            position: 'relative',
                            '--xr-back': '40',
                            '--xr-background-material': 'thick'
                        }}
                    >
                        <AboutUsCard
                            title="Project Pitches"
                            content="Member-driven ideas for collaborative projects to work on with teams."
                            variant={2}
                        />
                    </div>
                    
                    <div 
                        className="card-container social-events"
                        enable-xr={true}
                        style={{
                            position: 'relative',
                            '--xr-back': '35',
                            '--xr-background-material': 'regular',
                            transform: 'rotateY(5deg) rotateX(-2deg)'
                        }}
                    >
                        <AboutUsCard
                            title="Social Events"
                            content="Social events and many networking opportunities to connect and socialize."
                            variant={3}
                        />
                    </div>
                    
                    <div 
                        className="card-container research"
                        enable-xr={true}
                        style={{
                            position: 'relative',
                            '--xr-back': '45',
                            '--xr-background-material': 'translucent',
                            transform: 'translateZ(20px) rotateX(5deg)'
                        }}
                    >
                        <AboutUsCard
                            title="Research"
                            content="We actively engage in conducting XR research under professors"
                            variant={4}
                        />
                    </div>
                    
                    <div 
                        className="card-container hackathons"
                        enable-xr={true}
                        style={{
                            position: 'relative',
                            '--xr-back': '60',
                            '--xr-background-material': 'thick',
                            transformOrigin: 'center',
                            transform: 'translateZ(30px) rotateY(-3deg) scale3d(1.02, 1.02, 1)'
                        }}
                    >
                        <AboutUsCard
                            title="Hackathons"
                            content="ImmerseGT, our annual XR hackathon held in the spring semester."
                            variant={5}
                        />
                    </div>
                </div>

                {/* Section 02 - Collaboration */}
                <div 
                    className="section-collaboration" 
                    enable-xr={true}
                    style={{
                        position: 'relative',
                        '--xr-background-material': 'translucent',
                        borderRadius: '30px',
                        padding: '2rem',
                        marginTop: '6rem',
                        '--xr-back': '20'
                    }}
                >
                    <p className="text-2xl sm:text-3xl lg:text-4xl text-zinc-500 mb-4">02.</p>
                    <h2 className="text-2xl sm:text-4xl lg:text-5xl text-zinc-400 font-bold max-w-5xl">
                        We <span className="text-purple">collaborate with each other</span> to advance our knowledge of the XR space together.
                    </h2>
                </div>

                {/* Image and content sections with spatial layouts */}
                <div className="mt-12 sm:mt-16 flex gap-8 flex-col lg:flex-row items-center px-4" enable-xr-monitor={true}>
                    <div 
                        className="image-container-1 flex-1"
                        enable-xr={true}
                        style={{
                            position: 'relative',
                            '--xr-back': '40',
                            '--xr-background-material': 'transparent',
                            borderRadius: '3rem',
                            transform: 'rotateY(-8deg) rotateX(3deg)',
                            transformOrigin: 'center left'
                        }}
                    >
                        <img 
                            src={Club1.src} 
                            alt="Stock Image 1" 
                            className="w-full max-w-3xl h-auto rounded-[3rem] transform transition duration-300 hover:scale-[102%]"
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                    
                    <div 
                        className="content-panel-1 flex-1"
                        enable-xr={true}
                        style={{
                            position: 'relative',
                            '--xr-back': '25',
                            '--xr-background-material': 'thick',
                            borderRadius: '20px',
                            padding: '2rem',
                            transform: 'translateZ(15px)'
                        }}
                    >
                        <div className="w-full text-center px-4 sm:px-8 flex flex-col justify-center items-center max-w-xl mx-auto">
                            <h3 
                                className="text-purple font-bold text-xl sm:text-3xl mb-6"
                                enable-xr={true}
                                style={{
                                    position: 'relative',
                                    '--xr-back': '10',
                                    '--xr-background-material': 'transparent'
                                }}
                            >
                                Open to All, <span className="text-zinc-300 font-normal">Beginners and Experts Alike.</span>
                            </h3>
                            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed mb-4">
                                GTXR embraces a <span className="text-purple">growth and learning culture for everyone</span>, from beginners just getting started with XR to experienced practitioners looking to collaborate on innovative projects.
                            </p>
                            <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed">
                                <span className="text-purple">Anyone is welcome to drop by</span>, regardless of experience, as we bring the XR revolution to GT.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Second image/content section */}
                <div className="mt-16 flex gap-8 items-center flex-col-reverse lg:flex-row px-4" enable-xr-monitor={true}>
                    <div 
                        className="content-panel-2 flex-1"
                        enable-xr={true}
                        style={{
                            position: 'relative',
                            '--xr-back': '30',
                            '--xr-background-material': 'regular',
                            borderRadius: '25px',
                            padding: '2rem',
                            transform: 'translateZ(20px) rotateY(5deg)',
                            transformOrigin: 'center right'
                        }}
                    >
                        <div className="w-full text-center px-4 sm:px-8 flex flex-col justify-center items-center max-w-xl mx-auto">
                            <h3 
                                className="text-purple font-bold text-xl sm:text-3xl mb-6"
                                enable-xr={true}
                                style={{
                                    position: 'relative',
                                    '--xr-back': '15',
                                    '--xr-background-material': 'transparent'
                                }}
                            >
                                Free resources <span className="text-zinc-300 font-normal">to get started with the XR space.</span>
                            </h3>
                            <ul 
                                className="text-left list-disc pl-6 text-zinc-400 flex flex-col gap-3"
                                enable-xr={true}
                                style={{
                                    position: 'relative',
                                    '--xr-back': '5',
                                    '--xr-background-material': 'thin',
                                    borderRadius: '10px',
                                    padding: '1.5rem'
                                }}
                            >
                                <li className="text-lg sm:text-xl leading-relaxed">Networking with industry professionals</li>
                                <li className="text-lg sm:text-xl leading-relaxed">The <span className="text-purple">latest VR hardware</span> including Vision Pros and Meta Quests</li>
                                <li className="text-lg sm:text-xl leading-relaxed">Club leadership, collaboration, and project pitch opportunities</li>
                                <li className="text-lg sm:text-xl leading-relaxed">A <span className="text-purple">collaborative, welcoming atmosphere</span> for anyone interested in XR</li>
                                <li className="text-lg sm:text-xl leading-relaxed">And so much more!</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div 
                        className="image-container-2 flex-1"
                        enable-xr={true}
                        style={{
                            position: 'relative',
                            '--xr-back': '50',
                            '--xr-background-material': 'transparent',
                            borderRadius: '3rem',
                            transform: 'rotateY(8deg) rotateX(-3deg)',
                            transformOrigin: 'center right'
                        }}
                    >
                        <img 
                            src={Club2.src} 
                            alt="Stock Image 2" 
                            className="w-full max-w-3xl h-auto rounded-[3rem] transform transition duration-300 hover:scale-[102%]"
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </div>

                {/* Section 03 - Industry Collaboration */}
                <div 
                    className="section-industry" 
                    enable-xr={true}
                    style={{
                        position: 'relative',
                        '--xr-background-material': 'translucent',
                        borderRadius: '30px',
                        padding: '2rem',
                        marginTop: '6rem',
                        '--xr-back': '20'
                    }}
                >
                    <p className="text-2xl sm:text-3xl lg:text-4xl text-zinc-500 mb-4">03.</p>
                    <h2 className="text-2xl sm:text-4xl lg:text-5xl text-zinc-400 font-bold max-w-5xl">
                        We work with <span className="text-purple">experts in the industry</span> to provide real-world opportunities and skills.
                    </h2>
                </div>

                {/* Sponsor and ImmerseGT section with spatial arrangement */}
                <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12 mt-12 px-4" enable-xr-monitor={true}>
                    <div 
                        className="sponsor-panel flex-1 max-w-2xl"
                        enable-xr={true}
                        style={{
                            position: 'relative',
                            '--xr-back': '40',
                            '--xr-background-material': 'thick',
                            borderRadius: '25px',
                            padding: '1rem',
                            transform: 'translateZ(25px) rotateY(-10deg)',
                            transformOrigin: 'center left'
                        }}
                    >
                        <div className="w-full flex flex-col items-center gap-6 bg-zinc-900 p-6 sm:p-8 rounded-3xl">
                            <p 
                                className="text-xl sm:text-2xl font-semibold text-zinc-200 text-center"
                                enable-xr={true}
                                style={{
                                    position: 'relative',
                                    '--xr-back': '10',
                                    '--xr-background-material': 'transparent'
                                }}
                            >
                                Are you a sponsor looking to <span className="text-purple">advance XR culture</span> on Georgia Tech's campus?
                            </p>
                            
                            <div 
                                enable-xr={true}
                                style={{
                                    position: 'relative',
                                    '--xr-back': '15',
                                    '--xr-background-material': 'translucent',
                                    borderRadius: '50px',
                                    padding: '0.5rem',
                                    cursor: 'pointer'
                                }}
                            >
                                <HoverBorderGradient
                                    containerClassName="rounded-full"
                                    as="button"
                                    className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 text-lg sm:text-xl"
                                >
                                    <a href="mailto:contact@gtxr.club">Contact Us</a>
                                </HoverBorderGradient>
                            </div>
                            
                            <p className="text-zinc-400 text-lg font-light text-center">
                                We rely on sponsors in the industry to run ImmerseGT. Their generous support allows us to <span className="text-purple">open participation to any student</span> interested in XR, for free.
                            </p>
                        </div>
                    </div>
                    
                    <div 
                        className="immersegt-container flex-1 max-w-lg"
                        enable-xr={true}
                        style={{
                            position: 'relative',
                            '--xr-back': '60',
                            '--xr-background-material': 'transparent',
                            transform: 'translateZ(40px) rotateY(15deg) rotateX(-5deg)',
                            transformOrigin: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <PinContainer
                            title="immersegt.org"
                            href="https://immersegt.org"
                        >
                            <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] sm:w-[25rem] h-fit">
                                <h3 
                                    className="!pb-2 !m-0 font-bold text-2xl text-slate-100"
                                    enable-xr={true}
                                    style={{
                                        position: 'relative',
                                        '--xr-back': '10',
                                        '--xr-background-material': 'thin',
                                        borderRadius: '10px',
                                        padding: '0.5rem'
                                    }}
                                >
                                    ImmerseGT
                                </h3>
                                <div className="text-base !m-0 !p-0 font-normal">
                                    <span className="text-slate-500">
                                        The premier XR hackathon held annually at Georgia Tech.
                                    </span>
                                </div>
                                <img 
                                    src={ImmerseGT.src} 
                                    alt="ImmerseGT" 
                                    className="w-full h-auto rounded-lg mt-4"
                                />
                            </div>
                        </PinContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;