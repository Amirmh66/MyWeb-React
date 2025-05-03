/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        tilt: "tilt 10s infinite linear",
        borderSpin: "borderSpin 7s linear infinite",
        progress: "progress 3800ms linear forwards",
      },
      keyframes: {
        tilt: {
          "0%, 50% 100%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(3deg)",
          },
          "75%": {
            transform: "rotate(-3deg)",
          },
        },
        borderSpin: {
          "100%": {
            transform: "rotate(-360deg)",
          },
        },
        progress: {
          "0%": {
            transform: "scaleX(1)",
          },
          "100%": {
            transform: "scaleX(0)",
          },
        },
      },
    },
  },
  plugins: [],
};
