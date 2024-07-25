import ProjHero from "@/components/ProjHero";
import Navbar from "@/components/ui/Navbar";

// /app/about/page.tsx
export default function Projects() {
    return (
      <main>
        <div className="min-h-screen flex flex-col">
          <Navbar/>
          <ProjHero/>
        </div>
      </main>
    );
  }