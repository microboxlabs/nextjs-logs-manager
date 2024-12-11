import flowbite from "flowbite-react/tailwind";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        accent: "#f6bc66",
        background: "#f55c7a",
        secondary: "#f57c73",
        primary: "#f68c70",
        accent2: "#f6ac69",
        accent3: "#70d6ff",
      },
      backgroundImage: {
        "linear-gradient-background":
          "linear-gradient(120deg, #f55c7a 40%, #f68c70)",
        "linear-gradient-background2":
          "linear-gradient(120deg, #f68c70 40%, #f57c73)",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
