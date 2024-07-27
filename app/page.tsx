import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
  return ( //tailwind works, so does its extension
    <main>
      <div className="min-h-screen flex flex-col bg-black">
        <Hero/>
        <p className="mx-auto my-36">More stuff down here</p>
      </div>
    </main>
  );
}
