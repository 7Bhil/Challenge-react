/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#FFFFFF",
          text: "#0B1220",
          primary: "#FF6B35",
          secondary: "#2D9CDB",
          muted: "#F3F4F6",
        },
      },
    },
  },
  plugins: [],
};
