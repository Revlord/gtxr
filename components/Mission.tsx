import { ThreeDCardDemo } from "./ThreeDCard";

export default function Mission() {
    return (
        <div className="relative h-screen flex items-center justify-center bg-black">

            <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg">
                Our mission is to inspire and empower individuals through immersive XR experiences. We strive to push the boundaries of technology and creativity to create impactful and memorable experiences.
            </p>
            </div>

            <ThreeDCardDemo/>
        </div>
    );
}