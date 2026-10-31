/**
 * =============================================================================
 * UGANDHAR VADDI — PORTFOLIO CONFIGURATION & DATA SOURCE
 * =============================================================================
 * Central data source for ugandhar.in.
 * =============================================================================
 */

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  category: "AI & ML" | "Hardware & VLSI" | "Desktop & Web";
  tags: string[];
  metrics?: string;
  isProprietary?: boolean; // Set true for proprietary enterprise work (hides external links)
  githubUrl?: string;
  liveUrl?: string;
  thoughtsSlug?: string;
  featured: boolean;
  date: string;
  stars?: number;
  contributors?: string[]; // List of contributors if collaborative
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  type: "Full-time" | "Internship" | "Apprenticeship" | "Contract";
  team?: string;
  description: string;
  bullets: string[];
  skills: string[];
  repoUrl?: string;
  isIncoming?: boolean;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  grade: string;
  location: string;
  skills: string[];
  highlights?: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  handle: string;
  color: string;
  category: "primary" | "social" | "media";
}

export interface ThoughtPost {
  title: string;
  excerpt: string;
  url: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface YouTubeItem {
  badge: "Featured" | "Latest";
  type: "Playlist" | "Video" | "Live";
  title: string;
  description: string;
  url: string;
  topics: string[];
}

export interface YouTubeContent {
  channelName: string;
  handle: string;
  url: string;
  description: string;
  items: YouTubeItem[];
}

export const PERSONAL_INFO = {
  name: "Ugandhar Vaddi",
  handle: "uga961",
  domain: "ugandhar.in",
  thoughtsDomain: "thoughts.ugandhar.in",
  headline: "Associate Data Scientist at Tredence",
  bioShort:
    "Associate Data Scientist at Tredence. Building enterprise data intelligence, automated pipelines, and applied machine learning models while exploring low-level silicon architectures.",
  bioLong:
    "I'm Ugandhar, an engineer who enjoys understanding how systems work from first principles — from transistor-level circuit design in Cadence to enterprise machine learning pipelines, predictive modeling, and native desktop utilities.",
  location: "Visakhapatnam, India",
  email: "annajiratnam@gmail.com",
  phone: "+91 9493586647",
  resumePath: "/resume",
  avatarPath: "/avatar/profile.jpg",
  logoPath: "/Logo.png",
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Thoughts",
    url: "https://thoughts.ugandhar.in",
    icon: "Thoughts",
    handle: "thoughts.ugandhar.in",
    color: "#dedbc8",
    category: "primary",
  },
  {
    name: "GitHub",
    url: "https://github.com/uga961",
    icon: "GitHub",
    handle: "@uga961",
    color: "#dedbc8",
    category: "primary",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/vaddi-ugandhar-b37877266/",
    icon: "LinkedIn",
    handle: "vaddi-ugandhar",
    color: "#0a66c2",
    category: "primary",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@uga961",
    icon: "YouTube",
    handle: "@uga961",
    color: "#ef4444",
    category: "media",
  },
  {
    name: "Reddit",
    url: "https://www.reddit.com/user/uga961/",
    icon: "Reddit",
    handle: "u/uga961",
    color: "#ff4500",
    category: "social",
  },
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Tredence Analytics Solutions",
    role: "Associate Data Scientist",
    period: "Nov 2026 (Joining Soon)",
    location: "Chennai, India",
    type: "Full-time",
    team: "Analytics & Applied AI",
    isIncoming: true,
    description:
      "Incoming Associate Data Scientist (Analyst L1) focusing on enterprise data science, end-to-end predictive modeling, and scalable analytics solutions.",
    bullets: [
      "Appointed as Analyst-Level L1 / Associate Data Scientist at Tredence Analytics Solutions.",
      "Developing applied machine learning pipelines and statistical analytics solutions for enterprise clients.",
      "Engineering robust feature pipelines, predictive algorithms, and automated data workflows.",
    ],
    skills: [
      "Python",
      "Machine Learning",
      "Data Science",
      "SQL",
      "Predictive Analytics",
    ],
  },
  {
    company: "McKinsey & Company",
    role: "Research and Insights Intern",
    period: "Nov 2025 – Jun 2026",
    location: "Chennai, India (On-site)",
    type: "Internship",
    team: "Ops.Cleansheet",
    description:
      "Engineered automated analytics pipelines and AI-assisted extraction tooling for engineering documents and operations.",
    bullets: [
      "Contributed to DtV Lab's generative AI systems and automated engineering schematic analysis tools.",
      "Developed high-throughput data extraction algorithms leveraging Google Gemini Vision and Vertex AI.",
      "Built clean, modular Python microservices and data pipelines for internal consulting analysis workflows.",
    ],
    skills: [
      "Python",
      "Generative AI",
      "Vertex AI",
      "LLMs",
      "Data Pipelines",
      "Prompt Engineering",
    ],
  },
  {
    company: "Cognizant",
    role: "DotNet Full Stack Engineer Apprentice",
    period: "Jun 2025 – Aug 2025",
    location: "Chennai, India (Remote)",
    type: "Apprenticeship",
    team: "Cognizant DN 4.0 Program",
    description:
      "Intensive enterprise application engineering program focusing on .NET Core, C#, RESTful microservices, and database design.",
    bullets: [
      "Architected backend microservices and REST APIs adhering to Clean Architecture and SOLID principles.",
      "Engineered database schemas, Entity Framework Core migrations, and query optimizations.",
      "Maintained public practice and project repositories with comprehensive unit tests and automated builds.",
    ],
    skills: [
      ".NET Core",
      "C#",
      "ASP.NET Web API",
      "Entity Framework",
      "SQL",
      "Clean Architecture",
    ],
    repoUrl:
      "https://github.com/uga961/MyPracticeRepo_6417029_Cognizant-DN-4.0",
  },
  {
    company: "MachCent Aerospace Pvt. Ltd.",
    role: "UAV Embedded Designer Intern",
    period: "Mar 2025 – Jul 2025",
    location: "Chennai, India (On-site)",
    type: "Internship",
    description:
      "Designed and tested embedded flight hardware, sensory telemetry links, and low-power microcontroller subsystems for autonomous UAVs.",
    bullets: [
      "Interfaced real-time sensor packages (IMU, Barometer, GPS) over I2C, SPI, and UART protocols.",
      "Implemented hardware-level fault tolerance and telemetry logging routines.",
      "Optimized power distribution and battery telemetry across autonomous drone frames.",
    ],
    skills: [
      "Embedded C/C++",
      "UAV Telemetry",
      "Hardware Interfacing",
      "SPI / I2C / UART",
      "Sensors",
    ],
  },
  {
    company: "HCLTech",
    role: "System Programming Apprentice",
    period: "Feb 2025 – Jun 2025",
    location: "Chennai, India (On-site)",
    type: "Apprenticeship",
    team: "HCL CoE (Center of Excellence)",
    description:
      "Specialized in low-level systems programming, Linux OS internals, kernel primitives, and multi-threaded systems in C/C++.",
    bullets: [
      "Implemented low-level memory allocators, IPC (Inter-Process Communication), and POSIX concurrency primitives.",
      "Analyzed Linux kernel subsystem behaviors, system calls, and device driver architectures.",
      "Benchmarked memory efficiency and execution latency under multi-core workloads.",
    ],
    skills: [
      "Linux Kernel Internals",
      "System Programming",
      "C",
      "POSIX Threads",
      "IPC",
      "Memory Management",
    ],
  },
  {
    company: "Bharath Intern Pvt. Ltd.",
    role: "Machine Learning Intern",
    period: "Nov 2023 – Jan 2024",
    location: "Remote",
    type: "Internship",
    description:
      "Developed and evaluated end-to-end machine learning classification models and data preprocessing pipelines.",
    bullets: [
      "Trained multi-class text classifiers reducing false positives through iterative feature engineering.",
      "Engineered data pipelines using Pandas, NumPy, and Scikit-Learn for exploratory data analysis.",
    ],
    skills: [
      "Machine Learning",
      "Python",
      "Scikit-Learn",
      "Pandas",
      "Feature Engineering",
    ],
  },
];

