import { defineConfig } from "tsup";

export default defineConfig([
  {
    clean: true,
    entry: ["src/**/!(*.stories|*.template|*.generator).(js|jsx|ts|tsx)"],
    dts: true,
    outDir: "dist",
    format: ["esm", "cjs"],
  },
]);
