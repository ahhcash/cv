import {
  GitHubIcon,
  LinkedInIcon,
  XIcon,
  CalendarIcon,
} from "@/components/icons";

export const RESUME_DATA = {
  name: "hey, i'm aakash",
  initials: "AS",
  location: "nyc",
  locationLink: "https://maps.app.goo.gl/ACmfYfvgxgDCXd8F9",
  about:
    "cs grad student @ nyu wrapping up in may 2025. in love with systems, ai & web dev. open to swe roles!",
  hireMe:
    "engineering at heart with a sweet spot for distributed systems and databases. worked on scaling enterprise systems at cloudera, currently building side projects. wrapping up my master's at nyu in may 2025 - let's build something cool together!",
  avatarUrl: "https://avatars.githubusercontent.com/u/30623280?v=4",
  personalWebsiteUrl: "https://ahhcash.vercel.app",
  contact: {
    email: "dev@ahhcash.xyz",
    social: [
      {
        name: "github",
        url: "https://github.com/ahhcash",
        icon: GitHubIcon,
      },
      {
        name: "X",
        url: "https://twitter.com/aahhcash",
        icon: XIcon,
      },
      {
        name: "calendar",
        url: "https://cal.com/ahhcash/30min",
        icon: CalendarIcon,
      },
    ],
  },
  education: [
    {
      school: "new york university",
      degree: "master's degree, computer science",
      start: "aug 2023",
      end: "may 2025",
    },
    {
      school: "visvesvaraya technological university",
      degree: "bachelor's degree, computer science",
      start: "aug 2017",
      end: "jul 2021",
    },
  ],
  work: [
    {
      company: "new york university",
      link: "https://nyu.edu",
      badges: [],
      title: "graduate course assistant",
      start: "sep 2024",
      end: "present",
      description:
        "CA for CSGY 9163 - application security. tech: c, python, django, kotlin, kubernetes",
    },
    {
      company: "[stealth startup]",
      link: "https://spotonix.com",
      badges: ["remote"],
      title: "software engineer intern",
      start: "jun 2024",
      end: "aug 2024",
      description:
        "enabled hybrid full text and vector search capabilities on [stealth startup]'s knowledge graph by integrating lanceDB. tech: python, pydantic, openAI, RAG, lanceDB",
    },
    {
      company: "cloudera",
      link: "https://cloudera.com",
      badges: [],
      title: "software engineer intern → software engineer II",
      start: "jan 2021",
      end: "jul 2023",
      description:
        "engineered cutting edge features for the cloudera data platform. tech: java, spring, docker, kubernetes, apache YARN, aws",
    },
    {
      company: "[startup]",
      link: "https://vecrear.com/",
      title: "software engineer intern",
      badges: [],
      start: "dec 2019",
      end: "mar 2020",
      description:
        "developed automated data pipelines to generate performance analysis reports. tech: python, pandas, apache airflow",
    },
  ],
  skills: [
    "java",
    "python",
    "go",
    "typescript",
    "angular",
    "nextJS",
    "svelteKit",
    "spring",
    "gradle",
    "maven",
    "junit",
    "mockito",
    "postgreSQL",
    "mongoDB",
    "lanceDB",
    "docker",
    "kubernetes (eks, openshift)",
    "aws",
    "gitHub actions",
    "vercel",
  ],
  projects: [
    {
      title: "medical healthscribe",
      techStack: ["java", "spring", "swing", "openAI", "postgreSQL"],
      description:
        "created a real-time speech to text transcriber for patient-clinician interactions with AI powered NLP capabilities.",
      link: {
        label: "GitHub",
        href: "https://github.com/ahhcash/speech-to-text",
      },
      bgImageUrl:
        "https://wallpapers.com/images/hd/roy-mustang-1440-x-2586-wallpaper-a1pzyjufb2gp1zzv.jpg",
    },
    {
      title: "llm-cli",
      techStack: ["go", "anthropic", "openAI", "mistral", "gemini"],
      description:
        "an ai assisted terminal that uses LLMs to translates natural language into shell commands, boosting my productivity.",
      link: {
        label: "GitHub",
        href: "https://github.com/ahhcash/llm-cli",
      },
      bgImageUrl: "https://w.wallhaven.cc/full/vq/wallhaven-vq5vd8.png",
    },
    {
      title: "GhastlyDB (WIP)",
      techStack: [
        "go",
        "embedding models",
        "vector search",
        "database fundamentals",
        "LSM trees",
        "similarity search",
      ],
      description:
        "a lightweight key-value vector database built from the ground up in Go, with LSM tree storage and multi-provider embedding support for efficient similarity search.",
      link: {
        label: "Demo",
        href: "https://ghastly-demo.vercel.app",
      },
      bgImageUrl:
        "https://wallpapers.com/images/hd/shunsui-kyoraku-1920-x-1080-wallpaper-0dg6jqf2v7digp5k.jpg",
    },
    {
      title: "NYC Public Service Finder",
      techStack: [
        "python",
        "django",
        "nyc open data",
        "aws elastic beanstalk",
        "aws dynamodb",
        "aws s3",
        "travis ci",
      ],
      description:
        "a full-stack django app that allows people in NYC to easily search and locate public services, leave reviews, and discuss on the platform.",
      link: {
        label: "GitHub",
        href: "https://github.com/gcivil-nyu-org/wed-fall24-team1",
      },
      bgImageUrl: "https://wallpapercave.com/wp/wp5423003.jpg",
    },
    {
      title: "Grotle (WIP)",
      techStack: [
        "Go",
        "HTMX",
        "Mixpeek",
        "Multimodal semantic search",
        "vector embeddings",
      ],
      description:
        "a multimodal search pipeline using mixpeek that lets you semantically search for [REDACTED]",
      link: {
        label: "GitHub",
        href: "https://scenewise.xyz",
      },
      bgImageUrl: "https://images6.alphacoders.com/135/1353804.png",
    },
    {
      title: "Gengar (WIP)",
      techStack: [
        "Go",
        "Post Quantum Encryption",
        "liboqs",
        "CRYSTALS KYBER",
        "gRPC",
      ],
      description:
        "a PoC for post quantum encryption on a simulated cloud storage environment. uses Kyber768 + AES-GCM encryption to securely upload and download documents from a cloud server",
      link: {
        label: "GitHub",
        href: "https://github.com/ahhcash/gengar",
      },
      bgImageUrl: "https://w.wallhaven.cc/full/13/wallhaven-13ozrw.jpg",
    },
  ],
} as const;
