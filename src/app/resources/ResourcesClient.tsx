"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Globe,
  BookOpen,
  ArrowRight,
  Clock,
  Calendar,
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

  // Helper to resolve icon based on post category
  function getCategoryIcon(category: string) {
    switch (category) {
      case "Technical Guides":
        return FileText;
      case "Industry News":
        return Globe;
      case "Sourcing Guides":
      default:
        return BookOpen;
    }
  }

  // Helper to resolve gradient styling based on category for card headers
  function getCategoryGradient(category: string) {
    switch (category) {
      case "Technical Guides":
        return "from-navy-900 to-navy-800";
      case "Industry News":
        return "from-copper-700 to-copper-600";
      case "Sourcing Guides":
      default:
        return "from-navy-800 to-steel-800";
    }
  }

  return (
    <div className="space-y-10">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2.5 pb-2 border-b border-steel-300">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-5 py-2.5 rounded-none text-sm font-semibold transition-all duration-200 border cursor-pointer",
              activeCategory === category
                ? "bg-navy-900 border-navy-900 text-white"
                : "bg-white border-steel-300 text-steel-700 hover:border-steel-400 hover:text-navy-900"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid of articles */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => {
            const Icon = getCategoryIcon(post.category);
            const gradient = getCategoryGradient(post.category);

            return (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className={cn(
                  "group bg-white rounded-none border border-steel-300 overflow-hidden flex flex-col h-full",
                  "transition-all duration-300 hover:border-copper-400"
                )}
              >
                {/* Visual Header (instead of missing static image file) */}
                <div
                  className={cn(
                    "h-48 bg-gradient-to-br flex flex-col justify-between p-6 text-white relative overflow-hidden",
                    gradient
                  )}
                >
                  {/* Subtle technical background grid */}
                  <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  <div className="flex justify-between items-start z-10">
                    <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-none text-xs font-semibold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <Icon className="w-6 h-6 text-copper-400" />
                  </div>
                  <div className="z-10 mt-auto">
                    <div className="flex items-center gap-4 text-xs text-steel-300">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.publishedAt}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading font-bold text-navy-900 text-lg leading-snug mb-3 group-hover:text-copper-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-steel-600 text-sm leading-relaxed mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/resources/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-navy-900 font-semibold text-sm group-hover:text-copper-600 transition-colors mt-auto"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="bg-white rounded-none border border-steel-300 p-12 text-center max-w-md mx-auto">
          <BookOpen className="w-12 h-12 text-steel-400 mx-auto mb-4" />
          <h3 className="font-heading font-bold text-navy-900 text-lg mb-2">
            No articles found
          </h3>
          <p className="text-steel-600 text-sm">
            We couldn't find any resources in this category. Check back soon for new guides!
          </p>
        </div>
      )}
    </div>
  );
}
