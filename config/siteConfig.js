export const siteConfig = {
  // Personal Information
  personalInfo: {
    name: "Muhammad Brahmana Priambudi",
    shortName: "MBP",
    title: "Full Stack Developer",
    email: "fastering18@gmail.com",
    location: "Indonesia",
    bio: "I am a passionate Full Stack Developer with expertise in building modern web app and games proficient in Node.js, Lua, and Python",
  },

  // Social Media Links
  socialLinks: {
    github: "https://github.com/Fastering18",
    linkedin: "https://id.linkedin.com/in/muhammad-brahmana-priambudi-888042320",
    twitter: "https://x.com/FasteringDev",
    discord: "https://discord.com/users/775363892167573535"
  },

  // Navigation Links
  navLinks: [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Projects", href: "/#projects" },
    { name: "Contact", href: "/#contact" },
  ],

  // Skills
  skills: [
    {
      category: "Frontend",
      items: ["Next.js", "TypeScript", "HTML, JS, CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Python", "Go Fiber", "Express", "Flask", "PostgreSQL", "MongoDB"],
    },
    {
      category: "Tooling",
      items: ["Git", "VS Code", "Postman"],
    },
    {
      category: "Creative Content",
      items: ["LaTex", "manim"],
    },
  ],

  // Projects
  projects: [
    {
      title: "GBLK Language",
      description: "Localized programming languages based in Indonesia for education purposes.",
      image: "/static/images/projects/gblk.png",
      technologies: ["Node.js", "Interpreter"],
      githubLink: "https://github.com/Fastering18/node-gblok",
      liveLink: "https://gblk-lang.glitch.me",
    },
    {
      title: "Kliker Simulator",
      description: "A real-time Roblox clicker game with robust features.",
      image: "/static/images/projects/kliker_sim.jpg",
      technologies: ["Game Development", "Luau"],
      githubLink: "#",
      liveLink: "https://www.roblox.com/games/9769554963/UPDATE-2-Kliker-Simulator",
    },
  ],

  // Contact Form
  contactForm: {
    title: "Get In Touch",
    description: "Feel free to reach out to me for any questions or opportunities.",
    email: "fastering18@gmail.com",
  },

  // Assets
  assets: {
    profileImage: "/static/images/brahmana1.png",
    favicon: "/static/images/favicon/favicon.ico",
    logo: "/static/images/brahmana1.png",
  },
}; 