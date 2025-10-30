"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from "@/utils/handleBasePath";
import XrWindowLink from "./ui/xr-window-link";

type Event = {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  status: "Upcoming" | "Past";
};

const xr = (v: Record<string, string | number>) => v as React.CSSProperties;

// --- pinch-to-zoom image (Pointer Events) ---
const XRZoomImage: React.FC<{ src: string; alt: string; w?: number; h?: number }> = ({
  src,
  alt,
  w = 1200,
  h = 720,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const baseDist = useRef<number | null>(null);
  const [scale, setScale] = useState(1);

  const setTransform = (s: number) => {
    if (ref.current) ref.current.style.transform = `translateZ(40px) scale(${s})`;
  };

  const down = (e: React.PointerEvent) => {
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
  };

  const move = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values());
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (baseDist.current == null) baseDist.current = dist;
      const next = Math.min(2, Math.max(1, dist / baseDist.current));
      setScale(next);
      setTransform(next);
    }
  };

  const upOrCancel = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) {
      baseDist.current = null;
      setScale(1);
      setTransform(1);
    }
  };

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl mx-auto"
      style={xr({
        "--xr-background-material": "regular",
        "--xr-back": 30,
        width: w,
        height: h,
        touchAction: "none",
        cursor: "pointer",
        transition: "transform .15s ease",
      })}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={upOrCancel}
      onPointerCancel={upOrCancel}
    >
      <Image src={src} alt={alt} fill className="object-contain select-none" />
    </div>
  );
};

const events: Event[] = [
  {
    id: 1,
    title: "Week of Welcome Event 2024",
    date: "August 13, 2024",
    description: "Join us for an exciting showcase of what this is all about and what we want to plan on providing and doing with members throughout the school year! Slide Deck: https://docs.google.com/file/d/120hN-dPiMV9QdhaYmcJKT6EGvkO38lkM/edit?usp=docslist_api&filetype=mspresentation",
    imageUrl: getAssetPath("/club13.jpg"),
    status: 'Past'
  },
  {
    id: 2,
    title: "Project Pitch",
    date: "September 8, 2024",
    description: "The ultimate showdown of THE best projects in XR. The top projects will be chosen to commence for Fall 2024-Spring 2025. Applications close September 8th, join our discord and let your creativity take over!",
    imageUrl: getAssetPath("/club3.jpg"),
    status: 'Past'
  },
  {
    id: 3,
    title: "ImmerseGT 2025",
    date: "April 5-7, 2025",
    description: "Participate in ImmerseGT, an innovative XR hackathon hosted by GTXR, on Georgia Tech's campus from April 4th-6th. Compete for your share of prizes as you build and test XR applications using state-of-the-art headsets.",
    imageUrl: getAssetPath("/immersegt.png"),
    status: 'Past'
  },
  {
    id: 4,
    title: "ICXR Meetup",
    date: "September 15, 2024",
    description: "Join us for an exciting evening of VR gaming and networking with the INTERCOLLEGIATE XR organization that allow developers from all different schools and job positions to work together a foster an even larger connection all around the world!",
    imageUrl: getAssetPath("/club7.jpg"),
    status: 'Past'
  },
  {
    id: 5,
    title: "Speaker Event (Meta)",
    date: "April 4, 2023",
    description: "Join us for an exciting evening of networking alongside Meta recruiters and see the opprotunities available for Extended Reality developers!",
    imageUrl: getAssetPath("/club9.png"),
    status: 'Past'
  },
  {
    id: 6,
    title: "Speaker Event (Start-ups)",
    date: "April 5, 2023",
    description: "Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!Join us for an exciting evening of VR gaming and networking!",
    imageUrl: getAssetPath("/club8.png"),
    status: 'Past'
  },
  {
    id: 7,
    title: "GT LEAD Info Session",
    date: "March 31, 2024",
    description: "A HUGE paid VR Development opportunity open to undergrads in collaboration with GT Leadership Education and Development. Includes development work in Virtual and Augmented Reality experiences for specific classes around campus and even some school wide programs!",
    imageUrl: getAssetPath("/club12.png"),
    status: 'Past'
  },
  {
    id: 8,
    title: "GTXR Club Fair",
    date: "August 27, 2024",
    description: "On the Skiles Walkway from 11am until 1pm. GTXR will have a table to showcase the organization, allowing students to learn more about their activities and possibly join. Includes some demoes for Virtual Reality headsets during the club expo",
    imageUrl: getAssetPath("/clubExpoFallPhoto.png"),
    status: 'Past'
  },
  {
    id: 9,
    title: "GTXR Kickoff Event",
    date: "September 1, 2024",
    description: "Join us for an exciting kickoff event as we launch the Extended Reality College Club! This is your chance to dive into the world of VR and AR, connect with fellow enthusiasts, and get to know our club's vision and activities alongside some amazing headset demoes!",
    imageUrl: getAssetPath("/kickoffFall2024.jpg"),
    status: 'Past'
  },
  {
    id: 10,
    title: "Project Showcase",
    date: "September 20, 2024",
    description: "Explore groundbreaking XR projects at our club's showcase, featuring top innovations selected from our recent Project Pitch Competition. See which projects you may want to get involved with over this semester!",
    imageUrl: getAssetPath("/projectShowcase.jpg"),
    status: 'Past'
  },
  {
    id: 11,
    title: "Annual Kickoff Event | 📍West Arch 258 ",
    date: "August 27, 2025",
    description: "💪Our exec team has been hard at work this summer planning an incredible semester for you guys. From industry speaker events, to cutting-edge club projects, this will be hands-down the most action-packed year we've ever had. 🥽And it's never been a better time to get involved in XR! Rumors are buzzing around every major tech company—Meta, Google, and Snapchat are all about to release new AR Glasses, and Valve is on the verge of announcing the long-awaited Deckard headset. 🍕Come join us, grab some free food, and connect with students from across campus who are passionate about XR.",
    imageUrl: getAssetPath("/projectShowcase.jpg"),
    status: 'Upcoming'
  },

]