export const EDUCATION: Education[] = [
  {
    institution: "Sathyabama Institute of Science and Technology",
    degree:
      "Bachelor of Engineering (B.E.) in Electronics and Communication Engineering",
    period: "Aug 2022 – May 2026",
    grade: "9.0 CGPA",
    location: "Chennai, Tamil Nadu, India",
    skills: [
      "Embedded Systems",
      "VLSI CAD",
      "RTL Design",
      "Digital Signal Processing",
      "Microcontrollers",
    ],
    highlights: [
      "Consistent academic top-tier performance (9.0 CGPA)",
      "Lead researcher for High Performance 6T & 7T SRAM Energy Efficient Memory Project",
      "Active participant and organizer in student technical forums & hackathons",
    ],
  },
  {
    institution: "Sri Viswa Junior College",
    degree: "Intermediate (MPC — Mathematics, Physics, Chemistry)",
    period: "Oct 2020 – Jul 2022",
    grade: "96.1%",
    location: "Visakhapatnam, Andhra Pradesh, India",
    skills: ["Mathematics", "Physics", "Chemistry", "Problem Solving"],
    highlights: [
      "Scored 96.1% in Board of Intermediate Education, Andhra Pradesh",
      "Competitive exam problem-solving focus and sports participation",
    ],
  },
  {
    institution: "Suresh High School",
    degree: "Secondary School Certificate (10th Standard)",
    period: "Feb 2019 – Mar 2020",
    grade: "10 CGPA",
    location: "Andhra Pradesh, India",
    skills: ["Foundational Sciences", "Mathematics", "Leadership"],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "tv-detox",
    title: "TV Detox Launcher",
    subtitle: "Ultra-Lightweight Minimalist Launcher for Android TV",
    description:
      "A clean, ultra-lightweight, and lightning-fast minimalist launcher built in Java specifically for Android TV and memory-constrained devices (such as 1GB RAM Mi TVs, Xiaomi TV Sticks, and Chromecast).",
    longDescription:
      "Drastically reduces memory overhead to ~12MB RAM (down from 150MB+ on stock PatchWall / Google TV launchers) with 0% idle CPU overhead, zero telemetry or tracking, and smooth 0.5x focus animations. Features dynamic time-based greetings, digital clock, quick input switching, and real-time app discovery.",
    category: "Desktop & Web",
    tags: [
      "Android TV",
      "Java",
      "ADB",
      "Android SDK",
      "Leanback",
      "Open Source",
    ],
    metrics: "~12MB RAM Overhead · 3.2MB APK · 0% Idle CPU",
    githubUrl: "https://github.com/uga961/tv-detox",
    thoughtsSlug: "debloat-android-tv-adb-guide",
    featured: true,
    date: "Oct 2026 – Nov 2026",
    stars: 1,
  },
  {
    id: "stayactive",
    title: "StayActive",
    subtitle: "Mindful Digital Wellbeing for Windows",
    description:
      "A lightweight, privacy-first Windows companion built with WPF and .NET 8 that gently orchestrates independent eye-rest (20-20-20), hydration, and walking routines.",
    longDescription:
      "Features independent multi-timer schedules, smart meeting detection that pauses non-urgent prompts when active microphones or video calls are running, and dynamic media session management that pauses background audio while reminders are displayed.",
    category: "Desktop & Web",
    tags: [
      ".NET 8",
      "C#",
      "WPF",
      "Windows API",
      "Clean Architecture",
      "Open Source",
    ],
    metrics:
      "Production v2.1 Release · Active system tray & media coordination",
    githubUrl: "https://github.com/uga961/StayActive",
    thoughtsSlug: "why-i-built-stayactive",
    featured: true,
    date: "Sep 2026 – Nov 2026",
    stars: 1,
  },
  {
    id: "Journal",
    title: "Personal Engineering Journal",
    subtitle: "High-Performance Technical Journal Platform",
    description:
      "A file-based modern engineering journal built with Next.js 15, TypeScript, Tailwind CSS, and Material Design 3 tokens. Zero database overhead with instant markdown publishing.",
    longDescription:
      "Features real-time client-side search, automated reading-time calculation, dark/light theme hydration without flash, and a live Spotify turntable mini-player integrated with daily rotation hits.",
    category: "Desktop & Web",
    tags: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "React 19",
      "Material 3",
      "MDX",
    ],
    liveUrl: "https://thoughts.ugandhar.in",
    githubUrl: "https://github.com/uga961/Thoughts",
    featured: true,
    date: "Oct 2026 – Nov 2026",
    stars: 1,
  },
  {
    id: "draw2spec",
    title: "Draw2Spec",
    subtitle: "Engineering Drawing to Structured Data Pipeline",
    description:
      "Automates technical drawing digitization using Google Gemini Vision via Vertex AI, transforming complex schematics and blueprints into clean, structured Excel datapacks.",
    longDescription:
      "Draw2Spec ingests technical PDFs and CAD drawings to extract geometric dimensions, material specifications, tolerances, bounding boxes, and cost drivers in a standardized, machine-readable format.",
    category: "AI & ML",
    tags: [
      "Python",
      "Google Gemini Vision",
      "Vertex AI",
      "Gradio",
      "Computer Vision",
      "LLMs",
    ],
    metrics: "Automated extraction of technical dimensions & material specs",
    isProprietary: true,
    featured: true,
    date: "Dec 2025 – Jan 2026",
  },
  {
    id: "specmap",
    title: "SpecMap",
    subtitle: "Competitive Intelligence Multi-Agent System",
    description:
      "Autonomous multi-agent platform for deep product specification benchmarking. Extracts and synthesizes technical criteria against competitors in side-by-side comparative matrices.",
    longDescription:
      "Built with Microsoft AutoGen and Google Gemini, SpecMap accepts product documentation and autonomously browses, cross-references, and structures competitor parameters via FastAPI and Streamlit.",
    category: "AI & ML",
    tags: [
      "Microsoft AutoGen",
      "Google Gemini",
      "FastAPI",
      "Streamlit",
      "Python 3.11",
      "Multi-Agent",
    ],
    metrics: "Automated cross-competitor benchmarking matrices",
    isProprietary: true,
    featured: true,
    date: "Feb 2026 – Apr 2026",
  },
  {
    id: "sram-energy-efficient",
    title: "High Performance SRAM for Energy Efficient Systems",
    subtitle: "VLSI Circuit Design & Stability Optimization",
    description:
      "Final year engineering research investigating comparative stability, power dissipation, and voltage scaling between 6T and novel 7T SRAM architectures in Cadence Virtuoso.",
    longDescription:
      "Complete transistor-level schematic capture, peripheral decoder logic, sense amplifiers, write-driver circuitry, and ADE transient simulation. Specifically targeted for low-power edge IoT and embedded systems.",
    category: "Hardware & VLSI",
    tags: [
      "VLSI CAD",
      "Cadence Virtuoso",
      "SRAM 6T/7T",
      "RTL Design",
      "Analog Simulation",
    ],
    metrics:
      "Reduced static leakage and improved read static noise margin (SNM)",
    githubUrl: "https://github.com/uga961/Final_Year_Project",
    featured: true,
    date: "Sep 2025 – Apr 2026",
    stars: 1,
    contributors: ["Naralasetti Umesh"],
  },
  {
    id: "sexual-harassment-classification",
    title: "Incident Report Classification System",
    subtitle: "Multi-Class Natural Language Processing",
    description:
      "Developed a privacy-respecting multi-class ML classification engine that categorizes textual incident narratives into distinct behavioural categories (Commenting, Staring, Touching).",
    longDescription:
      "Engineered TF-IDF vectorizers and tuned SVM / Logistic Regression classifiers, reducing false positives by 18% to support automated incident reporting and sentiment analysis.",
    category: "AI & ML",
    tags: ["Python", "scikit-learn", "NLP", "TF-IDF", "SVM", "Pandas"],
    metrics: "18% reduction in false positives via context-aware filtering",
    githubUrl: "https://github.com/uga961/Sexual-Harrasment-Classification",
    featured: false,
    date: "Jan 2025 – Apr 2025",
    contributors: ["Yogeshwaran S", "Aashish Kumar", "Yash Raj Gupta"],
  },
  {
    id: "safety-radar",
    title: "Arduino Real-Time Safety Radar",
    subtitle: "Ultrasonic Spatial Mapping & Processing GUI",
    description:
      "An embedded ultrasonic radar prototype utilizing an Arduino microcontroller and a servo motor to scan 180° arcs, visualizing obstacle distances in a real-time Processing 3 desktop radar display.",
    category: "Hardware & VLSI",
    tags: [
      "Arduino",
      "Embedded C++",
      "Processing 3",
      "Sensors",
      "Hardware Prototyping",
    ],
    githubUrl: "https://github.com/uga961/Safety-radar",
    featured: false,
    date: "Jul 2023 – Nov 2023",
  },
];

