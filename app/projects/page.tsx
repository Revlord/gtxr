import { AppleCardsCarouselDemo } from "@/components/AppleCards";
import Footer from "@/components/HomepageFooter";
import ProjHero from "@/components/ProjHero";
import Navbar from "@/components/ui/Navbar";

// /app/about/page.tsx
export default function Projects() {
    return (
      <main>
        <div className="min-h-screen flex flex-col bg-black">
          <Navbar/>
          <ProjHero/>
          <AppleCardsCarouselDemo/>
          <Footer/>
        </div>
      </main>
    );
  }