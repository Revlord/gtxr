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
          // Only access window.location when actually clicking (client-side)
          let finalPath = href;
          if (typeof window !== "undefined") {
            if (href.startsWith("/")) {
              finalPath = href;
            } else {
              try {
                const abs = new URL(href, window.location.origin);
                finalPath = abs.pathname;
              } catch {
                finalPath = href;
              }
            }
          }
          window.open(`${XR_BASE}${finalPath}`, targetName);
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
  // If someone ever passed an empty href, don't crash the page.
  if (!href) return <span className={className} style={style}>{children}</span>;
  
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
      {children}
    </Link>
  );
}
