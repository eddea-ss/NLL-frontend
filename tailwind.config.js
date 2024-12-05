/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
    "./src/styles.scss",
    "./src/v2/styles/styles.scss",
  ],

  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 1.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  purge: ["./src/**/*.{html,ts}"],
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
