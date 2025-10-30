"use client";
import SafeLink from "./ui/safe-link";
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
        
      </div>
    </section>
  );
}
