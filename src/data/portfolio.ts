/**
 * =============================================================================
 * UGANDHAR VADDI — PORTFOLIO CONFIGURATION & DATA SOURCE
 * =============================================================================
 * Central data source for ugandhar.in.
 * 
 * TUTORIALS:
 * 1. ADD NEW EXPERIENCE: Append an object to the EXPERIENCES array.
 * 2. ADD NEW PROJECT: Append an object to the PROJECTS array.
 * 3. UPDATE YOUTUBE PLAYLIST: Change 'playlistUrl' inside YOUTUBE_INFO.
 * 4. UPDATE RESUME: Place new PDF in public/resume/ and update 'resumePath'.
 * =============================================================================
 */

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  category: "AI & ML" | "Hardware & VLSI" | "Desktop & Web" | "Systems";
  tags: string[];
  metrics?: string;
  isProprietary?: boolean; // Set true for proprietary enterprise work (hides external links)
  githubUrl?: string;
  liveUrl?: string;
  blogSlug?: string;
  featured: boolean;
  date: string;
  stars?: number;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  type: "Internship" | "Apprenticeship" | "Full-time" | "Contract";
  team?: string;
  description: string;
  bullets: string[];
  skills: string[];
  repoUrl?: string;
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

export interface BlogPost {
  title: string;
  excerpt: string;
  url: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface YouTubePlaylist {
  title: string;
  description: string;
  playlistUrl: string;
  topics: string[];
}

export interface YouTubeContent {
  channelName: string;
  handle: string;
  url: string;
  description: string;
  playlists: YouTubePlaylist[];
}

export const PERSONAL_INFO = {
  name: "Ugandhar Vaddi",
  handle: "uga961",
  domain: "ugandhar.in",
  blogDomain: "blog.ugandhar.in",
  headline: "Data Scientist · Electronics Engineer · Systems Builder",
  bioShort:
    "Building at the intersection of silicon, software, data, and intelligent systems. Exploring transistor-level VLSI memory, autonomous multi-agent pipelines, and native desktop utilities.",
  bioLong:
    "I'm Ugandhar, an engineer who enjoys understanding how systems work from first principles — from transistor-level circuit design in Cadence to machine learning classifiers, Linux kernel primitives, and full-stack software architectures.",
  location: "Visakhapatnam, India",
  email: "annajiratnam@gmail.com",
  phone: "+91 9493586647",
  resumePath: "/resume/Resume.pdf",
  avatarPath: "/avatar/profile.jpg",
  logoPath: "/Logo.png",
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Blog",
    url: "https://blog.ugandhar.in",
    icon: "Blog",
    handle: "blog.ugandhar.in",
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
    skills: ["Python", "Generative AI", "Vertex AI", "LLMs", "Data Pipelines", "Prompt Engineering"],
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
    skills: [".NET Core", "C#", "ASP.NET Web API", "Entity Framework", "SQL", "Clean Architecture"],
    repoUrl: "https://github.com/uga961/MyPracticeRepo_6417029_Cognizant-DN-4.0",
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
    skills: ["Embedded C/C++", "UAV Telemetry", "Hardware Interfacing", "SPI / I2C / UART", "Sensors"],
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
    skills: ["Linux Kernel Internals", "System Programming", "C", "POSIX Threads", "IPC", "Memory Management"],
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
    skills: ["Machine Learning", "Python", "Scikit-Learn", "Pandas", "Feature Engineering"],
  },
];

