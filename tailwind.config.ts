import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  jit: true,
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
