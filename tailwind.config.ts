import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070807",
        obsidian: "#10110f",
        ash: "#c7c1b3",
        field: "#858071",
        brass: "#c8a45d",
        ember: "#9d6b2f",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Impact", "Arial Narrow", "Haettenschweiler", "sans-serif"],
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 25% 20%, rgba(255,255,255,.08) 0 1px, transparent 1px), radial-gradient(circle at 75% 0%, rgba(255,255,255,.05) 0 1px, transparent 1px)",
      },
      boxShadow: {
        dossier: "0 24px 80px rgba(0,0,0,.45)",
      },
      letterSpacing: {
        field: ".22em",
      },
    },
  },
  plugins: [],
};

export default config;
