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
        canvas: {
          DEFAULT: "#F7F4EE",
          surface: "#FDFCF9",
          border: "#E5DED3",
        },
        walnut: {
          DEFAULT: "#3D2314",
          hover: "#2A1709",
          dark: "#211207",
          light: "#5A3822",
        },
        olive: {
          DEFAULT: "#4A6741",
          light: "#608256",
          dark: "#344B2E",
          subtle: "#EAEFE9",
        },
        charcoal: {
          DEFAULT: "#231F1D",
          muted: "#6E675F",
          faint: "#A8A199",
        },
        risk: {
          amber: "#C27803",
          coral: "#B83A26",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-newsreader)", "serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
