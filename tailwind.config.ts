import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        "primary": {
          700: "#FFBDF9"
        },
        "secondary": {
          700: "#926AA6"
        },
        "accent": {
          700: "#FFC857"
        },
        "background": {
          700: "#FFF7FC"
        },
        "gray": {
          700: "#0D030D"
        }
      }
    }
  },
  plugins: []
};
export default config;