const EventCard = ({ event, onOpen }: { event: Event; onOpen: () => void }) => (
  <button
    onClick={onOpen}
    className="bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:scale-105 duration-300 text-left"
    style={xr({
      "--xr-background-material": "translucent",
      "--xr-back": 25,
      cursor: "pointer",
    })}
    aria-label={`Open ${event.title}`}
  >
    <div className="relative h-80">
      <Image src={event.imageUrl} alt={event.title} fill className="object-cover" />
    </div>
    <div className="p-6">
      <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
      <p className="text-indigo-400 mb-4">{event.date}</p>
      <p className="text-gray-400 line-clamp-3">{event.description}</p>
    </div>
  </button>
);

const EventsBody = () => {
  const [active, setActive] = useState<Event | null>(null);

  return (
    <div className="container mx-auto px-4 py-16">
      {/* upcoming */}
      <div className="mb-16">
        <h2
          className="text-4xl font-bold text-white mb-8 __enableXr__"
          style={xr({ "--xr-back": 40, "--xr-background-material": "thin" })}
        >
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events
            .filter((e) => e.status === "Upcoming")
            .map((e) => (
              <EventCard key={e.id} event={e} onOpen={() => setActive(e)} />
            ))}
        </div>
        {/* spatial action */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/events"
            className="rounded-full px-4 py-2 border border-white/20 text-white hover:bg-white/10"
          >
            View list on this page
          </Link>

          <XrWindowLink
            href="/events/board"
            forceNew
            className="rounded-full px-4 py-2 bg-white/90 text-black font-semibold hover:bg-white"
          >
            Open Spatial Events Wall
          </XrWindowLink>
        </div>
      </div>

      {/* past */}
      <div>
        <h2
          className="text-4xl font-bold text-white mb-8 __enableXr__"
          style={xr({ "--xr-back": 30, "--xr-background-material": "thin" })}
        >
          Past Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events
            .filter((e) => e.status !== "Upcoming")
            .map((e) => (
              <EventCard key={e.id} event={e} onOpen={() => setActive(e)} />
            ))}
        </div>
      </div>

      {/* modal (spatial) */}
      {active && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setActive(null)}
            style={xr({ "--xr-background-material": "translucent", "--xr-back": 5 })}
          />
          <div
            className="relative z-10 max-w-5xl mx-auto my-10 p-6 md:p-10 rounded-3xl bg-gray-900 text-white"
            style={xr({ "--xr-background-material": "thick", "--xr-back": 80 })}
          >
            <div className="flex gap-4 items-start justify-between mb-6">
              <div>
                <p className="text-indigo-300">{active.date}</p>
                <h3 className="text-3xl font-bold">{active.title}</h3>
              </div>
              <button
                onClick={() => setActive(null)}
                className="rounded-full w-9 h-9 bg-white text-black font-bold hover:scale-110 transition"
                style={xr({ "--xr-background-material": "thin", "--xr-back": 15, cursor: "pointer" })}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            {/* Pinch-to-zoom image */}
            <XRZoomImage src={active.imageUrl} alt={active.title} />

            <p className="mt-6 text-gray-300 leading-relaxed">{active.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsBody;
