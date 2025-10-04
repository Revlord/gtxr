"use client";
import Image from "next/image";
import React, { useMemo, useRef, useState } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { getAssetPath } from "@/utils/handleBasePath";

// Helper: strongly-typed CSS variables for WebSpatial
const xr = (styles: Record<string, string | number>) => styles as React.CSSProperties;

// XR env base (empty on normal web; set when running in WebSpatial)
const useXRBase = () =>
  useMemo(() => (typeof window !== "undefined" && (window as any).__XR_ENV_BASE__) || "", []);

/* =========================
   1) INTERACTION PRIMITIVES
   ========================= */

// 1a) Tilt + "pop" depth on press/drag
const XRTiltCard: React.FC<React.PropsWithChildren<{ depth?: number }>> = ({
  children,
  depth = 40,
}) => {
  const [rot, setRot] = useState({ rx: 0, ry: 0 });
  const [z, setZ] = useState(depth);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
    setRot({ rx: -dy * 8, ry: dx * 10 });
  };
  const onLeave = () => setRot({ rx: 0, ry: 0 });
  const onDown = () => setZ(depth + 20);
  const onUp = () => setZ(depth);

  return (
    <div
      enable-xr
      className="rounded-3xl transition-transform duration-300 will-change-transform"
      style={xr({
        "--xr-background-material": "thin",
        "--xr-back": z,
        transform: `translateZ(24px) rotateX(${rot.rx}deg) rotateY(${rot.ry}deg)`,
        transformOrigin: "center",
        cursor: "pointer",
      })}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerDown={onDown}
      onPointerUp={onUp}
    >
      {children}
    </div>
  );
};

// 1b) Pinch-to-zoom image (PointerEvents → multi-touch & visionOS pinch)
const XRZoomImage: React.FC<{
  src: string;
  alt: string;
  w?: number;
  h?: number;
  maxScale?: number;
}> = ({ src, alt, w = 900, h = 600, maxScale = 2 }) => {
  const imgRef = useRef<HTMLDivElement>(null);
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const baseDist = useRef<number | null>(null);
  const [scale, setScale] = useState(1);

  const setTransform = (s: number) => {
    if (!imgRef.current) return;
    imgRef.current.style.transform = `translateZ(30px) scale(${s})`;
  };

  const onDown = (e: React.PointerEvent) => {
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
  };

  const onMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2) {
      const pts = Array.from(pointers.current.values());
      const dx = pts[0].x - pts[1].x;
      const dy = pts[0].y - pts[1].y;
      const dist = Math.hypot(dx, dy);
      if (baseDist.current == null) baseDist.current = dist;
      const raw = dist / baseDist.current;
      const next = Math.min(maxScale, Math.max(1, raw));
      setScale(next);
      setTransform(next);
    }
  };

  const onUpOrCancel = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) {
      baseDist.current = null;
      setScale(1);
      setTransform(1);
    }
  };

  return (
    <div
      enable-xr
      className="overflow-hidden rounded-2xl mx-auto"
      style={xr({
        "--xr-background-material": "regular",
        "--xr-back": 25,
        width: w,
        height: h,
        touchAction: "none", // allow pinch
        cursor: "pointer",
        transition: "transform .15s ease",
      })}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUpOrCancel}
      onPointerCancel={onUpOrCancel}
      ref={imgRef}
    >
      <Image
        src={src}
        alt={alt}
        width={w}
        height={h}
        className="object-contain w-full h-full select-none"
        draggable={false}
      />
    </div>
  );
};

// 1c) Open route in a new window/scene (uses window.open → Scene in WebSpatial; tab on web)
const OpenSceneButton: React.FC<{ href: string; name: string; label: string }> = ({
  href,
  name,
  label,
}) => {
  const XR_BASE = useXRBase();
  return (
    <button
      enable-xr
      className="mt-4 rounded-full px-5 py-2 font-semibold bg-white/90 text-black hover:bg-white"
      style={xr({
        "--xr-background-material": "thin",
        "--xr-back": 35,
        cursor: "pointer",
      })}
      onClick={() => window.open(`${XR_BASE}${href}`, name)}
    >
      {label}
    </button>
  );
};

/* =========================
   2) PAGE SHELL
   ========================= */

export function AppleCardsCarouselDemo() {
  // Build cards for the carousel
  const cards = data.map((card, index) => <Card key={card.src} card={card} index={index} />);

  return (
    <div
      className="w-full h-full py-20"
      enable-xr
      style={xr({
        "--xr-background-material": "translucent",
        "--xr-back": 20,
      })}
    >
      {/* Floating header with depth */}
      <h2
        className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans text-center mb-8"
        enable-xr
        style={xr({ "--xr-background-material": "thick", "--xr-back": 60 })}
      >
        Our Projects range from XR research to fun VR applications!
      </h2>

      {/* Sticky/hovering tips panel (XR-only visual) */}
      <div
        enable-xr
        className="hidden xl:block fixed right-6 top-28 rounded-3xl px-5 py-4 text-sm text-zinc-100 bg-white/5 backdrop-blur"
        style={xr({ "--xr-background-material": "regular", "--xr-back": 70, cursor: "pointer" })}
      >
        Tip: pinch images to zoom • drag over cards to “peek”
      </div>

      {/* Carousel */}
      <div enable-xr style={xr({ "--xr-background-material": "transparent", "--xr-back": 40 })}>
        <Carousel items={cards} />
      </div>
    </div>
  );
}

/* =========================
   3) SPATIAL PANELS + CONTENT
   ========================= */

