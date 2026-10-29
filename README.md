# Ugandhar Vaddi — Personal Engineering Portfolio

Official repository for [ugandhar.in](https://ugandhar.in).

An editorial, architectural engineering portfolio built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**. Designed with an uncompromising focus on typographic hierarchy, whitespace, high-contrast monochrome design tokens, instant responsiveness, and buttery smooth scrolling across mobile devices and Gecko-based browsers (Firefox on Linux, macOS, and Windows).

---

## 🏛 Design Philosophy & Architecture

The portfolio eschews generic modern AI templates (glowing rounded bento cards, neon drop-shadows, badge pill walls) in favor of a timeless, architectural design language inspired by modern editorial studios (Neutra VDL, Michael Ding Young, Valentin Mor):

- **Typographic Hierarchy**: High-contrast pairing of **Geist Sans** (clean modern sans), **Geist Mono** (tabular numbers, metrics, code, timestamps), and **Newsreader** (editorial italic accents for titles and philosophy).
- **Architectural Grid**: Micro-hairline borders (`1px border-border`), generous whitespace, tabular column layouts, and zero-distraction structured sections.
- **Monochrome Design Tokens**: High-contrast obsidian (`#121211`) and carbon (`#161616`) dark mode; pure bone (`#F8F7F4`) and warm parchment (`#EFECE6`) light mode. Unwanted green/olive tints are completely eliminated.
- **Gecko & Mobile Optimized**:
  - Floating navigation dock is centered using viewport inset constraints (`inset-x-0`) with `pointer-events-none` on the container and `pointer-events-auto` on the dock to prevent click blocking.
  - Dedicated hardware compositing layers (`.gpu-layer` with `backface-visibility: hidden` and `will-change: transform`) ensure 60fps stutter-free scrolling on Firefox (Linux/macOS/Windows) and mobile WebKit.
  - Touch target sizing (`min-h-[40px]`), `touch-manipulation` to eliminate mobile 300ms tap delay, and `break-words` on all monospace metadata strings to prevent horizontal layout blowout.
- **Dynamic Content & Real-Time Sync**: ISR (Incremental Static Regeneration, 60s) continuously fetches latest essays from [blog.ugandhar.in](https://blog.ugandhar.in) via RSS with automatic fallback to static local cache.
- **Comprehensive SEO**: Rich JSON-LD `ProfilePage` structured schema (`hasOccupation`, `alumniOf`, `knowsAbout`), OpenGraph, Twitter summary cards, dynamic `sitemap.xml`, and clean `robots.txt`.
- **Dedicated Resume View**: `/resume` route with direct PDF embedding, responsive status card, and zero-overhead fast loading.

---

## 📂 Project Directory Structure

```
Portfolio/
├── .vscode/
│   ├── extensions.json             # Recommended VS Code extensions
│   ├── settings.json               # Editor formatting & Tailwind IntelliSense
│   └── tasks.json                  # One-click dev, build, and test tasks
├── public/
│   ├── avatar/
│   │   └── profile.jpg             # High-resolution square portrait photo
│   ├── resume/
│   │   └── Resume.pdf              # Official downloadable / viewable resume PDF
│   ├── icon.png                    # App & bookmark icon
│   ├── icon-sm.png                 # Small header identity icon
│   └── robots.txt                  # Search engine crawler permissions
├── src/
│   ├── app/
│   │   ├── [...not_found]/         # 307 redirect catch-all route to root
│   │   ├── api/
│   │   │   └── blog/               # Next.js API route fetching RSS from blog.ugandhar.in
│   │   ├── resume/
│   │   │   ├── page.tsx            # Dedicated /resume page with PDF viewer
│   │   │   └── ResumeStatusCard.tsx# Interactive metadata & download action card
│   │   ├── globals.css             # Architectural HSL tokens, scrollbar, GPU utilities
│   │   ├── layout.tsx              # Root HTML, Geist & Newsreader fonts, JSON-LD Schema
│   │   ├── page.tsx                # Main single-page portfolio layout
│   │   └── sitemap.ts              # Dynamic sitemap generation
│   ├── components/
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx         # Architectural header, bio, contact pills, portrait
│   │   │   ├── ProjectsSection.tsx     # Filterable project index, metrics, contributor tags
│   │   │   ├── ExperienceSection.tsx   # Work experience, roles, responsibilities, competencies
│   │   │   ├── SkillsSection.tsx       # Domain classification & technical skills grid
│   │   │   ├── EducationSection.tsx    # Academic degrees, grade metrics, and focus areas
│   │   │   ├── WritingSection.tsx      # Synced blog essays from blog.ugandhar.in
│   │   │   ├── MediaSection.tsx        # YouTube playlists, videos, and tutorials
│   │   │   └── ContactFooter.tsx       # Direct contact channels, time zone, and footer
│   │   └── ui/
│   │       ├── MagneticDock.tsx        # Floating centered bottom navigation bar
│   │       ├── ThemeToggle.tsx         # Smooth client-side Dark / Light toggle switch
│   │       └── SocialIcons.tsx         # High-precision SVG brand icons
│   ├── data/
│   │   └── portfolio.ts            # Central single source of truth for ALL content
│   └── lib/
│       ├── blog.ts                 # RSS parser & static cache fallback for blog posts
│       └── utils.ts                # Tailwind class merge utility (clsx + tailwind-merge)
├── .eslintrc.json                  # Next.js ESLint configuration
├── .gitattributes                  # Cross-platform LF line endings enforcement
├── package.json                    # Project dependencies and scripts
├── tailwind.config.ts              # Tailwind theme configuration
└── tsconfig.json                   # TypeScript configuration
```

---

## ✍️ Content Management Guide (How to Update or Add Content)

All content across the entire portfolio is centralized in a single configuration file:

```
src/data/portfolio.ts
```

You do not need to touch React components to update your bio, projects, experiences, or education. Simply edit `src/data/portfolio.ts`.

---

### 1. Update Bio, Taglines, and Social Links

Find `PERSONAL_INFO` near the top of `src/data/portfolio.ts`:

```typescript
export const PERSONAL_INFO = {
  name: "Ugandhar Vaddi",
  title: "Associate Data Scientist & Software Engineer",
  headline: "Silicon, Systems & Applied Machine Learning.",
  domain: "ugandhar.in",
  blogDomain: "blog.ugandhar.in",
  location: "Visakhapatnam & Chennai, India",
  email: "annajiratnam@gmail.com",
  summary: "Associate Data Scientist at Tredence (Analytics & Applied AI) and graduate in Electronics & Communication...",
  status: "Available for high-impact engineering & research collaborations",
  social: {
    github: "https://github.com/uga961",
    linkedin: "https://www.linkedin.com/in/vaddi-ugandhar",
    youtube: "https://youtube.com/@uga961",
    email: "mailto:annajiratnam@gmail.com",
  },
};
```

---

### 2. Add or Edit a Project

Add a new object to the `PROJECTS` array in `src/data/portfolio.ts`:

#### A. Standard Open-Source Project:
```typescript
{
  id: "my-project-id",
  title: "Project Name",
  subtitle: "One-line architectural description",
  description: "Detailed 2-3 sentence overview explaining what was built, how it solves the problem, and technical highlights.",
  category: "Desktop & Web", // Choose: "AI & ML" | "Hardware & VLSI" | "Desktop & Web"
  tags: [".NET 8", "C#", "WPF", "Windows API"],
  metrics: "Production v2.1 · 500+ active users", // Optional metric or measurement
  githubUrl: "https://github.com/uga961/my-project",
  liveUrl: "https://myproject.ugandhar.in", // Optional live demo URL
  featured: true, // true displays it with a gold star badge
  date: "Oct 2026",
  contributors: [] // Leave empty for solo projects
}
```

#### B. Collaborative Project (With Contributor Credits):
```typescript
{
  id: "sram-design",
  title: "Low-Power SRAM Memory Cell Architecture",
  subtitle: "Sub-threshold 6T and 7T Cell Stability Analysis",
  description: "Designed sub-threshold 6T and 7T SRAM memory cells in Cadence Virtuoso...",
  category: "Hardware & VLSI",
  tags: ["Cadence Virtuoso", "Spectre", "Analog VLSI", "45nm CMOS"],
  metrics: "Cadence Virtuoso Verified · 18% SNM improvement",
  githubUrl: "https://github.com/uga961/sram-design",
  featured: true,
  date: "Dec 2025 – May 2026",
  contributors: ["Naralasetti Umesh"] // Displays "Collaborative Research with Naralasetti Umesh"
}
```

#### C. Proprietary / Internal Enterprise Project (Hides Code Links):
```typescript
{
  id: "enterprise-pipeline",
  title: "Predictive Analytics Architecture",
  subtitle: "Distributed Data & Model Orchestration",
  description: "Designed high-throughput ETL and predictive feature engineering pipelines...",
  category: "AI & ML",
  tags: ["Python", "PySpark", "MLflow", "Docker"],
  metrics: "Enterprise Deployment · Scaled to 10M+ records",
  isProprietary: true, // Hides GitHub/Live demo links and displays "Proprietary" badge
  featured: true,
  date: "Nov 2026 – Present"
}
```

---

### 3. Add or Edit Work Experience

Add an object to the `EXPERIENCES` array in `src/data/portfolio.ts`:

```typescript
{
  company: "Tredence",
  role: "Associate Data Scientist",
  period: "Nov 2026 – Present (Joining Soon)",
  location: "Chennai, India",
  type: "Full-time",
  team: "Analytics & Applied AI",
  isIncoming: true, // Displays high-contrast "Joining Soon" tag
  description: "Incoming Associate Data Scientist focusing on predictive modeling and multi-agent AI tooling.",
  bullets: [
    "Developing production machine learning models and end-to-end data pipelines for enterprise clients.",
    "Investigating generative AI agents and retrieval-augmented architectures for automated insight delivery.",
    "Collaborating with cross-functional engineering teams on model optimization, latency reduction, and deployment."
  ],
  skills: ["Python", "Machine Learning", "Applied AI", "Data Science", "SQL", "Deep Learning"],
  repoUrl: "https://github.com/uga961/practice-repo" // Optional practice or notes repo
}
```

---

### 4. Update Skills & Technical Disciplines

Find `SKILL_GROUPS` in `src/data/portfolio.ts` to edit domains, category names, or individual technical capabilities:

```typescript
export const SKILL_GROUPS = [
  {
    category: "Languages & Core Runtimes",
    skills: ["Python", "C#", "C", "C++", "SQL", "Verilog HDL", "TypeScript", "JavaScript"],
  },
  {
    category: "Machine Learning & Applied AI",
    skills: ["PyTorch", "scikit-learn", "TensorFlow", "Pandas", "NumPy", "OpenCV", "NLP", "LLM APIs"],
  },
  {
    category: "Hardware & EDA Engineering",
    skills: ["Cadence Virtuoso", "Cadence Spectre", "Xilinx Vivado", "ModelSim", "VLSI CAD", "Arduino", "Embedded Systems"],
  },
  {
    category: "Frameworks, Systems & Cloud",
    skills: [".NET 8", "WPF", "Next.js", "React", "Linux / Fedora", "Docker", "Git", "VS Code"],
  },
];
```

---

### 5. Update Education Records

Find `EDUCATION` in `src/data/portfolio.ts`:

```typescript
export const EDUCATION = [
  {
    institution: "Sathyabama Institute of Science and Technology",
    degree: "Bachelor of Engineering (B.E.), Electronics and Communication Engineering",
    period: "Aug 2022 – May 2026",
    grade: "9.2 CGPA",
    location: "Chennai, India",
    focus: [
      "Embedded Systems",
      "VLSI CAD",
      "RTL Design",
      "Digital Signal Processing",
      "Microcontrollers"
    ],
  },
];
```

---

### 6. Update YouTube Tutorials & Playlists

In `src/data/portfolio.ts`, update `YOUTUBE_CONTENT.items`:

```typescript
export const YOUTUBE_CONTENT: YouTubeContent = {
  channelName: "Ugandhar Vaddi",
  handle: "@uga961",
  url: "https://youtube.com/@uga961",
  description: "Workshops, programming series, and technical tutorials.",
  items: [
    {
      badge: "Featured Playlist",
      type: "Playlist",
      title: "Learn PYTHON in 5 Days or Less",
      description: "Hands-on accelerated curriculum covering Python fundamentals, OOP, data structures, and practical scripting in Google Colab.",
      url: "https://www.youtube.com/playlist?list=PL42_MhYn2V2U-2pDqO1B1P3c8N3f8-KkM",
      topics: ["Python", "Google Colab", "OOP", "Data Structures"],
    },
    {
      badge: "Latest Tutorial",
      type: "Video",
      title: "Data Visualization in Python | Complete Seaborn & Matplotlib Guide",
      description: "Step-by-step masterclass on exploratory data analysis, correlation matrices, aesthetic customization, and publication-ready charts.",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      topics: ["Matplotlib", "Seaborn", "Pandas", "Data Visualization"],
    },
  ],
};
```

---

### 7. Update Resume PDF or Profile Photo

- **Resume PDF**: Replace the file at `public/resume/Resume.pdf`. The site will immediately reflect the new PDF both on the main page download buttons and on the `/resume` dedicated viewer.
- **Profile Avatar**: Replace the file at `public/avatar/profile.jpg`. Recommended size is `800x800` or higher square image.
- **Favicon / Logo**: Replace `public/icon.png` or `public/icon-sm.png`.

---

### 8. How Blog Synchronization Works

- The portfolio automatically syncs articles from `https://blog.ugandhar.in/feed.xml`.
- When users visit the site, Next.js performs an ISR fetch (`revalidate: 60` seconds) via `src/lib/blog.ts`.
- If the remote feed is unreachable or during offline builds, the site gracefully falls back to the static blog cache in `src/data/portfolio.ts` without throwing errors or breaking the layout.

---

## 💻 Local Development & Cross-Platform Setup

The codebase is configured to run smoothly across **Fedora Linux**, **macOS**, and **Windows**.

### Prerequisites
- Node.js `v18.18+` or `v20+`
- npm `v9+` or `v10+`

### Installation (Local `node_modules` — No Global Pollution)

Clone the repository and install dependencies locally:

```bash
# Clone the repository
git clone https://github.com/uga961/portfolio.git
cd portfolio

# Install dependencies locally
npm install
```

> [!NOTE]
> All dependencies (including Next.js, TypeScript, ESLint, Tailwind, and SWC compiler binaries) are contained 100% inside `./node_modules`. No packages need to be installed globally on your operating system.

### Running Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Verifying Code & Production Build

```bash
# Type check with TypeScript compiler
npx tsc --noEmit

# Run ESLint validation
npm run lint

# Build production bundle (and static page generation)
npm run build

# Preview production build locally
npm start
```

### VS Code Integration

Pre-configured workspace settings are located in `.vscode/`:
- **`.vscode/settings.json`**: Configures Tailwind CSS class sorting, format on save with Prettier/ESLint, and excludes temporary build artifacts.
- **`.vscode/tasks.json`**: Provides standard VS Code tasks accessible via `Ctrl+Shift+B` or `Terminal > Run Task...`:
  - `dev`: Starts Next.js dev server
  - `build`: Runs production build
  - `typecheck`: Runs TypeScript validity check
  - `lint`: Runs ESLint

---

## 🚀 Deployment (Vercel)

The repository is configured for zero-configuration continuous deployment on Vercel:

1. Import the repository `username/repo_name` in [Vercel](https://vercel.com).
2. The framework preset is automatically detected as **Next.js**.

Every push to `main` automatically triggers an optimized production deployment with full static asset optimization.

---

## 📄 License

Open-source under the [MIT License](./LICENSE) © 2026 Ugandhar Vaddi.