export const EDUCATION: Education[] = [
  {
    institution: "Sathyabama Institute of Science and Technology",
    degree: "Bachelor of Engineering (B.E.) in Electronics and Communication Engineering",
    period: "Aug 2022 – May 2026",
    grade: "9.0 CGPA",
    location: "Chennai, Tamil Nadu, India",
    skills: ["Embedded Systems", "VLSI CAD", "RTL Design", "Digital Signal Processing", "Microcontrollers"],
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
    grade: "10.0 GPA (Perfect 10 Points)",
    location: "Andhra Pradesh, India",
    skills: ["Foundational Sciences", "Mathematics", "Leadership"],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "stayactive",
    title: "StayActive",
    subtitle: "Mindful Digital Wellbeing for Windows",
    description:
      "A lightweight, privacy-first Windows companion built with WPF and .NET 8 that gently orchestrates independent eye-rest (20-20-20), hydration, and walking routines.",
    longDescription:
      "Features independent multi-timer schedules, smart meeting detection that pauses non-urgent prompts when active microphones or video calls are running, and dynamic media session management that pauses background audio while reminders are displayed.",
    category: "Desktop & Web",
    tags: [".NET 8", "C#", "WPF", "Windows API", "Clean Architecture", "Open Source"],
    metrics: "Production v2.1 Release · Active system tray & media coordination",
    githubUrl: "https://github.com/uga961/StayActive",
    blogSlug: "why-i-built-stayactive",
    featured: true,
    date: "Sep 2026",
    stars: 1,
  },
  {
    id: "blog",
    title: "Personal Engineering Journal",
    subtitle: "High-Performance Technical Blog Platform",
    description:
      "A file-based modern engineering journal built with Next.js 15, TypeScript, Tailwind CSS, and Material Design 3 tokens. Zero database overhead with instant markdown publishing.",
    longDescription:
      "Features real-time client-side search, automated reading-time calculation, dark/light theme hydration without flash, and a live Spotify turntable mini-player integrated with daily rotation hits.",
    category: "Desktop & Web",
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "React 19", "Material 3", "MDX"],
    liveUrl: "https://blog.ugandhar.in",
    githubUrl: "https://github.com/uga961/Blog",
    featured: true,
    date: "Oct 2026",
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
    tags: ["Python", "Google Gemini Vision", "Vertex AI", "Gradio", "Computer Vision", "LLMs"],
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
    tags: ["Microsoft AutoGen", "Google Gemini", "FastAPI", "Streamlit", "Python 3.11", "Multi-Agent"],
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
    tags: ["VLSI CAD", "Cadence Virtuoso", "SRAM 6T/7T", "RTL Design", "Analog Simulation"],
    metrics: "Reduced static leakage and improved read static noise margin (SNM)",
    githubUrl: "https://github.com/uga961/Final_Year_Project",
    featured: true,
    date: "Sep 2025 – Apr 2026",
    stars: 1,
  },
  {
    id: "cmos-6t-sram",
    title: "CMOS 6-Transistor SRAM Cell",
    subtitle: "Transistor-Level Design & Physical Layout",
    description:
      "Designed, simulated, and laid out a single-bit CMOS 6T SRAM cell using Cadence Virtuoso, with full DRC and LVS physical verification via Assura.",
    category: "Hardware & VLSI",
    tags: ["Cadence Virtuoso", "Assura DRC/LVS", "CMOS", "Physical Layout", "Analog Design"],
    githubUrl: "https://github.com/uga961/CMOS_6_T_SRAM",
    featured: false,
    date: "Jan 2025 – Feb 2025",
  },
  {
    id: "plant-disease-classification",
    title: "Crop Disease Classification & Fertilizer Guidance",
    subtitle: "Deep Learning Ensemble for Agricultural Vision",
    description:
      "Ensemble computer vision pipeline combining DenseNet and Xception architectures to accurately detect plant pathologies from leaf imagery and deliver contextual fertilizer guidance.",
    category: "AI & ML",
    tags: ["Deep Learning", "DenseNet", "Xception", "PyTorch / TensorFlow", "Computer Vision"],
    githubUrl: "https://github.com/uga961/Image-Based-Plant-Disease-Classification-and-Fertilizer-Guidance",
    featured: false,
    date: "2024",
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
  },
  {
    id: "cognizant-dn4",
    title: "Cognizant DN 4.0 Full Stack Repository",
    subtitle: ".NET Core & Enterprise Microservices",
    description:
      "Comprehensive repository demonstrating C#, .NET Framework, clean architectural separation, relational database queries, and test-driven development.",
    category: "Systems",
    tags: [".NET", "C#", "ASP.NET Core", "SQL", "Clean Code"],
    githubUrl: "https://github.com/uga961/MyPracticeRepo_6417029_Cognizant-DN-4.0",
    featured: false,
    date: "Jun 2025 – Aug 2025",
  },
  {
    id: "safety-radar",
    title: "Arduino Real-Time Safety Radar",
    subtitle: "Ultrasonic Spatial Mapping & Processing GUI",
    description:
      "An embedded ultrasonic radar prototype utilizing an Arduino microcontroller and a servo motor to scan 180° arcs, visualizing obstacle distances in a real-time Processing 3 desktop radar display.",
    category: "Hardware & VLSI",
    tags: ["Arduino", "Embedded C++", "Processing 3", "Sensors", "Hardware Prototyping"],
    githubUrl: "https://github.com/uga961/Safety-radar",
    featured: false,
    date: "Jul 2023 – Nov 2023",
  },
  {
    id: "lifi-audio",
    title: "Visible Light Audio Transmission (Li-Fi)",
    subtitle: "High-Speed Optical Wireless Communication",
    description:
      "Implemented an experimental Li-Fi audio transmission setup utilizing high-frequency visible light LEDs and solar photovoltaic reception for wireless, interference-free short-range audio streaming.",
    category: "Hardware & VLSI",
    tags: ["Li-Fi", "Optical Communication", "Analog Electronics", "Solar Cells"],
    featured: false,
    date: "Sep 2024 – Nov 2024",
  },
];

