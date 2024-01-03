import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "rgb(255 255 255)", // white
        // main: "rgb(255 255 255)", // white
        secondary: "rgb(229 231 235)", // gray-200

        // grayText: "blue",
        grayText: "rgb(107 114 128)", // gray-500

        // appOrange: "blue",
        appOrange: "rgb(249 115 22)", // orange-500
      },
    },
  },
  plugins: [],
} satisfies Config;
