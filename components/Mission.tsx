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
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium mollitia repudiandae atque, sunt fugiat quis commodi.
                        Cupiditate non eius natus velit nisi ducimus, asperiores dignissimos doloribus, quo dolorem ad maiores!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem placeat expedita commodi deserunt officiis possimus est,
                        eius ab sit iure labore id fugit temporibus autem amet. Doloremque omnis eos deserunt!
                    </p>
                </div>
                <div className="md:w-1/2">
                    <ThreeDCardDemo />
                </div>
            </div>
        </div>
    );
}