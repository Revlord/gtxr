// app/projects/board/page.tsx
"use client";

import Image from "next/image";
import React, { useMemo, useRef, useState } from "react";
import { getAssetPath } from "@/utils/handleBasePath";

type Project = { id: string; title: string; category: string; src: string };

const xr = (v: Record<string, string | number>) => v as React.CSSProperties;

// Same data as your cards
const projects: Project[] = [
  { id: "exitsuit", title: "Exit Suit", category: "Ongoing | XR Application", src: getAssetPath("/exitsuit.png") },
  { id: "motionid", title: "MotionID", category: "Ongoing | XR Research", src: getAssetPath("/project5.png") },
  { id: "xrmem", title: "XR Memory", category: "Completed | Mixed Reality", src: getAssetPath("/project3.png") },
  { id: "graph", title: "Graphing Calculator", category: "Completed | VR", src: getAssetPath("/project11.png") },
  { id: "drum", title: "Drum Simulator", category: "Completed | VR", src: getAssetPath("/project4.jpg") },
  { id: "space", title: "Space Simulation", category: "Completed | VR", src: getAssetPath("/carousel5.jpg") },
  { id: "habitat", title: "XRtistic Habitat", category: "Archived | Mixed Reality", src: getAssetPath("/stock1.jpeg") },
  { id: "pitch", title: "Pitch Competition Winner Project 🏆", category: "Your 🫵 Project | ?", src: getAssetPath("/stock2.jpeg") },
];

const CARD_W = 360;
const CARD_H = 240;

export default function ProjectsBoard() {
  const boxRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<null | { id: string; dx: number; dy: number }>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  // initial grid-ish layout
  const [pos, setPos] = useState<Record<string, { x: number; y: number }>>(() => {
    const cols = 3;
    const gap = 24;
    const left = 24;
    const top = 24;
    const p: Record<string, { x: number; y: number }> = {};
    projects.forEach((pr, i) => {
      const c = i % cols;
      const r = Math.floor(i / cols);
      p[pr.id] = { x: left + c * (CARD_W + gap), y: top + r * (CARD_H + gap) };
    });
    return p;
  });

  const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

  const startDrag = (id: string) => (e: React.PointerEvent<HTMLDivElement>) => {
    if (!boxRef.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const box = boxRef.current.getBoundingClientRect();
    const cur = pos[id];
    dragging.current = { id, dx: e.clientX - (box.left + cur.x), dy: e.clientY - (box.top + cur.y) };
    setActiveId(id);
  };

  const moveDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current || !boxRef.current) return;
    const { id, dx, dy } = dragging.current;
    const box = boxRef.current.getBoundingClientRect();
    const x = e.clientX - box.left - dx;
    const y = e.clientY - box.top - dy;
    const maxX = box.width - CARD_W;
    const maxY = box.height - CARD_H;
    setPos((prev) => ({ ...prev, [id]: { x: clamp(x, 0, maxX), y: clamp(y, 0, maxY) } }));
  };

  const endDrag = () => {
    dragging.current = null;
    setActiveId(null);
  };

  const resetLayout = () =>
    setPos((prev) => {
      const cols = 3;
      const gap = 24;
      const left = 24;
      const top = 24;
      const p: Record<string, { x: number; y: number }> = {};
      projects.forEach((pr, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        p[pr.id] = { x: left + c * (CARD_W + gap), y: top + r * (CARD_H + gap) };
      });
      return p;
    });

  return (
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 pt-10">
        <h1
          className="text-center text-3xl md:text-5xl font-bold text-zinc-100 mb-4 __enableXr__"
          style={xr({ "--xr-background-material": "thin", "--xr-back": 60 })}
        >
          Spatial Projects Board
        </h1>
        <p className="text-center text-zinc-400 mb-6">Drag to arrange • Cards “pop” forward while dragging • Pinch images to zoom</p>

        <div className="flex items-center justify-center gap-3 mb-4">
          <button
            onClick={resetLayout}
            className="rounded-full px-4 py-2 bg-white/90 text-black font-semibold hover:bg-white __enableXr__"
            style={xr({ "--xr-background-material": "thin", "--xr-back": 50, cursor: "pointer" })}
          >
            Reset layout
          </button>
        </div>
      </div>

      {/* Draggable surface */}
      <div
        ref={boxRef}
        className="relative mx-auto mb-16 w-[min(1200px,95vw)] h-[min(850px,70vh)] rounded-3xl bg-white/5 overflow-hidden __enableXr__"
        style={xr({ "--xr-background-material": "translucent", "--xr-back": 30, touchAction: "none" })}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {projects.map((p) => {
          const isActive = activeId === p.id;
          const { x, y } = pos[p.id];
          return (
            <div
              key={p.id}
              onPointerDown={startDrag(p.id)}
              className="absolute rounded-2xl overflow-hidden shadow-lg select-none __enableXr__"
              style={xr({
                left: x,
                top: y,
                width: CARD_W,
                height: CARD_H,
                "--xr-background-material": isActive ? "thick" : "thin",
                "--xr-back": isActive ? 65 : 40,
                cursor: isActive ? "grabbing" : "grab",
                transform: isActive ? "translateZ(32px) scale(1.03)" : "translateZ(16px)",
                transition: "transform .15s ease",
                userSelect: "none",
              })}
            >
              <div className="relative h-2/3">
                <Image src={p.src} alt={p.title} fill className="object-cover pointer-events-none" />
              </div>
              <div className="h-1/3 p-3">
                <p className="text-xs text-zinc-300">{p.category}</p>
                <h3 className="text-lg font-semibold text-white">{p.title}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

/*
*

Notes

The board uses Pointer Events + setPointerCapture through e.currentTarget.setPointerCapture(e.pointerId) so dragging stays attached to the card until release—this is the recommended pattern for robust dragging. 
MDN Web Docs

The board opens via a single CTA (see patch #2) and is a perfect visionOS scene.
*/