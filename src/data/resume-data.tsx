import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Aakash Shankar",
  initials: "AS",
  location: "Union City, NJ",
  locationLink: "https://maps.app.goo.gl/QbtbEeK15meDdjqT9",
  about:
    "Software Engineer with 2.5 years of experience in building resilient backend systems.",
  summary:
    "As an emerging software engineer, I specialize in developing robust backend systems using Java and Go. My expertise extends to implementing auto-scalable, multi-site, and multi-tenant systems through my work with prominent commercial cloud platforms like AWS, Azure, and Google Cloud. Additionally, I possess strong skills in technical product management and effective cross-functional collaboration.",
  avatarUrl: "https://avatars.githubusercontent.com/u/30623280?v=4",
  personalWebsiteUrl: "https://aakashshankar.me",
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
      company: "Cloudera",
      link: "https://cloudera.com",
      badges: [],
      title: "Software Engineer Intern → Software Engineer II",
      start: "2021",
      end: "2023",
      description:
        "Implemented new features, mentored interns and junior developers and handled customer impacting issues. Tech: Spring, Angular, Apache YARN, AWS",
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
    "Go",
    "TypeScript",
    "Angular",
    "Spring",
    "Gradle",
    "Maven",
    "JUnit",
    "Mockito",
    "PostgreSQL",
    "Docker",
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
  ],
} as const;
