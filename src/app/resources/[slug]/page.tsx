import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, FileText, Send, ShieldAlert } from "lucide-react";
import { blogPosts } from "@/lib/data/site";
import { blogArticleContents } from "@/lib/data/articles";

// ---------------------------------------------------------------------------
// Static route generation
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  const content = blogArticleContents[slug];

  if (!post || !content) {
    notFound();
  }

  // Filter out the current post to show 2 other related posts at the bottom
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      {/* ── Dark Hero Header ─────────────────────────────────────── */}
      <section className="relative bg-navy-950 overflow-hidden section-dark border-b border-navy-850">
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(199,91,42,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(199,91,42,0.3) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-24">
          {/* Back link */}
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-sm text-steel-400 hover:text-steel-200 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Resources
          </Link>

          <div>
            <span className="inline-block px-2.5 py-1 bg-copper-500/10 border border-copper-500/30 text-copper-300 text-xs font-semibold uppercase tracking-wider mb-5">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold font-heading text-white leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-sm text-steel-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-steel-500" />
                {post.publishedAt}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-steel-500" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Article Content Grid ─────────────────────────────────── */}
      <section className="bg-steel-100">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Column (2/3) */}
            <div className="lg:col-span-2 space-y-10 bg-white border border-steel-300 p-6 sm:p-10 md:p-12">
              {/* Introduction */}
              <p className="text-lg text-navy-900 font-medium leading-relaxed border-l-4 border-copper-500 pl-5 mb-8">
                {content.introduction}
              </p>

              {/* Sections */}
              <div className="space-y-8">
                {content.sections.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    {section.heading && (
                      <h2 className="text-2xl font-bold font-heading text-navy-900 pt-4">
                        {section.heading}
                      </h2>
                    )}
                    
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-steel-700 leading-relaxed text-base">
                        {p}
                      </p>
                    ))}

                    {section.list && (
                      <ul className="list-none space-y-3 pl-4 py-2 border-l border-steel-200">
                        {section.list.map((item, lIdx) => (
                          <li key={lIdx} className="flex items-start gap-3 text-steel-700 text-sm md:text-base">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-copper-500 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Column (1/3) */}
            <aside className="space-y-8">
              {/* Quote CTA Card */}
              <div className="bg-navy-900 text-white rounded-none p-6 sm:p-8 relative overflow-hidden section-dark border border-navy-850">
                <div
                  className="absolute inset-0 opacity-[0.02] pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div className="relative z-10 space-y-6">
                  <div className="flex h-12 w-12 items-center justify-center bg-copper-500/10 border border-copper-500/20 text-copper-400">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white text-lg mb-2">
                      Need custom specifications?
                    </h3>
                    <p className="text-xs text-steel-400 leading-relaxed">
                      Whether you require low-temperature ASTM A320 fasteners, heavy forgings, or fully trace-documented casting batches, we handle the entire logistics pipeline.
                    </p>
                  </div>
                  <Link
                    href="/quote"
                    className="group inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-copper-500 hover:bg-copper-600 text-white font-semibold text-sm rounded-none transition-colors cursor-pointer"
                  >
                    Request a Quote
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Related Posts Card */}
              <div className="bg-white border border-steel-300 p-6">
                <h3 className="font-heading font-bold text-navy-900 text-base mb-5 pb-3 border-b border-steel-200">
                  Related Insights
                </h3>
                <div className="space-y-6">
                  {relatedPosts.map((rPost) => (
                    <Link
                      key={rPost.slug}
                      href={`/resources/${rPost.slug}`}
                      className="group block space-y-2"
                    >
                      <span className="text-[10px] font-bold text-copper-500 uppercase tracking-wider">
                        {rPost.category}
                      </span>
                      <h4 className="font-heading font-bold text-navy-900 text-sm leading-snug group-hover:text-copper-600 transition-colors">
                        {rPost.title}
                      </h4>
                      <span className="inline-flex items-center gap-1 text-xs text-steel-500 group-hover:text-navy-900 transition-colors">
                        Read post
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
