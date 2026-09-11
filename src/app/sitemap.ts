import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexable || !siteUrl) return [];
  return [{ url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 }];
}
