import { Metadata } from "next";
import { ParticlesBackground } from "@/components/particles-background";

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

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
