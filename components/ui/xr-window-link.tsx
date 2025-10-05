// components/ui/xr-window-link.tsx
"use client";

import Link from "next/link";
import * as React from "react";
import { getAssetPath } from "@/utils/handleBasePath";

type Props = {
  href: string;                  // app route like "/projects" or "/projects/board"
  name?: string;                 // window/scene name for spatial runtimes (ignored if forceNew)
  forceNew?: boolean;            // if true, ALWAYS open a fresh spatial window (new browsing context)
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function XrWindowLink({
  href,
  name = "gtxr-window",
  forceNew = false,
  className = "",
  style,
  children,
  ...rest
}: Props) {
  // Build an ABSOLUTE URL that already includes your Next.js basePath.
  // This is the key to avoiding 404s in spatial runtimes.
  const toAbsolute = () =>
    typeof window === "undefined"
      ? href
      : new URL(getAssetPath(href), window.location.origin).toString();

  const isClient = typeof window !== "undefined";
  const isSpatial = isClient && !!(window as any).__XR_ENV_BASE__; // provided by WebSpatial
  const targetName = forceNew ? "_blank" : name;

  if (isSpatial) {
    return (
      <button
        onClick={() => {
          const abs = toAbsolute();
          // _blank = new browsing context EVERY time (fresh spatial window)
          // a named string would reuse the same window
          window.open(abs, targetName);
        }}
        className={className}
        style={style}
        {...rest}
      >
        {children}
      </button>
    );
  }

  // Web fallback: standard new tab (Next.js <Link> applies basePath automatically)
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
    >
      {children}
    </Link>
  );
}
