"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import SafeLink from "@/components/ui/safe-link";
import { motion, AnimatePresence } from "framer-motion";
import { getAssetPath } from "@/utils/handleBasePath";

type Project = { id: string; title: string; category: string; src: string; blurb?: string };

const projects: Project[] = [
  { id: "exitsuit", title: "Exit Suit", category: "Ongoing | XR Application", src: getAssetPath("/exitsuit.png"), blurb: "Engineering + design meets XR craft." },
  { id: "motionid", title: "MotionID", category: "Ongoing | XR Research", src: getAssetPath("/project5.png"), blurb: "Can motion uniquely identify a headset user?" },
  { id: "xrmem", title: "XR Memory", category: "Completed | Mixed Reality", src: getAssetPath("/project3.png"), blurb: "Hypothesis: spatial recall > 2D recall." },
  { id: "graph", title: "Graphing Calculator", category: "Completed | VR", src: getAssetPath("/project11.png"), blurb: "Advanced math visualizations in VR." },
  { id: "drum", title: "Drum Simulator", category: "Completed | VR", src: getAssetPath("/project4.jpg"), blurb: "Rhythm game in WebXR." },
  { id: "space", title: "Space Simulation", category: "Completed | VR", src: getAssetPath("/carousel5.jpg"), blurb: "Mixed-reality spacewalk demo." },
  { id: "habitat", title: "XRtistic Habitat", category: "Archived | Mixed Reality", src: getAssetPath("/stock1.jpeg"), blurb: "Spatial interior design tool." },
  { id: "pitch", title: "Pitch Competition Winner Project 🏆", category: "Your 🫵 Project | ?", src: getAssetPath("/stock2.jpeg"), blurb: "Mentors + E-Board select!" },
];

function HomeChip() {
  return (
    <SafeLink
      href="/"
      className="fixed left-5 top-5 z-[100] rounded-full px-3 py-1 bg-white/90 text-black shadow-md"
    >
      ⟵ GTXR Home
    </SafeLink>
  );
}

export default function ProjectsBoard() {
  const [openCard, setOpenCard] = useState<Project | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  // lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = openCard ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [openCard]);

  const resetLayout = () => {
    // simple UX: scroll to top and close modal if open
    setOpenCard(null);
    pageRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main ref={pageRef} className="min-h-screen bg-black">
      <HomeChip />

      <section className="container mx-auto px-4 pt-16 pb-10">
        <h1 className="text-center text-3xl md:text-5xl font-bold text-zinc-100 mb-2">
          Spatial Projects Board
        </h1>
        <p className="text-center text-zinc-400 mb-6">Click a card to view details</p>

        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={resetLayout}
            className="rounded-full px-4 py-2 bg-white/90 text-black font-semibold hover:bg-white transition"
          >
            Reset layout
          </button>
        </div>

        {/* Clean, cozy grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setOpenCard(p)}
              className="group text-left rounded-2xl overflow-hidden bg-zinc-900/90 border border-white/10 hover:border-white/20 shadow-lg transition focus:outline-none focus:ring-2 focus:ring-white/30"
              aria-label={`${p.title} details`}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={p.src}
                  alt={p.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4 md:p-5">
                <p className="text-[12px] md:text-sm text-zinc-400">{p.category}</p>
                <h3 className="mt-1 text-lg md:text-xl font-semibold text-white">{p.title}</h3>
                {p.blurb && <p className="mt-1 text-[13px] md:text-sm text-zinc-400 line-clamp-2">{p.blurb}</p>}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Simple modal */}
      <AnimatePresence>
        {openCard && (
          <motion.div
            key="modal"
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* solid backdrop prevents stacking weirdness */}
            <div
              className="fixed inset-0 bg-black/75"
              onClick={() => setOpenCard(null)}
            />
            <motion.div
              className="relative z-10 max-w-4xl mx-auto my-8 p-5 md:p-8 rounded-3xl bg-zinc-900 border border-white/10 shadow-2xl"
              initial={{ scale: 0.97, y: 8, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 22 } }}
              exit={{ scale: 0.98, y: 8, opacity: 0 }}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-sm text-zinc-300">{openCard.category}</p>
                  <h3 className="text-2xl md:text-4xl font-semibold text-white">{openCard.title}</h3>
                </div>
                <button
                  onClick={() => setOpenCard(null)}
                  className="rounded-full w-9 h-9 bg-white text-black font-bold hover:scale-110 transition"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-black/50">
                <Image
                  src={openCard.src}
                  alt={openCard.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              </div>

              {openCard.blurb && (
                <p className="mt-5 text-zinc-200/90 leading-relaxed">{openCard.blurb}</p>
              )}

              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  onClick={() => setOpenCard(null)}
                  className="rounded-full px-4 py-2 bg-white/90 text-black font-semibold hover:bg-white transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
