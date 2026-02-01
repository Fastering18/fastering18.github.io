import { db } from "./index";
import { projects, skills, config } from "./schema";

async function seed() {
    console.log("🌱 Cleaning and Re-seeding database with Vercel-ready structure...");

    await db.delete(projects);

    const uniqueProjects = [
        {
            title: "Institut Teknologi Sepuluh Nopember",
            summary: "A high-fidelity digital twin of the ITS campus in Roblox.",
            description: "An ambitious project bringing the iconic ITS campus to life in a shared 3D space. Featuring meticulously modeled landmarks like the central Rectorate building, this simulation serves as a social and exploratory hub for the campus community.\n\nKey features include realistic architecture, interactive campus points, and an optimized multiplayer environment that pushes the limits of Roblox Studio's visual fidelity.",
            image: "/images/projects/its_rektorat.png",
            tags: ["Roblox Studio", "Architectural Visualization", "Lua"],
            projectDate: new Date("2024-05-20"),
            links: [
                { label: "Play on Roblox", url: "https://www.roblox.com/games/74147470413984/Institut-Teknologi-Sepuluh-Nopember", type: "roblox" }
            ],
            isVisible: true,
            order: 10,
        },
        {
            title: "Free Fashion UGC",
            summary: "A community-driven marketplace for unique virtual apparel and accessories.",
            description: "A specialized Roblox experience focused on the Creator Economy. This platform allows players to discover and interact with high-quality User Generated Content (UGC) in a social environment. \n\nI implemented the back-end catalog systems, real-time item updates, and a glassmorphic UI that matches modern design standards, helping creators showcase their work effectively.",
            image: "/images/projects/ugc_game.png",
            tags: ["Game Design", "UGC Ecosystem", "Community"],
            projectDate: new Date("2024-03-15"),
            links: [
                { label: "Check it out", url: "https://www.roblox.com/games/105245585048818/Free-Fashion-UGC", type: "roblox" }
            ],
            isVisible: true,
            order: 9,
        },
        {
            title: "Fishjoy",
            summary: "Professional fishing simulator with deep economy and social features.",
            description: "Dive into the serene world of Fishjoy, a complete RPG-style fishing simulator. Beyond just casting lines, Fishjoy features a robust trading system, customizable profiles, expressive emotes, and a unique reward system including Robux gifting functionality.\n\nEngineered for high retention, the game includes progression mechanics, rare species collection, and a polished UI designed for maximum player comfort and engagement.",
            image: "/images/projects/fishjoy.png",
            tags: ["Game Economy", "Fishing Sim", "Social Features"],
            projectDate: new Date("2026-01-01"),
            links: [
                { label: "Play Fishjoy", url: "https://www.roblox.com/games/106891995545856/Fishjoy", type: "roblox" }
            ],
            isVisible: true,
            order: 20,
        },
        {
            title: "Kliker Simulator",
            summary: "Hyper-addictive clicker game with pets and massive multipliers.",
            description: "A classic Roblox clicker experience enhanced with modern progression loops. Players start with humble clicks and scale up through rebirths, unlocking powerful pet companions and secret zones.\n\nThe challenge was managing extremely large numbers and ensuring the UI remains responsive even when thousands of particles and upgrades are processed simultaneously.",
            image: "/images/projects/kliker_sim.jpg",
            tags: ["Simulator", "Progression Loops", "UI Design"],
            projectDate: new Date("2023-11-10"),
            links: [
                { label: "Play Game", url: "https://www.roblox.com/games/9769554963/Kliker-Simulator", type: "roblox" }
            ],
            isVisible: true,
            order: 7,
        },
        {
            title: "Roblox FPS Testing",
            summary: "Advanced weapon engine built to test ballistic physics and snappy combat.",
            description: "An experimental project focused on the core mechanics of first-person shooters. I developed a custom raycasting weapon system that handles projectile physics, recoil patterns, and high-performance hit registration.\n\nThis served as the technical foundation for more complex combat systems, prioritizing 'game feel' and player responsiveness.",
            image: "/images/projects/fpsgame.png",
            tags: ["Combat Mechanics", "Physics Engine", "FPS"],
            projectDate: new Date("2022-08-05"),
            links: [
                { label: "Try Weapons", url: "https://www.roblox.com/games/5911186985/Gun-testing", type: "roblox" }
            ],
            isVisible: true,
            order: 6,
        },
        {
            title: "Goblox",
            summary: "Open-source developer tools and bridge API for the Goblox ecosystem.",
            description: "Goblox is a bridge between the web and the Roblox developer environment. This project includes an open-source library and a comprehensive web dashboard for managing game state and developer resources.\n\nI built the front-end using modern web technologies to provide a seamless 'DevOps' experience for Roblox creators, allowing them to monitor data and trigger updates remotely.",
            image: "/images/projects/gobloxbot.png",
            tags: ["Open Source", "Bridge API", "Next.js"],
            projectDate: new Date("2024-12-01"),
            links: [
                { label: "Open Source", url: "https://github.com/Fastering18/Goblox-open-source", type: "github" },
                { label: "Live Dashboard", url: "https://goblox.web.app", type: "web" }
            ],
            isVisible: true,
            order: 5,
        }
    ];

    console.log("Adding projects...");
    for (const p of uniqueProjects) {
        await db.insert(projects).values(p as any);
    }

    console.log("✅ Seeding complete!");
}

seed().catch(console.error);
