import { Project } from "@/components/ProjectCard";

/** Static fallback / reference data. Live portfolio reads from the CMS database. */
export const projects: Project[] = [
  {
    id: 1,
    title: "Dive To Get Brainrots",
    summary:
      "Underwater survival tycoon: dive deeper for rarer brainrots while oxygen, weather, and offline income keep the loop alive.",
    description:
      "Sole developer. Knit services, oxygen risk loop, brainrot economy, monetization, admin tooling.",
    image: "/images/projects/dive-brainrots-thumb.jpg",
    tags: ["Roblox", "Knit", "Luau", "Tycoon"],
    projectDate: new Date("2026-05-21"),
    links: [
      {
        label: "Play",
        url: "https://www.roblox.com/games/124900156756680/Dive-To-Get-Brainrots",
        type: "roblox",
      },
    ],
  },
  {
    id: 2,
    title: "Cast Magic For Brainrots",
    summary:
      "Wizard-themed brainrot tycoon shipped in under a week with reusable live-ops systems.",
    description:
      "Sole developer. Aura grind, gates, rebirths, monetization on Knit.",
    image: "/images/projects/cast-magic-thumbnail.png",
    tags: ["Roblox", "Knit", "Luau"],
    projectDate: new Date("2026-05-04"),
    links: [
      {
        label: "Play",
        url: "https://www.roblox.com/games/89358264187228/Cast-Magic-For-Brainrots",
        type: "roblox",
      },
    ],
  },
  {
    id: 3,
    title: "Fishjoy",
    summary:
      "Fishing + social sandbox with rods, baits, islands, and community-first beta tooling.",
    description: "Gameplay and systems for a social fishing experience.",
    image: "/images/projects/fishjoy-thumb.jpg",
    tags: ["Roblox", "Fishing Sim", "Social"],
    projectDate: new Date("2026-01-07"),
    links: [
      {
        label: "Play",
        url: "https://www.roblox.com/games/106891995545856/Fishjoy",
        type: "roblox",
      },
    ],
  },
  {
    id: 4,
    title: "Free Fashion UGC",
    summary:
      "Co-op luck ball economy funding free limited UGC  -  237K+ visits).",
    description:
      "Scripter for multiplayer ball logic, economy, codes, and rewards.",
    image: "/images/projects/ugc-thumb.png",
    tags: ["Roblox", "UGC", "Multiplayer"],
    projectDate: new Date("2025-06-23"),
    links: [
      {
        label: "Play",
        url: "https://www.roblox.com/games/105245585048818/Free-Fashion-UGC",
        type: "roblox",
      },
    ],
  },
  {
    id: 5,
    title: "Institut Teknologi Sepuluh Nopember",
    summary:
      "Campus digital twin of ITS Surabaya with social multiplayer systems.",
    description:
      "Head scripter  -  animation, teleport, fishing, leaderboards.",
    image: "/images/projects/its_rektorat.png",
    tags: ["Roblox", "Lua", "Campus Twin"],
    projectDate: new Date("2025-07-17"),
    links: [
      {
        label: "Play",
        url: "https://www.roblox.com/games/74147470413984/Institut-Teknologi-Sepuluh-Nopember",
        type: "roblox",
      },
    ],
  },
  {
    id: 6,
    title: "Kliker Simulator",
    summary:
      "Pet-and-click progression sim with hatch, mutate, ranks, and islands.",
    description: "Sole developer  -  clicker economy, pets, mutations, UI.",
    image: "/images/projects/kliker-lobby.png",
    tags: ["Roblox", "Simulator", "Pets"],
    projectDate: new Date("2022-05-30"),
    links: [
      {
        label: "Play",
        url: "https://www.roblox.com/games/9769554963/Kliker-Simulator",
        type: "roblox",
      },
    ],
  },
  {
    id: 7,
    title: "Roblox FPS Combat Lab",
    summary:
      "Custom raycast weapon sandbox for recoil and cross-platform combat feel.",
    description: "Sole developer  -  weapon engine R&D.",
    image: "/images/projects/fpsgame.png",
    tags: ["Roblox", "FPS", "Combat"],
    projectDate: new Date("2022-08-05"),
    links: [
      {
        label: "Try",
        url: "https://www.roblox.com/games/5911186985/Gun-testing",
        type: "roblox",
      },
    ],
  },
  {
    id: 8,
    title: "Goblox",
    summary: "Discord-Roblox bridge bot across 300+ servers.",
    description: "Sole developer  -  Discord.js bridge and dashboard.",
    image: "/images/projects/gobloxbot.png",
    tags: ["Discord.js", "Node.js", "API"],
    projectDate: new Date("2020-12-01"),
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Fastering18/Goblox-open-source",
        type: "github",
      },
    ],
  },
];
