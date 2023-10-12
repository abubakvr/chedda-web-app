import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontSize: {
        lg: "1.0625rem", // Change this value to your desired size
      },
      screens: {
        "3xl": "1920px",
      },
      colors: {
        "lavendar-purple": "#BCC3E7",
        "turtoise-green": "#5DDEFA",
      },
    },
  },
  plugins: [],
};
export default config;
