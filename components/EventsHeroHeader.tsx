"use client";
import React, { useRef } from "react";
import Link from "next/link";
import ShootingStars from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";

const xr = (v: Record<string, string | number>) => v as React.CSSProperties;

const EventsHeaderHero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const onMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
    el.style.transform = `translateZ(40px) rotateX(${-dy * 6}deg) rotateY(${dx * 8}deg)`;
  };
  const onLeave = (e: React.MouseEvent<HTMLHeadingElement>) => {
    e.currentTarget.style.transform = "translateZ(40px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div className="relative w-full min-h-[calc(30vh)] h-fit flex mt-4">
      <div
        className="h-[30vh] event-gradient flex flex-col flex-grow m-8 items-center justify-center relative w-full rounded-[3rem] __enableXr__"
        style={xr({ "--xr-background-material": "translucent", "--xr-back": 20 })}
      >
        <h2
          ref={titleRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="relative z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white"
          style={xr({
            "--xr-back": 50,
            "--xr-background-material": "thin",
            transform: "translateZ(40px)",
            cursor: "pointer",
          })}
        >
          Social Events
        </h2>

        <div className="mt-4 flex gap-3">
          <Link
            href="/events"
            className="rounded-full px-4 py-2 border border-white/20 text-white hover:bg-white/10"
            style={xr({ "--xr-background-material": "thin", "--xr-back": 35, cursor: "pointer" })}
          >
            Browse events
          </Link>

          {/* new scene/window via Link target (basePath-safe) */}
          <Link
            href="/events"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-4 py-2 bg-white/90 text-black font-semibold hover:bg-white"
            style={xr({ "--xr-background-material": "thin", "--xr-back": 40, cursor: "pointer" })}
          >
            Open Events (New Window)
          </Link>
        </div>

        <ShootingStars />
        <StarsBackground starDensity={0.0003} />
      </div>
    </div>
  );
};

export default EventsHeaderHero;
