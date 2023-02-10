/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "wdc-primary": "#2fdeed",
        "wdc-primary-darker": "#2ddceb",
        "wdc-dark-blue": "#262534",
        "wdc-darker-blue": "#0c1524",
        "wdc-gray": "#1c2230",
      },
    },
  },
  plugins: [],
};
