export interface Skill {
    name: string;
    iconUrl?: string;
}

export interface SkillCategory {
    name: string;
    skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
    {
        name: "Languages & Game Development",
        skills: [
            { name: "Roblox Studio", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Roblox_player_icon_black.svg" },
            { name: "Lua", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg" },
            { name: "C", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
            { name: "C++", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
            { name: "C#", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
            { name: "Go", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg" },
            { name: "Python", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
            { name: "JavaScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
            { name: "TypeScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
            { name: "Dart", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
            { name: "Bash", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
            { name: "Mojo", iconUrl: "🔥" }, // Custom URL or generic
        ],
    },
    {
        name: "Backend & Infrastructure",
        skills: [
            { name: "Node.js", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
            { name: "Express", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
            { name: "Flask", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
            { name: "Firebase", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
            { name: "PostgreSQL", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
            { name: "MongoDB", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
            { name: "Docker", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        ],
    },
    {
        name: "Frontend & Design",
        skills: [
            { name: "Next.js", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
            { name: "React", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            { name: "Figma", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
            { name: "HTML5", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
            { name: "CSS3", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        ],
    },
    {
        name: "Tooling & Productivity",
        skills: [
            { name: "Git", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
            { name: "VS Code", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
            { name: "Postman", iconUrl: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
            { name: "Jira", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" },
            { name: "Linux", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
        ],
    },
];

export const socialLinks = [
    {
        name: "GitHub",
        url: "https://github.com/Fastering18",
        icon: "github",
    },
    {
        name: "LinkedIn",
        url: "https://id.linkedin.com/in/muhammad-brahmana-priambudi-888042320",
        icon: "linkedin",
    },
    {
        name: "Discord",
        url: "https://discord.com/users/775363892167573535",
        icon: "discord",
    },
    {
        name: "Twitter",
        url: "https://x.com/FasteringDev",
        icon: "twitter",
    },
];
