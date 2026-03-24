import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "out");
const wwwDir = path.join(root, "www");

if (!fs.existsSync(outDir)) {
  console.error("sync-www: missing out/ — run `npm run build` first.");
  process.exit(1);
}

fs.rmSync(wwwDir, { recursive: true, force: true });
fs.mkdirSync(wwwDir, { recursive: true });
fs.cpSync(outDir, wwwDir, { recursive: true });
console.log("sync-www: copied out/ -> www/");
