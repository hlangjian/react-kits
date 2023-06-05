import { Config } from "tailwindcss";
import plugin from "./src/stable/plugins/tailwindcss.plugin.template";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [plugin],
} satisfies Config;
