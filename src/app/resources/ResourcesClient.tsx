"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/types";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "All",
  "Technical Guides",
  "Industry News",
  "Sourcing Guides",
];

export default function ResourcesClient({ posts }: { posts: BlogPost[] }) {
  const [active, setActive] = useState("All");

  const filtered = useMemo(
    () => (active === "All" ? posts : posts.filter((p) => p.category === active)),
    [posts, active]
  );

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-2.5 border-b-2 border-ink pb-[26px]">
        {CATEGORIES.map((category) => {
          const on = category === active;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(category)}
              className={cn(
                "cursor-pointer border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.13em] transition-colors",
                on
                  ? "border-ink bg-ink text-signal"
                  : "border-rule-strong bg-transparent text-muted hover:border-ink hover:text-ink"
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="border-b border-rule py-[72px] text-center">
          <p className="m-0 font-mono text-[13px] uppercase tracking-[0.16em] text-muted">
            No articles in this category yet
          </p>
        </div>
      ) : (
        filtered.map((post) => (
          <Link
            key={post.id}
            href={`/resources/${post.slug}`}
            className="catalog-row grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-3 border-b border-rule py-8 lg:grid-cols-[190px_minmax(0,1.7fr)_minmax(0,1.5fr)_130px] lg:gap-9"
          >
            <span className="order-1 border-l-[3px] border-signal pl-[11px] font-mono text-[10px] uppercase tracking-[0.16em] text-ink">
              {post.category}
            </span>
            <h2 className="order-3 m-0 text-2xl leading-[1.2] text-ink lg:order-2">
              {post.title}
            </h2>
            <p className="order-4 m-0 text-sm leading-[1.6] text-body lg:order-3">
              {post.excerpt}
            </p>
            <div className="order-2 text-right font-mono text-[11px] leading-[1.7] text-muted lg:order-4">
              {post.publishedAt}
              <br />
              {post.readTime}
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
