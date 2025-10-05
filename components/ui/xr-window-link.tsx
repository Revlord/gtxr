// components/ui/xr-window-link.tsx
"use client";

import Link from "next/link";
import * as React from "react";

type Props = {
  href: string;           // app route like "/events"
  name?: string;          // window/scene name for spatial runtimes
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function XrWindowLink({
  href,
  name = "gtxr-window",
  className = "",
  style,
  children,
  ...rest
}: Props) {
  const XR_BASE =
    (typeof window !== "undefined" && (window as any).__XR_ENV_BASE__) || "";

  // In WebSpatial: open a *new scene/window* with a name.
  if (XR_BASE) {
    return (
      <button
        onClick={() => window.open(`${XR_BASE}${href}`, name)}
        className={className}
        style={style}
        {...rest}
      >
        {children}
      </button>
    );
  }

  // On the web: standard new tab, Next.js will handle basePath for href.
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
