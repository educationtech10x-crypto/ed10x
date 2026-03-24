import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();

async function render(svgPath, outPath, size) {
  const svg = await fs.readFile(svgPath);
  await sharp(svg, { density: 240 })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(outPath);
  console.log(`Wrote ${path.relative(root, outPath)}`);
}

await render(
  path.join(root, "public", "ed10x-logo.svg"),
  path.join(root, "public", "ed10x-logo.png"),
  1200,
);
await render(
  path.join(root, "public", "ed10x-icon.svg"),
  path.join(root, "public", "ed10x-icon.png"),
  512,
);

