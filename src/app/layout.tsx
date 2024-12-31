import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  title: "ahhcash's portfolio",
  description: "ahhcash's portfolio lol",
  themeColor: "#1e1e2e",
};

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

// Loading Hack Nerd Font locally
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
      </head>
      <body className="bg-[#1e1e2e]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
