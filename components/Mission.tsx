import { ThreeDCardDemo } from "./ThreeDCard";

export default function Mission() {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-black py-16">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="md:w-1/2">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">We represent Georgia Tech's XR Community</h1>
                    <p className="text-lg mb-6">
                        Our mission is to inspire and empower individuals through immersive XR experiences.
                        We strive to push the boundaries of technology and creativity to create impactful and memorable experiences.
                    </p>
                    <p className="text-base text-gray-400">
                    Join us and get to know GTXR, Georgia Tech's Portal to Extended Reality, the university's premier VR/AR club.
                     Take part in a hands-on workshop, where you'll learn the basics of XR development
                      and see how you can be part of the growing XR community at Georgia Tech.
                       Additionally, you'll be able to try out the demos of our cutting-edge projects and experience
                        the latest XR technology, including Apple Vision Pro and Meta Quest 3.
                         Don't miss out on the opportunity to get involved with the XR community on campus! →
                    </p>
                </div>
                <div className="md:w-1/2">
                    <ThreeDCardDemo />
                </div>
            </div>
        </div>
    );
}