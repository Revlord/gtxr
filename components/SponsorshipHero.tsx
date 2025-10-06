// components/SponsorshipHero.tsx
"use client";

import React, { useRef, useState } from "react";
import XrWindowLink from "@/components/ui/xr-window-link";

const xr = (v: Record<string, string | number>) => v as React.CSSProperties;

export default function SponsorshipHero() {
  // lightweight tilt
  const [rot, setRot] = useState({ rx: 0, ry: 0 });
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
    setRot({ rx: -dy * 6, ry: dx * 8 });
  };

  return (
    <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden bg-black">
      {/* inline goo filter */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <filter id="goo-hero">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 18 -8" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>

      <div
        className="relative w-[min(1280px,92vw)] rounded-[2rem] sm:rounded-[3rem] hero-gradient mx-auto p-8 sm:p-12 __enableXr__"
        style={xr({ "--xr-background-material": "translucent", "--xr-back": 45 })}
        onPointerMove={onMove}
        onPointerLeave={() => setRot({ rx: 0, ry: 0 })}
      >
        <h1
          className="text-center font-extrabold text-4xl sm:text-6xl md:text-7xl text-white __enableXr__"
          style={xr({ "--xr-background-material": "thin", "--xr-back": 70 })}
        >
          Fuel the future of XR at GT.
        </h1>
        <p className="mt-4 text-center text-zinc-300 text-lg sm:text-xl">
          Sponsor immersive projects, research, & ImmerseGT.
        </p>

        {/* gooey droplets */}
        <div
          className="relative mx-auto mt-10 h-[340px] sm:h-[420px] w-[min(100%,900px)]"
          style={{ filter: "url(#goo-hero)" }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full __enableXr__"
              style={xr({
                "--xr-background-material": "regular",
                "--xr-back": 60 - i * 2,
                width: 120 - i * 6,
                height: 120 - i * 6,
                left: `${10 + (i * 9)}%`,
                top: `${20 + Math.sin(i) * 10}%`,
                background: `radial-gradient(80px 80px at 30% 20%, rgba(167,139,250,.9), transparent 60%), radial-gradient(80px 80px at 70% 80%, rgba(34,211,238,.8), transparent 60%)`,
                transform: `translateZ(${24 + i * 2}px) rotateX(${rot.rx}deg) rotateY(${rot.ry}deg)`,
                transition: "transform .25s ease",
                boxShadow: "0 10px 40px rgba(76,29,149,.35)",
                mixBlendMode: "screen",
                opacity: 0.95,
              })}
            />
          ))}
        </div>

        {/* spatial CTAs */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <XrWindowLink
            href="/sponsorships/board"
            forceNew
            className="rounded-full px-6 py-3 text-black bg-white/90 hover:bg-white font-semibold __enableXr__"
            style={xr({ "--xr-background-material": "thin", "--xr-back": 80, cursor: "pointer" })}
          >
            Open Spatial Sponsor Studio
          </XrWindowLink>

          <a
            href="mailto:contact@gtxr.club?subject=GTXR%20Sponsorship%20Inquiry"
            className="rounded-full px-6 py-3 text-white border border-white/30 hover:bg-white/10 __enableXr__"
            style={xr({ "--xr-background-material": "thin", "--xr-back": 50 })}
          >
            Email the team
          </a>
        </div>
      </div>
    </section>
  );
}
