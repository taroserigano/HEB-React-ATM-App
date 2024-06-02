/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Enable dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
      },
      colors: {
        // primary: {
        //   light: "#ff7043",
        //   DEFAULT: "#ff5722",
        //   dark: "#e64a19",
        // },
        // secondary: {
        //   light: "#757575",
        //   DEFAULT: "#616161",
        //   dark: "#424242",
        // },
        background: {
          light: "#f5f5f5",
          dark: "#121212",
        },
      },
    },
  },
  plugins: [],
};
