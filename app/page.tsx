import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";

export default function Home() {
  return ( //tailwind works, so does its extension
    <main>
      <div className="min-h-screen flex flex-col bg-black">
        <Hero/>
        <AboutUs/>
        <Footer />
      </div>
    </main>
  );
}
