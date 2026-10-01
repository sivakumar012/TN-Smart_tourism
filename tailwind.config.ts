import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#040B16",
          900: "#071527",
          800: "#0B1F3A",
          700: "#132D52",
          600: "#1E4070",
        },
        teal: {
          500: "#00A896",
          400: "#02C9B3",
          300: "#36E5D1",
        },
        sand: {
          500: "#F4A261",
          400: "#F7B783",
          100: "#FDF5EE",
        },
      },
    },
  },
  plugins: [],
};
export default config;