export const SKILL_CATEGORIES = [
  {
    name: "Languages & Frameworks",
    skills: [
      "Python",
      "C# / .NET 8",
      "C / C++",
      "Java",
      "TypeScript",
      "JavaScript",
      "SQL",
      "HTML5 & CSS3",
    ],
  },
  {
    name: "AI, ML & Data Science",
    skills: [
      "Vertex AI / Google Gemini",
      "Microsoft AutoGen",
      "scikit-learn",
      "PyTorch",
      "Pandas & NumPy",
      "Computer Vision",
      "NLP (TF-IDF)",
      "Matplotlib & Seaborn",
    ],
  },
  {
    name: "Hardware & VLSI",
    skills: [
      "Cadence Virtuoso",
      "Assura DRC & LVS",
      "ADE Simulation",
      "SRAM Design (6T & 7T)",
      "CMOS Digital Design",
      "Arduino & Microcontrollers",
      "Hardware-Software Interfacing",
    ],
  },
  {
    name: "Systems, Tools & Web",
    skills: [
      "Next.js 15 & React 19",
      "Tailwind CSS",
      "Linux Kernel & POSIX",
      "Android SDK & ADB",
      "WPF Desktop Applications",
      "Git & GitHub",
      "VS Code",
      "Vercel Deployment",
    ],
  },
];

