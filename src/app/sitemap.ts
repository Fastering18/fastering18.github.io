import { MetadataRoute } from 'next';
import { getProjects } from '@/app/actions/projects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const projects = await getProjects();
    const baseUrl = 'https://fastering.thedev.id';

    const projectUrls = projects
        .filter((p) => p.isVisible)
        .map((p) => ({
            url: `${baseUrl}/projects/${p.id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1,
        },
        ...projectUrls,
    ];
}
