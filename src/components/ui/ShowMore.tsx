"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Progressive disclosure for the long ruled lists.
 *
 * A twelve-row catalog index is a scannable table on a desktop screen and
 * roughly four screens of scrolling on a phone. Below the `lg` breakpoint
 * this clamps the list to the first few rows and offers the rest behind a
 * control; at `lg` and up the full list renders exactly as designed.
 *
 * The clamp is CSS-only so the markup is identical on server and client —
 * no media query is read during render, so nothing can mismatch on hydration
 * and every row stays in the DOM for search and for assistive tech that
 * ignores the visual truncation.
 */
export default function ShowMore({
  visible,
  label,
  total,
  ruled,
  className,
  children,
}: {
  /** Rows kept on screen while collapsed. Only 3 and 5 are styled. */
  visible: 3 | 5;
  /** Noun for the control, e.g. "lines" in "Show all 12 lines". */
  label: string;
  total: number;
  /** Set on ruled tables so the last visible row takes the closing rule. */
  ruled?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div
        className={cn("show-more", ruled && "show-more--ruled", className)}
        data-collapsed={expanded ? undefined : String(visible)}
      >
        {children}
      </div>
      <button
        type="button"
        onClick={() => setExpanded((open) => !open)}
        aria-expanded={expanded}
        className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2.5 border-2 border-ink px-6 py-4 font-mono text-[11px] uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ink hover:text-signal lg:hidden"
      >
        {expanded ? `Show fewer ${label}` : `Show all ${total} ${label}`}
        <span aria-hidden="true">{expanded ? "↑" : "↓"}</span>
      </button>
    </>
  );
}