export const THOUGHT_POSTS: ThoughtPost[] = [
  {
    title: "Four Interviews, One Long Day, and a Chapter I’ll Always Remember",
    excerpt:
      "The story of how the McKinsey opportunity began, a long interview day in Chennai, and how I felt then—and how I look back on it now.",
    url: "https://thoughts.ugandhar.in/posts/mckinsey-interview-day-and-results",
    date: "Oct 26, 2026",
    readTime: "11 min read",
    tags: [
      "McKinsey",
      "Interview Experience",
      "Career Journey",
      "Personal Reflection",
    ],
  },
  {
    title:
      "Python Data Visualization: A Practical Guide to Matplotlib, Seaborn, and Pandas",
    excerpt:
      "Learn practical data visualization in Python, from your first Matplotlib line chart to Seaborn plots, heatmaps, correlation, and pair plots, with examples you can run in Google Colab.",
    url: "https://thoughts.ugandhar.in/posts/python-data-visualization-matplotlib-seaborn-guide",
    date: "Oct 23, 2026",
    readTime: "24 min read",
    tags: ["Python", "Data Visualization", "Matplotlib", "Seaborn", "Pandas"],
  },
  {
    title: "How I Debloated My Android TV: A Step-by-Step Guide Using ADB",
    excerpt:
      "My practical guide to cleaning up a slow Android TV with ADB over Wi-Fi, a lighter home screen, careful package checks, reversible changes, and troubleshooting steps.",
    url: "https://thoughts.ugandhar.in/posts/debloat-android-tv-adb-guide",
    date: "Oct 22, 2026",
    readTime: "24 min read",
    tags: ["Android TV", "ADB", "Optimization", "Guides"],
  },
];

export const YOUTUBE_INFO: YouTubeContent = {
  channelName: "Ugandhar Vaddi",
  handle: "@uga961",
  url: "https://www.youtube.com/@uga961",
  description:
    "Technical walkthroughs, Python series, data manipulation tutorials, and engineering experiments.",
  items: [
    {
      badge: "Featured",
      type: "Playlist",
      title: "Learn PYTHON in 5 Days or Less",
      description:
        "Complete beginner to intermediate hands-on Python series covering Google Colab, Data Structures, OOPs, NumPy, and Pandas Analytics.",
      url: "https://www.youtube.com/@uga961/playlists",
      topics: ["Google Colab", "OOPs", "NumPy", "Pandas"],
    },
    {
      badge: "Latest",
      type: "Video",
      title:
        "Data Visualization in Python | Matplotlib, Seaborn & Pandas Tutorial",
      description:
        "End-to-end practical workshop on building heatmaps, correlation plots, and custom visualizations with Google Colab notebooks.",
      url: "https://www.youtube.com/watch?v=T-u2sO0edDI",
      topics: ["Matplotlib", "Seaborn", "Correlation Plots", "Pandas"],
    },
  ],
};
