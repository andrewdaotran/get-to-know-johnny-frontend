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
      animation: { loadingFade: "loadingFade 1.5s infinite" },
      keyframes: {
        loadingFade: {
          "0%": { opacity: "0.2" },
          "50%": { opacity: "0.8" },

          "100%": { opacity: "0.2" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
