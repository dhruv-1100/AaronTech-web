import { MetadataRoute } from "next";
import { productCategories } from "@/lib/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.aarontechnologies.com";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/industries`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/certifications`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/quote`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/resources`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const categoryPages: MetadataRoute.Sitemap = productCategories.map((cat) => ({
    url: `${baseUrl}/products/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productDetailPages: MetadataRoute.Sitemap = [];
  productCategories.forEach((cat) => {
    cat.types.forEach((type) => {
      const productSlug = type
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "");
      productDetailPages.push({
        url: `${baseUrl}/products/${cat.slug}/${productSlug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      });
    });
  });

  return [...staticPages, ...categoryPages, ...productDetailPages];
}
