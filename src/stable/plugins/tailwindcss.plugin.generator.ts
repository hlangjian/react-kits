import fg from "fast-glob";
import postcss from "postcss";
import postcssJs from "postcss-js";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const banner = `
// This file is Auto-Generated!!
// Don't edit it!! 
`;

const localfilename = (filename: string) =>
  path.resolve(fileURLToPath(path.dirname(import.meta.url)), filename);

const cssToJs = (css: string) =>
  JSON.stringify(postcssJs.objectify(postcss.parse(css)));

const templatePath = localfilename("tailwindcss.plugin.template.ts");
const outputPluginPath = localfilename("tailwindcss.plugin.codegen.ts");

const entries = await fg(["./**/components/**/*.css"], { dot: true });

const cssObjects = await Promise.all(
  entries.map(async (entry) => {
    const css = await readFile(entry, { encoding: "utf8" });
    return `addComponents(${cssToJs(css)})`.replace(/true/g, "{}");
  })
);

const code = await readFile(templatePath, { encoding: "utf8" });

const pluginCode = code.replace(
  "    /* addComponents Placeholder */",
  cssObjects.join(";")
);

await writeFile(outputPluginPath, banner + pluginCode);
