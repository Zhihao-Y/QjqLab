import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const source = ".next/static";
const target = `${process.env.NEXT_OUTPUT_DIR || "out"}/_next/static`;

if (!existsSync(source)) {
  throw new Error(`Missing ${source}. Run next build before fixing the static export.`);
}

mkdirSync(dirname(target), { recursive: true });
cpSync(source, target, { recursive: true });

console.log(`Copied ${source} to ${target}`);
