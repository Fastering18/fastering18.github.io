import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
loadEnv();

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { sql } from "drizzle-orm";
import { projects, skills, config } from "./schema";

const client = neon(process.env.DATABASE_URL!);
const db = drizzle(client);

async function ensureGalleryColumn() {
    await db.execute(sql`
        ALTER TABLE projects
        ADD COLUMN IF NOT EXISTS gallery text[] DEFAULT '{}'
    `);
}

async function seed() {
    console.log("🌱 Ensuring schema + re-seeding portfolio projects...");

    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL is missing. Run vercel env pull or set .env.local");
    }

    await ensureGalleryColumn();
    await db.delete(projects);

    const uniqueProjects = [
        {
            title: "Dive To Get Brainrots",
            summary:
                "Underwater survival tycoon: dive deeper for rarer brainrots while oxygen, weather, and offline income keep the loop alive.",
            description: `## Challenge
Brainrot collectors want a fresh loop that still feels familiar: go out, risk something real, bring back generators that print cash. Most entries copy the same land map. Dive To Get Brainrots flips the fantasy underwater—depth becomes both reward and danger.

## What I Built
As sole developer, I scripted the full experience from scratch on the Knit framework (Services + Controllers) so systems could ship and iterate in days instead of weeks. Players manage oxygen while swimming farther and deeper for stronger brainrot generators, then park those units to earn even while offline.

Core systems:
- Oxygen risk loop tied to dive distance and depth
- Brainrot collection, placement, and upgrade economy
- Offline earnings that keep players coming back
- Rotating weathers and server events on an auto cycle
- Full monetization stack (gamepasses, products, premium hooks)
- Admin tools for live ops, grants, and event control
- Asset integration for existing 2D/3D packs without blocking gameplay polish

## Architecture
Knit keeps server Services (economy, inventory, weather, monetization) cleanly separated from client Controllers (oxygen HUD, dive feedback, shop UX). That split made hotfixes and feature adds cheap during early launch traffic.

## Role
Sole developer — gameplay scripting, systems design, monetization, and admin tooling. Leveraged existing 2D & 3D assets so code and game-feel could stay the focus.`,
            image: "/images/projects/dive-brainrots-thumb.jpg",
            gallery: [
                "/images/projects/dive-brainrots-thumb.jpg",
                "/images/projects/dive-brainrots-underwater.png",
            ],
            tags: ["Roblox", "Knit", "Luau", "Tycoon", "Monetization"],
            projectDate: new Date("2026-05-21"),
            links: [
                {
                    label: "Play on Roblox",
                    url: "https://www.roblox.com/games/124900156756680/Dive-To-Get-Brainrots",
                    type: "roblox",
                },
            ],
            isVisible: true,
            order: 100,
        },
        {
            title: "Cast Magic For Brainrots",
            summary:
                "Wizard-themed brainrot tycoon shipped in under a week: aura grind, gate breaks, rebirths, and reusable live-ops systems.",
            description: `## Challenge
A week after Dive To Get Brainrots, the goal was a fresh theme with the same retention DNA—without rewriting every system from zero. Players needed a clear fantasy: train aura, smash gates, collect brainrots, climb the wizard ladder.

## What I Built
Sole developer again. Full script pass on Knit, reusing battle-tested patterns for weather, rebirth, monetization, and admin so the new theme could launch fast.

Core systems:
- AFK aura grind as the magic-power engine
- Gate destruction progression that opens new zones
- Aura shop tiers that meaningfully change pace
- Rebirth loop for long-horizon scaling
- Rotating weathers/events shared with the studio toolkit
- Monetization + admin panels reused and tightened for ops speed
- Client Controllers for cast feedback, gate hits, and inventory UX

## Impact
Finished in less than a week by treating services as product building blocks instead of one-off scripts. New theme, familiar depth—without a multi-month rewrite.

## Role
Sole developer — systems architecture, Knit services/controllers, economy tuning, and launch tooling. 2D/3D assets reused where they fit the magic fantasy.`,
            image: "/images/projects/cast-magic-thumbnail.png",
            gallery: [
                "/images/projects/cast-magic-thumbnail.png",
                "/images/projects/cast-magic-aura.png",
                "/images/projects/cast-magic-thumb.jpg",
            ],
            tags: ["Roblox", "Knit", "Luau", "Tycoon", "Rapid Ship"],
            projectDate: new Date("2026-05-04"),
            links: [
                {
                    label: "Play on Roblox",
                    url: "https://www.roblox.com/games/89358264187228/Cast-Magic-For-Brainrots",
                    type: "roblox",
                },
            ],
            isVisible: true,
            order: 95,
        },
        {
            title: "Fishjoy",
            summary:
                "Fishing + social sandbox with rods, baits, islands, and community-first beta tooling for a living hangout loop.",
            description: `## Challenge
Fishing games on Roblox often stop at "cast and wait." Fishjoy aims higher: a social hangout where fishing is satisfying, customization is deep, and the map rewards exploration.

## What I Built
Gameplay and systems work for a beta experience focused on feel first—cast timing, catch feedback, and progression that unlocks rods, baits, and islands without burying players in menus.

Highlights:
- Satisfying cast/reel feedback loop
- Progression across rods, baits, and collectible gear
- Multi-island discovery for long-session exploration
- Social-first structure so fishing doubles as a hangout
- Beta reporting path tied to community channels

## Status
Public beta. Bugs go to community socials; the loop keeps expanding as islands and economy pieces land.

## Role
Gameplay and systems development for Fashou Studio's fishing + social experience.`,
            image: "/images/projects/fishjoy-thumb.jpg",
            gallery: [
                "/images/projects/fishjoy-thumb.jpg",
                "/images/projects/fishjoy-gameplay.gif",
            ],
            tags: ["Roblox", "Fishing Sim", "Social", "Game Economy"],
            projectDate: new Date("2026-01-07"),
            links: [
                {
                    label: "Play Fishjoy",
                    url: "https://www.roblox.com/games/106891995545856/Fishjoy",
                    type: "roblox",
                },
            ],
            isVisible: true,
            order: 90,
        },
        {
            title: "Free Fashion UGC",
            summary:
                "Co-op luck ball economy that funds free limited UGC drops—237K+ visits, weekly item cadence, full scripter ownership.",
            description: `## Challenge
Free limited UGC needs a fair, readable economy: players should understand luck, risk, and reward before they break the glass ball. Fail states must feel honest, not random punishment.

## What I Built
As scripter (@Fastering18), I owned gameplay logic end-to-end. Players pass a glass ball to build luck, then break it for coins spent on limited UGC. New items land every 1–2 weeks.

Systems:
- Ball pass multiplayer state and ownership handoff
- Luck accumulation with a clear break risk model
- Fail path: low luck can yield zero coins + 300s ball cooldown
- Coin shop wired to rotating limited UGC catalog
- Codes (e.g. RELEASE), group/like gates, daily bonuses
- Premium 2× playtime rewards
- Reward surfaces and drop cadence support for live ops

## Impact
237.1K+ visits. UI design by @kadelyin; scripting and economy behavior owned here.

## Role
Scripter — multiplayer ball logic, economy, codes, rewards, and catalog hooks.`,
            image: "/images/projects/ugc-thumb.png",
            gallery: [
                "/images/projects/ugc-thumb.png",
                "/images/projects/ugc_game.png",
                "/images/projects/ugc-rewardings.png",
            ],
            tags: ["Roblox", "UGC", "Multiplayer", "Economy", "Live Ops"],
            projectDate: new Date("2025-06-23"),
            links: [
                {
                    label: "Play on Roblox",
                    url: "https://www.roblox.com/games/105245585048818/Free-Fashion-UGC",
                    type: "roblox",
                },
            ],
            isVisible: true,
            order: 85,
        },
        {
            title: "Institut Teknologi Sepuluh Nopember",
            summary:
                "Campus digital twin of ITS Surabaya—landmarks, social hub features, and multiplayer systems for the student community.",
            description: `## Challenge
Represent one of Indonesia's top technical universities inside Roblox with enough fidelity that students recognize home, and enough systems that the place works as a living campus hub—not a static diorama.

## What I Built
Head scripter for interactive campus systems on top of high-detail environment work (including the Rectorate landmark). Focus: features that make the map usable as a social and exploratory space.

Feature work includes:
- Animation systems for campus life moments
- Teleport network across campus zones
- Fishing and leisure activities for hangout sessions
- Leaderboards and competitive social hooks
- Multiplayer-friendly performance tuning for dense architecture

## Context
Institut Teknologi Sepuluh Nopember (ITS) sits in Surabaya, East Java. The experience doubles as community ground for ITS Roblox players and alumni curiosity traffic.

## Role
Head scripter — animation, teleport, fishing, leaderboards, and related campus feature development.`,
            image: "/images/projects/its_rektorat.png",
            gallery: [
                "/images/projects/its_rektorat.png",
                "/images/projects/its-thumb.jpg",
            ],
            tags: ["Roblox", "Lua", "Campus Twin", "Multiplayer"],
            projectDate: new Date("2025-07-17"),
            links: [
                {
                    label: "Visit Campus",
                    url: "https://www.roblox.com/games/74147470413984/Institut-Teknologi-Sepuluh-Nopember",
                    type: "roblox",
                },
            ],
            isVisible: true,
            order: 80,
        },
        {
            title: "Kliker Simulator",
            summary:
                "Pet-and-click progression sim: hatch, mutate, rank up, and island hop with UI built for huge number growth.",
            description: `## Challenge
Clicker sims die when numbers explode and the UI stalls. Kliker Simulator needed Pet Simulator–class loops—pets, mutations, ranks, islands—while staying readable on every click.

## What I Built
Sole developer on a full clicker progression stack: coins from clicks, pet hatch/mutate, ranks, and island discovery, with codes and community hooks for retention.

Systems:
- High-frequency click income with stable client feedback
- Pet hatch + mutate rarity ladder
- Rank unlocks that reframe mid-game goals
- Multi-island map progression
- Codes pipeline and social CTA integration
- UI panels for inventory, shop, and mutation states under heavy particle load

## Technical Notes
Large-number handling and responsive UI were the hard parts: upgrades and VFX can fire in bursts without freezing the main path. Beta feedback loop ran through community channels.

## Role
Sole developer — gameplay, progression economy, mutation systems, and UI.`,
            image: "/images/projects/kliker-lobby.png",
            gallery: [
                "/images/projects/kliker-lobby.png",
                "/images/projects/kliker-guis.png",
                "/images/projects/kliker-mutate.png",
                "/images/projects/kliker_sim.jpg",
                "/images/projects/kliker-thumb.jpg",
            ],
            tags: ["Roblox", "Simulator", "Pets", "UI", "Progression"],
            projectDate: new Date("2022-05-30"),
            links: [
                {
                    label: "Play Game",
                    url: "https://www.roblox.com/games/9769554963/Kliker-Simulator",
                    type: "roblox",
                },
            ],
            isVisible: true,
            order: 70,
        },
        {
            title: "Roblox FPS Combat Lab",
            summary:
                "Custom raycast weapon sandbox for recoil, ballistics feel, and cross-platform hit feedback on PC and mobile.",
            description: `## Challenge
"Game feel" in Roblox FPS work is easy to fake and hard to ship: recoil patterns, hit registration, and input latency have to hold up on both mouse and touch.

## What I Built
An experimental combat lab focused on weapon engine fundamentals—custom raycasting, recoil authoring, and snappy feedback—used as a foundation for broader shooter prototypes.

Systems explored:
- Raycast weapon core with configurable spreads and recoil curves
- Hit registration prioritising responsiveness over theatrics
- Lobby/loadout flows for rapid weapon comparison
- Mobile-aware control considerations alongside PC aim

## Role
Sole developer — combat mechanics R&D and weapon tooling.`,
            image: "/images/projects/fpsgame.png",
            gallery: [
                "/images/projects/fpsgame.png",
                "/images/projects/fps-pick-weapons.png",
                "/images/projects/fps-lobby-weapons-1.png",
                "/images/projects/fps-lobby-weapons-2.png",
            ],
            tags: ["Roblox", "FPS", "Combat", "Physics", "Mobile"],
            projectDate: new Date("2022-08-05"),
            links: [
                {
                    label: "Try Weapons",
                    url: "https://www.roblox.com/games/5911186985/Gun-testing",
                    type: "roblox",
                },
            ],
            isVisible: true,
            order: 60,
        },
        {
            title: "Goblox",
            summary:
                "Discord↔Roblox bridge bot and open tooling—verification, stats, and ops workflows across 300+ servers.",
            description: `## Challenge
Roblox communities live on Discord. Moderators need verification, stats, and remote actions without tab-hopping through five dashboards.

## What I Built
Goblox bridges Discord and Roblox: bot features for community ops plus open-source pieces and a web dashboard for monitoring and remote triggers.

Highlights:
- Account verification and Roblox-linked identity flows
- Server-facing utility commands for community managers
- Bridge API patterns for game ↔ Discord data
- Web dashboard surface for developer/ops visibility
- Scaled to 300+ Discord servers at peak before sunset of the hosted bot era

## Role
Sole developer — bot architecture (Discord.js / Node.js), bridge design, and dashboard work.`,
            image: "/images/projects/gobloxbot.png",
            gallery: [
                "/images/projects/gobloxbot.png",
                "/images/projects/goblox-topgg.png",
            ],
            tags: ["Discord.js", "Node.js", "API", "Open Source"],
            projectDate: new Date("2020-12-01"),
            links: [
                {
                    label: "Open Source",
                    url: "https://github.com/Fastering18/Goblox-open-source",
                    type: "github",
                },
                {
                    label: "Live Dashboard",
                    url: "https://goblox.web.app",
                    type: "web",
                },
            ],
            isVisible: true,
            order: 50,
        },
    ];

    console.log(`Adding ${uniqueProjects.length} projects...`);
    for (const p of uniqueProjects) {
        await db.insert(projects).values(p as any);
    }

    const existingSkills = await db.select().from(skills).limit(1);
    if (existingSkills.length === 0) {
        console.log("Seeding skills...");
        const skillRows = [
            { name: "Roblox Studio", category: "Languages & Game Development", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Roblox_player_icon_black.svg", order: 1 },
            { name: "Luau", category: "Languages & Game Development", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg", order: 2 },
            { name: "Knit", category: "Languages & Game Development", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg", order: 3 },
            { name: "TypeScript", category: "Languages & Game Development", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", order: 4 },
            { name: "JavaScript", category: "Languages & Game Development", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", order: 5 },
            { name: "Python", category: "Languages & Game Development", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", order: 6 },
            { name: "C#", category: "Languages & Game Development", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", order: 7 },
            { name: "Go", category: "Languages & Game Development", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg", order: 8 },
            { name: "Node.js", category: "Backend & Infrastructure", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", order: 1 },
            { name: "PostgreSQL", category: "Backend & Infrastructure", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", order: 2 },
            { name: "Firebase", category: "Backend & Infrastructure", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", order: 3 },
            { name: "Docker", category: "Backend & Infrastructure", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", order: 4 },
            { name: "MongoDB", category: "Backend & Infrastructure", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", order: 5 },
            { name: "Next.js", category: "Frontend & Design", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", order: 1 },
            { name: "React", category: "Frontend & Design", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", order: 2 },
            { name: "CSS3", category: "Frontend & Design", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", order: 3 },
            { name: "Figma", category: "Frontend & Design", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", order: 4 },
            { name: "Git", category: "Tooling & Productivity", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", order: 1 },
            { name: "VS Code", category: "Tooling & Productivity", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", order: 2 },
            { name: "Linux", category: "Tooling & Productivity", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", order: 3 },
        ];
        for (const s of skillRows) {
            await db.insert(skills).values({ ...s, isVisible: true });
        }
    }

    const existingConfig = await db.select().from(config).limit(1);
    if (existingConfig.length === 0) {
        const defaults = [
            { key: "show_hero", value: "true" },
            { key: "show_about", value: "true" },
            { key: "show_skills", value: "true" },
            { key: "show_projects", value: "true" },
            { key: "show_contact", value: "true" },
        ];
        for (const c of defaults) {
            await db.insert(config).values(c);
        }
    }

    console.log("✅ Seeding complete!");
}

seed()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
