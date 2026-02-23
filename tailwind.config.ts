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
        primary: {
          50: "#edf7f0",
          100: "#d1eddb",
          200: "#a3dbb7",
          300: "#74c993",
          400: "#4ab776",
          500: "#2d6a4f",
          600: "#245541",
          700: "#1b4032",
          800: "#122b22",
          900: "#091511",
        },
        secondary: {
          50: "#fff3e6",
          100: "#ffe0b3",
          200: "#ffcc80",
          300: "#ffb74d",
          400: "#ffa726",
          500: "#f77f00",
          600: "#c66300",
          700: "#944a00",
          800: "#633200",
          900: "#311900",
        },
        accent: {
          50: "#fef9e7",
          100: "#fdf0c0",
          200: "#fce799",
          300: "#fbde72",
          400: "#fcd54b",
          500: "#fcbf49",
          600: "#ca993a",
          700: "#97732c",
          800: "#654c1d",
          900: "#32260f",
        },
        cream: "#fefae0",
      },
      fontFamily: {
        heading: ["Plus Jakarta Sans", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
