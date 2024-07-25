"use client"
import { execMembers } from "@/data";
import { HoverEffect } from "./ui/card-hover-effect";

const execProjects = execMembers.map((member) => ({
  title: member.name,
  description: member.bio,
  link: "#", // You can modify this to link to member's profile or relevant page
  role: member.role, // Adding role for later use
  image: member.image, // Adding image for later use
}));

export default function Exec() {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-6xl font-bold text-center text-violet-600 mb-12">
          <span className="font-sans">Executive board 2024</span>
        </h2>
        <HoverEffect items={execProjects} />
      </div>
    </section>
  );
}
