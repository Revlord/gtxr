import EventsBody from "@/components/EventsBody";
import EventsHeaderHero from "@/components/EventsHeroHeader";

export default function Events() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <EventsHeaderHero />
      <EventsBody />
    </div>
  );
}
