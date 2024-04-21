/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screen: {
        mb: {
          min: "540px",
        },
      },
    },
  },
  plugins: [],
};
