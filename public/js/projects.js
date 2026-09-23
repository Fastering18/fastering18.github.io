const PROJECTS_DATA = [
  {
    "title": "Modern Tycoon (WIP)",
    "year": "2026",
    "link": "https://www.roblox.com/communities/473412658/Legacy-Dynamics",
    "description": "$14.2K+ game project for building giga factory simulation in Roblox.",
    "thumbnail": "../assets/projects/Modern Tycoon.png",
    "icon": {
      "type": "image",
      "src": "../assets/rostud.png",
      "alt": "Roblox Studio"
    }
  },
  {
    "title": "SAGE",
    "year": "2026",
    "link": "https://github.com/Fastering18/sage",
    "description": "Sentient Agent for Game Engineering built with Rust for intelligent game development automation.",
    "thumbnail": "../assets/projects/sage.png",
    "icon": {
      "type": "devicon",
      "class": "devicon-rust-plain colored"
    }
  },
  {
    "title": "Graphnuts",
    "year": "2026",
    "link": "https://github.com/Fastering18/graphnuts",
    "description": "Customizable interactive graphing engine combining textual commands with dynamic visual node control.",
    "thumbnail": "../assets/projects/graphnuts.webp",
    "icon": {
      "type": "devicon",
      "class": "devicon-typescript-plain colored"
    }
  },
  {
    "title": "Manifast",
    "year": "2026",
    "link": "https://github.com/Fastering18/Manifast",
    "description": "A fast, scriptable programming language with Indonesian-inspired syntax built in C++.",
    "icon": {
      "type": "code",
      "text": "&lt;mnf/&gt;",
      "class": "text-warning"
    },
    "preview": "<div style=\"color: #64748b; font-size: 0.72rem; margin-bottom: 3px;\">// Indonesian syntax</div><div style=\"white-space: nowrap;\"><span class=\"text-warning font-weight-bold\">fungsi</span> <span class=\"text-info\">jumlah</span>(a, b)</div><div style=\"white-space: nowrap; padding-left: 1rem;\"><span class=\"text-warning font-weight-bold\">print</span>(<span class=\"text-success\">&quot;jumlahnya&quot;</span>, a + b)</div><div style=\"white-space: nowrap;\"><span class=\"text-warning font-weight-bold\">tutup</span></div>"
  },
  {
    "title": "Cast Magic For Brainrots",
    "year": "2025",
    "link": "https://www.roblox.com/games/89358264187228/Cast-Magic-For-Brainrots",
    "description": "Wizard-themed brainrot tycoon shipped in under a week with aura grind, gate breaks, rebirths, and reusable live ops systems.",
    "thumbnail": "../assets/projects/castmagic.png",
    "icon": {
      "type": "fa",
      "class": "fa-solid fa-wand-magic-sparkles text-primary"
    }
  },
  {
    "title": "Dive To Get Brainrots",
    "year": "2025",
    "link": "https://www.roblox.com/games/124900156756680/Dive-To-Get-Brainrots",
    "description": "Underwater survival tycoon where you dive deeper for rarer brainrots while oxygen, weather, and offline income keep the loop alive.",
    "thumbnail": "../assets/projects/underwaterbrainrot.png",
    "icon": {
      "type": "fa",
      "class": "fa-solid fa-water text-info"
    }
  },
  {
    "title": "Fishjoy",
    "year": "2025",
    "link": "https://www.roblox.com/games/106891995545856/Fishjoy",
    "description": "Fishing and social sandbox with rods, baits, islands, and community-first beta tooling for a living hangout loop.",
    "thumbnail": "../assets/projects/Fishjoy.png",
    "icon": {
      "type": "fa",
      "class": "fa-solid fa-fish text-info"
    }
  },
  {
    "title": "Free Fashion UGC",
    "year": "2025",
    "link": "https://www.roblox.com/games/105245585048818/Free-Fashion-UGC",
    "description": "Co-op luck ball economy that funds free limited UGC drops, with 237K+ visits, weekly item cadence, and full scripter ownership.",
    "thumbnail": "../assets/projects/Freeugc.png",
    "icon": {
      "type": "fa",
      "class": "fa-solid fa-shirt text-warning"
    }
  },
  {
    "title": "Institut Teknologi Sepuluh Nopember",
    "year": "2025",
    "link": "https://www.roblox.com/games/74147470413984/Institut-Teknologi-Sepuluh-Nopember",
    "description": "Campus digital twin of ITS Surabaya with landmarks, social hub features, and multiplayer systems for the student community.",
    "thumbnail": "../assets/projects/itsmap.png",
    "icon": {
      "type": "fa",
      "class": "fa-solid fa-building-columns text-primary"
    }
  },
  {
    "title": "Roblox FPS Combat Lab",
    "year": "2025",
    "link": "https://www.roblox.com/games/5911186985/Gun-testing",
    "description": "Custom raycast weapon sandbox for recoil, ballistics feel, and cross-platform hit feedback on PC and mobile.",
    "thumbnail": "../assets/projects/fpsmap.png",
    "icon": {
      "type": "fa",
      "class": "fa-solid fa-crosshairs text-danger"
    }
  },
  {
    "title": "OSeKAI",
    "year": "2022",
    "link": "https://github.com/Fastering18/OSeKAI",
    "description": "Experimental 32-bit x86 hobby operating system kernel written in C and Assembly.",
    "thumbnail": "../assets/projects/osekai.png",
    "icon": {
      "type": "devicon",
      "class": "devicon-c-plain colored"
    }
  },
  {
    "title": "Kliker Simulator",
    "year": "2022",
    "link": "https://www.roblox.com/games/9769554963/Kliker-Simulator",
    "description": "Pet and click progression sim where you hatch, mutate, rank up, and island hop with UI built for huge number growth.",
    "thumbnail": "../assets/projects/klikersim.png",
    "icon": {
      "type": "fa",
      "class": "fa-solid fa-hand-pointer text-warning"
    }
  },
  {
    "title": "lua-brainfuck",
    "year": "2022",
    "link": "https://github.com/Fastering18/lua-brainfuck",
    "description": "Minimalist Brainfuck esoteric programming language interpreter implemented in Lua.",
    "icon": {
      "type": "devicon",
      "class": "devicon-lua-plain colored"
    }
  },
  {
    "title": "gpm-gblk",
    "year": "2021",
    "link": "https://github.com/Fastering18/gpm-gblk",
    "description": "Package manager and package repository tooling for the GBLK programming language written in JavaScript.",
    "icon": {
      "type": "devicon",
      "class": "devicon-javascript-plain colored"
    }
  },
  {
    "title": "haskell-scanner-8",
    "year": "2021",
    "link": "https://github.com/Fastering18/haskell-scanner-8",
    "description": "Lexical scanner and syntax analyzer Discord bot implemented in purely functional Haskell.",
    "icon": {
      "type": "devicon",
      "class": "devicon-haskell-plain colored"
    }
  },
  {
    "title": "JS-like-discordia-bot",
    "year": "2021",
    "link": "https://github.com/Fastering18/JS-like-discordia-bot",
    "description": "Discord bot framework enabling JavaScript-style asynchronous utility functions in Luvit and Discordia.",
    "icon": {
      "type": "devicon",
      "class": "devicon-lua-plain colored"
    }
  },
  {
    "title": "node-gblok",
    "year": "2021",
    "link": "https://github.com/Fastering18/node-gblok",
    "description": "Interpreter and execution runtime for the custom GBLK programming language written in Node.js.",
    "thumbnail": "../assets/projects/nodegblok.jpg",
    "icon": {
      "type": "devicon",
      "class": "devicon-nodejs-plain colored"
    }
  },
  {
    "title": "letyra-app",
    "year": "2021",
    "link": "https://github.com/Fastering18/letyra-app",
    "description": "Mobile client application for the Letyra platform developed using Flutter and Dart.",
    "icon": {
      "type": "devicon",
      "class": "devicon-flutter-plain colored"
    }
  },
  {
    "title": "discord-ws",
    "year": "2021",
    "link": "https://github.com/Fastering18/discord-ws",
    "description": "Minimalist, zero-dependency Discord client communicating directly over WebSockets in JavaScript.",
    "icon": {
      "type": "devicon",
      "class": "devicon-javascript-plain colored"
    }
  },
  {
    "title": "discord-decorator",
    "year": "2021",
    "link": "https://github.com/Fastering18/discord-decorator",
    "description": "Experimental syntactic decorator parser for building structured Discord command handlers in JavaScript.",
    "icon": {
      "type": "devicon",
      "class": "devicon-javascript-plain colored"
    }
  },
  {
    "title": "DotNet-Scanner-4",
    "year": "2021",
    "link": "https://github.com/Fastering18/DotNet-Scanner-4",
    "description": "Lexical token scanner and source analyzer Discord bot implemented in C# on .NET.",
    "icon": {
      "type": "devicon",
      "class": "devicon-csharp-plain colored"
    }
  },
  {
    "title": "brainly-wrapper",
    "year": "2021",
    "link": "https://github.com/Fastering18/brainly-wrapper",
    "description": "Unofficial Node.js API wrapper to search questions and fetch study solutions from Brainly.",
    "icon": {
      "type": "devicon",
      "class": "devicon-javascript-plain colored"
    }
  },
  {
    "title": "Indihum-Discord-RichPresence",
    "year": "2021",
    "link": "https://github.com/Fastering18/Indihum-Discord-RichPresence",
    "description": "Desktop Discord Rich Presence manager written in C# with custom network status integration.",
    "thumbnail": "../assets/projects/indihum.png",
    "icon": {
      "type": "devicon",
      "class": "devicon-csharp-plain colored"
    }
  },
  {
    "title": "Goblox",
    "year": "2021",
    "link": "https://github.com/Fastering18/Goblox-open-source",
    "description": "Discord and Roblox bridge bot with open tooling for verification, stats, and ops workflows across 300+ servers.",
    "thumbnail": "../assets/projects/goblox.png",
    "icon": {
      "type": "fa",
      "class": "fa-brands fa-discord text-primary"
    }
  },
  {
    "title": "LuavaScript",
    "year": "2021",
    "link": "https://github.com/Fastering18/LuavaScript",
    "description": "Implementation of standard JavaScript utility functions and prototypes ported natively to Lua.",
    "icon": {
      "type": "devicon",
      "class": "devicon-lua-plain colored"
    }
  },
  {
    "title": "open-source-KitaKanBot",
    "year": "2021",
    "link": "https://github.com/Fastering18/open-source-KitaKanBot",
    "description": "Open-source moderation and community engagement Discord bot tailored for the KitaKan server.",
    "icon": {
      "type": "devicon",
      "class": "devicon-javascript-plain colored"
    }
  },
  {
    "title": "Goblox.js",
    "year": "2020",
    "link": "https://github.com/Fastering18/Goblox.js",
    "description": "Unofficial, feature-rich Node.js API wrapper for interacting with Roblox platform endpoints.",
    "icon": {
      "type": "devicon",
      "class": "devicon-javascript-plain colored"
    }
  },
  {
    "title": "Well Of Hell",
    "year": "2020",
    "link": "https://www.roblox.com/games/6134116519/Well-of-Hell",
    "description": "Reversed tower of hell gameplay featuring intense vertical descent challenges and parkour mechanics.",
    "thumbnail": "../assets/projects/wellofhell.png",
    "icon": {
      "type": "image",
      "src": "../assets/rostud.png",
      "alt": "Roblox Studio"
    }
  }
];

