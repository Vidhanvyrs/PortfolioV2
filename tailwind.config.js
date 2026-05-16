/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F0F0F0",
          card: "#D9E9CF",
        },
        terracotta: {
          DEFAULT: "#96A78D",
          hover: "#7F8E77",
          light: "#B6CEB4",
        },
        border: {
          DEFAULT: "#B6CEB4",
          light: "#D9E9CF",
        },
        accent: {
          DEFAULT: "#B6CEB4",
          green: "#D9E9CF",
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
