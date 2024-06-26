import Hero from "@/components/Hero";
import Navbar from "@/components/ui/Navbar";
import { navItems } from "@/data";
import Image from "next/image";

export default function Home() {
  return ( //tailwind works, so does its extension
    <main>
      <div className="min-h-screen flex flex-col">
        <Navbar></Navbar>
        <Hero/>
      </div>
    </main>
  );
}
