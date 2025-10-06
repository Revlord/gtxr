// app/projects/board/page.tsx
"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAssetPath } from "@/utils/handleBasePath";

type Project = { id: string; title: string; category: string; src: string; blurb?: string };

const xr = (v: Record<string, string | number>) => v as React.CSSProperties;

const projects: Project[] = [
  { id: "exitsuit", title: "Exit Suit", category: "Ongoing | XR Application", src: getAssetPath("/exitsuit.png"), blurb: "Engineering + design meets XR craft." },
  { id: "motionid", title: "MotionID", category: "Ongoing | XR Research", src: getAssetPath("/project5.png"), blurb: "Can motion uniquely identify a headset user?" },
  { id: "xrmem", title: "XR Memory", category: "Completed | Mixed Reality", src: getAssetPath("/project3.png"), blurb: "Hypothesis: spatial recall > 2D recall." },
  { id: "graph", title: "Graphing Calculator", category: "Completed | VR", src: getAssetPath("/project11.png"), blurb: "Advanced math visualizations in VR." },
  { id: "drum", title: "Drum Simulator", category: "Completed | VR", src: getAssetPath("/project4.jpg"), blurb: "Rhythm game in WebXR." },
  { id: "space", title: "Space Simulation", category: "Completed | VR", src: getAssetPath("/carousel5.jpg"), blurb: "Mixed-reality spacewalk demo." },
  { id: "habitat", title: "XRtistic Habitat", category: "Archived | Mixed Reality", src: getAssetPath("/stock1.jpeg"), blurb: "Spatial interior design tool." },
  { id: "pitch", title: "Pitch Competition Winner Project 🏆", category: "Your 🫵 Project | ?", src: getAssetPath("/stock2.jpeg"), blurb: "Mentors + E-Board select!" },
];

const CARD_W = 360;
const CARD_H = 240;

type DragMem = {
  id: string;
  dx: number;
  dy: number;
  lastX: number;
  lastY: number;
  vx: number;
  vy: number;
  startX: number;
  startY: number;
  startT: number;
};

