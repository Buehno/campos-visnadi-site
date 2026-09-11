import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/lib/site-config";

// Preview e ambientes sem domínio confirmado: nada é indexado.
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
