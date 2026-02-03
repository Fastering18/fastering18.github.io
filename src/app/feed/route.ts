import { getProjects } from "@/app/actions/projects";

export async function GET() {
    const projects = await getProjects();
    const baseUrl = "https://fastering.is-cool.dev";

    const items = projects
        .filter(p => p.isVisible)
        .map(p => `
            <item>
                <title><![CDATA[${p.title}]]></title>
                <link>${baseUrl}/projects/${p.id}</link>
                <guid>${baseUrl}/projects/${p.id}</guid>
                <pubDate>${new Date(p.projectDate).toUTCString()}</pubDate>
                <description><![CDATA[${p.summary || p.description}]]></description>
            </item>
        `).join("");

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
    <title>Muhammad Brahmana Priambudi Portfolio</title>
    <link>${baseUrl}</link>
    <description>Latest projects and updates from Muhammad Brahmana Priambudi</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed" rel="self" type="application/rss+xml" />
    ${items}
</channel>
</rss>`;

    return new Response(rss, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "s-maxage=3600, stale-while-revalidate",
        },
    });
}
