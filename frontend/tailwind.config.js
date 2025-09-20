import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#0f1724",
        main_foreground: "#e6eef8",
        card: "#0b1620",
        card_foreground: "#d9eef6",
        border: "#263449",
        input: "#071421",
        primary: "#4fd1c5",
        primary_foreground: "#03201c",
        secondary_foreground: "#a8c0ce",
        secondary: "#152033",
        muted: "#132029",
        muted_foreground: "#6b7d88",
        sidebar: "#071221",
        sidebar_foreground: "#9ecfd9",
        sidebar_primary: "#03363a",
        sidebar_primary_foreground: "#bff3ee",
      },
    },
  },
  plugins: [daisyui],
};
