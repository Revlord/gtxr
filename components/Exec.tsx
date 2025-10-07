"use client";
import Link from "next/link";
import { execMembers } from "@/data";
import { HoverEffect } from "./ui/card-hover-effect";
import React from "react";
import XrWindowLink from "@/components/ui/xr-window-link";

const xr = (v: Record<string, string | number>) => v as React.CSSProperties;

const execProjects = execMembers.map((member, index) => ({
  title: member.name,
  description: member.bio,
  link: `/about#${member.name.toLowerCase().replace(/\s+/g, '-')}`, // Create unique link based on name
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
          <Link 
            href="/about"
            className="rounded-full px-5 py-2 border border-white/20 text-white hover:bg-white/10 __enableXr__"
            style={{ ["--xr-background-material" as any]: "thin", ["--xr-back" as any]: 30, cursor: "pointer" }}
          >
            Meet the team
          </Link>

          <XrWindowLink
            href="/about"
            name="gtxr-team"
            className="rounded-full px-5 py-2 bg-white/90 text-black font-semibold hover:bg-white __enableXr__"
            style={{ ["--xr-background-material" as any]: "thin", ["--xr-back" as any]: 35, cursor: "pointer" }}
          >
            Open Team (New Window)
          </XrWindowLink>
        </div>
      </div>
    </section>
  );
}
