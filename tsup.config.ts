import { defineConfig } from "tsup";

export default defineConfig([
  {
    clean: true,
    entry: ["src/index.ts"],
    dts: true,
    outDir: "dist/base",
    format: ["esm", "cjs"],
  },
  {
    clean: true,
    entry: ["src/tailwindcss.ts"],
    dts: true,
    outDir: "dist/tailwindcss",
    format: ["esm", "cjs"],
  },
]);
