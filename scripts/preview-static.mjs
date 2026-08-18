import { existsSync, rmSync, symlinkSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { spawn } from "node:child_process";

const projectRoot = resolve(import.meta.dirname, "..");
const outDir = resolve(projectRoot, "out");
const previewRoot = "/private/tmp/qjqlab-preview";
const mountPath = resolve(previewRoot, "QjqLab");
const port = process.env.PORT || "4173";

if (!existsSync(outDir)) {
  throw new Error("Missing out/. Run npm run build:github before previewing the static site.");
}

mkdirSync(previewRoot, { recursive: true });
if (existsSync(mountPath)) {
  rmSync(mountPath, { recursive: true, force: true });
}
symlinkSync(outDir, mountPath, "dir");

console.log(`Static preview: http://127.0.0.1:${port}/QjqLab/`);

const child = spawn("python3", ["-m", "http.server", port, "--bind", "127.0.0.1"], {
  cwd: previewRoot,
  stdio: "inherit",
});

child.on("exit", (code) => process.exit(code ?? 0));
