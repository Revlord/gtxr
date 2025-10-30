// app/sponsorship/board/page.tsx
"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { getAssetPath } from "@/utils/handleBasePath";

type Tier = "Platinum" | "Gold" | "Silver" | "Community";
type Sponsor = {
  id: string;
  name: string;
  tier: Tier;
  logo?: string;
  url?: string;
  blurb?: string;
  color: string; // fallback orb fill
};

const xr = (v: Record<string, string | number>) => v as React.CSSProperties;

const SPONSORS: Sponsor[] = [
  { id: "s1", name: "Snap AR", tier: "Platinum", color: "#FFFC00", logo: getAssetPath("/snap1.png"), blurb: "Flagship partner for ImmerseGT" },
  { id: "s2", name: "Niantic", tier: "Gold", color: "#4285F4", logo: getAssetPath("/niantic1.png"), blurb: "Workshops + gear sponsoring" },
  { id: "s3", name: "Meshy", tier: "Gold", color: "#FF6B35", logo: getAssetPath("/meshy1.png") },
  { id: "s4", name: "GT CREATE-X", tier: "Silver", color: "#B3A369", logo: getAssetPath("/createx1.png") },
  { id: "s6", name: "MLH", tier: "Community", color: "#E42D40", logo: getAssetPath("/mlh1.png") },
  { id: "s7", name: "Standout Stickers", tier: "Community", color: "#FF69B4", logo: getAssetPath("/standout1.png") },
  { id: "s8", name: "Grokit", tier: "Community", color: "#32CD32", logo: getAssetPath("/grokit1.png") },
  { id: "s10", name: "Pico (you guys!)", tier: "Platinum", color: "#1DB954", logo: getAssetPath("/pico.png"), blurb: "Potential flagship XR hardware partner" },
];

type Vec = { x: number; y: number };

// Layout item now supports a soft “target” for magnetization
type LayoutItem = { p: Vec; v: Vec; t: number; speed: number; r: number; target?: Vec | null };
type Layout = Record<string, LayoutItem>;

const ORB = { w: 140, h: 140 };
const TIERS: Tier[] = ["Platinum", "Gold", "Silver", "Community"];
const CELL_H = 140;
const CELL_GAP = 8;
const RAIL_W = 160;          // w-40
const RAIL_PAD = 12;         // p-3
const RAIL_TOP = 24;         // top-6

