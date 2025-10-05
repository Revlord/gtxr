"use client";
import React from "react";
import XrWindowLink from "./xr-window-link";
import Link from "next/link";

const xr = (v: Record<string, string | number>) => v as React.CSSProperties;

type Props = {
  routeTo?: string; // where the "Pop out" button goes (new spatial window)
  title?: string;
  children?: React.ReactNode;
};

export default function XrSidePanel({ routeTo = "/sponsorships", title = "Quick Actions", children }: Props) {
  const [open, setOpen] = React.useState(true);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed right-4 top-24 z-[100] rounded-full px-4 py-2 bg-white/90 text-black hover:bg-white shadow __enableXr__"
        style={xr({ ["--xr-background-material" as any]: "thin", ["--xr-back" as any]: 60, cursor: "pointer" })}
        aria-expanded={open}
        aria-controls="xr-sidepanel"
      >
        {open ? "Hide Panel" : "Show Panel"}
      </button>

      {/* Panel */}
      <aside
        id="xr-sidepanel"
        className={`fixed top-24 right-4 z-[99] w-[320px] max-w-[85vw] rounded-3xl p-5 text-sm bg-white/8 backdrop-blur
                    border border-white/10 shadow-lg transition-transform duration-300 __enableXr__ ${open ? "translate-x-0" : "translate-x-[calc(100%+16px)]"}`}
        style={xr({
          ["--xr-background-material" as any]: "regular",
          ["--xr-back" as any]: 70,
        })}
        role="complementary"
        aria-label="WebSpatial side panel"
      >
        <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>

        <div className="space-y-2 text-zinc-200">
          <Link href="/events" className="block underline hover:opacity-80">Browse Events</Link>
          <Link href="/projects" className="block underline hover:opacity-80">Explore Projects</Link>
          <Link href="/sponsorships" className="block underline hover:opacity-80">Sponsorships</Link>
        </div>

        <div className="h-px bg-white/10 my-4" />

        <XrWindowLink
          href={routeTo}
          name="gtxr-side"
          className="w-full inline-flex items-center justify-center rounded-xl px-3 py-2 bg-white/90 text-black font-semibold hover:bg-white"
          style={xr({ ["--xr-background-material" as any]: "thin", ["--xr-back" as any]: 80, cursor: "pointer" })}
        >
          Pop out this section
        </XrWindowLink>

        {children && <div className="mt-4">{children}</div>}
      </aside>
    </>
  );
}
