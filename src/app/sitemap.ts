import { MetadataRoute } from "next";
import { getProjects } from "@/app/actions/projects";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const now = new Date();

  const projectUrls: MetadataRoute.Sitemap = projects
    .filter((p) => p.isVisible)
    .map((p) => ({
      url: `${SITE_URL}/projects/${p.id}`,
      lastModified: p.projectDate ? new Date(p.projectDate) : now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${SITE_URL}/images/og-image.png`],
    },
    {
      url: `${SITE_URL}/feed`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.3,
    },
    ...projectUrls,
  ];
}
