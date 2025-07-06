import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        worksans: ["WorkSans", "sans-serif"],
      },
      colors: {
        light: "#EEF4F9",
        textcolor:"#7A7777",
        lightbg:"#FFFCFA",
        hamburgerbg:"#F9F4EE"

      },
      
    },
  },
};
export default config;