const Panel: React.FC<
  React.PropsWithChildren<{ depth?: number; material?: "thin" | "regular" | "thick" | "translucent"; interactive?: boolean }>
> = ({ children, depth = 40, material = "thick", interactive = true }) => (
  <div
    enable-xr
    className={`bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4 transition-transform duration-300 ${
      interactive ? "hover:scale-[1.02] cursor-pointer" : ""
    }`}
    style={xr({
      "--xr-background-material": material,
      "--xr-back": depth,
    })}
  >
    {children}
  </div>
);

/* ===== Content blocks (now spatial-enhanced) ===== */

const ExitSuitContent = () => (
  <XRTiltCard depth={45}>
    <Panel material="thin" depth={45}>
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-4">
        <span enable-xr style={xr({ "--xr-back": 10, "--xr-background-material": "translucent" })} className="font-bold text-neutral-700 dark:text-neutral-200">
          Exit Suit Project <br />
        </span>
        A custom-designed “Exit Suit” built by GTXR—engineering + design meets XR craft.
      </p>
      <a
        href="https://exitsuit.com/"
        className="text-blue-600 hover:text-blue-800 underline font-semibold"
        enable-xr
        style={xr({ "--xr-back": 20 })}
      >
        More About the Exit Suit
      </a>
      <OpenSceneButton href="/projects" name="gtxr-projects" label="Open Projects in New Window" />
    </Panel>
  </XRTiltCard>
);

const MotionIDContent = () => (
  <XRTiltCard depth={40}>
    <Panel material="thick" depth={40}>
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-4">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">Motion ID Research <br /></span>
        Can motion patterns uniquely identify a headset user? (Quest & AVP study)
      </p>
    </Panel>
  </XRTiltCard>
);

const XRMemoryContent = () => (
  <XRTiltCard depth={35}>
    <Panel material="regular" depth={35}>
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-4">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">XR Memory Project <br /></span>
        A Simon-Says style VR memory experiment. Hypothesis: spatial recall &gt; 2D recall.
      </p>
    </Panel>
  </XRTiltCard>
);

const GraphingCalculatorContent = () => (
  <XRTiltCard depth={42}>
    <Panel material="thick" depth={42}>
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-4">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">VR Graphing Project <br /></span>
        Advanced math visualizations in VR.
      </p>
      <XRZoomImage src={getAssetPath("/project11.png")} alt="VR Graphing" w={900} h={560} />
    </Panel>
  </XRTiltCard>
);

const DrumSimulatorContent = () => (
  <XRTiltCard depth={38}>
    <Panel material="translucent" depth={38}>
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-4">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">Drum Simulator <br /></span>
        Rhythm game in the browser (WebXR).
      </p>
      <XRZoomImage src={getAssetPath("/project4.jpg")} alt="Drumming" w={900} h={560} />
    </Panel>
  </XRTiltCard>
);

const SpaceSimulationContent = () => (
  <XRTiltCard depth={46}>
    <Panel material="regular" depth={46}>
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-4">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">Space Simulation <br /></span>
        Mixed-reality spacewalk demo.
      </p>
      <XRZoomImage src={getAssetPath("/carousel5.jpg")} alt="Space MR" w={900} h={560} />
    </Panel>
  </XRTiltCard>
);

const XRtisticHabitatContent = () => (
  <XRTiltCard depth={33}>
    <Panel material="regular" depth={33}>
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-4">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">XRtistic Habitat <br /></span>
        Spatial interior design tool.
      </p>
    </Panel>
  </XRTiltCard>
);

const ProjectPitchContent = () => (
  <XRTiltCard depth={50}>
    <Panel material="translucent" depth={50}>
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-6">
        <span enable-xr style={xr({ "--xr-back": 15, "--xr-background-material": "thick" })} className="font-bold text-neutral-700 dark:text-neutral-200">
          Wanna lead a project under GTXR? <br />
        </span>
        Pitch your idea in our annual competition—mentors + E-Board review and select!
      </p>
      <OpenSceneButton href="/projects#pitch" name="gtxr-pitch" label="Apply for Project Pitch" />
      <XRZoomImage src={getAssetPath("/apple-vision-pro.png")} alt="Pitch Visual" w={900} h={560} />
    </Panel>
  </XRTiltCard>
);

/* =========================
   4) DATA
   ========================= */

const data = [
  { category: "Ongoing | XR Application", title: "Exit Suit", src: getAssetPath("/exitsuit.png"), content: <ExitSuitContent /> },
  { category: "Ongoing | XR Research", title: "MotionID", src: getAssetPath("/project5.png"), content: <MotionIDContent /> },
  { category: "Completed | Mixed Reality", title: "XR Memory", src: getAssetPath("/project3.png"), content: <XRMemoryContent /> },
  { category: "Completed | VR", title: "Graphing Calculator", src: getAssetPath("/project11.png"), content: <GraphingCalculatorContent /> },
  { category: "Completed | VR", title: "Drum Simulator", src: getAssetPath("/project4.jpg"), content: <DrumSimulatorContent /> },
  { category: "Completed | VR", title: "Space Simulation", src: getAssetPath("/carousel5.jpg"), content: <SpaceSimulationContent /> },
  { category: "Archived | Mixed Reality", title: "XRtistic Habitat", src: getAssetPath("/stock1.jpeg"), content: <XRtisticHabitatContent /> },
  { category: "Your 🫵 Project | ?", title: "Pitch Competition Winner Project 🏆", src: getAssetPath("/stock2.jpeg"), content: <ProjectPitchContent /> },
];
