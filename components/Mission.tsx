import { ThreeDCardDemo } from "./ThreeDCard";

export default function Mission() {
    return (
        <div className='relative w-full min-h-[calc(100vh)] h-fit flex bg-black mt-4'>
            <div className="h-auto sponsor-gradient flex flex-col lg:flex-row m-12 items-center justify-center relative w-full rounded-[3rem]">
                <div className="w-full lg:w-1/2 space-y-6 lg:pr-4 p-12">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r to-gray-200 from-gray-600 bg-clip-text text-transparent">
                        We represent Georgia Tech's XR Community
                    </h1>
                    <p className="text-base sm:text-lg">
                        We inspire and empower individuals through immersive XR experiences.
                        We strive to push the boundaries of technology and creativity to create impactful and memorable experiences.
                    </p>
                    <p className="text-sm sm:text-base text-gray-400">
                        Join us and get to know GTXR, Georgia Tech's Portal to Extended Reality, the university's premier VR/AR club.
                        Take part in a hands-on workshop, where you'll learn the basics of XR development
                        and see how you can be part of the growing XR community at Georgia Tech.
                        Additionally, you'll be able to try out the demos of our cutting-edge projects and experience
                        the latest XR technology, including Apple Vision Pro and Meta Quest 3.
                        Don't miss out on the opportunity to get involved with the XR community on campus →
                    </p>
                </div>
                <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:pl-4">
                    <ThreeDCardDemo />
                </div>
            </div>
        </div>
    );
}


/*
Previous container
        <div className="relative flex items-center justify-center bg-black sm:my-auto py-24 sm:py-32 md:py-32">
            <HeroHighlight>
                <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="w-full lg:w-1/2 space-y-6">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-200 to-gray-600 bg-clip-text text-transparent">
                            We represent Georgia Tech's XR Community
                        </h1>
                        <p className="text-base sm:text-lg">
                            We inspire and empower individuals through immersive XR experiences.
                            We strive to push the boundaries of technology and creativity to create impactful and memorable experiences.
                        </p>
                        <p className="text-sm sm:text-base text-gray-400">
                            Join us and get to know GTXR, Georgia Tech's Portal to Extended Reality, the university's premier VR/AR club.
                            Take part in a hands-on workshop, where you'll learn the basics of XR development
                            and see how you can be part of the growing XR community at Georgia Tech.
                            Additionally, you'll be able to try out the demos of our cutting-edge projects and experience
                            the latest XR technology, including Apple Vision Pro and Meta Quest 3.
                            Don't miss out on the opportunity to get involved with the XR community on campus →
                        </p>
                    </div>
                    <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
                        <ThreeDCardDemo />
                    </div>
                </div>
            </HeroHighlight>
        </div>
*/