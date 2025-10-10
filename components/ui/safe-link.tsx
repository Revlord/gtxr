"use client";
import Link, { type LinkProps } from "next/link";
import * as React from "react";

/** Safe wrapper: never passes undefined to <Link>. */
type AnchorProps = React.ComponentPropsWithoutRef<"a">;
type Props = Omit<AnchorProps, "href"> & { href?: LinkProps["href"] };

export default function SafeLink({ href, children, ...rest }: Props) {
  // If there's no href, render a non-link to avoid Next runtime error.
  if (!href) return <span {...rest}>{children}</span>;

  // Allow hash/mailto/http as normal anchors without Next routing if you prefer:
  if (typeof href === "string" && (/^#|^mailto:|^tel:/i).test(href)) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
