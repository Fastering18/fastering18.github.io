import { getProjects } from "@/app/actions/projects";
import { SITE_NAME, SITE_URL, truncateMeta } from "@/lib/seo";

export const revalidate = 3600;

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const projects = await getProjects();
  const visible = projects.filter((p) => p.isVisible);

  const items = visible
    .map((p) => {
      const description = truncateMeta(
        p.summary || p.description.replace(/##\s+/g, " ").replace(/\n+/g, " "),
        400
      );
      const link = `${SITE_URL}/projects/${p.id}`;
      return `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(p.projectDate).toUTCString()}</pubDate>
      <description><![CDATA[${description}]]></description>
      <enclosure url="${SITE_URL}${p.image.startsWith("/") ? p.image : `/${p.image}`}" type="image/jpeg" />
      <category>${escapeXml(p.tags.join(", "))}</category>
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(SITE_NAME)} Portfolio</title>
    <link>${SITE_URL}</link>
    <description>Projects and case studies by ${escapeXml(SITE_NAME)} (Fastering18).</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/android-chrome-512x512.png</url>
      <title>${escapeXml(SITE_NAME)} Portfolio</title>
      <link>${SITE_URL}</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
