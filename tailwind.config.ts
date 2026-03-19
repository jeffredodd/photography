import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        surface: "rgb(249 250 251)",
        border: "rgb(229 231 235)",
        muted: "rgb(75 85 99)",
        foreground: "rgb(17 24 39)",
        accent: "rgb(31 41 55)",
        ring: "rgb(156 163 175)",
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
        hero: ["2.25rem", { lineHeight: "2.5rem" }],
        "hero-lg": ["3rem", { lineHeight: "1" }],
        section: ["1.5rem", { lineHeight: "2rem" }],
        body: ["1.125rem", { lineHeight: "1.75rem" }],
        small: ["0.875rem", { lineHeight: "1.25rem" }],
        caption: ["0.75rem", { lineHeight: "1rem" }],
      },
    },
  },
  plugins: [],
};

export default config;
