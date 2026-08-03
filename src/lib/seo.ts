export const SITE_URL = "https://fastering.is-cool.dev";
export const SITE_NAME = "Muhammad Brahmana Priambudi";
export const SITE_HANDLE = "@FasteringDev";
export const SITE_EMAIL = "brahmana@fastering.thedev.id";

export const DEFAULT_TITLE =
  "Muhammad Brahmana Priambudi | Full Stack & Roblox Systems Developer";

export const DEFAULT_DESCRIPTION =
  "Portfolio of Muhammad Brahmana Priambudi (Fastering18). Full stack developer and Roblox systems engineer building Knit game economies, multiplayer loops, and modern Next.js apps.";

export const DEFAULT_KEYWORDS = [
  "Muhammad Brahmana Priambudi",
  "Fastering18",
  "FasteringDev",
  "Full Stack Developer Indonesia",
  "Roblox Developer",
  "Roblox Scripter",
  "Luau Developer",
  "Knit Framework",
  "Next.js Developer",
  "TypeScript Developer",
  "Game Developer Portfolio",
  "Node.js",
  "Software Engineer Indonesia",
  "Surabaya Developer",
];

export function absoluteUrl(path = "/") {
  if (!path) return SITE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function truncateMeta(text: string, max = 160) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}...`;
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: SITE_NAME,
    alternateName: ["Fastering18", "FasteringDev", "MBP"],
    url: SITE_URL,
    image: absoluteUrl("/images/profile.png"),
    jobTitle: "Full Stack Developer & Roblox Systems Developer",
    description: DEFAULT_DESCRIPTION,
    email: SITE_EMAIL,
    nationality: "Indonesian",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
    },
    knowsAbout: [
      "Roblox",
      "Luau",
      "Knit",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Game economy design",
      "Multiplayer systems",
    ],
    sameAs: [
      "https://github.com/Fastering18",
      "https://id.linkedin.com/in/muhammad-brahmana-priambudi-888042320",
      "https://discord.com/users/775363892167573535",
      "https://x.com/FasteringDev",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: `${SITE_NAME} Portfolio`,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#person` },
    author: { "@id": `${SITE_URL}/#person` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profile`,
    url: SITE_URL,
    name: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    mainEntity: { "@id": `${SITE_URL}/#person` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}

export function projectJsonLd(project: {
  id: number | string;
  title: string;
  summary?: string | null;
  description: string;
  image: string;
  tags: string[];
  projectDate: Date | string;
  links?: { label: string; url: string; type?: string }[] | null;
}) {
  const url = absoluteUrl(`/projects/${project.id}`);
  const description = truncateMeta(
    project.summary || project.description.replace(/##\s+/g, "").replace(/\n+/g, " "),
    300
  );

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#project`,
    name: project.title,
    headline: project.title,
    description,
    image: absoluteUrl(project.image),
    url,
    datePublished: new Date(project.projectDate).toISOString(),
    author: { "@id": `${SITE_URL}/#person` },
    creator: { "@id": `${SITE_URL}/#person` },
    keywords: project.tags.join(", "),
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntityOfPage: url,
    ...(project.links?.length
      ? {
          sameAs: project.links.map((l) => l.url),
        }
      : {}),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function itemListJsonLd(
  projects: { id: number | string; title: string; summary?: string | null }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Projects",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: projects.length,
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/projects/${p.id}`),
      name: p.title,
      description: p.summary || undefined,
    })),
  };
}
