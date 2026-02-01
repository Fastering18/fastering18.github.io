import { db } from "./index";
import { projects, skills, config } from "./schema";
import { projects as staticProjects } from "../../data/projects";
import { skillCategories as staticSkills } from "../../data/skills";

async function seed() {
    console.log("🌱 Seeding database...");

    // 1. Seed Projects
    console.log("Adding projects...");
    for (const p of staticProjects) {
        await db.insert(projects).values({
            title: p.title,
            description: p.description,
            image: p.image,
            tags: p.tags,
            link: p.link || "",
            github: p.github || "",
            year: p.year,
            isVisible: true,
            order: 0,
        });
    }

    // 2. Seed Skills
    console.log("Adding skills...");
    for (const category of staticSkills) {
        for (const s of category.skills) {
            await db.insert(skills).values({
                name: s.name,
                category: category.name,
                iconUrl: s.iconUrl || "",
                isVisible: true,
                order: 0,
            });
        }
    }

    // 3. Seed Config
    console.log("Adding initial config...");
    const initialConfig = [
        { key: "show_hero", value: "true" },
        { key: "show_about", value: "true" },
        { key: "show_skills", value: "true" },
        { key: "show_projects", value: "true" },
        { key: "show_github", value: "true" },
        { key: "show_contact", value: "true" },
        { key: "contact_email", value: "mbrahmana.p@gmail.com" },
    ];

    for (const c of initialConfig) {
        await db.insert(config).values(c).onConflictDoNothing();
    }

    console.log("✅ Seeding complete!");
}

seed().catch(console.error);
