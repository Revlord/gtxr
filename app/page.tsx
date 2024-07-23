import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
  return ( //tailwind works, so does its extension
    <main>
      <div className="min-h-screen flex flex-col">
        <Navbar/>
        <Hero/>
      </div>
    </main>
  );
}
