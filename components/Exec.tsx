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
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Meet the Team
        </h2>
        <HoverEffect items={execProjects} />
      </div>
    </section>
  );
}
