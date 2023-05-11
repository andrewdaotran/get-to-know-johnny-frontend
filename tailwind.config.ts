import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "rgb(255 255 255)",
        secondary: "rgb(229 231 235)",
        grayText: "rgb(107 114 128)",
      },
    },
  },
  plugins: [],
} satisfies Config;
