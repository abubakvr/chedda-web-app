import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontSize: {
        lg: "1rem",
      },
      fontWeight: {
        bold: "500",
        semibold: "400",
      },
      screens: {
        "3xl": "1920px",
      },
      colors: {
        mist: "#FFFFFF50",
        success: "#44B410",
        warning: "#F89F1A",
        error: "#E91E63",
        "turtoise-green": "#5DDEFA",
        "card-bg": "var(--card-bg)",
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
