// app/events/board/page.tsx
"use client";

import Image from "next/image";
import React, { useMemo, useRef, useState } from "react";
import { getAssetPath } from "@/utils/handleBasePath";

type Event = {
  id: number;
  title: string;
  date: string;        // loose formats OK
  description: string;
  imageUrl: string;
  status: "Upcoming" | "Past";
};

const xr = (v: Record<string, string | number>) => v as React.CSSProperties;

/** ---------- Data (copied from EventsBody for now) ---------- */
const events: Event[] = [
  { id: 1,  title:"Week of Welcome Event 2024", date:"August 13, 2024", imageUrl:getAssetPath("/club13.jpg"), status:"Past",
    description:"Join us for an exciting showcase of what this is all about..." },
  { id: 2,  title:"Project Pitch", date:"September 8, 2024", imageUrl:getAssetPath("/club3.jpg"), status:"Past",
    description:"The ultimate showdown of THE best projects in XR..." },
  { id: 3,  title:"ImmerseGT 2025", date:"April 5-7, 2025", imageUrl:getAssetPath("/immersegt.png"), status:"Past",
    description:"Participate in ImmerseGT, an innovative XR hackathon..." },
  { id: 4,  title:"ICXR Meetup", date:"September 15, 2024", imageUrl:getAssetPath("/club7.jpg"), status:"Past",
    description:"Join us for an exciting evening of VR gaming and networking..." },
  { id: 5,  title:"Speaker Event (Meta)", date:"April 4, 2023", imageUrl:getAssetPath("/club9.png"), status:"Past",
    description:"Join us for an exciting evening of networking alongside Meta..." },
  { id: 6,  title:"Speaker Event (Start-ups)", date:"April 5, 2023", imageUrl:getAssetPath("/club8.png"), status:"Past",
    description:"Join us for an exciting evening of VR gaming and networking..." },
  { id: 7,  title:"GT LEAD Info Session", date:"March 31, 2024", imageUrl:getAssetPath("/club12.png"), status:"Past",
    description:"A HUGE paid VR Development opportunity..." },
  { id: 8,  title:"GTXR Club Fair", date:"August 27, 2024", imageUrl:getAssetPath("/clubExpoFallPhoto.png"), status:"Past",
    description:"On the Skiles Walkway from 11am until 1pm..." },
  { id: 9,  title:"GTXR Kickoff Event", date:"September 1, 2024", imageUrl:getAssetPath("/kickoffFall2024.jpg"), status:"Past",
    description:"Join us for an exciting kickoff event as we launch..." },
  { id:10,  title:"Project Showcase", date:"September 20, 2024", imageUrl:getAssetPath("/projectShowcase.jpg"), status:"Past",
    description:"Explore groundbreaking XR projects at our club's showcase..." },
  { id:11,  title:"Annual Kickoff Event | 📍West Arch 258", date:"August 27, 2025", imageUrl:getAssetPath("/projectShowcase.jpg"), status:"Upcoming",
    description:"Our exec team has been hard at work this summer..." },
];

/** ---------- Helpers ---------- */
const CARD_W = 360;
const CARD_H = 240;
const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));

function parseDateLoose(s: string): number {
  // Take the first day if a range appears (e.g., "Apr 5-7, 2025")
  const base = s.replace(/(\d+)\s*-\s*\d+\,/, "$1,");
  const d = new Date(base);
  return isNaN(d.getTime()) ? Date.now() : d.getTime();
}

