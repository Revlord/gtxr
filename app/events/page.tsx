import { TracingBeamDemo } from "@/components/EventsHero";
import Navbar from "@/components/ui/Navbar";

// /app/about/page.tsx
export default function Events() {
    return (
      <main>
        <div className="min-h-screen flex flex-col">
          <Navbar/>
          <TracingBeamDemo/>
        </div>
      </main>
    );
  }