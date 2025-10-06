"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import XrWindowLink from "./xr-window-link";
import { IconSearch, IconApps, IconSparkles, IconExternalLink, IconPin, IconLayoutSidebarRightCollapse, IconLayoutSidebarLeftCollapse } from "@tabler/icons-react";

const xr = (v: Record<string, string | number>) => v as React.CSSProperties;

type Props = {
  routeTo?: string;
  title?: string;
  children?: React.ReactNode;
};

type Dock = "float" | "left" | "right";

export default function XrSidePanel({
  routeTo = "/sponsorships",
  title = "Quick Actions",
  children,
}: Props) {
  const [open, setOpen] = useState(true);
  const [dock, setDock] = useState<Dock>("float");
  const [depth, setDepth] = useState(75);
  const [collapsed, setCollapsed] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const dragMem = useRef<{ startX:number; startY:number } | null>(null);

  // restore saved UI (position/dock/collapse)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("xrSidePanel") || "{}");
      if (saved.dock) setDock(saved.dock);
      if (saved.depth) setDepth(saved.depth);
      if (saved.collapsed != null) setCollapsed(!!saved.collapsed);
      if (panelRef.current && saved.left && saved.top) {
        panelRef.current.style.left = saved.left;
        panelRef.current.style.top  = saved.top;
      }
    } catch {}
  }, []);

  const persist = () => {
    if (!panelRef.current) return;
    const { left, top } = panelRef.current.style;
    localStorage.setItem("xrSidePanel", JSON.stringify({ dock, depth, collapsed, left: left || "", top: top || "" }));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (dock !== "float") return; // only draggable when floating
    dragMem.current = { startX: e.clientX, startY: e.clientY };
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dock !== "float" || !panelRef.current) return;
    if (!(e.currentTarget as Element).hasPointerCapture(e.pointerId)) return;
    const rect = panelRef.current.getBoundingClientRect();
    const x = Math.max(8, Math.min(window.innerWidth - rect.width - 8, e.clientX - (dragMem.current?.startX ?? 0)));
    const y = Math.max(80, Math.min(window.innerHeight - rect.height - 8, e.clientY - (dragMem.current?.startY ?? 0)));
    panelRef.current.style.left = `${x}px`;
    panelRef.current.style.top  = `${y}px`;
    // parallax sparkle tilt
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = -(e.clientY - cy) / rect.height * 6;
    const ry =  (e.clientX - cx) / rect.width  * 8;
    panelRef.current.style.transform = `translateZ(24px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    (e.currentTarget as Element).releasePointerCapture(e.pointerId);
    if (panelRef.current) panelRef.current.style.transform = "translateZ(24px)";
    persist();
  };

  const toggleDock = (side: Dock) => {
    setDock((prev) => (prev === side ? "float" : side));
  };

  useEffect(() => { persist(); }, [dock, depth, collapsed]);

  return (
    <>
      {/* Toggle / Pill */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed right-4 top-24 z-[100] rounded-full px-4 py-2 bg-white/90 text-black hover:bg-white shadow __enableXr__"
        style={xr({ ["--xr-background-material" as any]: "thin", ["--xr-back" as any]: 60, cursor: "pointer" })}
        aria-expanded={open}
        aria-controls="xr-sidepanel"
      >
        {open ? "Hide Panel" : "Show Panel"}
      </button>

      {/* Collapsed mini pill (when hidden) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed right-4 top-[calc(24px+56px)] z-[100] xr-pill __enableXr__"
          style={xr({ ["--xr-background-material" as any]: "regular", ["--xr-back" as any]: 72 })}
          aria-label="Open side panel"
        />
      )}

      {/* Panel */}
      <aside
        id="xr-sidepanel"
        ref={panelRef}
        className={`fixed z-[99] w-[340px] max-w-[85vw] p-0 text-sm backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,.45)] rounded-3xl __enableXr__ xr-panel
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} 
          ${dock === "left" ? "left-4 top-24" : dock === "right" ? "right-4 top-24" : ""}`}
        style={xr({
          // default float position (overridden above when docked or restored from LS)
          ...(dock === "float" && { left: "calc(100vw - 380px)", top: "96px" }),
          ["--xr-background-material" as any]: "regular",
          ["--xr-back" as any]: depth,
        })}
        role="complementary"
        aria-label="WebSpatial side panel"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* header */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-10 rounded-full bg-white/40 __enableXr__" style={xr({ ["--xr-background-material" as any]: "thin", ["--xr-back" as any]: depth + 5 })} />
            <h3 className="text-base font-semibold text-white">{title}</h3>
          </div>
          <div className="flex items-center gap-1">
            <button
              className="icon-btn"
              title="Dock left / undock"
              onClick={() => toggleDock("left")}
            >
              <IconLayoutSidebarLeftCollapse size={18} />
            </button>
            <button
              className="icon-btn"
              title="Dock right / undock"
              onClick={() => toggleDock("right")}
            >
              <IconLayoutSidebarRightCollapse size={18} />
            </button>
            <button
              className={`icon-btn ${collapsed ? "opacity-100" : "opacity-60"}`}
              title="Pin (collapse/expand)"
              onClick={() => setCollapsed((v) => !v)}
            >
              <IconPin size={18} />
            </button>
          </div>
        </div>

        {/* body */}
        <div className={`transition-[max-height,opacity] duration-300 ${collapsed ? "max-h-0 opacity-0 pointer-events-none" : "max-h-[70vh] opacity-100"} px-4 pb-4`}>
          {/* search */}
          <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-xl px-3 py-2 mb-3">
            <IconSearch size={16} className="text-white/80" />
            <input className="bg-transparent text-white/90 placeholder:text-white/60 outline-none w-full" placeholder="Quick search…" />
          </div>

          {/* quick actions */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <XrWindowLink forceNew href="/projects/board" className="chip-btn">
              <IconApps size={16} /> Projects Board
            </XrWindowLink>
            <Link href="/projects" className="chip-btn">
              <IconSparkles size={16} /> Projects
            </Link>
            <Link href="/events" className="chip-btn">
              <IconExternalLink size={16} /> Events
            </Link>
            <Link href="/sponsorships" className="chip-btn">
              <IconExternalLink size={16} /> Sponsors
            </Link>
          </div>

          {/* depth control (XR) */}
          <label className="block text-xs text-white/70 mb-1">Depth (Z back)</label>
          <input
            type="range"
            min={40}
            max={90}
            value={depth}
            onChange={(e) => setDepth(parseInt(e.target.value))}
            className="w-full accent-white"
          />

          {/* custom content */}
          {children && <div className="mt-4 text-zinc-200/90">{children}</div>}
        </div>
      </aside>
    </>
  );
}

/* --- local styles (Tailwind helpers) --- */
// Add these to a global .d.ts if needed for TS: className strings only
