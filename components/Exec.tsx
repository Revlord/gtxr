"use client";
import Link from "next/link";
import { execMembers } from "@/data";
import { HoverEffect } from "./ui/card-hover-effect";
import React from "react";

const xr = (v: Record<string, string | number>) => v as React.CSSProperties;

const execProjects = execMembers.map((member) => ({
  title: member.name,
  description: member.bio,
  link: "#",
  role: member.role,
  image: member.image,
}));

export default function Exec() {
  return (
    <section className="py-16 bg-black">
      <div
        className="container mx-auto px-4 __enableXr__"
        style={xr({
          // Subtle frosted container in XR
          "--xr-background-material": "translucent",
          "--xr-back": 20,
        })}
      >
        <h2
          className="text-6xl font-bold text-center mb-12 __enableXr__"
          style={xr({
            "--xr-back": 40,
            "--xr-background-material": "thin",
          })}
        >
          <span className="font-sans text-gray-400">Executive Board</span>
        </h2>

        <HoverEffect items={execProjects} />

        {/* Spatial action row */}
        <div className="mt-10 flex items-center justify-center gap-3">
          {/* Internal nav (same tab) – Link handles basePath */}
          <Link
            href="/team"
            className="rounded-full px-5 py-2 border border-white/20 text-white hover:bg-white/10"
            style={xr({
              "--xr-background-material": "thin",
              "--xr-back": 30,
              cursor: "pointer",
            })}
          >
            Meet the team
          </Link>

          {/* New tab / new Scene in WebSpatial */}
          <Link
            href="/team"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-5 py-2 bg-white/90 text-black font-semibold hover:bg-white"
            style={xr({
              "--xr-background-material": "thin",
              "--xr-back": 35,
              cursor: "pointer",
            })}
          >
            Open Team (New Window)
          </Link>
        </div>
      </div>
    </section>
  );
}
