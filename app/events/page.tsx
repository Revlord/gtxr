import EventsHeaderHero from "@/components/EventsHeroHeader";
import Navbar from "@/components/ui/Navbar";

// /app/about/page.tsx
export default function Events() {
    return (
      <main>
        <div className="min-h-screen flex flex-col bg-black">
          <Navbar/>
          <EventsHeaderHero/>
        </div>
      </main>
    );
  }