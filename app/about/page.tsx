import Exec from "@/components/Exec";
import Mission from "@/components/Mission";
import Navbar from "@/components/ui/Navbar";
import WaveTransition from "@/components/WaveTransition";

// /app/about/page.tsx
export default function About() {
    return (
        <main>
        <div className="min-h-screen flex flex-col">
          <Navbar/>
          <Mission/>
          <WaveTransition/>
          <Exec/>
        </div>
      </main>
    );
}