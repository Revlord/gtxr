"use client";

import Link from "next/link";
import * as React from "react";

type Props = {
  href: string;
  name?: string;                 // optional, used when forceNew is false
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  forceNew?: boolean;            // <-- NEW: always make a brand-new spatial window
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function XrWindowLink({
  href,
  name = "gtxr-window",
  className = "",
  style,
  children,
  forceNew = false,
  ...rest
}: Props) {
  const XR_BASE = (typeof window !== "undefined" && (window as any).__XR_ENV_BASE__) || "";

  if (XR_BASE) {
    return (
      <button
        onClick={() => {
          const targetName = forceNew ? `gtxr-${Date.now()}` : name;
          // Use absolute URL to avoid basePath/404 issues when popped out
          const abs = new URL(href, window.location.origin).toString();
          window.open(`${XR_BASE}${href.startsWith("/") ? href : new URL(abs).pathname}`, targetName);
        }}
        className={className}
        style={style}
        {...rest}
      >
        {children}
      </button>
    );
  }

  // Web fallback: standard new tab
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
      {children}
    </Link>
  );
}
