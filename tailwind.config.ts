// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FE6F21",
          ...{
            "50": "#fff6ed",
            "100": "#ffebd4",
            "200": "#ffd2a8",
            "300": "#ffb270",
            "400": "#ff8637",
            "500": "#ff6f20",
            "600": "#f04906",
            "700": "#c73407",
            "800": "#9e2a0e",
            "900": "#7f260f",
            "950": "#450f05",
          },
        },
        neutral: {
          DEFAULT: "#000000",
          ...{
            "50": "#f6f6f6",
            "100": "#e7e7e7",
            "200": "#d1d1d1",
            "300": "#b0b0b0",
            "400": "#888888",
            "500": "#6d6d6d",
            "600": "#5d5d5d",
            "700": "#4f4f4f",
            "800": "#454545",
            "900": "#3d3d3d",
            "950": "#000000",
          },
        },
        // 다크모드용 색상 추가
        background: {
          DEFAULT: "white",
          dark: "#000000",
        },
        text: {
          DEFAULT: "#000000",
          dark: "#ffffff",
        },
        border: {
          DEFAULT: "#e7e7e7",
          dark: "#454545",
        },
      },
      fontSize: {
        display: ["3rem", { lineHeight: "1.2", fontWeight: "700" }], // 48px
        h1: ["2.5rem", { lineHeight: "1.2", fontWeight: "700" }], // 40px
        h2: ["2rem", { lineHeight: "1.2", fontWeight: "700" }], // 32px
        h3: ["1.5rem", { lineHeight: "1.2", fontWeight: "700" }], // 24px
        subhead1: ["1.25rem", { lineHeight: "1.2", fontWeight: "700" }], // 20px
        subhead2: ["1rem", { lineHeight: "1.2", fontWeight: "700" }], // 16px
        subhead3: ["0.875rem", { lineHeight: "1.2", fontWeight: "700" }], // 14px
        body1: ["1rem", { lineHeight: "1.5" }], // 16px
        body2: ["0.875rem", { lineHeight: "1.5" }], // 14px
        body3: ["0.75rem", { lineHeight: "1.5" }], // 12px
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
