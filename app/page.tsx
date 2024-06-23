import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/Navbar";
import { navItems } from "@/data";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div>
        <FloatingNav navItems={navItems}/>
        <Hero/>
      </div>
    </main>
  );
}
