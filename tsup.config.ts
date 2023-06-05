import { defineConfig } from "tsup";

export default defineConfig([
  {
    clean: true,
    entry: [
      "src/stable/**/!(*.stories|*.template|*.generator).(js|jsx|ts|tsx)",
    ],
    dts: true,
    outDir: "dist/stable",
    format: ["esm", "cjs"],
  },
  {
    clean: true,
    entry: ["src/labs/**/!(*.stories|*.template|*.generator).(js|jsx|ts|tsx)"],
    dts: true,
    outDir: "dist/labs",
    format: ["esm", "cjs"],
  },
]);
