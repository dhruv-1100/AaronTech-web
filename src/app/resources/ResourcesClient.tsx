"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
} from "lucide-react";
import type { BlogPost } from "@/types";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Technical Guides", "Industry News", "Sourcing Guides"];

interface ResourcesClientProps {
  posts: BlogPost[];
}

export default function ResourcesClient({ posts }: ResourcesClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return posts;
    return posts.filter((post) => post.category === activeCategory);
  }, [posts, activeCategory]);

  return (
    <div className="space-y-10">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-border">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border cursor-pointer",
              activeCategory === category
                ? "bg-primary border-primary text-white"
                : "bg-white border-border-strong text-text-tertiary hover:border-primary/30 hover:text-text-primary"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid of articles */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => (
            <motion.article
              key={post.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="group flex flex-col h-full rounded-xl hover-glass-card"
            >
              <div className="p-6 flex flex-col flex-1">
                {/* Meta line */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[9px] uppercase text-primary-muted tracking-tight">
                    {post.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-border-strong transition-colors group-hover:bg-white/20" />
                  <span className="font-mono text-[9px] uppercase text-text-muted tracking-tight">
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[15px] font-medium text-text-primary leading-snug mb-3 transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1 transition-colors">
                  {post.excerpt}
                </p>

                {/* Read link */}
                <div className="flex items-center justify-between mt-auto">
                  <Link
                    href={`/resources/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-text-primary font-medium text-sm transition-colors"
                  >
                    Read Article
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <span className="font-mono text-[9px] text-text-muted uppercase tracking-tight transition-colors">
                    {post.publishedAt}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="rounded-xl border border-border-strong p-12 text-center max-w-md mx-auto">
          <BookOpen className="w-10 h-10 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg text-text-primary mb-2">
            No articles found
          </h3>
          <p className="text-text-secondary text-sm">
            We couldn&apos;t find any resources in this category. Check back soon for new guides!
          </p>
        </div>
      )}
    </div>
  );
}
