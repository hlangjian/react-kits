import { Config } from "tailwindcss";
import plugin from "./src/plugins/tailwindcss.plugin.template";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    extend: {},
  },
  plugins: [plugin],
} satisfies Config;