const YEAR_BADGE_MAP = {
  '2026': 'badge-year-2026',
  '2025': 'badge-year-2025',
  '2022': 'badge-year-2022',
  '2021': 'badge-year-2021',
  '2020': 'badge-year-2020'
};

document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('projects-grid');
    const countBadge = document.getElementById('projects-count');
    const searchInput = document.getElementById('project-search');
    const filterContainer = document.getElementById('year-filters');

    if (!gridContainer) return;

    let activeFilter = 'All';

    function renderIcon(icon) {
        if (!icon) return '<i class="fa-solid fa-cube text-primary"></i>';
        if (icon.type === 'image') {
            return `<img src="${icon.src}" alt="${icon.alt || 'Icon'}">`;
        }
        if (icon.type === 'devicon') {
            return `<i class="${icon.class}"></i>`;
        }
        if (icon.type === 'fa') {
            return `<i class="${icon.class}"></i>`;
        }
        if (icon.type === 'code') {
            return `<code class="${icon.class} font-weight-bold" style="font-size: 0.8rem;">${icon.text}</code>`;
        }
        return '<i class="fa-solid fa-cube text-primary"></i>';
    }

    function createProjectCard(item) {
        const badgeClass = YEAR_BADGE_MAP[item.year] || 'badge-year-default';

        let headerBoxHtml = '';
        if (item.preview) {
            headerBoxHtml = `
                <div class="project-thumb-box d-flex flex-column justify-content-center px-3 py-2 text-left" style="font-family: Consolas, 'Fira Code', 'Courier New', monospace; font-size: 0.76rem; line-height: 1.5; background: rgba(10, 15, 29, 0.95);">
                    ${item.preview}
                </div>
            `;
        } else if (item.thumbnail) {
            headerBoxHtml = `
                <div class="project-thumb-box">
                    <img src="${item.thumbnail}" alt="${item.title}" class="project-thumb-img" loading="lazy">
                </div>
            `;
        } else {
            headerBoxHtml = `
                <div class="project-thumb-box d-flex flex-column align-items-center justify-content-center text-center p-3" style="background: rgba(15, 23, 42, 0.45);">
                    <i class="fa-solid fa-image text-secondary mb-2" style="font-size: 1.4rem; opacity: 0.35;"></i>
                    <span class="text-muted small font-weight-bold" style="letter-spacing: 0.05em; font-size: 0.75rem;">No Preview</span>
                </div>
            `;
        }

        return `
            <div class="col-md-6 col-lg-4 mb-4 project-card-item">
                <div class="card-box h-100 d-flex flex-column justify-content-between">
                    <div>
                        ${headerBoxHtml}
                        <div class="d-flex align-items-center justify-content-between mb-3">
                            <div class="project-icon-badge" title="${item.title}">
                                ${renderIcon(item.icon)}
                            </div>
                            <span class="badge ${badgeClass} px-2 py-1">${item.year}</span>
                        </div>
                        <h5 class="font-weight-bold mb-2">
                            <a href="${item.link}" target="_blank" rel="noopener" class="project-title-link">
                                <i class="fa-solid fa-link text-primary mr-1"></i> ${item.title}
                            </a>
                        </h5>
                        <p class="text-muted small mb-0">
                            ${item.description}
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    function renderProjects(items) {
        if (!items || items.length === 0) {
            gridContainer.innerHTML = `
                <div class="col-12 py-5 text-center text-muted">
                    <i class="fa-solid fa-folder-open fa-2x mb-3 text-secondary"></i>
                    <p class="mb-0">No projects matching your search criteria.</p>
                </div>
            `;
            if (countBadge) countBadge.textContent = '0 Projects';
            return;
        }

        gridContainer.innerHTML = items.map(createProjectCard).join('');
        if (countBadge) {
            countBadge.textContent = `${items.length} of ${PROJECTS_DATA.length} Works`;
        }
    }

    function applyFilterAndSearch() {
        const query = (searchInput ? searchInput.value : '').trim().toLowerCase();

        const filtered = PROJECTS_DATA.filter(project => {
            const matchesYear = activeFilter === 'All' || project.year === activeFilter;
            const matchesQuery = !query || 
                project.title.toLowerCase().includes(query) ||
                project.description.toLowerCase().includes(query) ||
                project.year.includes(query);
            return matchesYear && matchesQuery;
        });

        renderProjects(filtered);
    }

    function setupFilters() {
        if (!filterContainer) return;

        const years = ['All', ...new Set(PROJECTS_DATA.map(p => p.year))].sort((a, b) => {
            if (a === 'All') return -1;
            if (b === 'All') return 1;
            return b.localeCompare(a);
        });

        filterContainer.innerHTML = years.map(year => `
            <button type="button" class="btn btn-sm ${year === 'All' ? 'btn-primary-custom' : 'btn-outline-custom'} filter-btn mr-1 mb-2" data-year="${year}">
                ${year}
            </button>
        `).join('');

        filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                filterContainer.querySelectorAll('.filter-btn').forEach(b => {
                    b.classList.remove('btn-primary-custom');
                    b.classList.add('btn-outline-custom');
                });
                btn.classList.remove('btn-outline-custom');
                btn.classList.add('btn-primary-custom');

                activeFilter = btn.dataset.year;
                applyFilterAndSearch();
            });
        });
    }

    setupFilters();
    renderProjects(PROJECTS_DATA);

    if (searchInput) {
        searchInput.addEventListener('input', applyFilterAndSearch);
    }
});