export default function ProjectsBoard() {
  const boxRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<DragMem | null>(null);
  const raf = useRef<number | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [openCard, setOpenCard] = useState<Project | null>(null);

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
    dragging.current = {
      id,
      dx: e.clientX - (box.left + cur.x),
      dy: e.clientY - (box.top + cur.y),
      lastX: e.clientX,
      lastY: e.clientY,
      vx: 0,
      vy: 0,
      startX: e.clientX,
      startY: e.clientY,
      startT: performance.now(),
    };
    setActiveId(id);
  };

  const moveDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current || !boxRef.current) return;
    const mem = dragging.current;
    const box = boxRef.current.getBoundingClientRect();
    const x = e.clientX - box.left - mem.dx;
    const y = e.clientY - box.top - mem.dy;

    // velocity (px/ms) for kinetic "fling"
    const dt = Math.max(1, performance.now() - mem.startT);
    mem.vx = (e.clientX - mem.lastX) / dt;
    mem.vy = (e.clientY - mem.lastY) / dt;
    mem.lastX = e.clientX;
    mem.lastY = e.clientY;
    mem.startT = performance.now();

    const maxX = box.width - CARD_W;
    const maxY = box.height - CARD_H;
    setPos((prev) => ({ ...prev, [mem.id]: { x: clamp(x, 0, maxX), y: clamp(y, 0, maxY) } }));
  };

  // simple kinetic fling + magnetic edge snap
  const runInertia = () => {
    if (!dragging.current || !boxRef.current) return;
    const id = dragging.current.id;
    const box = boxRef.current.getBoundingClientRect();
    const maxX = box.width - CARD_W;
    const maxY = box.height - CARD_H;

    let { vx, vy } = dragging.current;
    let { x, y } = pos[id];
    const friction = 0.92; // 0..1
    const step = () => {
      vx *= friction;
      vy *= friction;
      x = clamp(x + vx * 16, 0, maxX);
      y = clamp(y + vy * 16, 0, maxY);
      setPos((prev) => ({ ...prev, [id]: { x, y } }));
      const speed = Math.hypot(vx, vy);
      if (speed < 0.01) {
        // magnetic edge snap when near boundaries
        const snap = 18;
        const toX = x < snap ? 0 : maxX - x < snap ? maxX : x;
        const toY = y < snap ? 0 : maxY - y < snap ? maxY : y;
        setPos((prev) => ({ ...prev, [id]: { x: toX, y: toY } }));
        raf.current = null;
      } else {
        raf.current = requestAnimationFrame(step);
      }
    };
    if (!raf.current) raf.current = requestAnimationFrame(step);
  };

  const endDrag = (e?: React.PointerEvent) => {
    const mem = dragging.current;
    dragging.current = null;
    setActiveId(null);
    if (mem && e) {
      const dist = Math.hypot(e.clientX - mem.startX, e.clientY - mem.startY);
      const elapsed = performance.now() - mem.startT;
      // treat as click if short + small move → open card
      if (dist < 6 && elapsed < 200) {
        const p = projects.find((pp) => pp.id === mem.id) || null;
        setOpenCard(p);
      } else {
        runInertia();
      }
    }
  };

  const resetLayout = () =>
    setPos(() => {
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

  useEffect(() => () => { if (raf.current) cancelAnimationFrame(raf.current); }, []);

  return (
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 pt-10">
        <h1
          className="text-center text-3xl md:text-5xl font-bold text-zinc-100 mb-2 __enableXr__"
          style={xr({ "--xr-background-material": "thin", "--xr-back": 60 })}
        >
          Spatial Projects Board
        </h1>
        <p className="text-center text-zinc-400 mb-6">Drag to arrange • fling to throw • click to open project</p>

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
        className="relative mx-auto mb-16 w-[min(1200px,95vw)] h-[min(850px,70vh)] rounded-3xl overflow-hidden __enableXr__ xr-board-surface"
        style={xr({ "--xr-background-material": "translucent", "--xr-back": 30, touchAction: "none" })}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {/* ambient parallax grid dots */}
        <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen" />

        {projects.map((p) => {
          const isActive = activeId === p.id;
          const { x, y } = pos[p.id];
          return (
            <motion.div
              key={p.id}
              onPointerDown={startDrag(p.id)}
              className="absolute rounded-2xl overflow-hidden shadow-lg select-none __enableXr__ xr-card-glow"
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
              whileHover={{ scale: isActive ? 1.03 : 1.02 }}
              whileTap={{ scale: 1.0 }}
            >
              {/* subtle focus ring in XR */}
              <div className={`absolute inset-0 ring-2 ${isActive ? "ring-violet-400/60" : "ring-white/10"} rounded-2xl pointer-events-none`} />

              <div className="relative h-2/3">
                <Image src={p.src} alt={p.title} fill className="object-cover pointer-events-none" />
              </div>
              <div className="h-1/3 p-3">
                <p className="text-xs text-zinc-300">{p.category}</p>
                <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                <p className="text-[12px] text-zinc-400 line-clamp-1">{p.blurb}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Spatial modal card */}
      <AnimatePresence>
        {openCard && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* backdrop */}
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-xl __enableXr__"
              style={xr({ "--xr-background-material": "translucent", "--xr-back": 8 })}
              onClick={() => setOpenCard(null)}
            />
            {/* glass card */}
            <motion.div
              className="relative z-10 max-w-4xl mx-auto my-10 p-5 md:p-8 rounded-3xl bg-white/10 border border-white/10 shadow-2xl __enableXr__ xr-modal-card"
              style={xr({ "--xr-background-material": "thick", "--xr-back": 85 })}
              initial={{ scale: 0.96, y: 10 }}
              animate={{ scale: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 22 } }}
              exit={{ scale: 0.98, y: 8, opacity: 0 }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-sm text-violet-300">{openCard.category}</p>
                  <h3 className="text-2xl md:text-4xl font-semibold text-white">{openCard.title}</h3>
                </div>
                <button
                  onClick={() => setOpenCard(null)}
                  className="rounded-full w-9 h-9 bg-white text-black font-bold hover:scale-110 transition __enableXr__"
                  style={xr({ "--xr-background-material": "thin", "--xr-back": 15, cursor: "pointer" })}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              {/* media with pinch-to-zoom */}
              <XRZoomImage src={openCard.src} alt={openCard.title} />

              <p className="mt-5 text-zinc-200/90">{openCard.blurb}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  className="xr-cta rounded-full px-4 py-2 bg-white/90 text-black font-semibold hover:bg-white __enableXr__"
                  style={xr({ "--xr-background-material": "thin", "--xr-back": 40, cursor: "pointer" })}
                  onClick={() => setOpenCard(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

/* ========= pinch-to-zoom used in the modal ========= */
const XRZoomImage: React.FC<{ src: string; alt: string; w?: number; h?: number; maxScale?: number }> = ({
  src, alt, w = 1100, h = 640, maxScale = 2
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const baseDist = useRef<number | null>(null);

  const setTransform = (s: number) => {
    if (!ref.current) return;
    ref.current.style.transform = `translateZ(40px) scale(${s})`;
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
      const next = Math.min(maxScale, Math.max(1, dist / baseDist.current));
      setTransform(next);
    }
  };
  const up = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) {
      baseDist.current = null;
      setTransform(1);
    }
  };

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl mx-auto __enableXr__ xr-elev-40"
      style={xr({
        "--xr-background-material": "regular",
        width: w, height: h, touchAction: "none", cursor: "pointer", transition: "transform .15s ease",
      })}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
    >
      <Image src={src} alt={alt} width={w} height={h} className="object-contain w-full h-full select-none" draggable={false} />
    </div>
  );
};


/*
*

Notes

The board uses Pointer Events + setPointerCapture through e.currentTarget.setPointerCapture(e.pointerId) so dragging stays attached to the card until release—this is the recommended pattern for robust dragging. 
MDN Web Docs

The board opens via a single CTA (see patch #2) and is a perfect visionOS scene.
*/