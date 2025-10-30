// app/(immersive)/events/board/page.tsx
"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import SafeLink from "@/components/ui/safe-link";
import { getAssetPath } from "@/utils/handleBasePath";

type Event = {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  status: "Upcoming" | "Past";
};

const events: Event[] = [
  { id: 1,  title:"Week of Welcome Event 2024", date:"August 13, 2024", imageUrl:getAssetPath("/club13.jpg"), status:"Past",
    description:"Join us for an exciting showcase of what this is all about..." },
  { id: 2,  title:"Project Pitch", date:"September 8, 2024", imageUrl:getAssetPath("/club3.jpg"), status:"Past",
    description:"The ultimate showdown of THE best projects..." },
  { id: 3,  title:"ImmerseGT 2025", date:"April 5-7, 2025", imageUrl:getAssetPath("/immersegt.png"), status:"Past",
    description:"Participate in ImmerseGT..." },
  { id: 11, title:"Annual Kickoff Event | 📍West Arch 258", date:"August 27, 2025", imageUrl:getAssetPath("/projectShowcase.jpg"), status:"Upcoming",
    description:"Our exec team has been hard at work this summer..." },
  // ...keep your other rows if you want
];

export default function EventsBoard() {
  const [detail, setDetail] = useState<Event | null>(null);
  const [filter, setFilter] = useState<"All"|"Upcoming"|"Past">("All");

  const filtered = useMemo(
    () => events.filter(e => filter === "All" ? true : e.status === filter),
    [filter]
  );

  return (
    <main className="min-h-screen bg-black">
      <SafeLink
        href="/"
        className="fixed left-5 top-5 z-[100] rounded-full px-3 py-1 bg-white/90 text-black shadow-md"
      >
        ⟵ GTXR Home
      </SafeLink>

      <div className="max-w-6xl mx-auto px-4 pt-14 pb-12">
        <h1 className="text-center text-3xl md:text-5xl font-bold text-zinc-100">Spatial Events Wall</h1>
        <p className="text-center text-zinc-400 mt-2">Tap a card for details</p>

        <div className="flex flex-wrap items-center justify-center gap-2 my-6">
          {(["All","Upcoming","Past"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1.5 text-sm ${filter===f ? "bg-white/90 text-black" : "bg-white/10 text-white border border-white/20 hover:bg-white/15"}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((e) => (
            <button
              key={e.id}
              onClick={() => setDetail(e)}
              className="rounded-2xl overflow-hidden bg-zinc-900 hover:bg-zinc-800 transition-colors text-left shadow-lg focus:outline-none focus:ring-2 focus:ring-white/30"
              aria-label={`${e.title} details`}
            >
              <div className="relative h-44 w-full">
                <Image src={e.imageUrl} alt={e.title} fill className="object-cover" />
                {e.status === "Upcoming" && (
                  <div className="absolute top-2 right-2 text-[11px] font-semibold bg-emerald-300/90 text-black px-2 py-1 rounded-full">
                    Upcoming
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-xs text-zinc-400">{e.date}</p>
                <h3 className="text-lg font-semibold text-white mt-1">{e.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {detail && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/80" onClick={() => setDetail(null)} />
          <div className="relative max-w-3xl mx-auto my-12 p-5 md:p-7 rounded-3xl bg-zinc-900 text-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-sm text-zinc-400">{detail.date}</p>
                <h3 className="text-2xl md:text-3xl font-semibold">{detail.title}</h3>
              </div>
              <button
                onClick={() => setDetail(null)}
                className="rounded-full w-9 h-9 bg-white text-black font-bold hover:scale-110 transition"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="relative h-[340px] rounded-2xl overflow-hidden">
              <Image src={detail.imageUrl} alt={detail.title} fill className="object-cover" />
            </div>

            <p className="mt-5 text-zinc-300">{detail.description}</p>
          </div>
        </div>
      )}
    </main>
  );
}
