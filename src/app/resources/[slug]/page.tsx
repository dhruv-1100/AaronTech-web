import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
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
    alternates: { canonical: `/resources/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      url: `/resources/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
    },
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

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            author: { "@type": "Organization", name: "Aaron Technologies Inc." },
            publisher: {
              "@type": "Organization",
              name: "Aaron Technologies Inc.",
              logo: { "@type": "ImageObject", url: "https://www.aarontechno.com/logo.png" },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.aarontechno.com/resources/${slug}`,
            },
          }),
        }}
      />
      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-[1360px] mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-sm text-text-tertiary hover:text-text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Resources
          </Link>

          <div className="max-w-3xl">
            <span className="font-mono text-[10px] uppercase text-primary-muted tracking-tight block mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-text-tertiary">
              <span className="font-mono text-[10px] uppercase tracking-tight">
                {post.publishedAt}
              </span>
              <span className="w-1 h-1 rounded-full bg-border-strong" />
              <span className="font-mono text-[10px] uppercase tracking-tight">
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Column */}
            <article className="lg:col-span-2 space-y-10">
              {/* Introduction */}
              <p className="text-lg text-text-primary font-medium leading-relaxed border-l-2 border-primary-muted pl-5">
                {content.introduction}
              </p>

              {/* Sections */}
              <div className="space-y-8">
                {content.sections.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    {section.heading && (
                      <h2 className="text-2xl text-text-primary pt-4">
                        {section.heading}
                      </h2>
                    )}
                    
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-text-secondary leading-relaxed text-base">
                        {p}
                      </p>
                    ))}

                    {section.list && (
                      <ul className="list-none space-y-3 pl-4 py-2 border-l border-border">
                        {section.list.map((item, lIdx) => (
                          <li key={lIdx} className="flex items-start gap-3 text-text-secondary text-sm md:text-base">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary-muted shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Quote CTA */}
              <div className="glass-card p-6 rounded-xl space-y-5">
                <div>
                  <h3 className="text-[15px] font-medium text-text-primary mb-2">
                    Need custom specifications?
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Whether you require low-temperature ASTM A320 fasteners, heavy forgings, or fully trace-documented casting batches, we handle the entire pipeline.
                  </p>
                </div>
                <Link
                  href="/quote"
                  className="btn-primary w-full justify-center py-3"
                >
                  Request a Quote
                  <Send className="w-4 h-4" />
                </Link>
              </div>

              {/* Related Posts */}
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-[15px] font-medium text-text-primary mb-5 pb-3 border-b border-border">
                  Related Insights
                </h3>
                <div className="space-y-6">
                  {relatedPosts.map((rPost) => (
                    <Link
                      key={rPost.slug}
                      href={`/resources/${rPost.slug}`}
                      className="group block space-y-1.5"
                    >
                      <span className="font-mono text-[9px] uppercase text-primary-muted tracking-tight">
                        {rPost.category}
                      </span>
                      <h4 className="text-sm font-medium text-text-primary leading-snug group-hover:text-primary transition-colors">
                        {rPost.title}
                      </h4>
                      <span className="inline-flex items-center gap-1 text-xs text-text-tertiary group-hover:text-text-primary transition-colors">
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
