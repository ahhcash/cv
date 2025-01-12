import { Metadata } from "next";
import { ParticlesBackground } from "@/components/particles-background";

// Define metadata for Open Graph and Twitter cards

export const metadata: Metadata = {
  metadataBase: new URL("https://ahhcash.xyz"),
  title: {
    default: "Blog | ahhcash",
    template: "%s | ahhcash's Blog",
  },
  description:
    "Exploring software engineering, distributed systems, and my journey through tech.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ahhcash.xyz/blog",
    title: "ahhcash's Blog",
    description:
      "Exploring software engineering, distributed systems, and my journey through tech.",
    siteName: "ahhcash",
  },
  twitter: {
    card: "summary_large_image",
    title: "ahhcash's Blog",
    description:
      "Exploring software engineering, distributed systems, and my journey through tech.",
    creator: "@aahhcash",
  },
  alternates: {
    canonical: "https://ahhcash.xyz/blog",
    types: {
      "application/rss+xml": "https://ahhcash.xyz/blog/feed.xml",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  keywords: [
    "software engineering",
    "distributed systems",
    "cloud infrastructure",
    "web development",
    "AI",
    "databases",
    "tech blog",
    "programming",
  ],
};

// Define the structured data for blog posts
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "ahhcash's Blog",
  description:
    "Exploring software engineering, distributed systems, and my journey through tech.",
  url: "https://ahhcash.xyz/blog",
  author: {
    "@type": "Person",
    name: "ahhcash",
    url: "https://ahhcash.xyz",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full">
      <ParticlesBackground />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="container relative mx-auto min-h-screen scroll-my-12 overflow-auto p-4 pt-16 md:p-16 md:pt-20 print:p-12">
        {children}
      </main>
    </div>
  );
}
