/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      body: ["Montserrat", "sans-serif"],
      title: ["Rubik", "sans-serif"],
    },
    extend: {
      animation: {
        rotate: "rotate 1s linear infinite",
        top: "toTop 0.5s forwards",
        down: "toDown 0.5s forwards",
        "ease-pulse": "easePulse 0.8s ease-in-out infinite alternate",
      },
      keyframes: {
        easePulse: {
          "0%": {
            opacity: 0.2,
          },
          "100%": {
            opacity: 1,
          },
        },
        rotate: {
          from: {
            transform: "initial",
            transformOrigin: "50% 50%",
          },
          to: {
            transform: "rotate(360deg)",
            transformOrigin: "50% 50%",
          },
        },
        toTop: {
          "0%": {
            opacity: "0",
            transform: "translateY(1.9rem)",
          },
          initial: {
            opacity: "1",
            transform: "initial",
          },
        },
        toDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-1.9rem)",
          },
          initial: {
            opacity: "1",
            transform: "initial",
          },
        },
      },
    },
  },
  plugins: [],
};
