import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      colors: {
        background: "#fafaf9",
        surface: "rgb(245 245 244)",
        border: "rgb(228 228 226)",
        muted: "rgb(87 83 78)",
        foreground: "rgb(28 25 23)",
        accent: "rgb(41 37 36)",
        ring: "rgb(168 162 158)",
      },
      maxWidth: {
        content: "72rem",
      },
      spacing: {
        "section-y": "4rem",
        "section-y-md": "6rem",
        "content-gap": "2rem",
      },
      fontSize: {
        hero: ["2.75rem", { lineHeight: "1.1" }],
        "hero-lg": ["4rem", { lineHeight: "1" }],
        "hero-xl": ["5rem", { lineHeight: "1" }],
        section: ["1.5rem", { lineHeight: "2rem" }],
        "section-lg": ["2rem", { lineHeight: "2.5rem" }],
        body: ["1.125rem", { lineHeight: "1.75rem" }],
        small: ["0.875rem", { lineHeight: "1.25rem" }],
        caption: ["0.75rem", { lineHeight: "1rem" }],
      },
    },
  },
  plugins: [],
};

export default config;
