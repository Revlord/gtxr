"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import XrWindowLink from "./xr-window-link";

const xr = (v: Record<string, string | number>) => v as React.CSSProperties;

type Props = {
  routeTo?: string;                 // where the Pop Out button opens
  title?: string;
  children?: React.ReactNode;
};

export default function XrSidePanel({
  routeTo = "/sponsorships",
  title = "Quick Actions",
  children,
}: Props) {
  const [open, setOpen] = useState(true);

  // --- DRAG TO MOVE (works on mouse, touch, and visionOS pointer)
  const panelRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{dx:number;dy:number;startX:number;startY:number}>({dx:0,dy:0,startX:0,startY:0});

  const onPointerDown = (e: React.PointerEvent) => {
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    drag.current.startX = e.clientX - rect.left;
    drag.current.startY = e.clientY - rect.top;
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!panelRef.current) return;
    if (!(e.currentTarget as Element).hasPointerCapture(e.pointerId)) return;
    const x = Math.max(8, Math.min(window.innerWidth - panelRef.current.offsetWidth - 8, e.clientX - drag.current.startX));
    const y = Math.max(80, Math.min(window.innerHeight - panelRef.current.offsetHeight - 8, e.clientY - drag.current.startY));
    panelRef.current.style.left = `${x}px`;
    panelRef.current.style.top  = `${y}px`;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    (e.currentTarget as Element).releasePointerCapture(e.pointerId);
  };

  return (
    <>
      {/* Toggle */}
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed right-4 top-24 z-[100] rounded-full px-4 py-2 bg-white/90 text-black hover:bg-white shadow __enableXr__"
        style={xr({ ["--xr-background-material" as any]:"thin", ["--xr-back" as any]:60, cursor:"pointer" })}
        aria-expanded={open}
        aria-controls="xr-sidepanel"
      >
        {open ? "Hide Panel" : "Show Panel"}
      </button>

      {/* Floating / draggable panel */}
      <aside
        id="xr-sidepanel"
        ref={panelRef}
        className={`fixed z-[99] w-[320px] max-w-[85vw] rounded-3xl p-5 text-sm bg-white/8 backdrop-blur border border-white/10 shadow-2xl __enableXr__ transition-transform duration-300
                    ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={xr({
          left: "calc(100vw - 360px)",
          top:  "96px",
          ["--xr-background-material" as any]:"regular",
          ["--xr-back" as any]: 75,
        })}
        role="complementary"
        aria-label="WebSpatial side panel"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* drag handle */}
        <div
          className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-white/40 __enableXr__"
          style={xr({ ["--xr-background-material" as any]:"thin", ["--xr-back" as any]: 80 })}
          aria-hidden
        />
        <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>

        <div className="space-y-2 text-zinc-200">
          <Link href="/events" className="block underline hover:opacity-80">Browse Events</Link>
          <Link href="/projects" className="block underline hover:opacity-80">Explore Projects</Link>
          <Link href="/sponsorships" className="block underline hover:opacity-80">Sponsorships</Link>
        </div>

        <div className="h-px bg-white/10 my-4" />

        <XrWindowLink
          href={routeTo}
          name="gtxr-side"
          className="w-full inline-flex items-center justify-center rounded-xl px-3 py-2 bg-white/90 text-black font-semibold hover:bg-white __enableXr__"
          style={xr({ ["--xr-background-material" as any]:"thin", ["--xr-back" as any]: 85, cursor:"pointer" })}
        >
          Pop out this section
        </XrWindowLink>

        {children && <div className="mt-4 text-zinc-300/90">{children}</div>}
      </aside>
    </>
  );
}
