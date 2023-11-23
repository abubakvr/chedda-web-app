import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontSize: {
        lg: "1rem",
      },
      screens: {
        "3xl": "1920px",
      },
      colors: {
        "lavendar-purple": "#BCC3E7",
        "turtoise-green": "#5DDEFA",
      },
      letterSpacing: {
        normal: "0",
        wide: ".015em",
        wider: ".0175em",
        widest: "0.025em",
      },
    },
  },
};
export default config;