export default function SponsorStudio() {
  const boxRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<{ id: string; dx: number; dy: number } | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Sponsor | null>(null);
  const [orbit, setOrbit] = useState(true);
  const [focusedTier, setFocusedTier] = useState<Tier | null>(null);

  // initial scattered/spiral
  const [L, setL] = useState<Layout>(() => {
    const l: Layout = {};
    SPONSORS.forEach((s, i) => {
      const angle = (i / SPONSORS.length) * Math.PI * 2;
      const r = 160 + i * 18;
      l[s.id] = {
        p: { x: 420 + Math.cos(angle) * r, y: 280 + Math.sin(angle) * r },
        v: { x: 0, y: 0 },
        t: angle,
        speed: 0.002 + i * 0.0006,
        r,
        target: null,
      };
    });
    return l;
  });

  const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));

  // animation loop (orbit + magnet easing)
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      if (!boxRef.current) return;
      const box = boxRef.current.getBoundingClientRect();
      setL(prev => {
        const next: Layout = { ...prev };
        for (const id in next) {
          // skip while dragging
          if (dragging.current?.id === id) continue;
          const n = next[id];

          // free orbit/float motion
          if (orbit && !focusedTier) {
            n.t += n.speed;
            const cx = box.width / 2, cy = box.height / 2;
            n.p.x = cx + Math.cos(n.t) * n.r;
            n.p.y = cy + Math.sin(n.t) * n.r;
          } else if (!n.target) {
            // gentle float if no target
            n.v.x += (Math.random() - 0.5) * 0.06;
            n.v.y += (Math.random() - 0.5) * 0.06;
            n.v.x *= 0.96;
            n.v.y *= 0.96;
            n.p.x = clamp(n.p.x + n.v.x, 8, box.width - ORB.w - 8);
            n.p.y = clamp(n.p.y + n.v.y, 8, box.height - ORB.h - 8);
          }

          // magnet target (smoothly ease toward target)
          if (n.target) {
            const ease = 0.18;
            n.p.x += (n.target.x - n.p.x) * ease;
            n.p.y += (n.target.y - n.p.y) * ease;
            // snap when close
            if (Math.hypot(n.target.x - n.p.x, n.target.y - n.p.y) < 0.6) {
              n.p.x = n.target.x;
              n.p.y = n.target.y;
            }
          }
        }
        return { ...next };
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [orbit, focusedTier]);

  // pointer handlers (per MDN pattern)
  const onDown = (id: string) => (e: React.PointerEvent<HTMLDivElement>) => {
    if (!boxRef.current) return;
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    const box = boxRef.current.getBoundingClientRect();
    const cur = L[id].p;
    dragging.current = { id, dx: e.clientX - (box.left + cur.x), dy: e.clientY - (box.top + cur.y) };
    // cancel any magnet target if user grabs the orb
    setL(prev => ({ ...prev, [id]: { ...prev[id], target: null } }));
    setActiveId(id);
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current || !boxRef.current) return;
    const { id, dx, dy } = dragging.current;
    const box = boxRef.current.getBoundingClientRect();
    const x = clamp(e.clientX - box.left - dx, 8, box.width - ORB.w - 8);
    const y = clamp(e.clientY - box.top - dy, 8, box.height - ORB.h - 8);
    setL(prev => ({ ...prev, [id]: { ...prev[id], p: { x, y }, v: { x: 0, y: 0 } } }));
  };

  const onUp = (s: Sponsor) => (e: React.PointerEvent<HTMLDivElement>) => {
    (e.currentTarget as Element).releasePointerCapture(e.pointerId);
    if (!boxRef.current) return;
    const box = boxRef.current.getBoundingClientRect();
    const pos = L[s.id].p;

    // rail area (snap if dropped near it)
    const railX = box.width - (RAIL_W + 20);           // ~right “edge”
    const railY0 = RAIL_TOP + RAIL_PAD;

    const nearRail = pos.x > railX - 30 && pos.y > railY0 - 20;
    if (nearRail) {
      const yBase = TIERS.indexOf(s.tier) * (CELL_H + CELL_GAP);
      const snapped = {
        x: railX + 8,
        y: railY0 + yBase + (CELL_H - ORB.h) / 2,
      };
      setL(prev => ({ ...prev, [s.id]: { ...prev[s.id], p: snapped, target: null } }));
    } else {
      // tap opens spatial card
      setSelected(s);
    }

    setActiveId(null);
    dragging.current = null;
  };

  const resetLayout = () =>
    setL(prev => {
      const cx = (boxRef.current?.clientWidth ?? 1000) / 2;
      const cy = (boxRef.current?.clientHeight ?? 700) / 2;
      const l: Layout = {};
      SPONSORS.forEach((s, i) => {
        const angle = (i / SPONSORS.length) * Math.PI * 2;
        const r = 160 + i * 18;
        l[s.id] = { p: { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r }, v: { x: 0, y: 0 }, t: angle, speed: 0.002 + i * 0.0006, r, target: null };
      });
      return l;
    });

  // ===== NEW: Click a tier to “magnetize” its sponsors close to that tier cell
  const magnetizeTier = (tier: Tier) => {
    if (!boxRef.current) return;

    // toggle behavior
    setFocusedTier(prev => (prev === tier ? null : tier));
    setOrbit(false);

    const box = boxRef.current.getBoundingClientRect();
    const railX = box.width - (RAIL_W + 20);
    const railY0 = RAIL_TOP + RAIL_PAD;
    const tierIndex = TIERS.indexOf(tier);

    // Build compact cluster target positions (2 rows, n columns) just to the LEFT of the rail
    const cluster = (count: number) => {
      const targets: Vec[] = [];
      const cols = Math.max(1, Math.ceil(count / 2));
      for (let j = 0; j < count; j++) {
        const col = Math.floor(j / 2);
        const row = j % 2;
        const x = railX - (col + 1) * (ORB.w + 16); // stagger columns leftward
        const baseY = railY0 + tierIndex * (CELL_H + CELL_GAP) + (CELL_H - ORB.h) / 2;
        const y = baseY + row * (ORB.h * 0.65);     // 2 rows compact
        targets.push({ x, y });
      }
      return targets;
    };

    const list = SPONSORS.filter(s => s.tier === tier);
    const targets = cluster(list.length);

    setL(prev => {
      const next = { ...prev };
      // assign targets to chosen tier
      list.forEach((s, i) => {
        next[s.id] = { ...next[s.id], target: targets[i] };
      });
      // release targets for others
      SPONSORS.filter(s => s.tier !== tier).forEach(s => {
        next[s.id] = { ...next[s.id], target: null };
      });
      return next;
    });
  };

  const clearFocus = () => {
    setFocusedTier(null);
    // remove all targets; keep orbit paused or let user resume
    setL(prev => {
      const next = { ...prev };
      for (const id in next) next[id] = { ...next[id], target: null };
      return next;
    });
  };

  return (
    <main className="min-h-screen bg-black">
      {/* subtle goo filter */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 18 -8"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>

      <div className="container mx-auto px-4 pt-10">
        <h1
          className="text-center text-3xl md:text-5xl font-bold text-zinc-100 mb-2 __enableXr__"
          style={xr({ "--xr-background-material": "thin", "--xr-back": 60 })}
        >
          Spatial Sponsor Studio
        </h1>
        <p className="text-center text-zinc-400 mb-6">
          Drag orbs • Snap to tier rail • Tap to open a spatial card • <span className="text-white/80">Click a tier → magnetize its sponsors</span>
        </p>
        <div className="flex items-center justify-center gap-3 mb-5">
          <button
            onClick={() => setOrbit(o => !o)}
            className="rounded-full px-4 py-2 bg-white/90 text-black font-semibold hover:bg-white __enableXr__"
            style={xr({ "--xr-background-material": "thin", "--xr-back": 50, cursor: "pointer" })}
          >
            {orbit ? "Pause Orbit" : "Resume Orbit"}
          </button>
          <button
            onClick={resetLayout}
            className="rounded-full px-4 py-2 bg-white/10 text-white border border-white/20 hover:bg-white/20 __enableXr__"
            style={xr({ "--xr-background-material": "thin", "--xr-back": 50, cursor: "pointer" })}
          >
            Reset Layout
          </button>
          {focusedTier && (
            <button
              onClick={clearFocus}
              className="rounded-full px-4 py-2 bg-white/10 text-white border border-white/20 hover:bg-white/20 __enableXr__"
              style={xr({ "--xr-background-material": "thin", "--xr-back": 50, cursor: "pointer" })}
            >
              Clear Focus
            </button>
          )}
        </div>
      </div>

      <div
        ref={boxRef}
        className="relative mx-auto mb-16 w-[min(1200px,95vw)] h-[min(850px,70vh)] rounded-3xl bg-white/5 overflow-hidden __enableXr__"
        style={xr({ "--xr-background-material": "translucent", "--xr-back": 30, touchAction: "none", filter: "url(#goo)" })}
        onPointerMove={onMove}
      >
        {/* Tier rail (clickable to magnetize) */}
        <div
          className="absolute right-6 top-6 rounded-3xl p-3 bg-white/8 backdrop-blur border border-white/10 text-xs text-zinc-200 space-y-2 __enableXr__"
          style={xr({ "--xr-background-material": "regular", "--xr-back": 65 })}
        >
          {TIERS.map((t, i) => {
            const isActive = focusedTier === t;
            const count = SPONSORS.filter(s => s.tier === t).length;
            return (
              <button
                key={t}
                onClick={() => magnetizeTier(t)}
                className={`w-40 h-[140px] rounded-2xl grid place-items-center border transition
                            ${isActive ? "bg-white/15 border-white/30 shadow-[0_0_0_2px_rgba(255,255,255,0.15)_inset]" : "bg-white/5 border-white/10 hover:bg-white/10"}`}
                style={xr({ "--xr-background-material": isActive ? "thick" : "regular", "--xr-back": isActive ? 75 : 65, cursor: "pointer" })}
                aria-pressed={isActive}
                aria-label={`Magnetize ${t} sponsors`}
              >
                <div className="text-center">
                  <span className="font-semibold block">{t}</span>
                  <span className="text-[10px] text-zinc-400">{count} sponsor{count === 1 ? "" : "s"}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Orbs */}
        {SPONSORS.map(s => {
          const isActive = activeId === s.id;
          const p = L[s.id]?.p ?? { x: 100, y: 100 };
          const dim = focusedTier && s.tier !== focusedTier;
          return (
            <div
              key={s.id}
              onPointerDown={onDown(s.id)}
              onPointerUp={onUp(s)}
              className="absolute rounded-full select-none __enableXr__"
              style={xr({
                left: p.x,
                top: p.y,
                width: ORB.w,
                height: ORB.h,
                "--xr-background-material": isActive ? "thick" : "regular",
                "--xr-back": isActive ? 80 : 50,
                transform: isActive ? "translateZ(36px) scale(1.04)" : "translateZ(18px)",
                transition: "transform .12s ease, opacity .25s ease, filter .25s ease",
                cursor: isActive ? "grabbing" : "grab",
                userSelect: "none",
                opacity: dim ? 0.45 : 1,
                filter: dim ? "grayscale(.15) blur(.2px)" : "none",
                background: `radial-gradient(120px 120px at 30% 20%, ${s.color}AA, transparent 60%), radial-gradient(120px 120px at 70% 80%, ${s.color}66, transparent 60%)`,
                boxShadow: `0 10px 40px ${s.color}55, inset 0 1px 10px #fff2`,
              })}
              aria-label={`${s.name} – ${s.tier}`}
            >
              <div className="absolute inset-0 grid place-items-center">
                {s.logo ? (
                  <Image src={s.logo} alt={s.name} width={84} height={84} className="opacity-95" />
                ) : (
                  <span className="text-white/90 font-semibold text-center px-2">{s.name}</span>
                )}
              </div>
              <div
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,.25), transparent 60%)", mixBlendMode: "screen" }}
              />
            </div>
          );
        })}
      </div>

      {/* Spatial card on tap */}
      {selected && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setSelected(null)}
            style={xr({ "--xr-background-material": "translucent", "--xr-back": 5 })}
          />
          <div
            className="relative z-10 max-w-3xl mx-auto my-10 p-6 md:p-10 rounded-3xl bg-gray-900 text-white __enableXr__"
            style={xr({ "--xr-background-material": "thick", "--xr-back": 85 })}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-indigo-300">{selected.tier} Sponsor</p>
                <h3 className="text-3xl font-bold">{selected.name}</h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-full w-9 h-9 bg-white text-black font-bold hover:scale-110 transition __enableXr__"
                style={xr({ "--xr-background-material": "thin", "--xr-back": 20, cursor: "pointer" })}
              >
                ×
              </button>
            </div>

            <p className="mt-4 text-zinc-300 leading-relaxed">
              {selected.blurb || "A great partner helping push XR at GT forward."}
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl p-4 bg-white/5 border border-white/10 __enableXr__" style={xr({ "--xr-background-material": "regular", "--xr-back": 65 })}>
                <p className="text-zinc-200 font-semibold">Student Reach</p>
                <p className="text-zinc-400">+250 active members</p>
              </div>
              <div className="rounded-2xl p-4 bg-white/5 border border-white/10 __enableXr__" style={xr({ "--xr-background-material": "regular", "--xr-back": 65 })}>
                <p className="text-zinc-200 font-semibold">Events / yr</p>
                <p className="text-zinc-400">20+ workshops & hackathons</p>
              </div>
              <div className="rounded-2xl p-4 bg-white/5 border border-white/10 __enableXr__" style={xr({ "--xr-background-material": "regular", "--xr-back": 65 })}>
                <p className="text-zinc-200 font-semibold">Visibility</p>
                <p className="text-zinc-400">Brand at ImmerseGT & socials</p>
              </div>
            </div>

            <div className="mt-8">
              <a
                href={`mailto:contact@gtxr.club?subject=Sponsorship%20Inquiry%20(${encodeURIComponent(selected.name)})`}
                className="inline-flex items-center rounded-full px-5 py-2 bg-white/90 text-black font-semibold hover:bg-white __enableXr__"
                style={xr({ "--xr-background-material": "thin", "--xr-back": 40, cursor: "pointer" })}
              >
                Contact us about {selected.tier}
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}