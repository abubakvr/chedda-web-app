import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontSize: {
        lg: "1rem",
        "2xs": "10px",
        "3xs": "8px",
      },
      fontWeight: {
        bold: "500",
        semibold: "400",
      },
      screens: {
        "3xl": "1920px",
      },
      colors: {
        "off-white": "#FFFFFF90",
        mist: "#FFFFFF70",
        "mist-light": "#FFFFFF20",
        success: "#44B410",
        warning: "#F89F1A",
        error: "#E91E63",
        glass: "#ffffff02",
        frost: "#ffffff19",
        "turtoise-green": "#5DDEFA",
        "card-bg": "var(--card-bg)",
        "accent-purple": "#7F56D9",
        "haze-purple": "#4c37a740",
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
