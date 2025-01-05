import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  title: {
    default: "ahhcash's portfolio",
    template: "%s | ahhcash",
  },
  description:
    "cs @ nyu, swe, systems, web dev, ai, databases. also, gym and anime",
  keywords: [
    "software engineer",
    "distributed systems",
    "cloud infrastructure",
    "full stack developer",
    "NYU",
    "Cloudera",
  ],
  authors: [{ name: "ahhcash" }],
  creator: "ahhcash",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ahhcash.xyz",
    siteName: "ahhcash's portfolio",
    title: "ahhcash's portfolio",
    description:
      "cs @ nyu, swe, systems, web dev, ai, databases. also, gym and anime",
    images: [
      {
        url: "https://ahhcash.xyz/og-image.png", // Add this image to your public folder
        width: 1200,
        height: 630,
        alt: "ahhcash's portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ahhcash's portfolio",
    description:
      "cs @ nyu, swe, systems, web dev, ai, databases. also, gym and anime",
    creator: "@aahhcash",
    images: ["https://ahhcash.xyz/og-image.png"],
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
};

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const hackNerdFont = localFont({
  src: [
    {
      path: "../fonts/Hack-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Hack-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-hack",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${hackNerdFont.variable}`}
    >
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="canonical" href="https://ahhcash.xyz" />
      </head>
      <body className="bg-[#1e1e2e]">
        {children}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId="G-SNETJBPB1B" />
      </body>
    </html>
  );
}
