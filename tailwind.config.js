/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Catppuccin Mocha custom colors
        mocha: {
          base: "#1e1e2e",
          surface: "#181825",
          overlay: "#313244",
          text: "#cdd6f4",
          subtext: "#a6adc8",
          blue: "#89b4fa",
          lavender: "#b4befe",
          pink: "#f5c2e7",
          mauve: "#cba6f7",
        },
      },
      fontFamily: {
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        hack: ["var(--font-hack)", "monospace"],
      },
      typography: {
        mocha: {
          css: {
            "--tw-prose-body": "#cdd6f4",
            "--tw-prose-headings": "#cdd6f4",
            "--tw-prose-links": "#89b4fa",
            "--tw-prose-bold": "#cdd6f4",
            "--tw-prose-counters": "#a6adc8",
            "--tw-prose-bullets": "#a6adc8",
            "--tw-prose-hr": "#313244",
            "--tw-prose-quotes": "#cdd6f4",
            "--tw-prose-quote-borders": "#313244",
            "--tw-prose-captions": "#a6adc8",
            "--tw-prose-code": "#cdd6f4",
            "--tw-prose-pre-code": "#cdd6f4",
            "--tw-prose-pre-bg": "#181825",
            "--tw-prose-th-borders": "#313244",
            "--tw-prose-td-borders": "#313244",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