export const SKILL_CATEGORIES = [
  {
    name: "Languages & Frameworks",
    skills: ["Python", "C# / .NET 8", "C / C++", "TypeScript", "JavaScript", "SQL", "HTML5 & CSS3"],
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
      "WPF Desktop Applications",
      "Git & GitHub",
      "VS Code",
      "Vercel Deployment",
    ],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "Python Data Visualization: A Practical Guide to Matplotlib, Seaborn, and Pandas",
    excerpt:
      "Learn practical data visualization in Python, from your first Matplotlib line chart to Seaborn plots, heatmaps, correlation, and pair plots, with examples you can run in Google Colab.",
    url: "https://blog.ugandhar.in/posts/python-data-visualization-matplotlib-seaborn-guide",
    date: "Oct 23, 2026",
    readTime: "24 min read",
    tags: ["Python", "Data Science", "Visualization", "Pandas"],
  },
  {
    title: "How I Debloated My Android TV: A Step-by-Step Guide Using ADB",
    excerpt:
      "My practical guide to cleaning up a slow Android TV with ADB over Wi-Fi, a lighter home screen, careful package checks, reversible changes, and troubleshooting steps.",
    url: "https://blog.ugandhar.in/posts/debloat-android-tv-adb-guide",
    date: "Oct 22, 2026",
    readTime: "24 min read",
    tags: ["Android", "ADB", "Optimization", "Hardware"],
  },
];

export const YOUTUBE_INFO: YouTubeContent = {
  channelName: "Ugandhar Vaddi",
  handle: "@uga961",
  url: "https://www.youtube.com/@uga961",
  description:
    "Hands-on coding workshops in Python, data cleaning with Pandas, touch-typing practice, and independent creative films.",
  playlists: [
    {
      title: "Learn PYTHON in 5 Days or Less",
      description: "Complete hands-on beginner to intermediate Python series covering Google Colab, Data Structures, OOPs, NumPy, and Pandas Data Analytics.",
      playlistUrl: "https://www.youtube.com/@uga961/playlists",
      topics: ["Google Colab", "Data Structures", "OOPs & NumPy", "Pandas Analytics"],
    },
    {
      title: "Python Data Visualization Mastery",
      description: "Practical walkthroughs creating line charts, correlation matrices, heatmaps, and publication-ready charts using Matplotlib, Seaborn, and Pandas.",
      playlistUrl: "https://www.youtube.com/watch?v=T-u2sO0edDI",
      topics: ["Matplotlib", "Seaborn", "Correlation Plots", "Heatmaps"],
    },
    {
      title: "Typing Practice & Speed Sessions",
      description: "Daily typing routines, technique breakdown, and progress tracking towards fast and accurate touch typing.",
      playlistUrl: "https://www.youtube.com/watch?v=y-RCOEktz4E",
      topics: ["Touch Typing", "Speed Tracking", "Muscle Memory"],
    },
    {
      title: "Independent Short Films & Filmmaking",
      description: "Creative storytelling experiments exploring cinematography, color grading, sound design, and pacing, including 'The Fake'.",
      playlistUrl: "https://www.youtube.com/@uga961",
      topics: ["Cinematography", "Direction", "Pacing", "Short Films"],
    },
  ],
};
