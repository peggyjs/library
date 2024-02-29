import { $ } from "dax-sh";
import fs from "node:fs/promises";
import path from "node:path";
import peggy from "peggy";
import url from "node:url";

const dir = url.fileURLToPath(new URL("..", import.meta.url));
const files = (await fs.readdir(dir)).filter(f => f.endsWith(".peggy"));

await Promise.all(files.map(async f => {
  const full = path.resolve(dir, f);
  const p = path.parse(full);

  const grammar = await fs.readFile(full, "utf8");
  const { rules } = peggy.generate(grammar, {
    grammarSource: full,
    output: "ast",
  });
  const startRules = rules
    .filter(({ name }) => !name.startsWith("_"))
    .map(({ name }) => name)
    .join(",");
  const mjs = path.format({ ...p, base: "", ext: ".mjs" });
  await $`npx peggy --format es ${full} -o ${mjs} --allowed-start-rules ${startRules}`;

  const cjs = path.format({ ...p, base: "", ext: ".cjs" });
  await $`npx peggy --format commonjs ${full} -o ${cjs} --allowed-start-rules ${startRules}`;
}));
