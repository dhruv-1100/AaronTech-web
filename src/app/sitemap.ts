import { MetadataRoute } from "next";
import { productCategories } from "@/lib/data/products";
import { blogPosts } from "@/lib/data/site";
import { slugify } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.aarontechno.com";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date('2026-07-09'), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: new Date('2026-07-09'), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/industries`, lastModified: new Date('2026-07-09'), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/certifications`, lastModified: new Date('2026-07-09'), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date('2026-07-09'), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/quote`, lastModified: new Date('2026-07-09'), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/resources`, lastModified: new Date('2026-07-09'), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date('2026-07-09'), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: new Date('2026-07-09'), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date('2026-07-09'), changeFrequency: "yearly", priority: 0.3 },
  ];

  const categoryPages: MetadataRoute.Sitemap = productCategories.map((cat) => ({
    url: `${baseUrl}/products/${cat.slug}`,
    lastModified: new Date('2026-07-09'),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productDetailPages: MetadataRoute.Sitemap = [];
  productCategories.forEach((cat) => {
    cat.types.forEach((type) => {
      const productSlug = slugify(type);
      productDetailPages.push({
        url: `${baseUrl}/products/${cat.slug}/${productSlug}`,
        lastModified: new Date('2026-07-09'),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      });
    });
  });

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/resources/${post.slug}`,
    lastModified: new Date('2026-07-09'),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...productDetailPages, ...blogPages];
}
