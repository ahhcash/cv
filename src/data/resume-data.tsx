import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Aakash Shankar",
  initials: "AS",
  location: "New York, NY",
  locationLink: "https://maps.app.goo.gl/ACmfYfvgxgDCXd8F9",
  about:
    "Software Engineer with 3 yoe, on the road to getting cracked.",
  summary:
    "As an emerging software engineer, I specialize in developing robust fullstack systems using Java, Python, Go, and NextJS. My expertise extends to implementing auto-scalable, multi-site, and multi-tenant systems through my work with prominent commercial cloud platforms like AWS, Azure, and Google Cloud. Additionally, I possess strong skills in technical product management and effective cross-functional collaboration.",
  avatarUrl: "https://avatars.githubusercontent.com/u/30623280?v=4",
  personalWebsiteUrl: "https://ahhcash.vercel.app",
  contact: {
    email: "aakashshankar217@gmail.com",
    tel: "+15513759829",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/aakashshankar",
        icon: GitHubIcon,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/aakash217/",
        icon: LinkedInIcon,
      },
      {
        name: "X",
        url: "https://twitter.com/aahhcash",
        icon: XIcon,
      },
    ],
  },
  education: [
    {
      school: "New York University",
      degree: "Master's degree, Computer Science",
      start: "2023",
      end: "2025",
    },
    {
      school: "Visvesvaraya Technological University",
      degree: "Bachelor's degree, Computer Science & Engineering",
      start: "2017",
      end: "2021",
    },
  ],
  work: [
    {
      company: "New York University",
      link: "https://nyu.edu",
      badges: [],
      title: "Graduate Teaching Assistant",
      start: "2024",
      end: "Present",
      description: "TA for CSGY 9163 - Application Security. Tech: C, Python, Django, Kotlin, Kubernetes"
    },
    {
      company: "Spotonix",
      link: "https://spotonix.com",
      badges: [],
      title: "Software Engineer Intern",
      start: "2024",
      end: "2024",
      description:
        "Enabled hybrid full text and vector search capabilities on the Spotonix knowledge graph by integrating LanceDB. Tech: Python, Pydantic, OpenAI, RAG, LanceDB",
    },
    {
      company: "Cloudera",
      link: "https://cloudera.com",
      badges: [],
      title: "Software Engineer Intern → Software Engineer II",
      start: "2021",
      end: "2023",
      description:
        "Engineered cutting edge features for the Cloudera Data Platform. Tech: Spring, Docker, Kubernetes, Apache YARN, AWS",
    },
    {
      company: "VeCrear",
      link: "https://vecrear.com/",
      badges: ["Remote"],
      title: "Software Engineer Intern",
      start: "2019",
      end: "2020",
      description:
        "Developed automated data pipelines to generate performance analysis reports. Tech: Python, Pandas, Apache Airflow",
    },
  ],
  skills: [
    "Java",
    "Python",
    "Go",
    "TypeScript",
    "Angular",
    "NextJS",
    "SvelteKit",
    "Spring",
    "Gradle",
    "Maven",
    "JUnit",
    "Mockito",
    "PostgreSQL",
    "MongoDB",
    "LanceDB",
    "Docker",
    "Kubernetes (EKS, Openshift)",
    "AWS",
    "GitHub Actions",
    "Vercel",
  ],
  projects: [
    {
      title: "Speech-To-Text",
      techStack: ["Spring", "Swing", "OpenAI", "PostgreSQL"],
      description:
        "Created a real-time speech to text transcriber for patient-clinician interactions with AI powered NLP capabilities.",
      link: {
        label: "GitHub",
        href: "https://github.com/aakashshankar/speech-to-text",
      },
    },
    {
      title: "Audio Classifier",
      techStack: ["PyTorch", "Librosa", "Deep Learning"],
      description:
        "A simple audio classifier that recognizes and classifies various categories of urban sounds",
      link: {
        label: "Jovian",
        href: "https://jovian.com/aakashshankar/urbansound8kclassification",
      },
    },
    {
      title: "SHEMS",
      techStack: ["NextJS", "TypeScript", "Tailwind CSS", "Vercel", "Java", "Spring Boot", "PostgreSQL", "Heroku", "Supabase"],
      description:
          "Created a complete fullstack app using NextJS and Spring Boot to manage and monitor the energy consumption of a household, to exercise my skills in frontend and backend development.",
      link: {
          label: "GitHub",
          href: "https://github.com/aakashshankar/shems"
      },
    },
    {
      title: "Tap&Go",
      techStack: ["NextJS", "TypeScript", "Tailwind CSS", "Vercel", "Clerk Auth", "PostgreSQL", "Supabase", "MongoDB Atlas", "RAG", "OpenAI", "LangChain"],
      description: "An AI-powered app integrated with RAG to provide super personalized travel recommendations. Created this as part of the IvyHacks and MongoDB hackathons.",
      link: {
          label: "GitHub",
          href: "https://github.com/aakashshankar/ivyhacks_tap_and_go"
      }
    },
    {
      title: "Terminator",
      techStack: ["Go", "Anthropic", "OpenAI", "Mistral", "Gemini"],
      description: "An AI assisted terminal that uses LLMs to provide contextual and personalized assisitance to streamline complex workflows and boost productivity.",
      link: {
          label: "GitHub",
          href: "https://github.com/aakashshankar/llm-cli"
      }
    },
    {
      title: "VexDB (WIP)",
      techStack: ["Go", "Embedding models", "Vector Search", "Database fundamentals"],
      description: "My very own lightweight, key value vector database",
      link: {
        label: "GitHub",
        href: "https://github.com/aakashshankar/vexdb"
      }
    }
  ]
} as const;
