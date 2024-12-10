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
      colors: {
        accent: "#f6bc66",
        background: "#f55c7a",
        secondary: "#f57c73",
        primary: "#f68c70",
        accent2: "#f6ac69",
        accent3: "#70d6ff",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