function toICS(e: Event) {
  // basic ICS download (start = parsed date, 1hr dummy duration)
  const start = new Date(parseDateLoose(e.date));
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const dt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//GTXR//Events//EN",
    "BEGIN:VEVENT",
    `UID:${e.id}@gtxr`,
    `DTSTAMP:${dt(new Date())}`,
    `DTSTART:${dt(start)}`,
    `DTEND:${dt(end)}`,
    `SUMMARY:${e.title.replace(/\n/g, " ")}`,
    `DESCRIPTION:${e.description.replace(/\n/g, " ")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return "data:text/calendar;charset=utf8," + encodeURIComponent(ics);
}

/** ---------- Board Component ---------- */
export default function EventsBoard() {
  // canvas pan/zoom
  const surfaceRef = useRef<HTMLDivElement>(null);
  const pan = useRef<{ panning: boolean; sx: number; sy: number; ox: number; oy: number }>({
    panning: false, sx: 0, sy: 0, ox: 0, oy: 0,
  });
  const [view, setView] = useState({ x: 0, y: 0, scale: 1 });

  // per card positions
  const [pos, setPos] = useState<Record<number, { x: number; y: number }>>(() => {
    const cols = 3, gap = 28, left = 28, top = 28;
    const p: Record<number, { x: number; y: number }> = {};
    events.forEach((ev, i) => {
      const c = i % cols, r = Math.floor(i / cols);
      p[ev.id] = { x: left + c * (CARD_W + gap), y: top + r * (CARD_H + gap) };
    });
    return p;
  });
  const dragging = useRef<null | { id: number; dx: number; dy: number }>(null);
  const [active, setActive] = useState<number | null>(null);
  const [mode, setMode] = useState<"grid" | "timeline">("grid");
  const [filter, setFilter] = useState<"All" | "Upcoming" | "Past">("All");

  // layout switcher: timeline lays cards along X by date
  const timelineX = useMemo(() => {
    const sorted = [...events].sort((a, b) => parseDateLoose(a.date) - parseDateLoose(b.date));
    const min = parseDateLoose(sorted[0].date);
    const max = parseDateLoose(sorted[sorted.length - 1].date);
    return new Map<number, number>(
      sorted.map((e) => [
        e.id,
        ( (parseDateLoose(e.date) - min) / (max - min || 1) ) * 1200 + 24,
      ])
    );
  }, []);

  const applyLayout = (next: "grid" | "timeline") => {
    setMode(next);
    setPos((prev) => {
      const p: Record<number, { x: number; y: number }> = {};
      if (next === "grid") {
        const cols = 3, gap = 28, left = 28, top = 28;
        events.forEach((ev, i) => {
          const c = i % cols, r = Math.floor(i / cols);
          p[ev.id] = { x: left + c * (CARD_W + gap), y: top + r * (CARD_H + gap) };
        });
      } else {
        // Timeline: march along X; stack by status
        events.forEach((ev, i) => {
          const x = (timelineX.get(ev.id) ?? i * (CARD_W + 24));
          const y = ev.status === "Upcoming" ? 40 : 340 + (i % 2) * (CARD_H + 24);
          p[ev.id] = { x, y };
        });
      }
      return p;
    });
  };

  /** ---- Board pan & zoom ---- */
  const onSurfaceDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    pan.current = { panning: true, sx: e.clientX, sy: e.clientY, ox: view.x, oy: view.y };
  };
  const onSurfaceMove = (e: React.PointerEvent) => {
    if (!pan.current.panning) return;
    const dx = e.clientX - pan.current.sx;
    const dy = e.clientY - pan.current.sy;
    setView((v) => ({ ...v, x: pan.current.ox + dx, y: pan.current.oy + dy }));
  };
  const onSurfaceUp = (e: React.PointerEvent) => {
    (e.currentTarget as Element).releasePointerCapture(e.pointerId);
    pan.current.panning = false;
  };
  const onWheel = (e: React.WheelEvent) => {
    // ctrl/trackpad pinch -> zoom
    if (!e.ctrlKey) return;
    e.preventDefault();
    const k = Math.exp(-e.deltaY * 0.0015);
    setView((v) => ({ ...v, scale: clamp(v.scale * k, 0.6, 1.8) }));
  };

  /** ---- Card drag ---- */
  const startCardDrag = (id: number) => (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    const { x, y } = pos[id];
    const rect = surfaceRef.current?.getBoundingClientRect();
    const sx = (rect ? e.clientX - rect.left : e.clientX) - (x + view.x);
    const sy = (rect ? e.clientY - rect.top  : e.clientY) - (y + view.y);
    dragging.current = { id, dx: sx, dy: sy };
    setActive(id);
  };
  const moveCardDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const rect = surfaceRef.current?.getBoundingClientRect();
    const lx = rect ? e.clientX - rect.left : e.clientX;
    const ly = rect ? e.clientY - rect.top  : e.clientY;
    const { id, dx, dy } = dragging.current;
    setPos((prev) => ({
      ...prev,
      [id]: { x: lx - view.x - dx, y: ly - view.y - dy },
    }));
  };
  const endCardDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.currentTarget as Element).releasePointerCapture(e.pointerId);
    dragging.current = null;
    setActive(null);
  };

  /** ---- UI Buttons ---- */
  const reset = () => {
    setView({ x: 0, y: 0, scale: 1 });
    applyLayout("grid");
  };

  const filteredIds = useMemo(
    () =>
      events
        .filter((e) => filter === "All" || e.status === filter)
        .map((e) => e.id),
    [filter]
  );

  /** ---- Detail modal ---- */
  const [detail, setDetail] = useState<Event | null>(null);

  return (
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 pt-10">
        <h1
          className="text-center text-3xl md:text-5xl font-bold text-zinc-100 mb-2 __enableXr__"
          style={xr({ "--xr-background-material": "thin", "--xr-back": 60 })}
        >
          Spatial Events Wall
        </h1>
        <p className="text-center text-zinc-400 mb-6">
          Drag cards • Pan canvas • Ctrl+Scroll to zoom • Tap a card for details
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <button
            onClick={() => applyLayout(mode === "grid" ? "timeline" : "grid")}
            className="rounded-full px-4 py-2 bg-white/90 text-black font-semibold hover:bg-white __enableXr__"
            style={xr({ "--xr-background-material": "thin", "--xr-back": 50, cursor: "pointer" })}
          >
            {mode === "grid" ? "Switch to Timeline" : "Switch to Grid"}
          </button>
          <button
            onClick={reset}
            className="rounded-full px-4 py-2 bg-white/10 text-white border border-white/20 hover:bg-white/15 __enableXr__"
            style={xr({ "--xr-background-material": "thin", "--xr-back": 45, cursor: "pointer" })}
          >
            Reset View
          </button>

          {/* quick filters */}
          {(["All","Upcoming","Past"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1.5 text-sm __enableXr__ ${
                filter === f ? "bg-white/90 text-black" : "bg-white/10 text-white border border-white/20 hover:bg-white/15"
              }`}
              style={xr({ "--xr-background-material": "thin", "--xr-back": 40, cursor: "pointer" })}
              aria-pressed={filter === f}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Board background */}
      <div
        className="relative mx-auto mb-16 w-[min(1200px,95vw)] h-[min(900px,72vh)] rounded-3xl overflow-hidden __enableXr__"
        style={xr({
          "--xr-background-material": "translucent",
          "--xr-back": 30,
          touchAction: "none",
          background:
            "radial-gradient(1200px 600px at 20% -20%, rgba(139,92,246,.25), transparent 60%), radial-gradient(1000px 600px at 120% 120%, rgba(59,130,246,.18), transparent 60%), rgba(255,255,255,.04)",
          boxShadow: "0 15px 60px rgba(0,0,0,.45) inset",
        })}
      >
        {/* panning + zooming surface */}
        <div
          ref={surfaceRef}
          onPointerDown={onSurfaceDown}
          onPointerMove={onSurfaceMove}
          onPointerUp={onSurfaceUp}
          onPointerCancel={onSurfaceUp}
          onWheel={onWheel}
          className="absolute inset-0"
          style={{
            transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
            transformOrigin: "0 0",
            transition: dragging.current ? "none" : "transform .08s ease",
          }}
        >
          {/* tickline (timeline mode) */}
          {mode === "timeline" && (
            <div className="absolute left-0 right-0 top-[320px] h-[2px] bg-white/10" />
          )}

          {/* cards */}
          {events.map((e) => {
            if (!filteredIds.includes(e.id)) return null;
            const { x, y } = pos[e.id];
            const isActive = active === e.id;
            const glow =
              e.status === "Upcoming"
                ? "0 0 0 0 rgba(168,85,247,.35)"
                : "0 0 0 0 rgba(0,0,0,0)";

            return (
              <div
                key={e.id}
                onPointerDown={startCardDrag(e.id)}
                onPointerMove={moveCardDrag}
                onPointerUp={endCardDrag}
                onPointerCancel={endCardDrag}
                onDoubleClick={() => setDetail(e)}
                className="absolute rounded-2xl overflow-hidden shadow-lg select-none __enableXr__"
                style={xr({
                  left: x,
                  top: y,
                  width: CARD_W,
                  height: CARD_H,
                  "--xr-background-material": isActive ? "thick" : "thin",
                  "--xr-back": isActive ? 70 : 45,
                  transform: isActive ? "translateZ(34px) scale(1.035)" : "translateZ(18px)",
                  transition: "transform .14s ease",
                  cursor: isActive ? "grabbing" : "grab",
                  userSelect: "none",
                  boxShadow: glow,
                })}
                role="button"
                aria-label={`${e.title} details`}
              >
                <div className="relative h-2/3">
                  <Image src={e.imageUrl} alt={e.title} fill className="object-cover pointer-events-none" />
                  {e.status === "Upcoming" && (
                    <div className="absolute top-2 right-2 text-[11px] font-semibold bg-emerald-300/90 text-black px-2 py-1 rounded-full">
                      Upcoming
                    </div>
                  )}
                </div>
                <div className="h-1/3 p-3">
                  <p className="text-xs text-zinc-300">{e.date}</p>
                  <h3 className="text-lg font-semibold text-white leading-tight line-clamp-2">{e.title}</h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* corner minimap */}
        <div
          className="absolute right-4 bottom-4 text-[11px] text-white/80 rounded-xl px-3 py-2 bg-white/10 border border-white/15 __enableXr__"
          style={xr({ "--xr-background-material": "thin", "--xr-back": 60 })}
        >
          <span className="opacity-80">View</span> · {mode} · {filter}
        </div>
      </div>

      {/* detail modal */}
      {detail && (
        <div className="fixed inset-0 z-[70]">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setDetail(null)}
            style={xr({ "--xr-background-material": "translucent", "--xr-back": 5 })}
          />
          <div
            className="relative z-10 max-w-4xl mx-auto my-10 p-6 md:p-8 rounded-3xl bg-gray-900 text-white __enableXr__"
            style={xr({ "--xr-background-material": "thick", "--xr-back": 85 })}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-indigo-300">{detail.date}</p>
                <h3 className="text-3xl font-bold">{detail.title}</h3>
              </div>
              <button
                onClick={() => setDetail(null)}
                className="rounded-full w-9 h-9 bg-white text-black font-bold hover:scale-110 transition __enableXr__"
                style={xr({ "--xr-background-material": "thin", "--xr-back": 20, cursor: "pointer" })}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <div className="relative mt-5 h-[420px] rounded-2xl overflow-hidden __enableXr__"
              style={xr({ "--xr-background-material": "regular", "--xr-back": 30 })}
            >
              <Image src={detail.imageUrl} alt={detail.title} fill className="object-cover" />
            </div>

            <p className="mt-6 text-gray-300 leading-relaxed">{detail.description}</p>

            <div className="mt-6 flex gap-3">
              <a
                href={toICS(detail)}
                download={`${detail.title.replace(/\s+/g, "_")}.ics`}
                className="rounded-full px-4 py-2 bg-white/90 text-black font-semibold hover:bg-white __enableXr__"
                style={xr({ "--xr-background-material": "thin", "--xr-back": 35, cursor: "pointer" })}
              >
                Add to Calendar (.ics)
              </a>
              <button
                onClick={() => setDetail(null)}
                className="rounded-full px-4 py-2 bg-white/10 text-white border border-white/20 hover:bg-white/15 __enableXr__"
                style={xr({ "--xr-background-material": "thin", "--xr-back": 30, cursor: "pointer" })}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
