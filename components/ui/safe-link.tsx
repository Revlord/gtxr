"use client";

import Link from "next/link";
import { ComponentProps } from "react";

type SafeLinkProps = ComponentProps<typeof Link>;

/**
 * SafeLink - A wrapper around Next.js Link that handles undefined href gracefully
 * Falls back to "#" if href is undefined to prevent runtime errors
 */
export default function SafeLink({ href, children, ...props }: SafeLinkProps) {
  // If href is undefined or null, use a safe fallback
  const safeHref = href ?? "#";
  
  // Log warning in development if href is undefined
  if (process.env.NODE_ENV === "development" && !href) {
    console.warn("SafeLink: href prop is undefined, falling back to '#'", {
      children,
      props
    });
  }
  
  return (
    <Link href={safeHref} {...props}>
      {children}
    </Link>
  );
}
