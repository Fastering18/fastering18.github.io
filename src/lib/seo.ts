export const SITE_URL = "https://fastering.is-cool.dev";
export const SITE_NAME = "Muhammad Brahmana Priambudi";
export const SITE_BRAND = "Fastering18";
export const SITE_HANDLE = "@FasteringDev";
export const SITE_EMAIL = "brahmana@fastering.thedev.id";

export const DEFAULT_TITLE =
  "Fastering18 | Muhammad Brahmana Priambudi | Full Stack & Roblox Developer";

export const DEFAULT_DESCRIPTION =
  "Fastering18 (Muhammad Brahmana Priambudi) portfolio. Full stack and Roblox systems developer building Knit economies, multiplayer games, and Next.js apps. Also known as Fastering and FasteringDev.";

export const DEFAULT_KEYWORDS = [
  "Fastering18",
  "fastering18",
  "Fastering",
  "fastering",
  "FasteringDev",
  "Muhammad Brahmana Priambudi",
  "Fastering18 portfolio",
  "Fastering18 developer",
  "Fastering18 Roblox",
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
    alternateName: [
      "Fastering18",
      "fastering18",
      "Fastering",
      "FasteringDev",
      "MBP",
    ],
    url: SITE_URL,
    image: absoluteUrl("/images/profile.png"),
    jobTitle: "Full Stack Developer & Roblox Systems Developer",
    description: DEFAULT_DESCRIPTION,
    email: SITE_EMAIL,
    nationality: "Indonesian",
    brand: {
      "@type": "Brand",
      name: "Fastering18",
      alternateName: ["Fastering", "FasteringDev"],
      url: SITE_URL,
    },
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
      "Fastering18",
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
    name: "Fastering18 Portfolio",
    alternateName: [
      "Fastering18",
      "Fastering portfolio",
      "Muhammad Brahmana Priambudi Portfolio",
    ],
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#person` },
    author: { "@id": `${SITE_URL}/#person` },
    copyrightHolder: { "@id": `${SITE_URL}/#person` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: "Fastering18",
    alternateName: ["Fastering", "FasteringDev", SITE_NAME],
    url: SITE_URL,
    logo: absoluteUrl("/android-chrome-512x512.png"),
    image: absoluteUrl("/images/og-image.png"),
    description: DEFAULT_DESCRIPTION,
    email: SITE_EMAIL,
    founder: { "@id": `${SITE_URL}/#person` },
    employee: { "@id": `${SITE_URL}/#person` },
    areaServed: "Worldwide",
    sameAs: [
      "https://github.com/Fastering18",
      "https://x.com/FasteringDev",
      "https://id.linkedin.com/in/muhammad-brahmana-priambudi-888042320",
    ],
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
    project.summary ||
      project.description.replace(/##\s+/g, "").replace(/\n+/g, " "),
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
    keywords: [...project.tags, "Fastering18", "Fastering"].join(", "),
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

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
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
    name: "Fastering18 Featured Projects",
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
