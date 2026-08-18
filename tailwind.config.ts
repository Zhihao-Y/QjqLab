import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          1: "#6B1D1D",
          2: "#A33A2C",
          3: "#B85446",
        },
        accent: {
          1: "#1E2A3A",
          2: "#B8C6D9",
        },
        ink: {
          1: "#2B2523",
          2: "#595653",
        },
        paper: {
          1: "#FCFDFF",
          2: "#FBF9FB",
        },
      },
      fontFamily: {
        sans: [
          "HarmonyOS Sans",
          "HarmonyOS Sans SC",
          "Inter",
          "Noto Sans SC",
          "PingFang SC",
          "Microsoft YaHei",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 24px 80px rgba(43, 37, 35, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
