import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: ['*', 'GPTBot', 'Claude-Web', 'PerplexityBot', 'CCBot', 'Google-Extended'],
                allow: '/',
                disallow: '/admin/',
            },
        ],
        sitemap: 'https://fastering.thedev.id/sitemap.xml',
    };
}
